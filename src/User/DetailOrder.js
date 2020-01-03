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
              <h5
                className="card-header text-left p-2"
                style={{ background: "#ececec" }}
              >
                Live Order Status
                <span
                  className="text-muted"
                  style={{ fontSize: "10px", paddingLeft: "5px" }}
                >
                  (Updated {moment(order.updatedAt).fromNow()})
                </span>
              </h5>
              <div className="track-block">
                {order.placed_order ? (
                  <>
                    <div className="card m-2">
                      <div
                        className="card-header p-1"
                        style={{ background: "#11dc61", color: "#fff" }}
                      >
                        <p className="order-p mb-0">
                          <FaRegCheckCircle className="logo-order" />
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
                        <p className="order-p mb-0">
                          <FaClock className="logo-order" />
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
                        <p className="order-p mb-0">
                          <FaRegCheckCircle className="logo-order" />
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
                        <p className="order-p  mb-0">
                          <FaClock className="logo-order" />
                          Project Not Yet Processed
                        </p>
                      </div>

                      <span>
                        <>
                          <div
                            className="p-1 text-muted"
                            style={{ fontSize: "12px" }}
                          >
                            <span>Engineer not yet Assigned</span>
                          </div>
                        </>
                      </span>
                    </div>

                    <div className="red-line"></div>
                  </>
                )}

                {/* ----------------------------------------------------------------------------------------------- */}

                {order.underconstruction ? (
                  <>
                    <div className="card m-2">
                      <div
                        className="card-header p-1"
                        style={{ background: "#11dc61", color: "#fff" }}
                      >
                        <p className="order-p mb-0">
                          <FaRegCheckCircle className="logo-order" />
                          Engineer Start Working On Your Project
                        </p>
                      </div>
                      <div
                        className="p-1 text-muted"
                        style={{ fontSize: "12px" }}
                      >
                        <span>
                          <p className="mb-0">
                            First phase of the project is started. We will next
                            Update after Floor Plan Ready.
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
                        <p className=" order-p mb-0">
                          <FaClock className="logo-order" />
                          Engineer Not Yet Started Working On Your Project
                        </p>
                      </div>
                      <div
                        className="p-1 text-muted"
                        style={{ fontSize: "12px" }}
                      >
                        <span>
                          <p className="mb-0">
                            Yet to start first phase of the project.
                          </p>
                        </span>
                      </div>
                    </div>
                    <div className="red-line"></div>
                  </>
                )}

                {/* ----------------------------------------------------------------------------------------------- */}

                {order.ready ? (
                  <>
                    <div className="card m-2">
                      <div
                        className="card-header p-1"
                        style={{ background: "#11dc61", color: "#fff" }}
                      >
                        <p className="order-p mb-0">
                          <FaRegCheckCircle className="logo-order" />
                          Floor Plan is Ready Now
                        </p>
                      </div>
                      <div
                        className="p-1 text-muted"
                        style={{ fontSize: "12px" }}
                      >
                        <span>
                          <p className="mb-0">
                            Please clear the
                            <b>
                              {" "}
                              remaining balance (₹
                              {order.secondpaymentamount}){" "}
                            </b>
                            to start second phase of project. In which all other
                            plans and documents will be provided with complete
                            project file. After paying second payment
                            automatically the file will unlock to download.
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
                        <p className=" order-p mb-0">
                          <FaClock className="logo-order" />
                          Floor Plan Is Not Ready Yet
                        </p>
                      </div>
                      <div
                        className="p-1 text-muted"
                        style={{ fontSize: "12px" }}
                      >
                        <span>
                          <p className="mb-0">
                            Yet to start second phase of project. Wait for the
                            update from Engineer.
                          </p>
                        </span>
                      </div>
                    </div>
                    <div className="red-line"></div>
                  </>
                )}

                {/* ----------------------------------------------------------------------------------------------- */}

                {order.finished ? (
                  <>
                    <div className="card m-2">
                      <div
                        className="card-header p-1"
                        style={{ background: "#11dc61", color: "#fff" }}
                      >
                        <p className="order-p mb-0">
                          <FaRegCheckCircle className="logo-order" />
                          Complete Project Is Finished
                        </p>
                      </div>
                      <div
                        className="p-1 text-muted"
                        style={{ fontSize: "12px" }}
                      >
                        <span>
                          <p className="mb-0">
                            Complete project file is finished and the file link
                            is updated to latest version of your plans and
                            documents.You can go and download latest files.
                          </p>
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {" "}
                    <div className="card m-2">
                      <div
                        className="card-header p-1"
                        style={{ background: "#ffce00", color: "#fff" }}
                      >
                        <p className=" order-p mb-0">
                          <FaClock className="logo-order" />
                          Project Is Not Yet Finished
                        </p>
                      </div>
                      <div
                        className="p-1 text-muted"
                        style={{ fontSize: "12px" }}
                      >
                        <span>
                          <p className="mb-0">
                            Yet to upload latest files and plan according to
                            your choices.
                          </p>
                        </span>
                      </div>
                    </div>
                  </>
                )}
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
