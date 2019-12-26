import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import { FaRegCreditCard, FaWallet } from "react-icons/fa";
import { AiOutlineHistory } from "react-icons/ai";
import { GoFileSubmodule } from "react-icons/go";
import "../index.css";
export default class BlurbMain extends Component {
  render() {
    return (
      <div
        className="container-fluid blurb-section p-4"
        style={{ background: "#fff" }}
      >
        <div className="container" style={{ minWidth: "80%" }}>
          <div className="row">
            <div className="col-xl-3 col-md-3 col-sm-12">
              <Fade center duration={500} delay={500}>
                <div
                  className="card blurb-card"
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
                  <h5 class="card-title">24x7 SUPPORT</h5>
                  <p class="card-text text-muted ">
                    Our support team assist you 24x7. For any query go to our
                    support or orders page.
                  </p>
                </div>
              </Fade>
            </div>
            <div className="col-xl-3 col-md-3 col-sm-12">
              <Fade center duration={500} delay={1000}>
                <div
                  className="card blurb-card "
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
                  <h5 class="card-title ">SAFE AND SECURE PAYMENT</h5>
                  <p class="card-text text-muted">
                    Our website is completely secure in term of any payment
                    method. 100% approved by Razorpay.
                  </p>
                </div>
              </Fade>
            </div>
            <div className="col-xl-3 col-md-3 col-sm-12">
              <Fade center duration={500} delay={1500}>
                <div
                  className="card blurb-card"
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
                  <h5 class="card-title ">100% SATISFACTION</h5>
                  <p class="card-text text-muted">
                    Our highest priority is to satisfy the customer through
                    early and continuous delivery of valuable projects.
                  </p>
                </div>
              </Fade>
            </div>
            <div className="col-xl-3 col-md-3 col-sm-12">
              <Fade center duration={500} delay={2000}>
                <div
                  className="card blurb-card"
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
                  <h5 class="card-title ">FAST DELIVERY</h5>
                  <p class="card-text text-muted">
                    Completion of project within 48 hours. Project manager is
                    assign to each customer to manage projects.
                  </p>
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
