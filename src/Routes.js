import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Menu from "./Core/Menu";
import Home from "./Core/Home";
import Footer from "./Core/Footer";

import Login from "./User/Login";
import Signup from "./User/Signup";
const Routes = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
