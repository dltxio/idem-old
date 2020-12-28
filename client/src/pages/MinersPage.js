import React from "react";
import Layout from "../components/Layout";
import useResource from "../hooks/useResource";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import MinerTable from "../components/ClaimsTable";
import useSWR, { mutate } from "swr";

const MinersPage = () => {

  const { data, error } = useSWR("/api/miners/");
  const isLoading = !data && !error;

  console.log(data);

  return (
    <Layout>
      <div className="container-fluid py-5">
        <Loader loading={isLoading} />
        <h1 className="mb-3">
          Miners
        </h1>

        <MinerTable data={data} />
      </div>
    </Layout>
  );
};

export default MinersPage;
