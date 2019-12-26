import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Core/Home";
import Menu from "./Core/Menu";
const Routes = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
