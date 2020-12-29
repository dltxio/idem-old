import React from "react";
import Table from "./Table";

// dataField (key) props (value)
const columnConfig = {
  type: {
    children: "Url"
  },
  name: {
    children: "Name"
  },
  date: {
    children: "Date Requested",
    width: "15%"
  }
};

const SitesTable = ({ data, ...props }) => (
  <Table data={data} columnConfig={columnConfig} keyField="id" {...props} />
);

export default SitesTable;
