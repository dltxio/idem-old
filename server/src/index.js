require("dotenv").config();
const express = require("express");
const claims = require("./endpoint/claims");
const documents = require("./endpoint/documents");
const sms = require("./endpoint/sms");
const cors = require("cors");

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

app.listen(process.env.PORT);
console.log(`Server listening on localhost:${process.env.PORT}`);
