import React from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import ClaimsTable from "../components/ClaimsTable";
import useSWR, { mutate } from "swr";

const ClaimsPage = () => {

  const mocks = [{ 
    type: "18+",
    name: "18+",
    verified: true
  }];

  const { data, error } = useSWR("/api/claims/");
  const isLoading = !data && !error;

  console.log(data);

  return (
    <Layout>
      <div className="container-fluid py-5">
        <Loader loading={isLoading} />
        <h1 className="mb-3">
          Claims
        </h1>

        <ClaimsTable data={mocks} />
      </div>
    </Layout>
  );
};

export default ClaimsPage;
