import express from "express";
import requestHandlerWrapper from "../request-handler-wrapper";
import sendEmailVerificationEmail from "./send-email-verification-email";

const router = express.Router();

router.put("/emails", requestHandlerWrapper(sendEmailVerificationEmail));

export default router;
