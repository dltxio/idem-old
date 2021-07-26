import Joi from "joi";
import { RequestHandler } from "../request-handler-wrapper";
import { validationBadRequest } from "../../utils/errors";
import { validate, ValidationSchema } from "../../utils/validate";
import { ethers } from "ethers";

const evidence = Joi.object().keys({
  name: Joi.string().required(),
  sha256: Joi.string().required()
});

const bodyValidation: ValidationSchema<server.Claim> = {
  type: Joi.string().required(),
  key: Joi.string().required(),
  value: Joi.string().required(),
  evidence: Joi.array().items(evidence).min(1)
};

const createClaim: RequestHandler<
  void,
  void,
  server.Claim,
  server.ClaimValidated
> = async ({ body, config }) => {
  const wallet = new ethers.Wallet(config.ethKey);

  const bodyValidationResult = await validate(body, bodyValidation);

  if (bodyValidationResult.isInvalid) {
    return validationBadRequest(bodyValidationResult.errors);
  }

  const signature = await wallet.signMessage(body.toString());
  const hash = ethers.utils.keccak256(signature);

  return {
    hash: hash,
    signature: signature,
    timestamp: Date.now()
  };
};

export default createClaim;
