import React, { Component } from "react";
import ModalVideo from "react-modal-video";
import { FaPlay } from "react-icons/fa";
import Typed from "react-typed";
import Slide from "react-reveal/Slide";
import Fade from "react-reveal/Fade";
import ReactPlayer from "react-player";

import { Link } from "react-router-dom";
import Trending from "./TrendingSection";
import Blurb from "./BlurbMain";
import HomeProduct from "./MainPageProducts";
import { read } from "./ApiCore";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      floorplan: "",
      error: ""
    };
    this.openModal = this.openModal.bind(this);
  }
  floorId = "5dcafc367c8c423494f9e496";

  loadSingleBasic = () => {
    const floorId = "5dcafc367c8c423494f9e496";
    read(floorId).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ floorplan: data });
      }
    });
  };

  componentDidMount() {
    this.loadSingleBasic();
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  playIcon = () => {
    return (
      <>
        <button
          className="btn btn-raised"
          style={{
            color: "black",
            background: "#fff",
            borderRadius: "30px",
            marginTop: "40px"
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

  render() {
    const { floorplan } = this.state;
    return (
      <div className="main-page">
        <div className="container-fluid  background-main color-background">
          <div className="container  p-1  ">
            <div className="row">
              <div className="col-xl-4 col-md-4 col-sm-12">
                <div className="container-fluid p-0">
                  <div className="card right-box p-2">
                    <div
                      className="header text-left"
                      style={{
                        background: "#000",
                        color: "#fff",
                        padding: "10px",
                        borderRadius: "5px"
                      }}
                    >
                      <div
                        className="pl-1"
                        style={{ borderLeft: "solid 5px #fff" }}
                      >
                        <h4
                          className="mb-0"
                          style={{ fontSize: "25px", fontWeight: "600" }}
                        >
                          <Typed
                            strings={[`WE'LL GET YOUR PROJECT DONE`]}
                            typeSpeed={80}
                            backSpeed={20}
                            loop
                          />
                        </h4>
                      </div>
                      <small>One stop solution for all your needs.</small>
                    </div>
                    <div className="sections">
                      <Slide left duration={1000} delay={300}>
                        <div className="block-1 p-1 card mt-1 mb-1">
                          <h4
                            style={{
                              fontSize: "19px",
                              fontWeight: "700",
                              color: "rgb(251, 162, 17)"
                            }}
                          >
                            ARCHITECTURE
                          </h4>
                          <ul>
                            <li>Floor Planning</li>
                            <li>Electrical Layout</li>
                            <li>Plumbing Layout</li>
                            <li>Door/Window Designs</li>
                          </ul>
                        </div>
                      </Slide>

                      <Slide right duration={1000} delay={600}>
                        <div className="block-1 p-1 card mt-1 mb-1">
                          <h4
                            style={{
                              fontSize: "19px",
                              fontWeight: "700",
                              color: "rgb(251, 162, 17)"
                            }}
                          >
                            3D VISUALIZATION
                          </h4>
                          <ul>
                            <li>3D Front Elevation</li>
                            <li>3D Video Walkthru</li>
                            <li>3D Interior Views</li>
                            <li>3D Floor Plans</li>
                            <li>Township 3D Walkthru</li>
                            <li>Bunglow 3D Walkthru</li>
                            <li>Appartment 3D Tour</li>
                          </ul>
                        </div>
                      </Slide>
                      <Slide left duration={1000} delay={900}>
                        <div className="block-1 p-1 card mt-1 mb-1">
                          <h4
                            style={{
                              fontSize: "19px",
                              fontWeight: "700",
                              color: "rgb(251, 162, 17)"
                            }}
                          >
                            STRUCTURE
                          </h4>
                          <ul>
                            <li>Footing Layout</li>
                            <li>Tie-Beam Layout</li>
                            <li>Column Layout</li>
                            <li>Beam Layout</li>
                            <li>Slab Layout</li>
                          </ul>
                        </div>
                      </Slide>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-8 col-md-8 col-sm-12 align-self-center">
                <div className="container-fluid p-0">
                  <Fade center duration={1500} delay={500}>
                    <div className="card  left-box">
                      <p style={{ fontSize: "20px", textAlign: "center" }}>
                        PREMIUM BUT AFFORDABLE SERVICES FOR EVERYONE​ ​
                        RESIDENTIAL OR COMMERCIAL PROJECTS ​ GET EVERYTHING
                        ONLINE . ALL ACROSS INDIA
                      </p>
                      <div className="content-left text-center">
                        <h2
                          className="most-sized"
                          style={{
                            fontWeight: "700",
                            color: "rgb(251, 162, 17)"
                          }}
                        >
                          FLOOR PLAN'S
                        </h2>

                        <h3
                          style={{
                            fontSize: "32px",
                            fontWeight: "700",
                            color: "#000"
                          }}
                        >
                          ₹{floorplan.price}
                        </h3>
                        <h2
                          style={{
                            fontWeight: "350",
                            color: "rgb(251, 162, 17)"
                          }}
                        >
                          LIMITED TIME OFFER
                        </h2>
                        <p style={{ fontSize: "20px" }}>
                          Get Design for your Size Plot. ​ Get Two Different
                          Options.
                        </p>
                        <h3
                          style={{
                            color: "rgb(251, 162, 17)"
                          }}
                        >
                          DESIGN'S MADE BY EXPERIANCED ARCHITECT'S
                        </h3>

                        <Link
                          className="btn btn-raised "
                          style={{
                            background: "rgb(251, 162, 17)",
                            color: "#FFF",
                            borderRadius: "30px"
                          }}
                          to={`/product/${this.floorId}`}
                        >
                          Buy Now
                        </Link>

                        <p style={{ fontSize: "20px" }}>
                          CALL / WHATSAPP
                          <br />
                          <span>
                            <a className="most-sized" href="tel:+918800757170">
                              8800-7571-70
                            </a>
                            ​
                          </span>
                        </p>
                      </div>
                    </div>
                  </Fade>
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

        <div
          className="container-fluid pl-0 pr-0 pt-2 pb-2"
          style={{ background: "#fff" }}
        >
          <div className="container video-cont ">
            <Slide bottom duration={1200}>
              {" "}
              <div className="card video-card">
                <div className="video-block">
                  <ReactPlayer
                    url="https://www.youtube.com/embed/EU0d67eNPTU"
                    className="react-player"
                    controls
                    playing
                    playIcon={this.playIcon()}
                    light="https://res.cloudinary.com/djnv06fje/image/upload/v1575181486/pricing-top_uouxge.jpg"
                  />
                </div>
              </div>
            </Slide>
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
