import React from "react";
import { Router as ReactRouter, Route, Switch } from "react-router-dom";
import Account from "../pages/AccountPage";
import Blockchain from "../pages/BlockchainPage";
import Claims from "../pages/ClaimsPage";
import Sites from "../pages/SitesPage";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const Router = () => (
  <ReactRouter history={history}>
    <Route exact path="/" component={Claims} />
    <Switch>
      <Route path="/account" component={Account} />
      <Route path="/blockchain" component={Blockchain} />
      <Route path="/sites" component={Sites} />
    </Switch>
  </ReactRouter>
);

export default Router;
