import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../Auth/Index";

import { FaHome } from "react-icons/fa";
import { AiFillShop } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#f4714d" };
  } else {
    return { color: "rgba(0,0,0,.5)" };
  }
};
const { user } = isAuthenticated();

const MobileMenu = ({ history }) => {
  return (
    <>
      <Navbar className="mobile-menu" sticky="top" bg="light">
        <Nav className="block-center">
          <Link className="navbar-brand" to="/">
            <img
              src="https://res.cloudinary.com/djnv06fje/image/upload/v1574864028/1_bsry6v.png"
              width="180"
              height="90"
              alt=""
            />
          </Link>
        </Nav>
      </Navbar>
      <Navbar className="mobile-menu" fixed="bottom" bg="light">
        <Nav className="block-center">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            <FaHome className="menu-icon" />
            <p>Home</p>
          </Link>
        </Nav>
        <Nav className="block-center">
          <Link
            className="nav-link"
            style={isActive(history, "/shop")}
            to="/shop"
          >
            <AiFillShop className="menu-icon" />
            <br />
            <p>Shop</p>
          </Link>
        </Nav>
        <Nav className="block-center">
          <Link
            className="nav-link"
            style={isActive(history, "/profile")}
            to="/profile"
          >
            <MdAccountCircle className="menu-icon" />
            <p>Account</p>
          </Link>
        </Nav>
      </Navbar>
    </>
  );
};

export default withRouter(MobileMenu);
