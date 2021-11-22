import { badRequest } from "./../../utils/errors";
import Joi from "joi";
import { RequestHandler } from "../request-handler-wrapper";
import { validationBadRequest } from "../../utils/errors";
import { validate, ValidationSchema } from "../../utils/validate";

const bodyValidation: ValidationSchema<server.ClaimRequest> = {
  dob: Joi.string().required(),
  address: Joi.string().empty(""),
  email: Joi.string().empty(""),
  mobile: Joi.string().empty(""),
  name: Joi.string().empty("")
};

const verifyClaim: RequestHandler<
  void,
  void,
  server.ClaimRequest,
  server.Claim[]
> = async ({ body, services }) => {
  console.log("Verify Claim");
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
  const context = ["https://www.w3.org/2018/credentials/v1"];

  //validate full name claim
  const fullNameClaim = {
    "@context": context,
    key: "0x02",
    type: ["FullNameCredential"],
    credentialSubject: {
      name: "name",
      value: body.name,
    },
    proof: {type: ""},
    issuer: "",
    issuanceDate: new Date(),
    title: "Full Name",
  };
  const fullnameClaimValidated = await services.claim.validateClaim(
    fullNameClaim
  );
  claims.push(fullnameClaimValidated);

  //validate dob claim
  const dobClaim = {
    "@context": context,
    key: "0x01",
    type: ["DateOfBirthCredential"],
    credentialSubject: {
      name: "DoB",
      value: body.dob,
    },
    proof: {type: ""},
    issuer: "",
    issuanceDate: new Date(),
    title: "Date of Birth",
  };
  const dobClaimValidated = await services.claim.validateClaim(dobClaim);
  claims.push(dobClaimValidated);

  //validate address claim
  const addressClaim = {
    "@context": context,
    key: "0x05",
    type: ["AddressCredential"],
    credentialSubject: {
      name: "address",
      value: body.address,
    },
    proof: {type: ""},
    issuer: "",
    issuanceDate: new Date(),
    title: "Address",
  };
  const addressClaimValidated = await services.claim.validateClaim(
    addressClaim
  );
  claims.push(addressClaimValidated);

  const mobileClaim = {
    "@context": context,
    key: "0x04",
    type: ["MobileNumberCredential"],
    credentialSubject: {
      name: "mobile",
      value: body.mobile,
    },
    proof: {type: ""},
    issuer: "",
    issuanceDate: new Date(),
    title: "Mobile Number",
  };

  const mobileClaimValidated = await services.claim.validateClaim(mobileClaim);
  claims.push(mobileClaimValidated);

  const emailClaim = {
    "@context": context,
    key: "0x03",
    type: ["EmailCredential"],
    credentialSubject: {
      name: "email",
      value: body.email,
    },
    proof: {type: ""},
    issuer: "",
    issuanceDate: new Date(),
    title: "Email",
  };

  const emailClaimValidated = await services.claim.validateClaim(emailClaim);
  claims.push(emailClaimValidated);
  //TODO need logic to handle response
  return claims;
};

export default verifyClaim;
