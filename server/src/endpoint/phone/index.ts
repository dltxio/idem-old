import express from "express";
import { SetupRouterFunction } from "../../typings/setup-router";
import requestHandlerWrapper from "../request-handler-wrapper";
import requestPhoneVerificationSMS from "./request-phone-verification-sms";
import verifyPhone from "./verify-phone";

const setupPhoneRouter: SetupRouterFunction = (
  config: Config,
  services: Services
) => {
  const router = express.Router();

  router.put(
    "/phone",
    requestHandlerWrapper(requestPhoneVerificationSMS, config, services)
  );

  router.post("/phone", requestHandlerWrapper(verifyPhone, config, services));

  return router;
};

export default setupPhoneRouter;
