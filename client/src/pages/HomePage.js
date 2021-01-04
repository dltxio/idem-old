import React from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import AccountForm from "../components/Forms/AccountForm";
import Card from "../components/Card";
import ClaimsTable from "../components/ClaimsTable";
import DocumentsTable from "../components/DocumentsTable";
import SitesTable from "../components/SitesTable";

import useSWR, { mutate } from "swr";

const HomePage = () => {
  
  const { data, error } = useSWR("/api/claims/");
  const isLoading = !data && !error;

  console.log("claims data");
  console.log(data);

  return (
    <Layout>
      <div className="container-fluid py-5">
        <div className="row">
          <div className="col">
            <Card>
              <Loader loading={isLoading} />
              <h2>Claims</h2>
              <p>A list of common claims to verify.</p>
              <ClaimsTable data={data}></ClaimsTable>
            </Card>
            <Card>
              <h2>Documents</h2>
              <DocumentsTable></DocumentsTable>
            </Card>
          </div>
          <div className="col">
            <Card>
              <h2>Sites</h2>
              <SitesTable></SitesTable>
            </Card>
            <Card>
              <h2>Account</h2>
              <AccountForm submitText="Save"></AccountForm>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
