import Joi from "joi";
import * as message from "./message";
import { RequestHandler } from "../request-handler-wrapper";
import { validationBadRequest } from "../../utils/errors";
import { validate, ValidationSchema } from "../../utils/validate";
const { log } = require("../../logger")("/api/phone");

const bodyValidation: ValidationSchema<server.RequestPhoneVerificationSMSRequestBody> = {
  number: Joi.string().required()
};

const requestPhoneVerificationSMS: RequestHandler<
  void,
  void,
  server.RequestPhoneVerificationSMSRequestBody,
  server.SuccessResponse
> = async ({ body }) => {
  const bodyValidationResult = await validate(body, bodyValidation);

  if (bodyValidationResult.isInvalid) {
    return validationBadRequest(bodyValidationResult.errors);
  }

  const data = await message.sendVerification(body.number);

  log(`received SMS request for ${body.number} -- code:`, data.code);

  return { success: true };
};

export default requestPhoneVerificationSMS;
