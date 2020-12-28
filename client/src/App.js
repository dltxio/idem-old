import React from "react";
import Router from "./components/Router";
import "./App.css";
import { SWRConfig } from "swr";
import controller from "./apis/claims";

const swrConfig = {
  fetcher: url => controller.secure.get(url).then(res => res.data),
  shouldRetryOnError: false
};

const App = () => (
  <SWRConfig value={swrConfig}>
    <Router />
  </SWRConfig>
);

export default App;