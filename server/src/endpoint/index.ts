import express from "express";
import claims from "./claims";
import documents from "./documents";
import sms from "./sms";
import emails from "./emails";

const router = express.Router();
router.use(claims);
router.use(documents);
router.use(sms);
router.use(emails);
export default router;
