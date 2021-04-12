import express from "express";
import claims from "./claims";
import documents from "./documents";
import phone from "./phone";
import emails from "./emails";

const router = express.Router();
router.use(claims);
router.use(documents);
router.use(phone);
router.use(emails);
export default router;
