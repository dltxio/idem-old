import messagebird from "messagebird";
import config from "../../../config.json";
import { promisify } from "util";
import crypto from "crypto";
import moment from "moment";
import generateVerificationCode from "../../utils/generate-verification-code";

const createMessage = promisify(
  messagebird(process.env.MESSAGEBIRD_KEY || "").messages.create
);

/**
 * Generates a range of acceptable codes based off of a given number.
 * These are deterministic but complex enough that it should not pose a security risk.
 * @param {string} number
 * @returns {string[]} codes
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

/**
 * Sends a verification code to the given phone number.
 * @param {string} number
 * @returns {{ code: string, response: Object }}
 */
export const sendVerification = async (number: string) => {
  const code = generateVerificationCode(number);
  const response = await createMessage({
    originator: config.sms.message.originator,
    recipients: [number],
    body: `${config.sms.message.prefix}${code}${config.sms.message.suffix}`
  });
  return { code, response };
};

/**
 * Checks if the verification code is correct for the given phone number.
 * @param {string} number
 * @param {string} code
 */
export const checkVerification = (number: string, code: string) => {
  if (code == null) return false;
  const validCodes = generateValidationCodes(number);
  const isValid = validCodes.includes(code);
  return isValid;
};
