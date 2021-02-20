const express = require("express");
const router = express.Router();

const crypto = require("crypto");
const { createECDH, ECDH } = require("crypto");
// const schema = require("./schema");

router.get("/claims", async (request, response) => {
  //const { error, value } = schema.validate(request.body);

  // const sendRequestError = () => {
  //   sendRequestError();
  // };

  const claim = {
    name: "18+",
    type: "18+"
  };

  const claims = [];
  claims.push(claim);

  response.send(claims);
});

router.post("/claims", async (request, response) => {
  //const { error, value } = schema.validate(request.body);

  const ecdh = createECDH("secp256k1");
  const { privateKey, publicKey } = crypto.generateKeyPairSync("ec", {
    namedCurve: "secp256k1"
  });

  console.log(ecdh.getPrivateKey("hex"));

  // cream olive tissue below crunch convince blame helmet mistake achieve blanket talent
  // address : 0x5601A219C88aDBdbBcf620AA07B5B91eDDf593Ec
  ecdh.setPrivateKey(
    "32740a305605a59964aeed912389dcc93e5ba657f00979480b093fee2b753356",
    "hex"
  );
  //const privateKey = ecdh.getPrivateKey();
  console.log(privateKey.toString("hex"));

  const sign = crypto.createSign("SHA256");
  console.log(JSON.stringify(request.body));
  sign.update(JSON.stringify(request.body));
  sign.end();

  const signature = sign.sign(privateKey);

  request.body.signature = signature.toString("hex");
  request.body.timestamp = Date.now();
  response.send(request.body);
});

module.exports = router;
