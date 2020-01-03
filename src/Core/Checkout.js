import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../Auth/Index";
import { Link, Redirect } from "react-router-dom";
import { getCoupon, getUserBalance, deductUserWallet } from "../Admin/AdminApi";
import { FaAmazonPay, FaInfoCircle, FaInfo } from "react-icons/fa";
import { createOrder } from "./ApiCore";
import { emptyCart } from "./CartHelper";
import { FiChevronsRight } from "react-icons/fi";
import { FaCreditCard, FaRegHandPointRight, FaTags } from "react-icons/fa";
import ReactTooltip from "react-tooltip";

import { razorPayOptionsDirt } from "./RazorpayDirectPay";

import "../index.css";
let { user } = isAuthenticated();

const Razorpay = window.Razorpay;
const productTax = 50;

const Checkout = ({ products }) => {
  const [disabledbtn, setDisabledbtn] = useState(false);

  const [values, setValues] = useState({
    code: "",
    discount: 0,
    invalidCode: false,
    applied: false,
    redirectToReferrer: false
  });

  const [data, setData] = useState({
    note: ""
  });
  let {
    user: { _id, name, email, role, wallet_balance },
    token
  } = isAuthenticated();

  const [balc, setBalc] = useState({
    currentWalletBalance: wallet_balance
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;

  const { currentWalletBalance } = balc;

  const { code, discount, applied, invalidCode, redirectToReferrer } = values;

  const getBalance = async event => {
    const currentBalance = await getUserBalance({ userId: _id });
    setBalc({
      ...balc,
      ["currentWalletBalance"]: currentBalance.user.wallet_balance
    });
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const applyCode = () => {
    getCoupon({ code }).then(data => {
      if (data.success && data.coupon.isActive) {
        setValues({
          ...values,
          ["discount"]: data.coupon.discount,
          ["applied"]: true,
          ["invalidCode"]: false
        });
      } else {
        setValues({ ...values, ["invalidCode"]: true, ["applied"]: false });
      }
    });
  };

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const walletDeduct = async event => {
    event.preventDefault();
    // total amount to be paid for order
    let amount = applied ? getTotal() - discount : getTotal() + productTax;
    // deducting balance from user wallet
    const deductUserBalance = await deductUserWallet({
      token,
      userId: user._id,
      wallet: { amount: amount }
    });
    // if dedcuted get the current balance
    if (deductUserBalance.success) {
      const currentBalance = await getUserBalance({ userId: user._id });
      if (currentBalance.success) {
        user.wallet_balance = currentBalance.user.wallet_balance;
      }

      if (deductUserBalance.success) {
        const createOrderData = {
          products: products,
          name: "floorplanbazaar",
          transaction_id: "Undifine",
          amount: amount,
          payment_mode: "Wallet Payment",
          note: anyNote
        };

        await createOrder(userId, token, createOrderData)
          .then(response => {
            emptyCart(() => {
              setValues({
                redirectToReferrer: true
              });
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to="/order/successfull" />;
    }
  };

  const redirectSuccess = () => {
    return <Redirect to="/order/successfull" />;
  };

  useEffect(() => {
    getBalance();
  }, []);

  const handleNote = event => {
    setData({ ...data, note: event.target.value });
  };
  let amount = applied
    ? getTotal() + productTax - discount
    : getTotal() + productTax;

  let FirstAmount = (25 / 100) * amount;
  let SecondAmount = (75 / 100) * amount;

  const handleCheck = event => {
    if (event.target.checked) {
      setDisabledbtn(true);
    } else {
      setDisabledbtn(false);
    }
  };

  const walletCheckoutButton = () => {
    if (disabledbtn) {
      return (
        <div>
          <button
            onClick={walletDeduct}
            className="btn btn-sm btn-raised btn-success"
            style={{
              background: "#FBA211",
              color: "white",
              textAlign: "center"
            }}
          >
            Pay using Wallet Money
          </button>
          <br />
          <span className="text-left">
            <p>
              Wallet balance
              <span className="ml-1">
                <b>
                  {currentWalletBalance ? `₹ ${currentWalletBalance}` : "₹ 0"}
                </b>
              </span>
            </p>
          </span>
        </div>
      );
    } else if (disabledbtn === false) {
      return (
        <div>
          <button
            onClick={walletDeduct}
            className="btn btn-sm btn-raised btn-success"
            disabled
            style={{
              background: "#FBA211",
              color: "white",
              textAlign: "center"
            }}
          >
            Pay using Wallet Money
          </button>
          <br />
          <span className="text-left">
            <p>
              Wallet balance
              <span className="ml-1">
                <b>
                  {currentWalletBalance ? `₹ ${currentWalletBalance}` : "₹ 0"}
                </b>
              </span>
            </p>
          </span>
        </div>
      );
    }
  };

  const FinalCheckout = () => {
    if (disabledbtn) {
      return (
        <div className="checkout-block">
          <div className="row">
            <div className="col-6">
              {currentWalletBalance >
              (applied
                ? getTotal() + productTax - discount
                : getTotal() + productTax)
                ? walletCheckoutButton()
                : ""}
            </div>
            <div className="col-6">
              <div className="text-right">
                <button
                  onClick={openRzrPay}
                  className="btn btn-sm btn-raised "
                  id="rzp-button1"
                  style={{ background: "#FBA211", color: "#fff" }}
                >
                  Pay Now (₹ {FirstAmount})
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (disabledbtn === false) {
      return (
        <div className="checkout-block">
          <div className="row">
            <div className="col-6">
              {currentWalletBalance >
              (applied
                ? getTotal() + productTax - discount
                : getTotal() + productTax)
                ? walletCheckoutButton()
                : ""}
            </div>
            <div className="col-6">
              <div className="text-right">
                <button
                  disabled
                  onClick={openRzrPay}
                  className="btn btn-sm btn-raised "
                  id="rzp-button1"
                  style={{ background: "#FBA211", color: "#fff" }}
                >
                  Pay Now (₹ {FirstAmount})
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  let anyNote = data.note;
  // Razorpay
  const rzp1 = new Razorpay(
    razorPayOptionsDirt(
      FirstAmount,
      user && user.name && user.email
        ? { ...user, token }
        : { name: "", email: "", mobile: "" },
      products,
      anyNote,
      SecondAmount
    )
  );
  const openRzrPay = event => {
    rzp1.open();
    event.preventDefault();
  };
  return (
    <div className="container-fluid p-0">
      <div className="checkout-card card p-1">
        <h3
          className="card-header p-1 "
          style={{ background: "#FBA211", color: "white", textAlign: "center" }}
        >
          Price Details <FaTags style={{ marginBottom: "-3px" }} />
        </h3>
        <div className="sub-card text-left p-1">
          <div className="row">
            <div className="col-12">
              <div className="card p-2">
                <table class="table table-bordered mb-0">
                  <ReactTooltip />

                  <thead>
                    <tr>
                      <td colspan="4">
                        {applied ? (
                          <>
                            <h5 className="text-left">
                              Complete Project Price{" "}
                              <strike>₹{amount + discount}</strike>
                              <span
                                style={{ marginLeft: "4px", color: "#10dc60" }}
                              >
                                ₹{amount}
                              </span>
                            </h5>
                          </>
                        ) : (
                          <>
                            <h5 className="text-center">
                              Complete Project Price ₹{amount}
                            </h5>
                          </>
                        )}
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colspan="2">
                        <h6 className="">
                          <FaRegHandPointRight className="icon-right-thumb" />
                          First Payment 25% only
                          <FaInfoCircle
                            style={{
                              marginLeft: "5px",
                              marginBottom: "-1px",
                              color: "rgba(0,0,0,0.6)"
                            }}
                            data-tip="Need to pay now"
                          />
                        </h6>
                      </td>
                      <td>
                        <h6 style={{ color: "" }}>₹ {FirstAmount}</h6>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <h5 className="second-pay text-muted">
                          Second Payment Remaining 75%{" "}
                          <FaInfoCircle
                            style={{
                              marginLeft: "5px",
                              marginBottom: "-1px",
                              color: "rgba(0,0,0,0.6)"
                            }}
                            data-tip="Need to pay after floor plan ready"
                          />
                        </h5>
                      </td>
                      <td>
                        <h6 className="second-pay text-muted">
                          ₹ {SecondAmount}
                        </h6>
                      </td>
                    </tr>
                    {applied ? (
                      <tr>
                        <td colspan="2">
                          <h6 className="second-pay text-muted">
                            Discounted Amount
                          </h6>
                        </td>
                        <td>
                          <h6 className="second-pay text-muted">
                            ₹ {discount}
                          </h6>
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}
                  </tbody>
                </table>

                <div className="note-block">
                  <textarea
                    rows="3"
                    onChange={handleNote}
                    className="form-control-checkout"
                    value={data.note}
                    placeholder="Type any Note ......"
                  />
                </div>

                <div className="coupon-block">
                  <div className="text-center">
                    <b>
                      {invalidCode
                        ? "Invalid Coupon!"
                        : applied
                        ? `code applied successfully`
                        : ""}
                    </b>
                  </div>

                  <form class="form">
                    <input
                      placeholder="Apply Coupon"
                      type="text"
                      className="form-input"
                      onChange={handleChange("code")}
                      value={code}
                      autoFocus
                      required
                    />
                    <button
                      type="button"
                      onClick={applyCode}
                      class="btn btn-raised "
                    >
                      Apply
                    </button>
                  </form>
                </div>
                <div className="term-block">
                  <label>
                    <input type="checkbox" onChange={handleCheck} />I have read
                    and agree to the
                    <Link
                      style={{ color: "#f46c45" }}
                      className="ml-1"
                      to="/termsandcondition"
                    >
                      FloorPlanBazaar terms and conditions *
                    </Link>
                  </label>
                </div>
                <div className="checkout-button">{FinalCheckout()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
