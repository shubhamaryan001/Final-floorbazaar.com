import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../Auth/Index";
import { Link, Redirect } from "react-router-dom";
import { API } from "../config";
import { MdChat } from "react-icons/md";
import { TiCancel } from "react-icons/ti";

import { getSingleOrder } from "../Admin/AdminApi";
import { razorPayOptionsSecond } from "./SecondPayment";
import { updateOrderCancelled, updateSecondPayment } from "./ApiUser";
import {
  FaRegCheckCircle,
  FaClock,
  FaNetworkWired,
  FaLock,
  FaFileAlt
} from "react-icons/fa";

import { IoLogoWhatsapp } from "react-icons/io";
import { AiOutlineProfile } from "react-icons/ai";

import Modal from "react-bootstrap/Modal";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import moment from "moment";
let { user } = isAuthenticated();
const Razorpay = window.Razorpay;

const DetailOrder = props => {
  const [order, setOrder] = useState({});
  const [product, setProduct] = useState([]);

  const [error, setError] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [btnCancel, setBtnCancel] = useState(true);
  const [secondpay, setSecondPay] = useState(true);

  const { user, token } = isAuthenticated();

  const userId = isAuthenticated() && isAuthenticated().user._id;

  const tomorrow = moment(order.createdAt).add(4, "hours");
  const Today = moment();

  const loadSingleOrder = orderId => {
    let { user, token } = isAuthenticated();
    getSingleOrder(orderId, user._id, token).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        console.log(data);

        setOrder(data);
        setProduct(data.products);
      }
    });
  };

  const handleOrderCancelled = orderId => {
    let { user, token } = isAuthenticated();

    updateOrderCancelled(user._id, token, order._id, btnCancel).then(data => {
      if (data.error) {
        console.log("Status update failed");
      } else {
        console.log("order has been Cancelled");
        loadSingleOrder(order._id, user._id, token);
      }
    });
  };

  const handleSecondPayment = orderId => {
    let { user, token } = isAuthenticated();
    updateSecondPayment(user._id, token, order._id, secondpay).then(data => {
      if (data.error) {
        console.log("second payment has been Unsuccessfull");
      } else {
        console.log("second payment has been successfull");
        loadSingleOrder(order._id, user._id, token);
      }
    });
  };

  useEffect(() => {
    const orderId = props.match.params.orderId;

    loadSingleOrder(orderId, user._id, token);
  }, [props]);

  const ShowCancelButton = () => {
    if (Today <= tomorrow) {
      return (
        <ButtonToolbar>
          <Button
            className="btn btn-sm btn-raised btn-danger "
            onClick={() => setSmShow(true)}
            style={{
              textTransform: "none",
              borderRadius: "30px"
            }}
          >
            Cancel Project
          </Button>

          <Modal
            size="md"
            show={smShow}
            centered
            onHide={() => setSmShow(false)}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                Are sure want to Cancel the project.
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Your request has been forwarded to our support team and you will
              get response from us within 5hrs. After cancellation request
              approval you will get refund in 3-5 working days. Till that time
              if you have any query you can chat on our chat support.
            </Modal.Body>
            <div className="container-fluid text-right">
              <button
                onClick={handleOrderCancelled}
                className="btn btn-sm btn-raised btn-primary"
              >
                Yes
              </button>
            </div>
          </Modal>
        </ButtonToolbar>
      );
    } else {
      return (
        <ButtonToolbar>
          <Button
            disabled
            className="btn btn-sm btn-raised btn-danger "
            onClick={() => setSmShow(true)}
            style={{
              textTransform: "none",
              borderRadius: "30px"
            }}
          >
            Cancel Project
          </Button>
          <Modal
            size="md"
            show={smShow}
            centered
            onHide={() => setSmShow(false)}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                Are sure want to Cancel the project.
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Your request has been forwarded to our support team and you will
              get response from us within 5hrs. After cancellation request
              approval you will get refund in 3-5 working days. Till that time
              if you have any query you can chat on our chat support.
            </Modal.Body>
            <div className="container-fluid text-right">
              <button disabled className="btn btn-sm btn-raised btn-primary">
                Confirm,Yes
              </button>
            </div>
          </Modal>
        </ButtonToolbar>
      );
    }
  };

  const firstsection = () => {
    return (
      <>
        <div className="col-xl-4 col-md-4 col-sm-12 mb-4">
          <div className="card" style={{ background: "#FFF" }}>
            <h5
              className="card-header text-left p-2"
              style={{ background: "#f46c45", color: "#fff" }}
            >
              <FaNetworkWired className="header-logo" />
              Live Order Status
              <span
                className="text-muted"
                style={{ fontSize: "10px", paddingLeft: "5px" }}
              >
                (Updated {moment(order.updatedAt).fromNow()})
              </span>
            </h5>
            <div className="track-block">
              {order.status === "Cancelled" ? (
                <>
                  <div className="card p-3">
                    <p>
                      Your request is accepted and your{" "}
                      <b>order has been Cancelled</b>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  {order.cancelled ? (
                    <>
                      <div className="card m-2">
                        <h6
                          className="card-header p-1"
                          style={{ background: "#f46c45", color: "#fff" }}
                        >
                          Your Project Is Under Cancellation Request
                        </h6>
                        <div className="p-2 text-left">
                          <p className="mb-0">
                            Your request has been forwarded to our support team
                            and you will get response from us within 5hrs. After
                            cancellation request approval you will get refund in
                            3-5 working days. Till that time if you have any
                            query you can chat on our chat support.
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
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
                                We assigned a engineer
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
                                  Our engineer will call you for the plot or
                                  land dimension and other details.
                                  <br /> Contact number of engineer
                                  (WhatsApp/Call/SMS)
                                  <br />
                                  {order.assignedNumber === 9999999999 ? (
                                    <>
                                      <b> "No Number Assigned"</b>.
                                    </>
                                  ) : (
                                    <span className="">
                                      <b>
                                        <a
                                          href={`tel: +91${order.assignedNumber}`}
                                        >
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
                                  First phase of the project is started. We will
                                  next Update after Floor Plan Ready.
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
                                  to start second phase of project. In which all
                                  other plans and documents will be provided
                                  with complete project file. After paying
                                  second payment automatically the file will
                                  unlock to download.
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
                                  Yet to start second phase of project. Wait for
                                  the update from Engineer.
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
                                  Complete project file is finished and the file
                                  link is updated to latest version of your
                                  plans and documents.You can go and download
                                  latest files.
                                </p>
                              </span>
                            </div>
                          </div>
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
                                Project Is Not Yet Finished
                              </p>
                            </div>
                            <div
                              className="p-1 text-muted"
                              style={{ fontSize: "12px" }}
                            >
                              <span>
                                <p className="mb-0">
                                  Yet to upload latest files and plan according
                                  to your choices.
                                </p>
                              </span>
                            </div>
                          </div>
                        </>
                      )}

                      <div className="container-fluid ">
                        {ShowCancelButton()}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  const secondsection = () => {
    return (
      <div className="col-xl-4 col-md-4 col-sm-12 mb-4">
        <div className="project-file">
          <div className="card" style={{ background: "#ebe6e6" }}>
            <h5
              className="card-header p-2 text-left"
              style={{
                background: "#f46c45",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "500"
              }}
            >
              <FaFileAlt className="header-logo" /> Project Files And Documents
            </h5>
            <div className="project-block p-3">
              {order.status === "Cancelled" ? (
                <>
                  <div className="card p-2">
                    <p className="text-center">
                      <span style={{ fontSize: "20px" }}>
                        <>😲😲</>
                      </span>{" "}
                      Sorry <b>order has been Cancelled</b>{" "}
                      <span style={{ fontSize: "20px" }}>
                        <>😲😲</>
                      </span>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {order.ready ? (
                    <>
                      {order.secondpayment ? (
                        <>
                          <div className="row">
                            <div className="col-6">
                              <h6 className="text-right pt-2">Project File</h6>
                            </div>
                            <div className="col-6">
                              <div>
                                <a
                                  href={order.fileLink}
                                  target="_blank"
                                  className="btn btn-raised "
                                  style={{
                                    background: "#11dc61",
                                    color: "#fff"
                                  }}
                                >
                                  Download File
                                </a>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="card">
                            <div className=" block-card"></div>
                            <div className="pay-button text-center">
                              <p
                                className="mb-1"
                                style={{
                                  fontWeight: "500",
                                  fontSize: "16px"
                                }}
                              >
                                Project is ready now please clear the balance
                                amount ₹{order.secondpaymentamount}
                              </p>

                              <button
                                className="btn btn-sm  btn-raised "
                                onClick={openRzrPay}
                                id="rzp-button1"
                                style={{
                                  background: "#f46c45",
                                  borderRadius: "30px",
                                  color: "#fff"
                                }}
                              >
                                <FaLock
                                  style={{
                                    color: "#fff",
                                    fontSize: "22px",
                                    margin: "0 3px -4px 0"
                                  }}
                                />
                                Pay Now To Unlock
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="card">
                        <div className=" block-card"></div>
                        <div className="pay-button text-center">
                          <p
                            className="mb-0"
                            style={{ fontWeight: "500", fontSize: "16px" }}
                          >
                            Project is not yet ready. So please wait for
                            confirmation from engineer.
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const thirdsection = () => {
    return (
      <div className="col-xl-4 col-md-4 col-sm-12">
        <div className="order-details">
          <div className="card" style={{ background: "#FFF" }}>
            <div
              className="card-header p-1"
              style={{
                background: "#f46c45",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "500"
              }}
            >
              <div className="row">
                <div className="col-6">
                  <div className="left-side pt-1">
                    <AiOutlineProfile
                      style={{
                        color: "#fff",
                        fontSize: "20px",
                        marginRight: "3px",
                        marginBottom: "-4px"
                      }}
                    />
                    Order Details
                  </div>
                </div>
                <div className="col-6">
                  <div className="chat-support text-right">
                    <Link
                      className="btn btn-sm btn-light btn-raised text-right mb-0"
                      style={{ color: "#000", borderRadius: "30px" }}
                      to="/chat"
                    >
                      <MdChat
                        style={{
                          marginBottom: "-4px",
                          fontSize: "15px",
                          marginRight: "2px"
                        }}
                      />
                      Chat Support
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="details-block p-3">
              <div className="row">
                <div className="col-6">
                  <p>Order Id:</p>
                </div>
                <div className="col-6">
                  <p className="text-muted">{order._id}</p>
                </div>
              </div>
              {order.status === "Cancelled" ? (
                ""
              ) : (
                <>
                  {" "}
                  <div className="row">
                    <div className="col-6">
                      <p>Assigned Engineer:</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted">
                        {order.assignedName === "" || null ? (
                          <>Not Yet Assigned</>
                        ) : (
                          <>{order.assignedName}</>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 ">
                      <p>Engineer Contact Number:</p>
                    </div>
                    <div className="col-6 ">
                      <p className="text-muted">
                        {order.assignedNumber === 9999999999 || "" || null ? (
                          <>No Number</>
                        ) : (
                          <>
                            <a
                              className="text-muted"
                              href={`tel:+91${order.assignedNumber}`}
                            >
                              +91-{order.assignedNumber}
                            </a>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </>
              )}

              <div className="row">
                <div className="col-6">
                  <p>Current Order Status:</p>
                </div>
                <div className="col-6">
                  <p className="badge " style={{ background: "#ffce00" }}>
                    {order.status}
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <p>Order on:</p>
                </div>
                <div className="col-6">
                  <p className="text-muted">
                    {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <p>Order note by you:</p>
                </div>
                <div className="col-6">
                  <p className="text-muted">{order.note}</p>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-12">
                  {product.map((p, i) => (
                    <div key={i} className="card pl-3 pr-3">
                      <div className="row">
                        <div className="col-4">
                          <div className="product-img-order text-left p-1">
                            <img
                              className="rounded-circle"
                              src={`${API}/product/photo/${p._id}`}
                              alt={p.name}
                              style={{
                                maxHeight: "75px",
                                minHeight: "75px",
                                minWidth: "75px",
                                maxWidth: "75px"
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-8">
                          <div className="product-name-order text-left pt-4 ">
                            <Link
                              to={`/product/${p._id}`}
                              style={{
                                textDecoration: "none",
                                color: "black",
                                fontWeight: "500"
                              }}
                            >
                              <p>{p.name}</p>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-12">
                  <div className="text-center">
                    <h6>For Any Other Query About Order Call / WhatsApp</h6>
                    <a
                      href="tel:+918800757170"
                      className="btn p-1 btn-raised "
                      style={{
                        textTransform: "none ",
                        fontSize: "16px",
                        background: "#FFF"
                      }}
                    >
                      <IoLogoWhatsapp
                        style={{
                          color: "#00E676",
                          marginBottom: "-4px",
                          fontSize: "20px"
                        }}
                      />{" "}
                      8800757170
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SecondAmount = order.secondpaymentamount;

  const rzp1 = new Razorpay(
    razorPayOptionsSecond(
      SecondAmount,
      user && user.name && user.email
        ? { ...user, token }
        : { name: "", email: "" },
      handleSecondPayment
    )
  );
  const openRzrPay = event => {
    rzp1.open();
    event.preventDefault();
  };

  return (
    <div className="container-fluid  section-standard-height">
      <div className="container p-2" style={{ minWidth: "80%" }}>
        <div className="row">
          {firstsection()}
          {secondsection()}
          {thirdsection()}
        </div>
      </div>
    </div>
  );
};

export default DetailOrder;
