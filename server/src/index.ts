import * as dotenv from "dotenv";
import express from "express";
import endpoints from "./endpoint";
import cors from "cors";
const { log } = require("./logger")("server");

dotenv.config();

const app = express();

// Configure CORS.
app.use(cors());

// Request parsing.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", endpoints);

app.listen(process.env.PORT);
log(`listening on localhost:${process.env.PORT}`);
