import express from "express";
import { SetupRouterFunction } from "../../typings/setup-router";
import requestHandlerWrapper from "../request-handler-wrapper";
import getDocuments from "./get-documents";

const setupDocumentsRouter: SetupRouterFunction = (
  config: Config,
  services: Services
) => {
  const router = express.Router();

  router.get(
    "/documents",
    requestHandlerWrapper(getDocuments, config, services)
  );

  return router;
};

export default setupDocumentsRouter;
