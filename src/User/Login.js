import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../Auth/Index";
import Spinner from "react-bootstrap/Spinner";
import GoogleForm from "./GoogleSocialLogin";
import FacebookForm from "./FacebookSocialLogin";

import "../index.css";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    success: false,
    redirectToReferrer: false
  });
  const { email, password, loading, redirectToReferrer, error } = values;
  const { user } = isAuthenticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then(data => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false
        });
      } else {
        console.log(data);
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true
          });
        });
      }
    });
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/profile" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/profile" />;
    }
  };

  const signUpForm = () => (
    <form className="auth-form">
      <div className="form-group">
        <label className="">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control "
          placeholder="Enter the registered email"
          value={email}
        />
      </div>
      <div className="form-group ">
        <label className="">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control "
          placeholder="Your Password"
          value={password}
        />
      </div>
      <div class="forgot-link form-group mb-0 ">
        <Link
          to="/forgot-password"
          className="text-danger"
          style={{ color: "#f4714d", textDecoration: "none" }}
        >
          Forgot Password?
        </Link>
      </div>
    </form>
  );

  return (
    <div className="container-fluid pl-0 pr-0 section-standard-height">
      <div className="container pl-3 pr-3  ">
        <div className="row ">
          <div className="col-xl-2 col-md-2 col-sm-12 "></div>
          <div className="col-xl-8 col-md-8 col-sm-12 p-1 ">
            <div className="card background-card">
              <h4
                className="text-white"
                style={{ letterSpacing: "2px", fontWeight: "500" }}
              >
                Login Here
              </h4>
              <div className="card main-card">
                {showError()}
                {signUpForm()}
                {redirectUser()}
                <div className="text-center text-muted">
                  <p class="font-weight-normal">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      style={{ color: "#f4714d", textDecoration: "none" }}
                    >
                      <strong>Signup Now</strong>
                    </Link>
                  </p>
                </div>

                <div className="pt-2 text-right">
                  <button
                    onClick={clickSubmit}
                    className="btn  btn-raised"
                    style={{ background: "#f46c45", color: "white" }}
                  >
                    Submit
                  </button>
                </div>
                <h5 className="text-center">OR</h5>
                <div className="social-login">
                  {/* <button className="btn  btn-info btn-raised btn-block ">
                    Google
                  </button> */}

                  <GoogleForm />

                  <FacebookForm />
                </div>
                {loading ? (
                  <div className="text-center spinner-bg ">
                    <div className="spinner-position">
                      <Spinner animation="border" variant="info" />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-md-2 col-sm-12 "></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
