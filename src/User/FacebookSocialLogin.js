import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  signin,
  authenticate,
  isAuthenticated,
  googleauthenticate
} from "../Auth/Index";
import { API } from "../config";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";

const FacebookSocailLogin = () => {
  const [redirectpage, setRedirectpage] = useState(false);
  const { user } = isAuthenticated();

  const responseFacebook = response => {
    console.log(response);
    axios({
      method: "POST",
      url: `${API}/facebook-login`,
      data: { userID: response.userID, accessToken: response.accessToken }
    })
      .then(response => {
        console.log("FACEBOOK SIGNIN SUCCESS", response);
        // inform parent component

        googleauthenticate(response, () => {
          setRedirectpage(true);
        });
      })
      .catch(error => {
        console.log("FACEBOOK SIGNIN ERROR", error.response);
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
      <FacebookLogin
        appId="2656279314453480"
        autoLoad={false}
        callback={responseFacebook}
        render={renderProps => (
          <button
            className="btn btn-raised btn-block"
            onClick={renderProps.onClick}
            style={{
              background: "#395697",
              color: "white",
              textTransform: "none"
            }}
          >
            <img
              src="https://res.cloudinary.com/djnv06fje/image/upload/v1577706331/facebook-3-16_bfyyma.png"
              alt="Login with Facebook"
              style={{ marginRight: "5px", marginBottom: "2px" }}
            />
            Login with Facebook
          </button>
        )}
      />
    </>
  );
};

export default FacebookSocailLogin;
