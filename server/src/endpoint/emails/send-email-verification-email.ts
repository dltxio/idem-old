import Joi from "joi";
import emailService from "../../services/email";
import { RequestHandler } from "../request-handler-wrapper";
import { validationBadRequest } from "../../utils/errors";
import { validate, ValidationSchema } from "../../utils/validate";
import { generateVerificationCode } from "../../utils/verification-codes";

const bodyValidation: ValidationSchema<server.SendEmailVerificationEmailRequestBody> = {
  email: Joi.string().required()
};

const sendEmailVerificationEmail: RequestHandler<
  void,
  void,
  server.SendEmailVerificationEmailRequestBody,
  server.SuccessResponse
> = async ({ body }) => {
  const bodyValidationResult = await validate(body, bodyValidation);

  if (bodyValidationResult.isInvalid) {
    return validationBadRequest(bodyValidationResult.errors);
  }

  const verificationCode = generateVerificationCode(body.email);

  await emailService.sendEmailVerificationEmail({
    to: body.email,
    data: {
      verificationCode
    }
  });

  return { success: true };
};

export default sendEmailVerificationEmail;
