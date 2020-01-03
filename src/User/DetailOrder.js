import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../Auth/Index";
import { Link, Redirect } from "react-router-dom";
import { getSingleOrder } from "../Admin/AdminApi";
import { FaRegCheckCircle, FaClock } from "react-icons/fa";

import moment from "moment";
let { user } = isAuthenticated();

const DetailOrder = props => {
  const [order, setOrder] = useState({});
  const [error, setError] = useState(false);

  const { user, token } = isAuthenticated();

  const userId = isAuthenticated() && isAuthenticated().user._id;

  const loadSingleOrder = orderId => {
    let { user, token } = isAuthenticated();
    getSingleOrder(orderId, user._id, token).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        console.log(data);
        setOrder(data);
      }
    });
  };

  useEffect(() => {
    const orderId = props.match.params.orderId;
    loadSingleOrder(orderId, user._id, token);
  }, [props]);

  return (
    <div className="container-fluid  section-standard-height">
      <div className="container p-2" style={{ minWidth: "80%" }}>
        <div className="row">
          <div className="col-xl-4 col-md-4 col-sm-12">
            <div className="card">
              <div className="track-block">
                {order.placed_order ? (
                  <>
                    <div className="card m-2">
                      <div
                        className="card-header p-1"
                        style={{ background: "#11dc61", color: "#fff" }}
                      >
                        <p className="badge badge-pill mb-0" style={{}}>
                          <FaRegCheckCircle
                            style={{
                              marginRight: "2px",
                              color: "#fff",
                              fontSize: "16px",
                              fontWeight: "700",
                              marginBottom: "-4px"
                            }}
                          />
                          Project Has Been Confirmed
                        </p>
                      </div>
                      <div
                        className="p-1 text-muted"
                        style={{ fontSize: "12px" }}
                      >
                        <span>
                          We Just Recieved First Payment
                          <span> ₹{order.firstpaymentamount}</span>
                        </span>
                      </div>
                    </div>
                    <div className="green-line"></div>
                  </>
                ) : (
                  <>
                    <div className="card m-2">
                      <div
                        className="card-header p-1"
                        style={{ background: "#ffce00", color: "#fff" }}
                      >
                        <p className="badge  mb-0" style={{}}>
                          <FaClock
                            style={{
                              marginRight: "4px",
                              color: "#fff",
                              fontSize: "16px",
                              fontWeight: "700",
                              marginBottom: "-5px"
                            }}
                          />
                          Project Not Yet Confirmed
                        </p>
                      </div>
                      <div
                        className="p-1 text-muted"
                        style={{ fontSize: "12px" }}
                      >
                        <span>
                          We Just Didn't Recieved First Payment
                          <span> ₹{order.firstpaymentamount}</span>
                        </span>
                      </div>
                    </div>
                    <div className="red-line"></div>
                  </>
                )}
                {/* ----------------------------------------------------------------------------------------------- */}
                {order.processing ? (
                  <>
                    <div className="card m-2">
                      <div
                        className="card-header p-1"
                        style={{ background: "#11dc61", color: "#fff" }}
                      >
                        <p className="badge badge-pill mb-0" style={{}}>
                          <FaRegCheckCircle
                            style={{
                              marginRight: "2px",
                              color: "#fff",
                              fontSize: "16px",
                              fontWeight: "700",
                              marginBottom: "-4px"
                            }}
                          />
                          Your Project is now Processing
                        </p>
                      </div>
                      <div
                        className="p-1 text-muted"
                        style={{ fontSize: "12px" }}
                      >
                        <span>
                          Your assigned engineer
                          <span className="pl-1">
                            {order.assignedName === "Not Yet Assigned" ? (
                              <>
                                <b>"not yet Assigned"</b>.
                              </>
                            ) : (
                              <>
                                <b>{order.assignedName}</b>.
                              </>
                            )}
                          </span>
                          <br />
                          <p className="mb-0">
                            Contact number of engineer (WhatsApp/Call/SMS)
                            <br />
                            {order.assignedNumber === 9999999999 ? (
                              <>
                                <b> "No Number Assigned"</b>.
                              </>
                            ) : (
                              <span className="">
                                <b>
                                  <a href={`tel: +91${order.assignedNumber}`}>
                                    +91{order.assignedNumber}
                                  </a>
                                </b>
                                .
                              </span>
                            )}
                          </p>
                        </span>
                      </div>
                    </div>
                    <div className="green-line"></div>
                  </>
                ) : (
                  <>
                    <div className="card m-2">
                      <div
                        className="card-header p-1"
                        style={{ background: "#ffce00", color: "#fff" }}
                      >
                        <p className="badge  mb-0" style={{}}>
                          <FaClock
                            style={{
                              marginRight: "4px",
                              color: "#fff",
                              fontSize: "16px",
                              fontWeight: "700",
                              marginBottom: "-5px"
                            }}
                          />
                          Project Not Yet Processed
                        </p>
                      </div>
                      <div
                        className="p-1 text-muted"
                        style={{ fontSize: "12px" }}
                      >
                        <span>
                          {order.assignedName === null ||
                          order.assignedName === undefined ||
                          order.assignedName === "" ? (
                            <>
                              <b> Engineer not yet Assigned </b>
                            </>
                          ) : (
                            ""
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="red-line"></div>
                  </>
                )}

                {/* ----------------------------------------------------------------------------------------------- */}
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-4 col-sm-12"></div>
          <div className="col-xl-4 col-md-4 col-sm-12"></div>
        </div>
      </div>
    </div>
  );
};

export default DetailOrder;
