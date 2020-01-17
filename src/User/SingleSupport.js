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
import { Link } from "react-router-dom";
import { MdChat } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

import Spinner from "react-bootstrap/Spinner";
import "../index.css";
import io from "socket.io-client";
import Noti from "./Notifcation";

import { GoPrimitiveDot } from "react-icons/go";
import { FaUsers } from "react-icons/fa";

import ScrollableFeed from "react-scrollable-feed";
import _ from "lodash";
import moment from "moment";

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
      AllOnline: false,
      typing: false
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
          }, 1000);
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
            console.log(data.messages.message);
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
      console.log(data.messages.message);
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
    const { Online } = this.state;
    if (Online.length > 0) {
      const result = Online.findIndex(element => element === name);
      if (result > -1) {
        this.setState({ isOnline: true });
      } else {
        this.setState({ isOnline: false });
      }
    }
  };

  CheckAllinOne = UserName => {
    const { Online } = this.state;
    const result = _.indexOf(Online, UserName);
    if (result > -1) {
      return true;
    } else {
      return false;
    }
  };

  IsTyping = () => {
    const { user } = isAuthenticated();
    this.socket.emit("start_typing", {
      sender: user.name,
      receiver: this.state.receiver.name
    });

    if (this.typingMessage) {
      clearTimeout(this.typingMessage);
    }

    this.typingMessage = setTimeout(() => {
      this.socket.emit("stop_typing", {
        sender: user.name,
        receiver: this.state.receiver.name
      });
    }, 1000);
  };

  componentDidMount() {
    const name = this.props.match.params.name;
    const Id = this.props.match.params.id;
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

    this.socket.on("is_typing", data => {
      if (data.sender === this.state.receiver.name) {
        this.setState({ typing: true });
      }
    });

    this.socket.on("has_stopped_typing", data => {
      if (data.sender === this.state.receiver.name) {
        this.setState({ typing: false });
      }
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
      isOnline,
      typing
    } = this.state;
    const DefaultImg =
      "https://res.cloudinary.com/djnv06fje/image/upload/v1577008134/dummy-user-img-1_p1kcf2.png";
    return (
      <div className="container-fluid section-standard-height-chat">
        <div style={{ display: "none" }}>
          <Noti />
        </div>
        <div className="alert-danger">{error ? { error } : ""}</div>

        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div
                className="container card p-2"
                style={{
                  minHeight: "50vh",
                  maxHeight: "50vh",
                  overflowY: "scroll",
                  overflowX: "hidden"
                }}
              >
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

                  <div className="heading">
                    <h5 className="text-center m-1">
                      {user.role === 0 ? (
                        <>
                          Available support team{" "}
                          <MdChat
                            style={{ fontSize: "20px", marginBottom: "-3px" }}
                          />
                        </>
                      ) : (
                        <>
                          All users{" "}
                          <FaUsers
                            style={{ fontSize: "20px", marginBottom: "-3px" }}
                          />
                        </>
                      )}
                    </h5>
                  </div>
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
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-8 col-sm-12">
              <div
                className="container-fluid right-bar p-2"
                style={{
                  minHeight: "50vh",
                  maxHeight: "60vh"
                }}
              >
                <div className="chat-box">
                  <div className="chat-header ">
                    <div className="row">
                      <div className="col-8">
                        <div className="user-img">
                          <ul class="list-unstyled">
                            <li class="media">
                              <img
                                src={`${API}/user/photo/${receiver._id}`}
                                alt={receiver.name}
                                onError={i => (i.target.src = `${DefaultImg}`)}
                                className="rounded-circle mr-3"
                                style={{
                                  height: "50px",
                                  width: "50px",
                                  minHeight: "50px",
                                  minWidth: "50px",
                                  objectFit: "cover",
                                  margin: "0 auto"
                                }}
                              />
                              <div class="media-body">
                                <h5 class="mt-0 mb-1">{receiver.name}</h5>
                                <span style={{ fontSize: "12px" }}>
                                  {isOnline === true ? (
                                    <>Online</>
                                  ) : (
                                    <>Offline</>
                                  )}
                                  {typing ? (
                                    <>
                                      <span
                                        style={{
                                          marginLeft: "3px",
                                          color: "#11dc61"
                                        }}
                                      >
                                        {receiver.name} isTyping
                                      </span>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="user-name"></div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="card "
                    style={{
                      background: "#fff",
                      borderRadius: "0"
                    }}
                  >
                    <div className="message-screen">
                      <ScrollableFeed id="containerElement">
                        <div className="row ">
                          {MessagesList.map((msg, index) => {
                            return (
                              <>
                                <div className="col-12 ">
                                  {user._id !== receiver._id &&
                                  user._id !== msg.senderId ? (
                                    <>
                                      <div className=" card rec-body">
                                        <small className="text-muted text-left ">
                                          {receiver.name}
                                        </small>
                                        <div
                                          className="card rec-message"
                                          style={{
                                            overflowWrap: "break-word"
                                          }}
                                        >
                                          <p className="text-left">
                                            {msg.body}
                                          </p>
                                        </div>

                                        <small className="text-muted text-right ">
                                          {moment(msg.sendAt).format(
                                            "MMMM Do YYYY, h:mm:ss a"
                                          )}
                                        </small>
                                      </div>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                  {user._id === msg.senderId ? (
                                    <>
                                      <div className=" card sender-body">
                                        <small className="text-muted text-right ">
                                          You
                                        </small>
                                        <div
                                          className="card sender-message"
                                          style={{
                                            overflowWrap: "break-word"
                                          }}
                                        >
                                          <p className="text-left">
                                            {msg.body}
                                          </p>
                                        </div>

                                        <small className="text-muted text-left ">
                                          {moment(msg.sendAt).format(
                                            "MMMM Do YYYY, h:mm:ss a"
                                          )}
                                        </small>
                                      </div>
                                    </>
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
                  </div>

                  <div
                    className="card"
                    style={{ background: "#f0f0f0", borderRadius: "0" }}
                  >
                    <div className="container-fluid text-left send-message-box">
                      <div className="row">
                        <div className="col-8 p-1">
                          <textarea
                            rows="1"
                            placeholder="Type a message"
                            onChange={this.handleChange}
                            type="text"
                            className="chat-input"
                            value={message}
                            onKeyPress={() => this.IsTyping()}
                          />
                        </div>
                        <div className="col-4 p-1">
                          <div className="container-fluid text-right">
                            <button
                              onClick={this.SendMsg}
                              className=" chat-button btn btn-raised "
                            >
                              <IoMdSend
                                style={{
                                  fontSize: "22px",
                                  marginBottom: "-5px"
                                }}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
