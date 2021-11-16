import { RequestHandler } from "../request-handler-wrapper";
import crypto, { createECDH } from "crypto";

type ResponseBody = {
  timestamp: number;
}[];

const getStatus: RequestHandler<void, void, void, ResponseBody> = async () => {
  const curve = "secp256k1";
  const ecdh = createECDH(curve);

  const { privateKey } = crypto.generateKeyPairSync("ec", {
    namedCurve: curve
  });

  // ecdh.setPrivateKey(config.ethKey, "hex");
  // ecdh.getPrivateKey("hex");

  // const sign = crypto.createSign("SHA256");
  // sign.update(JSON.stringify(body));
  // sign.end();

  // const signature = sign.sign(privateKey);

  // const hash = crypto
  //   .createHash("SHA256")
  //   .update(JSON.stringify(body))
  //   .digest("hex");

  // body.hash = hash;
  // body.signature = signature.toString("hex");
  // body.timestamp = Date.now();
  // return body;

  return [
    {
      timestamp: Date.now()
    }
  ];
};

export default getStatus;
