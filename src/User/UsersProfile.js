import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../Auth/Index";
import { Link } from "react-router-dom";
import moment from "moment";
import { API } from "../config";
import { getOrdersHistory } from "./ApiUser";
import { FaEdit, FaShoppingCart } from "react-icons/fa";

import "../index.css";
const UsersProfile = () => {
  const [order, setOrder] = useState([]);
  let {
    user: { _id, name, email, mobile, role, wallet_balance },
    token
  } = isAuthenticated();

  const initOrder = (userId, token) => {
    getOrdersHistory(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrder(data);
      }
    });
  };

  const sort = order.sort(function(a, b) {
    if (a.createdAt < b.createdAt) return 1;

    if (a.createdAt > b.createdAt) return -1;
  });

  const [values, setValues] = useState({
    amount: 0,
    currentWalletBalance: wallet_balance
  });

  const { amount, currentWalletBalance } = values;

  useEffect(() => {
    initOrder(_id, token);
  }, []);

  const DefaultImg =
    "https://res.cloudinary.com/djnv06fje/image/upload/v1577008134/dummy-user-img-1_p1kcf2.png";

  const photoUrl = _id ? `${API}/user/photo/${_id}` : DefaultImg;

  return (
    <div className="container-fluid  section-standard-height">
      <div className="container p-2" style={{ minWidth: "80%" }}>
        <div className="row">
          <div className="col-xl-4 col-md-4 col-sm-12 mb-2">
            <div className="card ">
              <div className="card-header p-2">
                <div className="row">
                  <div className="col-6">
                    <div className="pt-3">
                      {order.length > 0 ? (
                        <h5 className="mb-0"> Your Orders ({order.length})</h5>
                      ) : (
                        <h4 className="mb-0"> No Orders</h4>
                      )}
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="pt-2 text-right">
                      <Link
                        className="btn "
                        to="/cart"
                        style={{
                          background: "#10DC60",
                          color: "#fff",
                          borderRadius: "50px"
                        }}
                      >
                        <b>Cart</b>
                        <FaShoppingCart
                          style={{
                            fontSize: "16px",
                            color: "#fff",
                            margin: "0 0 -2px 2px"
                          }}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-content p-1">
                {order.length >= 1 ? (
                  <>
                    {order.map((o, i) => {
                      return (
                        <div className="card mb-2">
                          <div
                            className="card-header p-1"
                            style={{ background: "#10DC60" }}
                          >
                            <div className="row">
                              <div className="col-8 text-left text-white">
                                <p className=" mb-0 font-weight-bold">
                                  Order Id: {o._id}
                                </p>
                              </div>
                              <div className="col-4 text-right">
                                <p className="badge badge-info ">{o.status}</p>
                              </div>
                            </div>
                          </div>
                          <div className="card-content p-1">
                            <div className="row">
                              <div className="col-4">
                                {o.products.map((p, i) => {
                                  return (
                                    <div className="text-center">
                                      <img
                                        className="rounded-circle"
                                        src={`${API}/product/photo/${p._id}`}
                                        alt={p.name}
                                        style={{
                                          maxHeight: "60px",
                                          minHeight: "60px",
                                          minWidth: "60px",
                                          maxWidth: "60px"
                                        }}
                                      />
                                    </div>
                                  );
                                })}
                                <div className="pt-2 text-center">
                                  <p>{moment(o.createdAt).fromNow()}</p>
                                </div>
                              </div>
                              <div className="col-8">
                                {o.products.map((p, i) => {
                                  return (
                                    <>
                                      <div className="pt-2">
                                        <p
                                          className="text-muted text-right mb-0"
                                          style={{ fontWeight: "500" }}
                                        >
                                          {p.name}
                                        </p>
                                      </div>
                                      <div className="text-right pt-4 pr-1">
                                        <Link
                                          className="btn btn-sm btn-raised btn-info"
                                          to={`/order/${o._id}`}
                                          style={{
                                            borderRadius: "5px",
                                            background: "#F46C45",
                                            textTransform: "none",
                                            padding: "4px 5px 4px 5px"
                                          }}
                                        >
                                          Track Order
                                        </Link>
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <h5 className="text-center">No Orders Yet</h5>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-4 col-sm-12 ">
            <div className="card">
              <h5 className="card-header text-center"> {name}'s Information</h5>

              <div className="card-content">
                <div className="p-3 text-center " style={{ margin: "0 auto" }}>
                  <img
                    className="rounded-circle profile-pic"
                    src={photoUrl}
                    onError={i => (i.target.src = `${DefaultImg}`)}
                    alt={name}
                  />
                </div>

                <div className="details-block">
                  <div className="row pt-3">
                    <div className="col-6">
                      <div className="pl-1 ">
                        <p
                          style={{
                            borderLeft: "3px solid #f1c40f",
                            paddingLeft: "2px",
                            marginBottom: "0"
                          }}
                        >
                          <b>Name:</b>
                        </p>
                      </div>
                    </div>
                    <div className="col-6">
                      <p className="text-muted">{name}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <div className="pl-1">
                        <p
                          style={{
                            borderLeft: "3px solid #f1c40f",
                            paddingLeft: "2px"
                          }}
                        >
                          <b>Email:</b>
                        </p>
                      </div>
                    </div>
                    <div className="col-6">
                      <p className="text-muted">{email}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <div className="pl-1">
                        <p
                          style={{
                            borderLeft: "3px solid #f1c40f",
                            paddingLeft: "2px"
                          }}
                        >
                          <b>Register Mobile Number:</b>
                        </p>
                      </div>
                    </div>
                    <div className="col-6">
                      <p className="text-muted">{mobile}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <div className="pl-1">
                        <p
                          style={{
                            borderLeft: "3px solid #f1c40f",
                            paddingLeft: "2px"
                          }}
                        >
                          <b>Account Type:</b>
                        </p>
                      </div>
                    </div>
                    <div className="col-6">
                      {role === 1 ? (
                        <p className="text-muted">Admin</p>
                      ) : (
                        <p className="text-muted">Customer Account</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="pl-1">
                        <p
                          style={{
                            borderLeft: "3px solid #f1c40f",
                            paddingLeft: "2px"
                          }}
                        >
                          <b>Wallet Balance:</b>
                        </p>
                      </div>
                    </div>
                    <div className="col-6">
                      {currentWalletBalance ? (
                        <p className="text-muted">₹{currentWalletBalance}</p>
                      ) : (
                        <p className="text-muted">₹. 0</p>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6"></div>
                    <div className="col-6 ">
                      <div className="text-right p-3 font-weight-bold">
                        <Link
                          className="btn   btn-sm"
                          to={`/profile/${_id}`}
                          style={{
                            background: "#f1c40f",
                            color: "#fff",
                            borderRadius: "5px"
                          }}
                        >
                          <b>
                            Update Profile
                            <FaEdit
                              style={{
                                margin: "0 0 -1.5px 3px",
                                fontSize: "15px"
                              }}
                            />
                          </b>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-4 col-sm-12 "></div>
        </div>
      </div>
    </div>
  );
};

export default UsersProfile;
