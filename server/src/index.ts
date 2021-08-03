import express from "express";
import setupEndpoints from "./endpoint";
import cors from "cors";
import getConfig from "./config";
import initServices from "./services";
import dbConnect from "./db";

const { log } = require("./logger")("server");

const config = getConfig();
const services = initServices(config);

const app = express();

// Configure CORS.
app.use(cors());

// Request parsing.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", setupEndpoints(config, services));

app.listen(config.port);
log(`listening on localhost:${config.port}`);

dbConnect(config);
