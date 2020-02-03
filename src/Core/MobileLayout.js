import React, { Component } from "react";
import { read } from "./ApiCore";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";
import ReactPlayer from "react-player";

import Typed from "react-typed";
import { FaPlay } from "react-icons/fa";

export default class MobileLayout extends Component {
  constructor() {
    super();
    this.state = {
      floorplan: "",
      error: ""
    };
  }

  floorId = "5dcafc367c8c423494f9e496";

  loadFloorPlan = () => {
    const floorId = "5dcafc367c8c423494f9e496";
    read(floorId).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ floorplan: data });
        console.log(data);
      }
    });
  };

  playIcon = () => {
    return (
      <>
        <button
          className="btn btn-lg btn-raised "
          style={{
            color: "black",
            background: "#fff",
            borderRadius: "10px",
            marginTop: "0px"
          }}
        >
          <FaPlay
            className="animated-button animated infinite"
            style={{ marginBottom: "-7px" }}
          />
          Play Now
        </button>
      </>
    );
  };

  componentWillMount() {
    this.loadFloorPlan();
  }
  render() {
    const { floorplan } = this.state;
    return (
      <>
        <div className="container-fluid Mobilelayout">
          <div className="container ">
            <div className="row">
              <div
                className="col-12 "
                style={{ padding: "5px 5px 2px 5px", marginBottom: "8px" }}
              >
                <div className="card back p-3 text-left">
                  <Fade center duration={1500} delay={2000}>
                    <div
                      style={{
                        position: "absolute",
                        top: "150px",
                        left: "250px"
                      }}
                    >
                      <img
                        className=" animated infinite flash "
                        width="100"
                        height="50"
                        src="https://res.cloudinary.com/djnv06fje/image/upload/v1580480884/limited-time-only-png-18-transparent_f6puyi.png"
                        alt="Limited Time Offer"
                      />
                    </div>
                  </Fade>
                  <Fade center duration={1000} delay={1000}>
                    <div className="card top-bar">
                      <h1 className="reveal">
                        <Typed
                          strings={[
                            `DESIGN'S MADE BY EXPERIENCED ARCHITECT'S `
                          ]}
                          typeSpeed={80}
                          backSpeed={20}
                          loop
                        />
                      </h1>
                    </div>
                  </Fade>

                  <h2
                    style={{
                      fontSize: "40px",
                      fontWeight: "700",
                      color: "#FFF",
                      marginBottom: "0"
                    }}
                  >
                    {floorplan.name}'S
                  </h2>
                  <h4
                    style={{
                      fontSize: "14px",
                      marginBottom: "0",
                      lineHeight: "18px"
                    }}
                  >
                    Get Design for your Size Plot. ​ Get Two Different Options.
                  </h4>

                  <h3
                    style={{
                      fontSize: "30px",
                      fontWeight: "500",
                      color: "#fff"
                    }}
                  >
                    ₹{floorplan.price}
                  </h3>
                  <div>
                    <Link
                      className="btn btn-md btn-raised "
                      style={{
                        background: "#FBA211",
                        color: "#fff",
                        borderRadius: "30px"
                      }}
                      to={`/product/${floorplan._id}`}
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="container"
            style={{
              background: "#FFF",
              padding: "5px 0 5px 0",
              marginBottom: "5px"
            }}
          >
            <div className="col-12" style={{ padding: "0 5px 0 5px" }}>
              <Slide bottom duration={1200}>
                <div className="card video-home" style={{ boxShadow: "none" }}>
                  <div
                    className="card intro-text"
                    style={{ boxShadow: "none" }}
                  >
                    <p>INTRODUCTION VIDEO</p>
                    <div className="intro-text-1">
                      <p>Please Play This Video</p>
                    </div>
                  </div>
                  <ReactPlayer
                    url="https://www.youtube.com/embed/EU0d67eNPTU"
                    className="react-player"
                    controls
                    playing
                    playIcon={this.playIcon()}
                    light="https://res.cloudinary.com/djnv06fje/image/upload/v1575181486/pricing-top_uouxge.jpg"
                  />
                </div>
              </Slide>
            </div>
            <div className="container p-0">
              <div className="col-12" style={{ padding: "0 5px 0 5px" }}>
                <Slide bottom duration={1200}>
                  <div className="card" style={{ boxShadow: "none" }}>
                    <img
                      style={{ width: "100%" }}
                      src="https://res.cloudinary.com/djnv06fje/image/upload/v1580633997/col_r8yhqp.png"
                      alt="Process"
                    />
                  </div>
                </Slide>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid Mobilelayout-2 bg-light">
          <div className="container ">
            <h4>Second Slide</h4>
          </div>
        </div>

        <div className="container-fluid Mobilelayout-2 bg-success">
          <div className="container ">
            <h4>THird Slide</h4>
          </div>
        </div>
      </>
    );
  }
}
