import express from "express";
import requestHandlerWrapper from "../request-handler-wrapper";
import getClaims from "./get-claims";
import validateClaim from "./validate-claim";

const router = express.Router();

router.get("/claims", requestHandlerWrapper(getClaims));
router.post("/claims", requestHandlerWrapper(validateClaim));

export default router;
