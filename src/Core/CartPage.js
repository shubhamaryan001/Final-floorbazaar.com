import React, { useState, useEffect, Profiler } from "react";
import { Link, Redirect } from "react-router-dom";
import { getCart, removeItem } from "./CartHelper";
import Checkout from "./Checkout";
import { API } from "../config";
import "../index.css";
import { isAuthenticated } from "../Auth/Index";

export const url = window.location.href.split("/cart");

const CartPage = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);
  const { user, token } = isAuthenticated();
  useEffect(
    () => {
      console.log("MAX DEPTH ...");
      setItems(getCart());
    },
    [run],
    [items]
  );

  const showItems = items => {
    return (
      <div>
        <h1></h1>
        <hr />
        {items.map((product, i) => (
          <div key={i}>
            <p>{product.name}</p>
          </div>
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <div className="container-fluid">
      <h2 className="text-center pt-5">
        Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
      </h2>
    </div>
  );
  return (
    <div className="container-fluid section-standard-height">
      <div
        className="container card"
        style={{ minWidth: "80%", minHeight: "50vh", padding: "18px" }}
      >
        <h2 className="cart-tittle text-center">
          {items.length > 0 ? (
            <>Total Services in Cart ( {items.length} )</>
          ) : (
            <>No Services Added Yet</>
          )}
        </h2>
        <hr />
        {items.length > 0 ? (
          <div className="row">
            <div className="col-xl-6 col-md-6 col-sm-6 p-1">
              {items.map((p, i) => {
                return (
                  <div key={i} className="left-cart card p-1">
                    <div className="row">
                      <div className="col-3">
                        <div className="p-img p-3">
                          <div className="text-center">
                            <img
                              src={`${API}/product/photo/${p._id}`}
                              className="rounded-circle "
                              style={{
                                maxWidth: "70px",
                                minWidth: "70px",
                                minHeight: "70px",
                                maxHeight: "70px",
                                objectFit: "cover"
                              }}
                              alt={p.name}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="p-name p-1">
                          <div className="">
                            <p className="text-muted mb-0">{p.name}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="p-remove">
                          <button
                            onClick={() => {
                              removeItem(p._id);
                              setRun(!run); // run useEffect in parent Cart
                            }}
                            className="btn  btn-danger btn-raised "
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-xl-6 col-md-6 col-sm-6 p-1">
              {isAuthenticated() ? (
                <>
                  {user.mobile === 9999999999 ? (
                    <div className="container-fluid p-0">
                      <div className="card ">
                        <div className="cart-block-card"></div>
                        <div className="route-btn">
                          <div className="card p-2 ">
                            <span className="text-left">
                              Sir/Madam please update your mobile number with
                              <b> valid mobile number .</b>
                            </span>
                            <br />
                            <span className="text-center">
                              (Try To Use Working WhatsApp Number)
                            </span>
                            <br />
                            <span className="text-left">
                              current Default Number is 9999999999.
                            </span>

                            <Link
                              to="/update-profile"
                              className="btn btn-raised btn-warning "
                            >
                              Update Mobile Number
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Checkout products={items} setRun={setRun} run={run} />
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="container-fluid p-0">
                    <div className="card ">
                      <div className="cart-block-card"></div>
                      <div className="route-btn">
                        <Link
                          to="/login"
                          className="btn btn-raised btn-warning "
                        >
                          You Need To Login First Before Checkout
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <>{noItemsMessage()}</>
        )}
      </div>
    </div>
  );
};

export default CartPage;
