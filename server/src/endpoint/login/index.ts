import express from "express";
import WebSocketService from "../../services/webSocket";
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
      console.log(req.body);
      if (req.query.id) {
        services.webSocket.verifyUser(req.query.id.toString(), {email: "user@idem.com.au", name: "Mr Idem User", DoB: "1984-12-25"});
      }
      res.send("Successfully verified account");
    }
  );

  router.post(
    "/login",
    function (req, res, next) {
      const userIdentity = {
        email: req.body.claims.find((c) => c.key === "0x03").value,
        name: req.body.claims.find((c) => c.key === "0x02").value,
        DoB: req.body.claims.find((c) => c.key === "0x01").value,
      }
      console.log(userIdentity);
      if (req.query.id) {
        services.webSocket.verifyUser(req.body.id.toString(), userIdentity);
      }
      res.send("Successfully verified account");
    }
  );

  return router;
};

export default setupLoginRouter;
