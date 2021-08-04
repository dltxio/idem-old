import { badRequest } from "./../../utils/errors";
import Joi from "joi";
import { RequestHandler } from "../request-handler-wrapper";
import { validationBadRequest } from "../../utils/errors";
import { validate, ValidationSchema } from "../../utils/validate";

const bodyValidation: ValidationSchema<server.ClaimRequest> = {
  dob: Joi.string().required(),
  name: Joi.string().empty(""),
  email: Joi.string().empty(""),
  address: Joi.string().empty(""),
  mobile: Joi.string().empty("")
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
    value: body.name,
    evidence: [""],
    hash: undefined,
    signature: undefined,
    timestamp: undefined,
    description: "Your full name"
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
    timestamp: undefined,
    description: "Your date of birth"
  };
  const dobClaimValidated = await services.claim.validateClaim(dobClaim);
  claims.push(dobClaimValidated);

  //validate address claim
  const addressClaim = {
    type: "Address",
    key: "0x05",
    value: body.address,
    evidence: [""],
    hash: undefined,
    signature: undefined,
    timestamp: undefined,
    description: "Your physical address"
  };
  const addressClaimValidated = await services.claim.validateClaim(
    addressClaim
  );
  claims.push(addressClaimValidated);

  const mobileClaim = {
    type: "Mobile",
    key: "0x04",
    value: body.mobile,
    evidence: [""],
    hash: undefined,
    signature: undefined,
    timestamp: undefined,
    description: "Your mobile number"
  };

  const mobileClaimValidated = await services.claim.validateClaim(mobileClaim);
  claims.push(mobileClaimValidated);

  const emailClaim = {
    type: "Email",
    key: "0x03",
    value: body.email,
    evidence: [""],
    hash: undefined,
    signature: undefined,
    timestamp: undefined,
    description: "Your email address"
  };

  const emailClaimValidated = await services.claim.validateClaim(emailClaim);
  claims.push(emailClaimValidated);
  //TODO need logic to handle response
  return claims;
};

export default verifyClaim;
