import Joi from "joi";
import { RequestHandler } from "../request-handler-wrapper";
import { validationBadRequest } from "../../utils/errors";
import { validate, ValidationSchema } from "../../utils/validate";

const claim = Joi.object().keys({
  key: Joi.string().required(),
  type: Joi.string().required(),
  value: Joi.string().required(),
  evidence: Joi.array().min(1)
});

const bodyValidation: ValidationSchema<server.ThirdPartyAuthorizeRequest> = {
  claims: Joi.array().items(claim).min(1),
  issuer: Joi.string().required()
};

const authorizeThirdParty: RequestHandler<
  void,
  void,
  server.ThirdPartyAuthorizeRequest,
  server.SuccessResponse | server.BadRequestGeneralResponse
> = async ({ body, services }) => {
  const bodyValidationResult = await validate(body, bodyValidation);

  if (bodyValidationResult.isInvalid) {
    return validationBadRequest(bodyValidationResult.errors);
  }

  if (body.issuer === "gpib") {
    const response = await services.thirdParty.authorizeGPIB(body.claims);
    return response;
  }
  //TODO: other third party authorize
  return { success: false };
};

export default authorizeThirdParty;
