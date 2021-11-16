import { RequestHandler } from "../request-handler-wrapper";
import crypto, { createECDH } from "crypto";

type ResponseBody = {
  timestamp: number;
  signature: string;
};

const getStatus: RequestHandler<void, void, void, ResponseBody> = async ({
  config
}) => {
  const curve = "secp256k1";
  const ecdh = createECDH(curve);

  const timestamp = Date.now();
  const response = {
    timestamp: timestamp,
    signature: ""
  };

  const { privateKey } = crypto.generateKeyPairSync("ec", {
    namedCurve: curve
  });

  ecdh.setPrivateKey(config.ethKey, "hex");
  ecdh.getPrivateKey("hex");

  const sign = crypto.createSign("SHA256");
  sign.update(timestamp.toString());
  sign.end();

  response.signature = sign.sign(privateKey).toString("hex");
  return response;
};

export default getStatus;
