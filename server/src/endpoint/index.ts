import express from "express";

import claims from "./claims";
import diagnostics from "./diagnostics";
import documents from "./documents";
import emails from "./emails";
import phone from "./phone";

import { SetupRouterFunction } from "../typings/setup-router";

export default (config: Config, services: Services): express.Router => {
  const router = express.Router();

  const subRouters: SetupRouterFunction[] = [claims, documents, phone, emails, diagnostics];

  subRouters.forEach(sr => router.use(sr(config, services)));

  return router;
};
