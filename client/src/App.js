import React from "react";
import Router from "./components/Router";
import "./App.css";
import { SWRConfig } from "swr";
import dltx from "./apis/dltx";

const swrConfig = {
  fetcher: url => dltx.secure.get(url).then(res => res.data),
  shouldRetryOnError: false
};

const App = () => (
  <SWRConfig value={swrConfig}>
    <Router />
  </SWRConfig>
);

export default App;
