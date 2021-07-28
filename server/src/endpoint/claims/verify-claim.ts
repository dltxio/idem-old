import Joi from "joi";
import { RequestHandler } from "../request-handler-wrapper";
import { validationBadRequest } from "../../utils/errors";
import { validate, ValidationSchema } from "../../utils/validate";

const evidence = Joi.object().keys({
  name: Joi.string().required(),
  sha256: Joi.string().required()
});

const claim = Joi.object().keys({
  type: Joi.string().required(),
  key: Joi.string().required(),
  value: Joi.string().required(),
  evidence: Joi.array().items(evidence).min(1)
});

const bodyValidation: ValidationSchema<server.Claims> = {
  claims: Joi.array().items(claim).min(1)
};

const verifyClaim: RequestHandler<
  void,
  void,
  server.Claims,
  server.SuccessResponse
> = async ({ body, services }) => {
  const bodyValidationResult = await validate(body, bodyValidation);

  if (bodyValidationResult.isInvalid) {
    return validationBadRequest(bodyValidationResult.errors);
  }

  const response = await services.ausPost.sendVerification(body);

  //TODO need logic to handle response
  return { success: true };
};

export default verifyClaim;
