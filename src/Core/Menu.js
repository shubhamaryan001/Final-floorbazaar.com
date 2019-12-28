import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../Auth/Index";

import "../index.css";
const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#f4714d" };
  } else {
    return { color: "rgba(0,0,0,.5)" };
  }
};

const { user } = isAuthenticated();

const Menu = ({ history }) => (
  <Navbar fixed="top" className="navbar desktop-menu" expand="lg">
    <div className="container p-0 ">
      <Link className="navbar-brand" to="/">
        <img
          src="https://res.cloudinary.com/djnv06fje/image/upload/v1574864028/1_bsry6v.png"
          width="160"
          height="auto"
          alt=""
        />
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link
            className="nav-link"
            style={isActive(history, "/shop")}
            to="/shop"
          >
            Shop
          </Link>
          <Link
            className="nav-link"
            style={isActive(history, "/about-us")}
            to="/about-us"
          >
            About Us
          </Link>

          <Link
            className="nav-link"
            style={isActive(history, "/support")}
            to="/support"
          >
            Support
          </Link>
        </Nav>

        <Nav className="float-right button-group">
          {!isAuthenticated() && (
            <>
              <Link
                className=" nav-link button-first btn-raised btn"
                to="/login"
              >
                Login
              </Link>
              <Link
                className=" nav-link btn btn-raised button-second"
                to="/signup"
              >
                Signup
              </Link>
            </>
          )}

          {isAuthenticated() && (
            <>
              <NavDropdown
                title={isAuthenticated().user.name}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">Orders</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Profile</NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() =>
                    signout(() => {
                      history.push("/");
                    })
                  }
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </div>
  </Navbar>
);

export default withRouter(Menu);
