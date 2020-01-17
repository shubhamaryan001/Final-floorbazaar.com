import React, { Component } from "react";
import { isAuthenticated } from "../Auth/Index";
import { GetUser, MarkReceiverMsg, MarkAllMsg } from "../User/ApiUser";
import { API, SOCKETAPI } from "../config";
import "../index.css";
import io from "socket.io-client";
import { FaRegBell, FaDotCircle } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import moment from "moment";
import _ from "lodash";
import { Link, useHistory, withRouter, Redirect } from "react-router-dom";

class Notifcation extends Component {
  constructor() {
    super();
    this.state = {
      error: "",
      ChatList: [],
      OnlineUsers: []
    };
  }
  socket = io(SOCKETAPI);
  history = this.props;
  msgNumber = 0;

  GetSingleUser = () => {
    const { token } = isAuthenticated();
    const { user } = isAuthenticated();
    GetUser(token, user._id).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ ChatList: data.chatList });

        this.CheckIfread(this.state.ChatList);
      }
    });
  };

  CheckIfread(arr) {
    const { user } = isAuthenticated();
    const checkArr = [];
    for (let i = 0; i < arr.length; i++) {
      const receiver = arr[i].msgId.message[arr[i].msgId.message.length - 1];
      if (
        window.location.pathname !==
        `/chat/${receiver.sendername}/${receiver._id}`
      ) {
        if (receiver.isRead === false && receiver.receivername === user.name) {
          checkArr.push(1);
          this.msgNumber = _.sum(checkArr);
        }
      }
    }
  }

  MarkAll = () => {
    const { token, user } = isAuthenticated();
    MarkAllMsg(token, user.name).then(data => {
      this.socket.emit("refresh", {});
      this.msgNumber = 0;
    });
  };

  Change = (name, Id) => {
    const { user, token } = isAuthenticated();
    const UName = user.name;
    MarkReceiverMsg(token, UName, name).then(data => {
      this.socket.emit("refresh", {});
    });
    this.props.history.push(`/chat/${name}/${Id}`);
  };

  componentDidMount() {
    const { user } = isAuthenticated();
    this.GetSingleUser();
    this.socket.on("refreshPage", () => {
      this.GetSingleUser();
    });
    this.socket.emit("online", { room: "global", user: user.name });
  }

  componentWillMount() {
    this.socket.on("usersOnline", data => {
      this.setState({ OnlineUsers: data });

      console.log(this.state.OnlineUsers);
    });
  }

  render() {
    const { ChatList } = this.state;
    return (
      <div>
        <Dropdown drop={"left"}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <FaRegBell />
            {this.msgNumber > 0 ? (
              <span className="badge badge-danger">{this.msgNumber}</span>
            ) : (
              ""
            )}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {ChatList.length > 0 ? (
              <>
                <div
                  className="container"
                  style={{
                    maxHeight: "20vh",

                    overflowY: "scroll"
                  }}
                >
                  {ChatList.map((m, i) => {
                    return (
                      <>
                        <Dropdown.Item key={i} className="p-1">
                          <div className="container">
                            <div className="row ">
                              <div className="col-4">
                                <div className="pt-1 text-center">
                                  <small>{m.receiverId.name}</small>
                                  <br />
                                  <img
                                    className="rounded-circle "
                                    src="https://res.cloudinary.com/djnv06fje/image/upload/v1577008134/dummy-user-img-1_p1kcf2.png"
                                    alt={m.receiverId.name}
                                    style={{
                                      minWidth: "30px",
                                      minHeight: "30px",
                                      maxWidth: "30px",
                                      maxHeight: "30px",
                                      objectFit: "cover"
                                    }}
                                  />
                                </div>
                              </div>

                              <div className="col-8">
                                <div className="contain">
                                  <button
                                    className="btn btn-sm btn-light"
                                    onClick={() =>
                                      this.Change(
                                        m.receiverId.name,
                                        m.receiverId._id
                                      )
                                    }
                                    style={{
                                      color: "#000",
                                      overflowWrap: "break-word"
                                    }}
                                  >
                                    {
                                      m.msgId.message[
                                        m.msgId.message.length - 1
                                      ].body
                                    }
                                    <br />
                                    <span
                                      className="text-muted"
                                      style={{ fontSize: "10px" }}
                                    >
                                      {moment(
                                        m.msgId.message[
                                          m.msgId.message.length - 1
                                        ].sendAt
                                      ).fromNow()}
                                    </span>
                                  </button>
                                  {!m.msgId.message[m.msgId.message.length - 1]
                                    .isRead &&
                                  m.receiverId.name !==
                                    m.msgId.message[m.msgId.message.length - 1]
                                      .receivername ? (
                                    <FaDotCircle style={{ color: "green" }} />
                                  ) : (
                                    ""
                                  )}

                                  {m.msgId.message[m.msgId.message.length - 1]
                                    .isRead ? (
                                    <FaDotCircle style={{ color: "pink" }} />
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Dropdown.Item>
                      </>
                    );
                  })}
                </div>
                <Dropdown.Item>
                  <div className="text-right">
                    <button
                      onClick={() => this.MarkAll()}
                      className="btn btn-sm btn-dark btn-raised"
                    >
                      Mark All As Read
                    </button>
                  </div>
                </Dropdown.Item>
              </>
            ) : (
              <>
                <Dropdown.Item>
                  <div className="text-right">
                    <p>No Notifcation</p>
                  </div>
                </Dropdown.Item>
              </>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default withRouter(Notifcation);
