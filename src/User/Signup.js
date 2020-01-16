import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../Auth/Index";
import Spinner from "react-bootstrap/Spinner";
import GoogleForm from "./GoogleSocialLogin";
import FacebookForm from "./FacebookSocialLogin";
import "../index.css";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    error: "",
    success: false
  });
  const { name, email, mobile, password, success, loading, error } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signup({ name, email, mobile, password }).then(data => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
          loading: false
        });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          mobile: "",
          password: "",
          error: "",
          success: true
        });
      }
    });
  };

  const signUpForm = () => (
    <form className="auth-form ">
      <div className="form-group">
        <label className="">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          placeholder="Enter your full name here"
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="">Email</label>
        <input
          onChange={handleChange("email")}
          placeholder="Enter your personal email"
          type="email"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="">Mobile Number</label>
        <input
          onChange={handleChange("mobile")}
          type="tel"
          placeholder="Enter your valid mobile or WhatsApp No."
          className="form-control"
          value={mobile}
        />
      </div>

      <div className="form-group">
        <label className="">Password</label>
        <input
          onChange={handleChange("password")}
          placeholder="Your 8-character mixed-case password"
          type="password"
          className="form-control"
          value={password}
        />
      </div>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      New account is created. Please <Link to="/login">Signin</Link>
    </div>
  );

  return (
    <div className="container-fluid pl-0 pr-0 section-standard-height ">
      <div className="container pl-3 pr-3  ">
        <div className="row ">
          <div className="col-xl-2 col-md-2 col-sm-12 "></div>
          <div className="col-xl-8 col-md-8 col-sm-12 p-1 ">
            <div className="card background-card">
              <h4
                className="text-white"
                style={{ letterSpacing: "2px", fontWeight: "500" }}
              >
                Signup Here
              </h4>
              <div className="card main-card">
                {showSuccess()}
                {showError()}
                {signUpForm()}
                <div className="text-center text-muted">
                  <p class="font-weight-normal">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      style={{ color: "#f4714d", textDecoration: "none" }}
                    >
                      <strong>Login Now</strong>
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

export default Signup;
