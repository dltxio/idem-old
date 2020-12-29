import React from "react";
import { Router as ReactRouter, Route, Switch } from "react-router-dom";
import Account from "../pages/AccountPage";
import Claims from "../pages/ClaimsPage";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const Router = () => (
  <ReactRouter history={history}>
    <Route exact path="/" component={Claims} />
    <Route exact path="/account" component={Account} />
    {/* <Switch>
      <Route path="/logs" component={LogsPage} />
    </Switch> */}
  </ReactRouter>
);

export default Router;