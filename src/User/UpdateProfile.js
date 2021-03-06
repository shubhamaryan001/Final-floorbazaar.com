import React, { Component } from "react";
import { isAuthenticated } from "../Auth/Index";
import { Link, Redirect } from "react-router-dom";
import { read, update, updateUser } from "./ApiUser";
import { API } from "../config";

export default class UpdateProfile extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      email: "",
      password: "",
      mobile: "",
      redirectToProfile: false,
      error: "",
      fileSize: 0,
      loading: false,
      about: ""
    };
  }

  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      } else {
        this.setState({
          id: data._id,
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          error: "",
          about: data.about
        });
        console.log(data);
      }
    });
  };

  componentDidMount() {
    this.userData = new FormData();
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  isValid = () => {
    const { name, email, mobile, password, fileSize } = this.state;
    if (fileSize > 1000000) {
      this.setState({
        error: "File size should be less than 100kb",
        loading: false
      });
      return false;
    }
    if (name.length === 0) {
      this.setState({ error: "Name is required", loading: false });
      return false;
    }
    // email@domain.com
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({
        error: "A valid Email is required",
        loading: false
      });
      return false;
    }
    if (password.length >= 1 && password.length <= 5) {
      this.setState({
        error: "Password must be at least 6 characters long",
        loading: false
      });
      return false;
    }
    return true;
  };

  handleChange = name => event => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.userData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const userId = this.props.match.params.userId;
      const token = isAuthenticated().token;

      update(userId, token, this.userData).then(data => {
        if (data.error) {
          this.setState({ error: data.error, loading: false });
        } else if (isAuthenticated().user.role === "admin") {
          this.setState({
            redirectToProfile: true
          });
        } else {
          updateUser(data, () => {
            this.setState({
              redirectToProfile: true
            });
          });
        }
      });
    }
  };

  signupForm = (name, email, mobile, password, about) => <form></form>;

  render() {
    const {
      id,
      name,
      email,
      password,
      mobile,
      redirectToProfile,
      error,
      loading,
      about
    } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/profile`} />;
    }
    const user = isAuthenticated().user;
    const photoUrl = user._id
      ? `${API}/user/photo/${user._id}?${new Date().getTime()}`
      : "";

    return (
      <div className="container-fluid section-standard-height">
        <div className="container card" style={{}}>
          <div className="content">
            <h2 className="mt-2 mb-3">Edit Profile</h2>
            <div
              className="alert alert-danger"
              style={{ display: error ? "" : "none" }}
            >
              {error}
            </div>

            {loading ? (
              <div className="jumbotron text-center">
                <h2>Loading...</h2>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="left-form">
                <form>
                  <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input
                      onChange={this.handleChange("name")}
                      type="text"
                      className="form-control"
                      value={name}
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input
                      onChange={this.handleChange("email")}
                      type="email"
                      className="form-control"
                      value={email}
                    />
                  </div>

                  <div className="form-group">
                    <label className="text-muted">Mobile</label>
                    <input
                      onChange={this.handleChange("mobile")}
                      type="tel"
                      className="form-control"
                      value={mobile}
                    />
                  </div>

                  <div className="form-group">
                    <label className="text-muted">About</label>
                    <textarea
                      onChange={this.handleChange("about")}
                      type="text"
                      className="form-control"
                      value={about}
                    />
                  </div>

                  <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input
                      onChange={this.handleChange("password")}
                      type="password"
                      className="form-control"
                      value={password}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="right-form">
                <img
                  style={{ height: "200px", width: "auto" }}
                  className="img-thumbnail"
                  src={photoUrl}
                  alt={user.name}
                />
                <form>
                  <div className="form-group">
                    <label className="text-muted">Profile Photo</label>
                    <input
                      onChange={this.handleChange("photo")}
                      type="file"
                      accept="image/*"
                      className="form-control"
                    />
                  </div>
                  <div className="text-right">
                    <button
                      onClick={this.clickSubmit}
                      className="btn btn-raised btn-primary"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* {isAuthenticated().user._id === id &&
          this.signupForm(name, email, mobile, password, about)} */}
      </div>
    );
  }
}
