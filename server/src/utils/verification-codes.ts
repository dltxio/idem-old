import crypto from "crypto";
import moment from "moment";
import config from "../../config.json";

// Generates a code based off of a given input.
export const generateVerificationCode = (input: string): string => {
  const today = moment().startOf("day");
  const cipher = crypto.createHmac(
    "sha256",
    process.env.CIPHER_SECRET + today.toString()
  );

  return generateCodeFromCipherAndInput(cipher, input, config.sms.codeLength);
};

/**
 * Generates a range of acceptable codes based off of a given input.
 * These are deterministic but complex enough that it should not pose a security risk.
 */
export const generateValidationCodes = (input: string): string[] => {
  const today = moment().startOf("day");
  const ciphers = [
    crypto.createHmac("sha256", process.env.CIPHER_SECRET + today.toString()),
    crypto.createHmac(
      "sha256",
      process.env.CIPHER_SECRET + today.subtract(1, "day").toString()
    )
  ];
  return ciphers.map(cipher =>
    generateCodeFromCipherAndInput(cipher, input, config.sms.codeLength)
  );
};

const generateCodeFromCipherAndInput = (
  cipher: crypto.Hmac,
  input: string,
  codeLength: number
): string => {
  cipher.update(input);
  const result = cipher.digest("hex");
  return result.slice(0, codeLength);
};
