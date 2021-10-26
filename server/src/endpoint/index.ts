import express from "express";
import claims from "./claims";
import documents from "./documents";
import phone from "./phone";
import emails from "./emails";
import login from "./login";

import { SetupRouterFunction } from "../typings/setup-router";

export default (config: Config, services: Services): express.Router => {
  const router = express.Router();

  const subRouters: SetupRouterFunction[] = [claims, documents, phone, emails, login];

  subRouters.forEach(sr => router.use(sr(config, services)));

  return router;
};
