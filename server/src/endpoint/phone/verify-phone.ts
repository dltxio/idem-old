import Joi from "joi";
import * as message from "./message";
import { RequestHandler } from "../request-handler-wrapper";
import { badRequest, validationBadRequest } from "../../utils/errors";
import { validate, ValidationSchema } from "../../utils/validate";
const { log } = require("../../logger")("/api/phone");

const bodyValidation: ValidationSchema<server.VerifyPhoneRequestBody> = {
  number: Joi.string().required(),
  code: Joi.string().required()
};

const requestPhoneVerificationSMS: RequestHandler<
  void,
  void,
  server.VerifyPhoneRequestBody,
  server.SuccessResponse
> = async ({ body }) => {
  const bodyValidationResult = await validate<server.VerifyPhoneRequestBody>(
    body,
    bodyValidation
  );

  if (bodyValidationResult.isInvalid) {
    return validationBadRequest(bodyValidationResult.errors);
  }

  const isValid = message.checkVerification(body.number, body.code);
  log(
    `received SMS verification for ${body.number} with input code ${body.code} [` +
      (!isValid ? "IN" : "") +
      "VALID]"
  );

  if (!isValid) {
    return badRequest("invalid code");
  }

  return { success: true };
};

export default requestPhoneVerificationSMS;
