import express from "express";
import { SetupRouterFunction } from "../../typings/setup-router";
import requestHandlerWrapper from "../request-handler-wrapper";

const setupLoginRouter: SetupRouterFunction = (
  config: Config,
  services: Services
) => {
  const router = express.Router();

  router.get(
    "/login",
    function (req, res, next) {
      if (req.query.id) {
        services.webSocket.verifyAllUsers(req.query.id.toString());
      }
      res.send("Successfully verified account");
    }
  );

  return router;
};

export default setupLoginRouter;
