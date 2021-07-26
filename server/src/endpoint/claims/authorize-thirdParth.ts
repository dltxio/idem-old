import Joi from "joi";
import { RequestHandler } from "../request-handler-wrapper";
import { validationBadRequest } from "../../utils/errors";
import { validate, ValidationSchema } from "../../utils/validate";

const claim = Joi.object().keys({
  key: Joi.string().required(),
  type: Joi.string().required(),
  value: Joi.string().required()
});

const bodyValidation: ValidationSchema<server.Claim[]> = [claim];

const authorizeThirdParty: RequestHandler<
  void,
  void,
  server.Claim[],
  server.SuccessResponse | server.BadRequestGeneralResponse
> = async ({ body, services }) => {
  const bodyValidationResult = await validate(body, bodyValidation);

  if (bodyValidationResult.isInvalid) {
    return validationBadRequest(bodyValidationResult.errors);
  }

  const response = await services.thirdParty.authorizeGPIB(body);
  return response;
};

export default authorizeThirdParty;
