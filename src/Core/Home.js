import React, { Component } from "react";
import ModalVideo from "react-modal-video";
import { FaPlay } from "react-icons/fa";
import Typed from "react-typed";
import Slide from "react-reveal/Slide";

import Trending from "./TrendingSection";
import Blurb from "./BlurbMain";
import HomeProduct from "./MainPageProducts";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  render() {
    return (
      <div className="main-page">
        <div className="container-fluid  background-main color-background">
          <div className="container  p-3" style={{ minWidth: "75%" }}>
            <div className="row">
              <div className="col-xl-6 col-md-6 col-sm-12">
                <Slide duration={1500} left>
                  <div className="header-part-1">
                    <div
                      className="card overlay overlay-color"
                      style={{
                        width: "",
                        height: "50vh",
                        borderRadius: "50px 50px 50px 0 "
                      }}
                    >
                      <img
                        style={{
                          width: "",
                          height: "50vh",
                          borderRadius: "50px 50px 50px 0 "
                        }}
                        className="img-fluid "
                        src="https://res.cloudinary.com/djnv06fje/image/upload/v1575181486/pricing-top_uouxge.jpg"
                        alt="video-intro"
                      />

                      <div>
                        <ModalVideo
                          channel="youtube"
                          autoplay="1"
                          isOpen={this.state.isOpen}
                          videoId="EU0d67eNPTU"
                          onClose={() => this.setState({ isOpen: false })}
                        />
                        <button
                          className="btn btn-raised  button-center"
                          onClick={this.openModal}
                        >
                          <FaPlay className="animated-button animated infinite" />
                          Play
                        </button>
                        <h4 className="heading-center">How We Work</h4>
                      </div>
                    </div>
                  </div>
                </Slide>
              </div>
              <div className="col-xl-6 col-md-6 col-sm-12">
                <div className="header-part-two ">
                  <Slide duration={1500} right>
                    <h1 style={{ color: "white" }}>
                      Welcome to Floor Plan Bazaar
                    </h1>
                    <div>
                      <h1 style={{ color: "white" }}>
                        <Typed
                          strings={["FLOOR PLAN'S AT ₹999"]}
                          typeSpeed={80}
                          backSpeed={50}
                          loop
                        ></Typed>
                      </h1>

                      <p className="animated flash  infinite text-muted">
                        <sup>*</sup> LIMITED TIME OFFER
                      </p>
                    </div>
                    <p>
                      We'll get your project done One stop solution for all your
                      needs.
                    </p>
                  </Slide>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img
              src="https://res.cloudinary.com/djnv06fje/image/upload/v1575180722/shap1_kq4gb9.png"
              alt="divider"
              style={{ width: "100%" }}
            ></img>
          </div>
        </div>
        {/* -------------------------------------------Section-2--------------------------- */}
        <Blurb />
        <Trending />
        <HomeProduct />
      </div>
    );
  }
}
