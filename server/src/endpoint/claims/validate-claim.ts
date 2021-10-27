import Joi from "joi";
import crypto, { createECDH } from "crypto";
import { RequestHandler } from "../request-handler-wrapper";
import { validationBadRequest } from "../../utils/errors";
import { validate, ValidationSchema } from "../../utils/validate";

const evidence = Joi.object().keys({
  name: Joi.string().required(),
  sha256: Joi.string().required()
});

const bodyValidation: ValidationSchema<server.Claim> = {
  type: Joi.string().required(),
  key: Joi.string().required(),
  value: Joi.string().required(),
  evidence: Joi.array().items(evidence).min(1),
  hash: Joi.string().empty(""),
  signature: Joi.string().empty(""),
  timestamp: Joi.number().empty("")
};

const createClaim: RequestHandler<void, void, server.Claim, server.Claim> =
  async ({ body, config }) => {
    const bodyValidationResult = await validate(body, bodyValidation);

    if (bodyValidationResult.isInvalid) {
      return validationBadRequest(bodyValidationResult.errors);
    }

    const curve = "secp256k1";
    const ecdh = createECDH(curve);

    const { privateKey } = crypto.generateKeyPairSync("ec", {
      namedCurve: curve
    });

    ecdh.setPrivateKey(config.ethKey, "hex");

    ecdh.getPrivateKey("hex");

    const sign = crypto.createSign("SHA256");
    sign.update(JSON.stringify(body));
    sign.end();

    const signature = sign.sign(privateKey);

    const hash = crypto
      .createHash("SHA256")
      .update(JSON.stringify(body))
      .digest("hex");

    body.hash = hash;
    body.signature = signature.toString("hex");
    body.timestamp = Date.now();
    return body;
  };

export default createClaim;
