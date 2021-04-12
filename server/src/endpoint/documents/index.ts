import express from "express";
import requestHandlerWrapper from "../request-handler-wrapper";
import getDocuments from "./get-documents";

const router = express.Router();

router.get("/documents", requestHandlerWrapper(getDocuments));

export default router;
