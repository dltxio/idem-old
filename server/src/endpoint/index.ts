import express from "express";
import claims from "./claims";
import documents from "./documents";
import phone from "./phone";
import emails from "./emails";
import keypair from "./keypair";

import { SetupRouterFunction } from "../typings/setup-router";

export default (config: Config, services: Services): express.Router => {
  const router = express.Router();

  const subRouters: SetupRouterFunction[] = [
    claims,
    documents,
    phone,
    emails,
    keypair
  ];

  subRouters.forEach(sr => router.use(sr(config, services)));

  return router;
};
