import React from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import SitesTable from "../components/SitesTable";
import useSWR, { mutate } from "swr";

const SitesPage = () => {

  const { data, error } = useSWR("/api/sites/");
  const isLoading = !data && !error;

  console.log(data);

  return (
    <Layout>
      <div className="container-fluid py-5">
        <Loader loading={isLoading} />
        <h1 className="mb-3">
          Sites
        </h1>

        <SitesTable data={data} />
      </div>
    </Layout>
  );
};

export default SitesPage;
