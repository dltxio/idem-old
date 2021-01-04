const express = require("express");
const router = express.Router();
// const schema = require("./schema");

router.get("/documents", async (request, response) => {
  const document = {
    name: "DL Scan.pdf",
    hash: "34ba703fb51601686640e7fca185dba7a04a1a50cc59a72e47a088e51e4a6786",
    created: new Date(2021, 1, 1)
  };

  const documents = [];
  documents.push(document);

  response.send(documents);
});

module.exports = router;