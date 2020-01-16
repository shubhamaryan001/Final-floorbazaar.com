import React, { Component } from "react";
import { isAuthenticated } from "../Auth/Index";
import { GetAllAdmin } from "./ApiUser";
import { API } from "../config";
import { Link, Redirect } from "react-router-dom";
import { MdChat } from "react-icons/md";
import Spinner from "react-bootstrap/Spinner";
import "../index.css";
import io from "socket.io-client";
export default class UserSupport extends Component {
  constructor() {
    super();
    this.state = {
      error: "",
      loading: false,
      users: []
    };
    const socket = io("https://nodelatest-api.herokuapp.com");

    console.log(socket);
  }

  GetUser = () => {
    const token = isAuthenticated().token;
    GetAllAdmin(token).then(data => {
      this.setState({ loading: true });
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({
          users: data.result
        });
        console.log(data.result);
        setTimeout(() => {
          this.setState({ loading: false });
        }, 2000);
      }
    });
  };

  componentDidMount() {
    this.GetUser();
  }

  render() {
    const { users, error, loading } = this.state;
    const DefaultImg =
      "https://res.cloudinary.com/djnv06fje/image/upload/v1577008134/dummy-user-img-1_p1kcf2.png";
    return (
      <div className="container-fluid section-standard-height">
        <div className="container" style={{ minWidth: "70%" }}>
          <div className="badge badge-danger">{error ? <>{error}</> : ""}</div>
          <div className="row">
            <div className="col-md-4">
              <div className="left-bar">
                {loading ? (
                  <div className="text-center loading-screen">
                    <div className="spinner-position">
                      <Spinner animation="border" variant="warning" />
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {users.map((user, i) => {
                  return (
                    <div key={i}>
                      <ul className="list-item" style={{ listStyle: "none" }}>
                        <li>
                          <div className="row">
                            <div className="col-12 p-1">
                              <div className="user-name text-left">
                                <ul class="list-inline ">
                                  <li class="list-inline-item">
                                    <img
                                      key={i}
                                      src={`${API}/user/photo/${user._id}`}
                                      alt={user.name}
                                      onError={i =>
                                        (i.target.src = `${DefaultImg}`)
                                      }
                                      className="rounded-circle mb-3"
                                      style={{
                                        height: "50px",
                                        width: "50px",
                                        minHeight: "50px",
                                        minWidth: "50px",
                                        objectFit: "cover"
                                      }}
                                    />
                                  </li>
                                  <li className="list-inline-item">
                                    <div>
                                      <p>{user.name}</p>
                                    </div>
                                  </li>
                                  <li className="list-inline-item">
                                    <p className="mb-0">
                                      <Link
                                        to={`/chat/${user.name}`}
                                        className="btn btn-sm "
                                      >
                                        <MdChat
                                          style={{
                                            fontSize: "20px",
                                            marginBottom: "-4px",
                                            marginRight: "3px"
                                          }}
                                        />
                                      </Link>
                                    </p>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="col-md-8">
              <div
                className="chat-block p-3"
                style={{ background: "#ebebeb", minHeight: "50vh" }}
              >
                <div className="card ">
                  <div
                    className="message-screen "
                    style={{
                      minHeight: "40vh",
                      marginBottom: "5px",
                      background: "#ffbeee"
                    }}
                  ></div>
                  <form className="mb-0">
                    <textarea rows="3" style={{ width: "100%" }} />
                    <button className="btn btn-block btn-secondary btn-raised">
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
