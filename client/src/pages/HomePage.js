import React from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import AccountForm from "../components/Forms/AccountForm";
import Card from "../components/Card";
import ClaimsTable from "../components/ClaimsTable";

import useSWR, { mutate } from "swr";

const HomePage = () => {
  
  const { claimsData, error } = useSWR("/api/claims/");
  const isLoading = !claimsData && !error;

  console.log(claimsData);

  return (
    <Layout>
      <div className="container-fluid py-5">
        <div className="row">
          <div className="col">
            <Card>
              <Loader loading={isLoading} />
              <h2>Claims</h2>
              <ClaimsTable data={claimsData}></ClaimsTable>
            </Card>
            <Card>
              <h2>Account</h2>
              <AccountForm submitText="Save"></AccountForm>
            </Card>
            <Card></Card>
          </div>
          <div className="col">
            <Card>
              <p>Logins</p>
            </Card>
            <Card>
              <p>Data</p>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
