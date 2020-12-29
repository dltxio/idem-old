const express = require("express");
const router = express.Router();
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

module.exports = router;
