import express from "express";
import { SetupRouterFunction } from "../../typings/setup-router";
import requestHandlerWrapper from "../request-handler-wrapper";
import sendEmailVerificationEmail from "./send-email-verification-email";

const setupEmailRouter: SetupRouterFunction = (
  config: Config,
  services: Services
) => {
  const router = express.Router();

  router.put(
    "/emails",
    requestHandlerWrapper(sendEmailVerificationEmail, config, services)
  );

  return router;
};

export default setupEmailRouter;
