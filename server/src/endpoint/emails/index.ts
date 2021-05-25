import express from "express";
import { SetupRouterFunction } from "../../typings/setup-router";
import requestHandlerWrapper from "../request-handler-wrapper";
import sendEmailVerificationEmail from "./send-email-verification-email";
import verifyEmail from "./verify-email";

const setupEmailRouter: SetupRouterFunction = (
  config: Config,
  services: Services
) => {
  const router = express.Router();

  router.put(
    "/emails",
    requestHandlerWrapper(sendEmailVerificationEmail, config, services)
  );

  router.post("/emails", requestHandlerWrapper(verifyEmail, config, services));

  return router;
};

export default setupEmailRouter;
