import React from "react";
import Table from "./Table";

// dataField (key) props (value)
const columnConfig = {
  type: {
    children: "Url",
    width: "40%"
  },
  name: {
    children: "Name"
  }
};

const SitesTable = ({ data, ...props }) => (
  <Table data={data} columnConfig={columnConfig} keyField="id" {...props} />
);

export default SitesTable;
