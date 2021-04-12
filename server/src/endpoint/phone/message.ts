import messagebird from "messagebird";
import config from "../../../config.json";
import { promisify } from "util";
import {
  generateVerificationCode,
  generateValidationCodes
} from "../../utils/verification-codes";

const createMessage = promisify(
  messagebird(process.env.MESSAGEBIRD_KEY || "").messages.create
);

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
