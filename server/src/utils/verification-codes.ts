import crypto from "crypto";
import moment from "moment";
import config from "../../config.json";

// Generates a code based off of a given number.
export const generateVerificationCode = (number: string) => {
  const today = moment().startOf("day");
  const cipher = crypto.createHmac(
    "sha256",
    process.env.CIPHER_SECRET + today.toString()
  );
  cipher.update(number);
  const result = cipher.digest("hex");
  return result.slice(0, config.sms.codeLength);
};

/**
 * Generates a range of acceptable codes based off of a given number.
 * These are deterministic but complex enough that it should not pose a security risk.
 */
export const generateValidationCodes = (number: string) => {
  const today = moment().startOf("day");
  const ciphers = [
    crypto.createHmac("sha256", process.env.CIPHER_SECRET + today.toString()),
    crypto.createHmac(
      "sha256",
      process.env.CIPHER_SECRET + today.subtract(1, "day").toString()
    )
  ];
  return ciphers.map(cipher => {
    cipher.update(number);
    const result = cipher.digest("hex");
    return result.slice(0, config.sms.codeLength);
  });
};
