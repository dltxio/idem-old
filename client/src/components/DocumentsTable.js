import React from "react";
import Table from "./Table";

// dataField (key) props (value)
const columnConfig = {
  name: {
    children: "File Name"
  },
  hash: {
    children: "Hash"
  },
  date: {
    children: "Date Submitted",
    width: "15%"
  }
};

const DocumentsTable = ({ data, ...props }) => (
  <Table data={data} columnConfig={columnConfig} keyField="id" {...props} />
);

export default DocumentsTable;
