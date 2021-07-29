import { badRequest } from "./../../utils/errors";
import Joi from "joi";
import { RequestHandler } from "../request-handler-wrapper";
import { validationBadRequest } from "../../utils/errors";
import { validate, ValidationSchema } from "../../utils/validate";

const bodyValidation: ValidationSchema<server.ClaimRequest> = {
  firstName: Joi.string().required(),
  middleName: Joi.string().empty(""),
  lastName: Joi.string().required(),
  dob: Joi.string().required(),
  unitNumber: Joi.string().empty(""),
  streetNumber: Joi.string().required(),
  streetName: Joi.string().required(),
  streetType: Joi.string().required(),
  locality: Joi.string().required(),
  region: Joi.string().required(),
  postCode: Joi.string().required(),
  country: Joi.string().required()
};

const verifyClaim: RequestHandler<
  void,
  void,
  server.ClaimRequest,
  server.Claim[]
> = async ({ body, services }) => {
  const bodyValidationResult = await validate(body, bodyValidation);

  if (bodyValidationResult.isInvalid) {
    return validationBadRequest(bodyValidationResult.errors);
  }

  //TODO block by auspost api
  // const response = await services.ausPost.sendVerification(body);

  // if (!response.success) {
  //   return badRequest("Verification process failed");
  // }

  const claims: Array<server.Claim> = [];

  //validate full name claim
  const fullNameClaim = {
    type: "Full Name",
    key: "0x02",
    value: body.firstName + " " + body.middleName + " " + body.lastName,
    evidence: [""],
    hash: undefined,
    signature: undefined,
    timestamp: undefined
  };
  const fullnameClaimValidated = await services.claim.validateClaim(
    fullNameClaim
  );
  claims.push(fullnameClaimValidated);

  //validate dob claim
  const dobClaim = {
    type: "DOB",
    key: "0x01",
    value: body.dob,
    evidence: [""],
    hash: undefined,
    signature: undefined,
    timestamp: undefined
  };
  const dobClaimValidated = await services.claim.validateClaim(dobClaim);
  claims.push(dobClaimValidated);

  //validate address claim
  const addressClaim = {
    type: "Address",
    key: "0x05",
    value:
      body.unitNumber +
      " " +
      body.streetNumber +
      " " +
      body.streetName +
      " " +
      body.streetType +
      " " +
      body.locality +
      " " +
      body.region +
      " " +
      body.postCode +
      " " +
      body.country,
    evidence: [""],
    hash: undefined,
    signature: undefined,
    timestamp: undefined
  };
  const addressClaimValidated = await services.claim.validateClaim(
    addressClaim
  );
  claims.push(addressClaimValidated);

  //TODO need logic to handle response
  return claims;
};

export default verifyClaim;
