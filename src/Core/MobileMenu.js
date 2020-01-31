import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../Auth/Index";
import Dropdown from "react-bootstrap/Dropdown";
import { FaHome } from "react-icons/fa";
import { AiFillShop } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { API } from "../config";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#f4714d" };
  } else {
    return { color: "rgba(0,0,0,.5)" };
  }
};

const MobileMenu = ({ history }) => {
  const { user } = isAuthenticated();

  const DefaultImg =
    "https://res.cloudinary.com/djnv06fje/image/upload/v1577008134/dummy-user-img-1_p1kcf2.png";

  const photourl = () => {
    if (isAuthenticated()) {
      return (
        <div className="text-center " style={{ background: "#FFF " }}>
          <Link to="/profile">
            <img
              className="rounded-circle"
              src={`${API}/user/photo/${user._id}`}
              alt={user.name}
              style={{
                maxHeight: "50px",
                minHeight: "50px",
                minWidth: "50px",
                maxWidth: "50px",
                objectFit: "cover",
                border: " 2px solid #fba211"
              }}
              onError={i => (i.target.src = `${DefaultImg}`)}
            />
          </Link>
        </div>
      );
    } else if (!isAuthenticated()) {
      return (
        <div className="text-center">
          <Link
            to="/login"
            className="btn btn-raised"
            style={{
              background: "#fba211",
              color: "#FFF",
              borderRadius: "5px",
              padding: ""
            }}
          >
            Login
          </Link>
        </div>
      );
    }
  };

  return (
    <>
      <div
        className="container-fluid  fixed-top"
        style={{
          background: "#FFF",
          padding: "0 10px 0 12px",
          boxShadow: "0px 2px 5px -1px rgba(0,0,0,0.65)"
        }}
      >
        <div className="container" style={{ padding: "0 5px 0 5px" }}>
          <div className="row">
            <div className="col-2 p-0 align-self-center ">
              <div className="block text-center">
                <Dropdown>
                  <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    <GiHamburgerMenu style={{ fontSize: "28px" }} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">About Us</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Support</Dropdown.Item>
                    <div class="dropdown-divider"></div>

                    <Dropdown.Item
                      onClick={() =>
                        signout(() => {
                          history.push("/");
                        })
                      }
                    >
                      Log-out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="col-8 p-0">
              <div
                className="card"
                style={{ boxShadow: "none", borderRadius: "0" }}
              >
                <Link to="/">
                  <img
                    // className="img-fluid"
                    width="80%"
                    height="90"
                    src="https://res.cloudinary.com/djnv06fje/image/upload/v1574864028/1_bsry6v.png"
                    class="d-inline-block align-top"
                    alt=""
                  />
                </Link>
              </div>
            </div>

            <div className="col-2  p-0 align-self-center ">{photourl()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(MobileMenu);
