import express from "express";
import { SetupRouterFunction } from "../../typings/setup-router";
import requestHandlerWrapper from "../request-handler-wrapper";
import getKeypair from "./get-keypair";
import createPGPKey from "./create-pgp";
const setupKeypairRouter: SetupRouterFunction = (
  config: Config,
  services: Services
) => {
  const router = express.Router();

  router.get("/keypair", requestHandlerWrapper(getKeypair, config, services));
  router.get("/pgp", requestHandlerWrapper(createPGPKey, config, services));
  return router;
};

export default setupKeypairRouter;
