const messagebird = require("messagebird")(process.env.MESSAGEBIRD_KEY);
const { sms } = require("../../../config.json");
const { promisify } = require("util");
const crypto = require("crypto");

const createMessage = promisify(messagebird.messages.create);

/** @type {Object.<string, string>}
 * Dictionary to store SMS verification codes by number.
 * Only stores one value per phone number, therefore the last
 * code is the only valid code.
 */
const verificationCodes = {};

/**
 * Generates a random HEX string with config given length
 * and stores value into dictionary.
 * @param {string} number
 * @returns {string} code
 */
const generateVerificationCode = (number) => {
  const evenLength = sms.codeLength % 2 === 0;
  // 1 byte = 2 hex characters. Account for when code length is an odd value.
  const bytes = evenLength ? sms.codeLength / 2 : (sms.codeLength + 1) / 2;
  let code = crypto.randomBytes(bytes).toString("hex").toUpperCase();
  if (!evenLength)
    code = code.substr(0, code.length - 1);
  verificationCodes[number] = code;
  return code;
};

/**
 * Sends a verification code to the given phone number.
 * @param {string} number
 * @returns {{ code: string, response: Object }}
 */
module.exports.sendVerification = async (number) => {
  const code = generateVerificationCode(number);
  const response = await createMessage({
    originator: sms.message.originator,
    recipients: [number],
    body: `${sms.message.prefix}${code}${sms.message.suffix}`,
  });
  return { code, response };
};

/**
 * Checks if the verification code is correct for the given phone number.
 * @param {string} number
 * @param {string} code
 * @param {boolean} [invalidate] Whether to invalidate the verification code if code input is valid.
 */
module.exports.checkVerification = (number, code, invalidate = true) => {
  const isValid = (
    code != null &&
    verificationCodes[number]?.toUpperCase() === code?.toUpperCase()
  );
  if (isValid && invalidate)
    delete verificationCodes[number];
  return isValid;
};
