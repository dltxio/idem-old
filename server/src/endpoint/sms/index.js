const express = require("express");
const router = express.Router();
const schema = require("./schema");
const message = require("./message");
const { log } = require("../../logger")("/api/sms");

router.put("/sms", async (request, response) => {
  const { error, value } = schema.validate(request.body);
  
  const sendError = (code, error) => {
    response.status(code);
    response.send({ error });
  };
  
  if (error != null)
    return sendError(400, error);
  
  try {
    const data = await message.sendVerification(value.number);
    log(`received SMS verification request for ${value.number} -- code:`, data.code);
  } catch(smsError) {
    return sendError(500, smsError);
  }
  
  response.send({ success: true, error: null });
});

module.exports = router;