import React from "react";
import Table from "./Table";

// dataField (key) props (value)
const columnConfig = {
  ipaddress: {
    children: "IP Address",
    width: "40%"
  },
  make: {
    children: "Make"
  },
  model: {
    children: "Model"
  },
  status: {
    children: "Status",
    width: "15%"
  },
  hash: {
    children: "Hash"
  },
  temperature: {
    children: "Temperature"
  }
};

const ClaimsTable = ({ data, ...props }) => (
  <Table
    data={data}
    columnConfig={columnConfig}
    keyField="id"
    {...props}
  />
);

export default ClaimsTable;