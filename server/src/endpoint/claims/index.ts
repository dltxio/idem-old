import express from "express";
import { SetupRouterFunction } from "../../typings/setup-router";
import requestHandlerWrapper from "../request-handler-wrapper";
import authorizeThirdParty from "./authorize-thirdParty";
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
  router.post(
    "/claims/thirdParty",
    requestHandlerWrapper(authorizeThirdParty, config, services)
  );

  return router;
};

export default setupClaimsRouter;
