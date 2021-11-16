import express from "express";
import { SetupRouterFunction } from "../../typings/setup-router";
import requestHandlerWrapper from "../request-handler-wrapper";
import getStatus from "./get-status";
const setupDiagnosticsRouter: SetupRouterFunction = (
  config: Config,
  services: Services
) => {
  const router = express.Router();

  router.get("/hello", requestHandlerWrapper(getStatus, config, services));

  return router;
};

export default setupDiagnosticsRouter;
