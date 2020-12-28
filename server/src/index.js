require("dotenv").config();
const express = require("express");
const controller = require("./endpoint/claims").default;
const cors = require("cors");

const app = express();

// Configure CORS.
app.use(cors());

// Request parsing.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Register endpoints.
app.use("/api", controller);

app.listen(process.env.PORT);
console.log(`Server listening on localhost:${process.env.PORT}`);
