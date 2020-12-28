import React from "react";
import { Router as ReactRouter, Route, Switch } from "react-router-dom";
import Miners from "../pages/MinersPage";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const Router = () => (
  <ReactRouter history={history}>
    <Route exact path="/" component={Miners} />
    {/* <Switch>
      <Route path="/logs" component={LogsPage} />
    </Switch> */}
  </ReactRouter>
);

export default Router;