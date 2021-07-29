import Joi from "joi";
import { RequestHandler } from "../request-handler-wrapper";
import { badRequest, validationBadRequest } from "../../utils/errors";
import { validate, ValidationSchema } from "../../utils/validate";
import * as openpgp from "openpgp";
import { receiveMessageOnPort } from "worker_threads";

const bodyValidation: ValidationSchema<server.PGPKeypairRequest> = {
  name: Joi.string().required(),
  email: Joi.string().required(),
  passphrase: Joi.string().allow("")
};

const requestCreatePGP: RequestHandler<
  void,
  void,
  server.PGPKeypairRequest,
  server.PGPKeypariResponse
> = async ({ body }) => {
  const bodyValidationResult = await validate<server.PGPKeypairRequest>(
    body,
    bodyValidation
  );

  if (bodyValidationResult.isInvalid) {
    return validationBadRequest(bodyValidationResult.errors);
  }

  const { privateKey, publicKey, revocationCertificate } =
    await openpgp.generateKey({
      type: "ecc", // Type of the key, defaults to ECC
      curve: "curve25519", // ECC curve name, defaults to curve25519
      userIDs: [{ name: body.name, email: body.email }], // you can pass multiple user IDs
      passphrase: body.passphrase, // protects the private key
      format: "armored" // output key format, defaults to 'armored' (other options: 'binary' or 'object')
    });

  return {
    privateKey,
    publicKey,
    revocationCertificate
  };
};

export default requestCreatePGP;
