import React from "react";
import ScrollToTop from "./Core/ScrollToTop";
import PrivateRoute from "./Auth/PrivateRoute";
import AdminRoute from "./Auth/AdminRoute";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Menu from "./Core/Menu";
import Home from "./Core/Home";
import Footer from "./Core/Footer";
import SingleProduct from "./Core/ProductSingle";
import UsersProfile from "./User/UsersProfile";
import CartPage from "./Core/CartPage";
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
          <PrivateRoute path="/cart" exact component={CartPage} />

          <PrivateRoute path="/profile" exact component={UsersProfile} />
        </Switch>
      </ScrollToTop>

      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
