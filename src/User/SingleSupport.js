import React, { Component } from "react";
import { isAuthenticated } from "../Auth/Index";
import {
  GetAllUsers,
  GetUserByName,
  GetAllMessages,
  SendMessage,
  GetAllAdmin
} from "./ApiUser";
import { API, SOCKETAPI } from "../config";
import { Link, Redirect } from "react-router-dom";
import { MdChat } from "react-icons/md";
import Spinner from "react-bootstrap/Spinner";
import "../index.css";
import io from "socket.io-client";
import Noti from "./Notifcation";
import * as Scroll from "react-scroll";
import {
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from "react-scroll";
import { GoPrimitiveDot } from "react-icons/go";

import ScrollableFeed from "react-scrollable-feed";
import _ from "lodash";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#fff", background: "#fba211" };
  } else {
    return { color: "#000" };
  }
};

export default class SingleSupport extends Component {
  constructor() {
    super();
    this.state = {
      error: "",
      loading: false,
      users: [],
      receiver: "",
      ReceiverName: "",
      ReceiverId: "",
      message: "",
      MessagesList: [],
      Online: [],
      isOnline: false,
      AllOnline: false
    };
  }

  socket = io(SOCKETAPI);
  senderPostName = isAuthenticated().user.name;
  senderPostId = isAuthenticated().user._id;

  GetUser = () => {
    const { user, token } = isAuthenticated();

    if (user.role === 1) {
      GetAllUsers(token).then(data => {
        this.setState({ loading: true });
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          this.setState({
            users: data.result
          });

          setTimeout(() => {
            this.setState({ loading: false });
          }, 2000);
        }
      });
    } else if (user.role === 0) {
      GetAllAdmin(token).then(data => {
        this.setState({ loading: true });
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          this.setState({
            users: data.result
          });

          setTimeout(() => {
            this.setState({ loading: false });
          }, 2000);
        }
      });
    }
  };

  SingleNameUser = (name, Id) => {
    const { token } = isAuthenticated();
    const senderId = this.senderPostId;

    GetUserByName(token, name).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({
          receiver: data.result,
          ReceiverName: data.result.name,
          ReceiverId: data.result._id
        });

        this.socket.on("refreshPage", () => {
          GetAllMessages(token, senderId, Id).then(data => {
            this.setState({ MessagesList: data.messages.message });
            console.log(this.state.MessagesList);
          });
        });
      }
    });
  };

  GetMessages = Id => {
    const { token } = isAuthenticated();
    const senderId = this.senderPostId;

    GetAllMessages(token, senderId, Id).then(data => {
      this.setState({ MessagesList: data.messages.message });
      console.log(this.state.MessagesList);
    });
  };

  handleChange = e => {
    const value = e.target.value;
    this.setState({ message: value });
  };

  SendMsg = event => {
    event.preventDefault();
    const { message } = this.state;

    const senderId = this.senderPostId;
    const senderName = this.senderPostName;
    const receiverName = this.state.receiver.name;
    const Recvierid = this.state.receiver._id;

    const { token } = isAuthenticated();
    if (message) {
      SendMessage(
        token,
        senderId,
        senderName,
        Recvierid,
        receiverName,
        message
      ).then(data => {
        this.socket.emit("refresh", {});
        this.setState({
          message: ""
        });
      });
    }
  };

  CheckOnline = name => {
    const { Online, isOnline } = this.state;
    if (Online.length > 0) {
      const result = Online.findIndex(element => element === name);
      if (result > -1) {
        console.log("true");
        this.setState({ isOnline: true });
      } else {
        console.log("false");
        this.setState({ isOnline: false });
      }
      console.log(isOnline, Online);
    }
  };

  CheckAllinOne = UserName => {
    const { Online, AllOnline } = this.state;
    const result = _.indexOf(Online, UserName);
    if (result > -1) {
      return true;
    } else {
      return false;
    }
  };

  componentDidMount() {
    const name = this.props.match.params.name;
    const Id = this.props.match.params.id;
    console.log(this.props.match.params);
    this.GetUser();
    this.SingleNameUser(name, Id);
    this.GetMessages(Id);

    this.socket.on("refreshPage", () => {
      this.SingleNameUser(name, Id);
    });
  }

  componentWillMount() {
    const name = this.props.match.params.name;
    const params = {
      room1: isAuthenticated() && isAuthenticated().user.name,
      room2: name
    };
    this.socket.emit("join chat", params);

    this.socket.on("usersOnline", data => {
      this.setState({ Online: data });
      this.CheckOnline(name);
    });
  }

  render() {
    const { history } = this.props;
    const { user } = isAuthenticated();
    const {
      users,
      error,
      loading,
      receiver,
      message,
      MessagesList,
      isOnline
    } = this.state;
    const DefaultImg =
      "https://res.cloudinary.com/djnv06fje/image/upload/v1577008134/dummy-user-img-1_p1kcf2.png";
    return (
      <div className="container-fluid section-standard-height">
        <div style={{ display: "none" }}>
          <Noti />
        </div>

        <div className="container card p-2" style={{ minWidth: "70%" }}>
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
                      <div className="row">
                        <div className="col-12">
                          <div className="users">
                            <Link
                              style={isActive(
                                history,
                                `/chat/${user.name}/${user._id}`
                              )}
                              to={`/chat/${user.name}/${user._id}`}
                              onClick={() => window.location.reload()}
                              className="dropdown-item"
                            >
                              <div className="row">
                                <div className="col-4">
                                  <div className="user-img">
                                    <img
                                      key={i}
                                      src={`${API}/user/photo/${user._id}`}
                                      alt={user.name}
                                      onError={i =>
                                        (i.target.src = `${DefaultImg}`)
                                      }
                                      className="rounded-circle"
                                      style={{
                                        height: "50px",
                                        width: "50px",
                                        minHeight: "50px",
                                        minWidth: "50px",
                                        objectFit: "cover"
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="col-4">
                                  <div className="user-name">
                                    <p>{user.name}</p>
                                  </div>
                                </div>
                                <div className="col-4">
                                  <div className="user-chat">
                                    <Link
                                      style={isActive(
                                        history,
                                        `/chat/${user.name}/${user._id}`
                                      )}
                                      to={`/chat/${user.name}/${user._id}`}
                                      className="btn btn-sm "
                                      onClick={() => window.location.reload()}
                                    >
                                      <MdChat
                                        style={{
                                          fontSize: "20px",
                                          marginBottom: "-4px",
                                          marginRight: "3px"
                                        }}
                                      />
                                      {this.CheckAllinOne(user.name) ? (
                                        <>
                                          <GoPrimitiveDot
                                            style={{
                                              color: "green",
                                              fontSize: "18px"
                                            }}
                                          />
                                        </>
                                      ) : (
                                        <>
                                          <GoPrimitiveDot
                                            style={{
                                              color: "red",
                                              fontSize: "18px"
                                            }}
                                          />
                                        </>
                                      )}
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* <ul className="list-item" style={{ listStyle: "none" }}>
                        <li>
                          <div className="row">
                            <div className="col-12 p-1">
                              <div className="user-name text-left">
                                <a
                                  style={isActive(
                                    history,
                                    `/chat/${user.name}/${user._id}`
                                  )}
                                  href={`/chat/${user.name}/${user._id}`}
                                  className="btn btn-sm "
                                >
                                  <ul class="list-inline ">
                                    <li class="list-inline-item">
                                      <img
                                        key={i}
                                        src={`${API}/user/photo/${user._id}`}
                                        alt={user.name}
                                        onError={i =>
                                          (i.target.src = `${DefaultImg}`)
                                        }
                                        className="rounded-circle"
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
                                        <a
                                          style={isActive(
                                            history,
                                            `/chat/${user.name}/${user._id}`
                                          )}
                                          href={`/chat/${user.name}/${user._id}`}
                                          className="btn btn-sm "
                                        >
                                          <MdChat
                                            style={{
                                              fontSize: "20px",
                                              marginBottom: "-4px",
                                              marginRight: "3px"
                                            }}
                                          />
                                        </a>
                                      </p>
                                      <p>
                                        {this.CheckAllinOne(user.name) ? (
                                          <>
                                            <GoPrimitiveDot
                                              style={{
                                                color: "green",
                                                fontSize: "2rem"
                                              }}
                                            />
                                          </>
                                        ) : (
                                          <>
                                            <GoPrimitiveDot
                                              style={{
                                                color: "red",
                                                fontSize: "2rem"
                                              }}
                                            />
                                          </>
                                        )}
                                      </p>
                                    </li>
                                  </ul>
                                </a>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul> */}
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
                  <div className="card-header pl-3 pr-3 pt-1 pb-1">
                    <div className="row">
                      <div className="col-6">
                        <div className="row">
                          <div
                            className="col-6 pr-1"
                            style={{ maxWidth: "20%" }}
                          >
                            <div className="user-img text-right">
                              <img
                                src={`${API}/user/photo/${receiver._id}`}
                                alt={receiver.name}
                                onError={i => (i.target.src = `${DefaultImg}`)}
                                className="rounded-circle"
                                style={{
                                  height: "50px",
                                  width: "50px",
                                  minHeight: "50px",
                                  minWidth: "50px",
                                  objectFit: "cover"
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="user-name text-left">
                              <p
                                className="mb-0"
                                style={{
                                  fontWeight: "500",
                                  fontSize: "20px"
                                }}
                              >
                                {receiver.name}
                              </p>
                              <span>
                                <p className="mb-0">
                                  {isOnline === true ? (
                                    <>Online</>
                                  ) : (
                                    <>Offline</>
                                  )}
                                </p>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-6"></div>
                    </div>
                  </div>

                  <div className="message-screen ">
                    <ScrollableFeed id="containerElement">
                      <div className="row ">
                        {MessagesList.map((msg, index) => {
                          return (
                            <>
                              <div className="col-12 ">
                                {user._id !== receiver._id &&
                                user._id !== msg.senderId ? (
                                  <div className="card rec-body">
                                    <p className="badge ">{receiver.name}</p>
                                    <p>{msg.body}</p>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {user._id === msg.senderId ? (
                                  <div className=" card sender-body">
                                    <p className="badge badge-danger">You</p>
                                    <p>{msg.body}</p>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </ScrollableFeed>
                  </div>

                  <form className="mb-0">
                    <textarea
                      rows="3"
                      onChange={this.handleChange}
                      type="text"
                      value={message}
                      style={{ width: "100%" }}
                    />
                    <button
                      onClick={this.SendMsg}
                      className="btn btn-block btn-secondary btn-raised"
                    >
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
