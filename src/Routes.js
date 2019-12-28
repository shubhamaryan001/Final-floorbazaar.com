import React from "react";
import ScrollToTop from "./Core/ScrollToTop";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Menu from "./Core/Menu";
import Home from "./Core/Home";
import Footer from "./Core/Footer";
import SingleProduct from "./Core/ProductSingle";
import MobileMenu from "./Core/MobileMenu";
import Login from "./User/Login";
import Signup from "./User/Signup";
const Routes = () => {
  return (
    <BrowserRouter>
      <MobileMenu />
      <Menu />
      <ScrollToTop>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/product/:productId" exact component={SingleProduct} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
        </Switch>
      </ScrollToTop>

      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
