import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import { FaRegCreditCard, FaWallet } from "react-icons/fa";
import { AiOutlineHistory } from "react-icons/ai";
import { GoFileSubmodule } from "react-icons/go";
export default class BlurbMain extends Component {
  render() {
    return (
      <div className="container-fluid p-4" style={{ background: "#fff" }}>
        <div className="container" style={{ minWidth: "80%" }}>
          <div className="row">
            <div className="col-md-3">
              <div
                className="card text-center"
                style={{
                  boxShadow: "none"
                }}
              >
                <AiOutlineHistory
                  style={{
                    fontSize: "5rem",
                    color: "#fba211",

                    margin: "0 auto"
                  }}
                />
                <h5 class="card-title font-weight-bold">24x7 SUPPORT</h5>
                <p class="card-text text-muted ">
                  Our support team assist you 24x7. For any query go to our
                  support or orders page.
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className="card text-center"
                style={{
                  boxShadow: "none"
                }}
              >
                <FaRegCreditCard
                  style={{
                    fontSize: "5rem",
                    color: "#fba211",

                    margin: "0 auto"
                  }}
                />
                <h5 class="card-title font-weight-bold">
                  SAFE AND SECURE PAYMENT
                </h5>
                <p class="card-text">
                  Our website is completely secure in term of any payment
                  method. 100% approved by Razorpay.
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className="card text-center"
                style={{
                  boxShadow: "none"
                }}
              >
                <FaWallet
                  style={{
                    fontSize: "5rem",
                    color: "#fba211",

                    margin: "0 auto"
                  }}
                />
                <h5 class="card-title font-weight-bold">100% SATISFACTION</h5>
                <p class="card-text">
                  Our highest priority is to satisfy the customer through early
                  and continuous delivery of valuable projects.
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className="card text-center"
                style={{
                  boxShadow: "none"
                }}
              >
                <GoFileSubmodule
                  style={{
                    fontSize: "5rem",
                    color: "#fba211",

                    margin: "0 auto"
                  }}
                />
                <h5 class="card-title font-weight-bold">FAST DELIVERY</h5>
                <p class="card-text">
                  Completion of project within 48 hours. Project manager is
                  assign to each customer to manage projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
