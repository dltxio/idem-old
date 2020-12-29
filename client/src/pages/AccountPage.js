import React from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import ClaimsTable from "../components/ClaimsTable";
import useSWR, { mutate } from "swr";

const AccountPage = () => {

  const { data, error } = useSWR("/api/account/");
  const isLoading = !data && !error;

  console.log(data);

  return (
    <Layout>
      <div className="container-fluid py-5">
        <Loader loading={isLoading} />
        <h1 className="mb-3">
          Account
        </h1>
      </div>
    </Layout>
  );
};

export default AccountPage;