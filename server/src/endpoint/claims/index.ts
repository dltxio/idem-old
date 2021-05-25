import express from "express";
import { SetupRouterFunction } from "../../typings/setup-router";
import requestHandlerWrapper from "../request-handler-wrapper";
import getClaims from "./get-claims";
import validateClaim from "./validate-claim";

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

  return router;
};

export default setupClaimsRouter;
