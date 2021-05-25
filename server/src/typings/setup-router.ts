import express from "express";

export type SetupRouterFunction = (
  config: Config,
  services: Services
) => express.Router;
