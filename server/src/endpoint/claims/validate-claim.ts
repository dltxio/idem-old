import Joi from "joi";
import * as openpgp from "openpgp";
import { RequestHandler } from "../request-handler-wrapper";
import { validationBadRequest } from "../../utils/errors";
import { validate, ValidationSchema } from "../../utils/validate";

const bodyValidation: ValidationSchema<server.Claim> = {
  type: Joi.string().required(),
  key: Joi.string().required(),
  value: Joi.string().required()
};

const createClaim: RequestHandler<
  void,
  void,
  server.Claim,
  server.ClaimValidated
> = async ({ body, config }) => {
  console.log(body);
  const bodyValidationResult = await validate(body, bodyValidation);

  if (bodyValidationResult.isInvalid) {
    return validationBadRequest(bodyValidationResult.errors);
  }

  const privateKeyArmored = `-----BEGIN PGP PRIVATE KEY BLOCK-----`;

  // privateKeys: privateKeyArmored, // for signing
  // openpgp.armor: true
  
  const signature = await openpgp.sign({
      message: JSON.stringify(body)
  });

  
  console.log(signature);

  return {
    ...body,
    signature: signature,
    timestamp: Date.now()
  };
};

export default createClaim;
