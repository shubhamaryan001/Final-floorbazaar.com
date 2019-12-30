import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  signin,
  authenticate,
  isAuthenticated,
  googleauthenticate
} from "../Auth/Index";
import { API } from "../config";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";

const GoogleSocailLogin = () => {
  const [redirectpage, setRedirectpage] = useState(false);
  const { user } = isAuthenticated();

  const responseGoogle = response => {
    console.log(response.tokenId);
    axios({
      method: "POST",
      url: `${API}/google-login`,
      data: { idToken: response.tokenId }
    })
      .then(response => {
        console.log("GOOGLE SIGNIN SUCCESS", response);
        // inform parent component

        googleauthenticate(response, () => {
          setRedirectpage(true);
        });
      })
      .catch(error => {
        console.log("GOOGLE SIGNIN ERROR", error.response);
      });
  };

  const redirectUser = () => {
    if (redirectpage) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/profile" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <>
      {redirectUser()}
      <GoogleLogin
        clientId="753926794807-ntsg0u5uak1t1ds9b7r65lg7atead7rm.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        render={renderProps => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="google-btn btn btn-raised btn-block "
            style={{ background: "white", textTransform: "none" }}
          >
            <img
              src=" https://res.cloudinary.com/djnv06fje/image/upload/v1577704666/search_1_qjkogr.png"
              alt="Login with Google"
              style={{ marginRight: "5px", marginBottom: "2px" }}
            />
            Login with Google
          </button>
        )}
      />
    </>
  );
};

export default GoogleSocailLogin;
