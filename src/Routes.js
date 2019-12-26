import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Menu from "./Core/Menu";
import Home from "./Core/Home";
import Footer from "./Core/Footer";
const Routes = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
