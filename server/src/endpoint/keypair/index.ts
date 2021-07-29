import express from "express";
import { SetupRouterFunction } from "../../typings/setup-router";
import requestHandlerWrapper from "../request-handler-wrapper";
import getKeypair from "./get-keypair";

const setupKeypairRouter: SetupRouterFunction = (
  config: Config,
  services: Services
) => {
  const router = express.Router();

  router.get("/keypair", requestHandlerWrapper(getKeypair, config, services));

  return router;
};

export default setupKeypairRouter;
