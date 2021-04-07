import express from "express";
import schema from "./schema";
import emailService from "../../services/email";
import generateVerificationCode from "../../utils/generate-verification-code";
import sendError from "../../utils/send-error";
const { log } = require("../../logger")("/api/email");

const router = express.Router();

const sendEmailVerificationEmail = async (request: any, response: any) => {
  const { error, value: body } = schema.sendEmailVerificationEmailBody.validate(
    request.body
  );

  if (error != null) return sendError(response, 400, error);

  const verificationCode = generateVerificationCode(body.email);

  try {
    await emailService.sendEmailVerificationEmail({
      to: body.email,
      data: {
        verificationCode
      }
    });

    response.send({
      success: true
    });
  } catch (e) {
    log(e);
    return sendError(response, 500, e);
  }
};

router.put("/emails", sendEmailVerificationEmail);

export default router;
