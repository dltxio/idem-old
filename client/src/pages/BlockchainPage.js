import React from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import useSWR, { mutate } from "swr";

const BlockchainPage = () => {

  const { data, error } = useSWR("/api/blockchain/");
  const isLoading = !data && !error;

  console.log(data);

  return (
    <Layout>
      <div className="container-fluid py-5">
        <Loader loading={isLoading} />
        <h1 className="mb-3">
          Blockchain
        </h1>

        
      </div>
    </Layout>
  );
};

export default BlockchainPage;