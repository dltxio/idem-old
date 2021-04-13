import Joi from "joi";
import { RequestHandler } from "../request-handler-wrapper";
import { validationBadRequest } from "../../utils/errors";
import { validate, ValidationSchema } from "../../utils/validate";
import { generateVerificationCode } from "../../utils/verification-codes";
const { log } = require("../../logger")("/api/phone");

const bodyValidation: ValidationSchema<server.RequestPhoneVerificationSMSRequestBody> = {
  number: Joi.string().required()
};

const requestPhoneVerificationSMS: RequestHandler<
  void,
  void,
  server.RequestPhoneVerificationSMSRequestBody,
  server.SuccessResponse
> = async ({ body, services, config }) => {
  const bodyValidationResult = await validate(body, bodyValidation);

  if (bodyValidationResult.isInvalid) {
    return validationBadRequest(bodyValidationResult.errors);
  }

  const code = generateVerificationCode(
    body.number,
    config.verificationCodeLength
  );

  await services.sms.sendPhoneVerificationSMS(body.number, code);

  log(`received SMS request for ${body.number} -- code:`, code);

  return { success: true };
};

export default requestPhoneVerificationSMS;
