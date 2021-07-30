import express from "express";
import { SetupRouterFunction } from "../../typings/setup-router";
import requestHandlerWrapper from "../request-handler-wrapper";
import getClaims from "./get-claims";
import validateClaim from "./validate-claim";
import verifyClaim from "./verify-claim";

const setupClaimsRouter: SetupRouterFunction = (
  config: Config,
  services: Services
) => {
  const router = express.Router();

  router.get("/claims", requestHandlerWrapper(getClaims, config, services));
  router.post(
    "/claims",
    requestHandlerWrapper(validateClaim, config, services)
  );
  router.post(
    "/claims/verify",
    requestHandlerWrapper(verifyClaim, config, services)
  );

  return router;
};

export default setupClaimsRouter;
