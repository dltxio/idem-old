import Joi from "joi";
import crypto, { createECDH } from "crypto";
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
> = async ({ body }) => {
  console.log(body);
  const bodyValidationResult = await validate(body, bodyValidation);

  if (bodyValidationResult.isInvalid) {
    return validationBadRequest(bodyValidationResult.errors);
  }

  const ecdh = createECDH("secp256k1");

  const { privateKey } = crypto.generateKeyPairSync("ec", {
    namedCurve: "secp256k1"
  });

  // cream olive tissue below crunch convince blame helmet mistake achieve blanket talent
  // address : 0x5601A219C88aDBdbBcf620AA07B5B91eDDf593Ec
  ecdh.setPrivateKey(
    "32740a305605a59964aeed912389dcc93e5ba657f00979480b093fee2b753356",
    "hex"
  );

  ecdh.getPrivateKey("hex");

  const sign = crypto.createSign("SHA256");
  sign.update(JSON.stringify(body));
  sign.end();

  const signature = sign.sign(privateKey);

  return {
    ...body,
    signature: signature.toString("hex"),
    timestamp: Date.now()
  };
};

export default createClaim;
