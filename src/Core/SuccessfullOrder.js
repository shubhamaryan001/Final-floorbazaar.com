import React, { Component } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

import Zoom from "react-reveal/Zoom";
export default class SuccessfullOrder extends Component {
  render() {
    return (
      <div className="container-fluid  successful-page-height ">
        <div className="background-celb"></div>
        <div className="container">
          <div
            className="card"
            style={{
              maxWidth: "25rem",
              zIndex: "99",
              margin: "0 auto",
              backgroundColor: "white"
            }}
          >
            <div
              className="card-header"
              style={{
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "600"
              }}
              color="success"
            >
              Thank you for Purchasing Our Services
            </div>
            <Zoom duration={1500} delay={1000}>
              <FaRegCheckCircle
                style={{
                  padding: "5px",
                  width: "100%",
                  fontSize: "6rem",
                  color: "#10dc60"
                }}
              />
            </Zoom>
            <div lines="none">
              <p
                style={{
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: "600"
                }}
              >
                Please Go to My Orders Page To Track Your Order Live
              </p>
            </div>

            <div style={{ textAlign: "center", fontWeight: "500" }}>
              <Link
                to="/profile"
                className="btn btn-raised "
                style={{ background: "#11DC61", color: "white" }}
              >
                Track Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
