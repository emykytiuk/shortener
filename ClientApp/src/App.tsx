import * as React from "react";
import { Route } from "react-router";
import Layout from "./components/Layout";
import { CreateShortUrlPage } from "./components/CreateShortUrlPage";
import { RedirectToPage } from "./components/RedirectToPage";

import "./custom.css";
import { Switch } from "react-router-dom";

export default () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={CreateShortUrlPage} />
      <Route exact path="/:slug?" component={RedirectToPage} />
    </Switch>
  </Layout>
);
