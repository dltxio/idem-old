import Joi from "joi";
import * as openpgp from "openpgp";
import { RequestHandler } from "../request-handler-wrapper";
import { validationBadRequest } from "../../utils/errors";
import { validate, ValidationSchema } from "../../utils/validate";
import { generateVerificationCode } from "../../utils/verification-codes";
import fs from "fs";

const bodyValidation: ValidationSchema<server.SendEmailVerificationEmailRequestBody> =
  {
    email: Joi.string().required()
  };

const sendEmailVerificationEmail: RequestHandler<
  void,
  void,
  server.SendEmailVerificationEmailRequestBody,
  server.SuccessResponse
> = async ({ body, services, config }) => {
  const bodyValidationResult = await validate(body, bodyValidation);

  if (bodyValidationResult.isInvalid) {
    return validationBadRequest(bodyValidationResult.errors);
  }

  const verificationCode = generateVerificationCode(
    body.email,
    config.verificationCodeLength
  );

  const privateKeyArmored = fs.readFileSync("./src/info.private.key", "utf-8");

  const unsignedMessage = await openpgp.createCleartextMessage({
    text: `Verification code: ${verificationCode}`
  });

  const privateKey = await openpgp.decryptKey({
    privateKey: await openpgp.readKey({ armoredKey: privateKeyArmored }),
    passphrase: process.env.PGP_PRIVATE_KEY_PASSWORD
  });

  const signedMessage = await openpgp.sign({
    message: unsignedMessage,
    privateKeys: privateKey
  });

  await services.email.sendSignedEmailVerificationEmail({
    to: body.email,
    from: config.email.support.address,
    data: {
      verificationCode,
      signedMessage
    }
  });

  return {
    success: true,
    verificationCode,
    signedMessage
  };
};

export default sendEmailVerificationEmail;