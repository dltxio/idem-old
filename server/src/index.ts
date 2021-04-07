import * as dotenv from "dotenv";
import express from "express";
import claims from "./endpoint/claims";
import documents from "./endpoint/documents";
import sms from "./endpoint/sms";
import emails from "./endpoint/emails";
const cors = require("cors");
const { log } = require("./logger")("server");

dotenv.config();

const app = express();

// Configure CORS.
app.use(cors());

// Request parsing.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Register endpoints.
app.use("/api", claims);
app.use("/api", documents);
app.use("/api", sms);
app.use("/api", emails);

app.listen(process.env.PORT);
log(`listening on localhost:${process.env.PORT}`);
