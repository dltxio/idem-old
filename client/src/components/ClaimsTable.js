import React from "react";
import Table from "./Table";

// dataField (key) props (value)
const columnConfig = {
  type: {
    children: "Type",
    width: "40%"
  },
  name: {
    children: "Name"
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