import express from "express";
import requestHandlerWrapper from "../request-handler-wrapper";
import requestPhoneVerificationSMS from "./request-phone-verification-sms";
import verifyPhone from "./verify-phone";

const router = express.Router();

router.put("/phone", requestHandlerWrapper(requestPhoneVerificationSMS));
router.post("/phone", requestHandlerWrapper(verifyPhone));

export default router;
