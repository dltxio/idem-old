const express = require("express");
const { log } = require("../../logger")("/api/emails");

const router = express.Router();

const sendEmailVerificationEmail = async (_request: any, response: any) => {
  response.send({
    success: true,
    error: null
  });
};

router.put("/emails", sendEmailVerificationEmail);

export default router;
