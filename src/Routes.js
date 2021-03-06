import React from "react";
import ScrollToTop from "./Core/ScrollToTop";
import PrivateRoute from "./Auth/PrivateRoute";
import AdminRoute from "./Auth/AdminRoute";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Menu from "./Core/Menu";
import Home from "./Core/Home";
import Footer from "./Core/Footer";
import Successfull from "./Core/SuccessfullOrder";
import DetailOrder from "./User/DetailOrder";
import SingleProduct from "./Core/ProductSingle";
import UsersProfile from "./User/UsersProfile";
import CartPage from "./Core/CartPage";
import MobileMenu from "./Core/MobileMenu";
import Login from "./User/Login";
import Signup from "./User/Signup";
import Chat from "./User/Support";
import UserChat from "./User/UserSupport";
import SingleChat from "./User/SingleSupport";
import UpdateUser from "./User/UpdateProfile";
import MobileLayout from "./Core/MobileLayout";
const Routes = () => {
  return (
    <BrowserRouter>
      <MobileMenu />
      <Menu />
      <ScrollToTop>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/mobile" exact component={MobileLayout} />

          <Route path="/product/:productId" exact component={SingleProduct} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/cart" exact component={CartPage} />
          <Route path="/chat" exact component={Chat} />
          <PrivateRoute path="/user-chat" exact component={UserChat} />
          <PrivateRoute path="/chat/:name/:id" exact component={SingleChat} />
          <PrivateRoute
            path="/update-profile/:userId"
            exact
            component={UpdateUser}
          />
          <PrivateRoute
            path="/successfull/order"
            exact
            component={Successfull}
          />
          <PrivateRoute path="/order/:orderId" exact component={DetailOrder} />
          <PrivateRoute path="/profile" exact component={UsersProfile} />
        </Switch>
      </ScrollToTop>

      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default Routes;
