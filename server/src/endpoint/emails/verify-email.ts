import Joi from "joi";
import { RequestHandler } from "../request-handler-wrapper";
import { badRequest, validationBadRequest } from "../../utils/errors";
import { validate, ValidationSchema } from "../../utils/validate";
import { checkVerification } from "../../utils/verification-codes";
const { log } = require("../../logger")("/api/emails");

const bodyValidation: ValidationSchema<server.VerifyEmailRequestBody> = {
  email: Joi.string().required(),
  code: Joi.string().required()
};

const requestEmailVerification: RequestHandler<
  void,
  void,
  server.VerifyEmailRequestBody,
  server.SuccessResponse
> = async ({ body, config }) => {
  const bodyValidationResult = await validate<server.VerifyEmailRequestBody>(
    body,
    bodyValidation
  );

  if (bodyValidationResult.isInvalid) {
    return validationBadRequest(bodyValidationResult.errors);
  }

  const isValid = checkVerification(
    body.email,
    body.code,
    config.verificationCodeLength
  );
  log(
    `received Email verification for ${body.email} with input code ${body.code} [` +
      (!isValid ? "IN" : "") +
      "VALID]"
  );

  if (!isValid) {
    return badRequest("invalid code");
  }

  return { success: true };
};

export default requestEmailVerification;
