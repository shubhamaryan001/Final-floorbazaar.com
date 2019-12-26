import React, { useState, useEffect } from "react";

import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { read } from "./ApiCore";
import {
  FaPlay,
  FaCheckCircle,
  FaRegTimesCircle,
  FaTags,
  FaLongArrowAltRight
} from "react-icons/fa";
import TransitionGroup from "react-transition-group/TransitionGroup";
import Zoom from "react-reveal/Zoom";

import Fade from "react-reveal/Fade";

import "../index.css";

const MainPageProducts = () => {
  const [basic, setBasic] = useState({});
  const [modern, setModern] = useState({});
  const [premium, setPremium] = useState({});

  const [error, setError] = useState(false);
  const basicId = "5de7b843438f401fbc563d3a";
  const modernId = "5debb2c7dfe05109846ed4ad";
  const premiumId = "5dcc1f0504510f454493aa72";

  const loadSingleBasic = basicId => {
    read(basicId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setBasic(data);
        console.log(data);
      }
    });
  };

  const loadSingleModern = modernId => {
    read(modernId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setModern(data);
        console.log(data);
      }
    });
  };

  const loadSinglePremium = premiumId => {
    read(premiumId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setPremium(data);
        console.log(data);
      }
    });
  };

  useEffect(() => {
    loadSingleBasic(basicId);
    loadSingleModern(modernId);
    loadSinglePremium(premiumId);
  }, []);
  return (
    <div className="homeproduct">
      <div className="container-fluid  section-standard-height-2 background-home-product-first">
        <div className=" text-center heading-trending  pt-4 pb-3 ">
          <h1 className="heading-first p-2 ">Best Selling Packages</h1>
        </div>
        <div className="container card  product-section ">
          <div className="row">
            <div className="col-xl-12 col-md-12  col-sm-12 p-0"></div>
            <div className="container p-0 card">
              <div className="text-group" style={{ background: " #f1f1f1" }}>
                <div className="ribbon-3 ribbon">
                  <h4 className="text-ribbon">Affordable</h4>
                </div>
                <h2 className="card-header   text-muted ">{basic.name}</h2>
              </div>
              <div className="side-card-padding">
                <div className="row">
                  <div className="col-xl-6 col-md-6 col-sm-12 p-0">
                    <ReactPlayer
                      url="https://www.youtube.com/embed/bhpKw3umAxE"
                      className="react-player"
                      width="100%"
                      height="400px"
                      controls
                      playing
                      light="https://res.cloudinary.com/djnv06fje/image/upload/v1575724968/maxresdefault_1_vmd2ll.jpg"
                    />
                  </div>
                  <div className="col-xl-6 col-md-6 col-sm-12">
                    <div className="row">
                      <div className="col-xl-6 col-md-6 col-sm-12">
                        <div className="pt-4 text-left">
                          <p>
                            <FaCheckCircle className="FaCheckCircle" />
                            Customized Floorplan
                          </p>

                          <p>
                            <FaCheckCircle className="FaCheckCircle" />
                            Door-Windows Designs
                          </p>

                          <p>
                            <FaCheckCircle className="FaCheckCircle" />
                            Other Site Work Drawings
                          </p>

                          <p>
                            <FaRegTimesCircle className="FaRegTimesCircle" />
                            3D-Front Elevation
                          </p>

                          <p>
                            <FaRegTimesCircle className="FaRegTimesCircle" />
                            Elevation Video Walkthru
                          </p>
                        </div>
                      </div>
                      <div className="col-xl-6 col-md-6 col-sm-12">
                        <div className="p-2 ">
                          <h6 className="text-center">Price As Per Sizes</h6>
                          <hr />
                          <TransitionGroup>
                            {basic.variants &&
                              basic.variants.length > 0 &&
                              basic.variants.map((item, index) => (
                                <Zoom className="text-left" key={item.id}>
                                  <p
                                    className=""
                                    style={{
                                      fontSize: "12px",
                                      textTransform: "none"
                                    }}
                                  >
                                    <FaTags
                                      style={{
                                        color: "red ",
                                        fontSize: "20px",
                                        marginBottom: "-5px",
                                        marginRight: "5px"
                                      }}
                                    />
                                    AREA UPTO {item.area} Sq.Ft. - Rs.
                                    {item.price}
                                  </p>
                                </Zoom>
                              ))}
                          </TransitionGroup>

                          <div className="mt-2 text-right">
                            <Link
                              className="btn btn-custom-1"
                              to={`/product/${basicId}`}
                            >
                              <span>More Details</span>{" "}
                              <FaLongArrowAltRight className="button-icon" />
                            </Link>
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
      {/* -------------------SECOND PRODUCT ---------------------*/}

      <div className="container-fluid  section-standard-height-2 background-home-product-second">
        <div className="container card  product-section ">
          <div className="row">
            <div className="col-xl-12 col-md-12  col-sm-12 p-0"></div>
            <div className="container p-0 card">
              <div className="text-group" style={{ background: " #f1f1f1" }}>
                <div className="ribbon-3 ribbon">
                  <h4 className="text-ribbon">Affordable</h4>
                </div>
                <h2 className="card-header   text-muted ">{modern.name}</h2>
              </div>
              <div className="side-card-padding">
                <div className="row">
                  <div className="col-xl-6 col-md-6 col-sm-12 p-0">
                    <ReactPlayer
                      url="https://www.youtube.com/watch?v=4B4PubjVquk"
                      className="react-player"
                      width="100%"
                      height="400px"
                      controls
                      playing
                      light="https://res.cloudinary.com/djnv06fje/image/upload/v1575728334/maxresdefault_2_clzgfr.jpg"
                    />
                  </div>
                  <div className="col-xl-6 col-md-6 col-sm-12">
                    <div className="row">
                      <div className="col-xl-6 col-md-6 col-sm-12">
                        <div className="pt-4 text-left">
                          <p>
                            <FaCheckCircle className="FaCheckCircle" />
                            Customized Floorplan
                          </p>

                          <p>
                            <FaCheckCircle className="FaCheckCircle" />
                            Door-Windows Designs
                          </p>

                          <p>
                            <FaCheckCircle className="FaCheckCircle" />
                            Other Site Work Drawings
                          </p>

                          <p>
                            <FaCheckCircle className="FaCheckCircle" />
                            3D-Front Elevation
                          </p>

                          <p>
                            <FaRegTimesCircle className="FaRegTimesCircle" />
                            Elevation Video Walkthru
                          </p>
                        </div>
                      </div>
                      <div className="col-xl-6 col-md-6 col-sm-12">
                        <div className="p-2 ">
                          <h6 className="text-center">Price As Per Sizes</h6>
                          <hr />
                          <TransitionGroup>
                            {modern.variants &&
                              modern.variants.length > 0 &&
                              modern.variants.map((item, index) => (
                                <Zoom className="text-left" key={item.id}>
                                  <p
                                    className=""
                                    style={{
                                      fontSize: "12px",
                                      textTransform: "none"
                                    }}
                                  >
                                    <FaTags
                                      style={{
                                        color: "red ",
                                        fontSize: "20px",
                                        marginBottom: "-5px",
                                        marginRight: "5px"
                                      }}
                                    />
                                    AREA UPTO {item.area} Sq.Ft. - Rs.
                                    {item.price}
                                  </p>
                                </Zoom>
                              ))}
                          </TransitionGroup>

                          <div className="mt-2 text-right">
                            <Link
                              className="btn btn-custom-1"
                              to={`/product/${modernId}`}
                            >
                              <span>More Details</span>{" "}
                              <FaLongArrowAltRight className="button-icon" />
                            </Link>
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

      {/* -------------------------PREMIUM SECTION------------------------------ */}

      <div className="container-fluid  section-standard-height-2 background-home-product-first">
        <div className="container card  product-section ">
          <div className="row">
            <div className="col-xl-12 col-md-12  col-sm-12 p-0"></div>
            <div className="container p-0 card">
              <div className="text-group" style={{ background: " #f1f1f1" }}>
                <div className="ribbon-3 ribbon">
                  <h4 className="text-ribbon">Best Seller</h4>
                </div>
                <h2 className="card-header   text-muted ">{premium.name}</h2>
              </div>
              <div className="side-card-padding">
                <div className="row">
                  <div className="col-xl-6 col-md-6 col-sm-12 p-0">
                    <div className="card">
                      <ReactPlayer
                        url="https://www.youtube.com/watch?v=c6pkHIrIgTI"
                        className="react-player"
                        width="100%"
                        height="400px"
                        controls
                        playing
                        light="https://res.cloudinary.com/djnv06fje/image/upload/v1575729784/maxresdefault_3_ouz9o1.jpg"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-md-6 col-sm-12">
                    <div className="row">
                      <div className="col-xl-6 col-md-6 col-sm-12">
                        <div className="pt-4 text-left">
                          <p>
                            <FaCheckCircle className="FaCheckCircle" />
                            Customized Floorplan
                          </p>

                          <p>
                            <FaCheckCircle className="FaCheckCircle" />
                            Door-Windows Designs
                          </p>

                          <p>
                            <FaCheckCircle className="FaCheckCircle" />
                            Other Site Work Drawings
                          </p>

                          <p>
                            <FaCheckCircle className="FaCheckCircle" />
                            3D-Front Elevation
                          </p>

                          <p>
                            <FaCheckCircle className="FaCheckCircle" />
                            Elevation Video Walkthru
                          </p>
                        </div>
                      </div>
                      <div className="col-xl-6 col-md-6 col-sm-12">
                        <div className="p-2 ">
                          <h6 className="text-center">Price As Per Sizes</h6>
                          <hr />
                          <TransitionGroup>
                            {premium.variants &&
                              premium.variants.length > 0 &&
                              premium.variants.map((item, index) => (
                                <Zoom className="text-left" key={item.id}>
                                  <p
                                    className=""
                                    style={{
                                      fontSize: "12px",
                                      textTransform: "none"
                                    }}
                                  >
                                    <FaTags
                                      style={{
                                        color: "red ",
                                        fontSize: "20px",
                                        marginBottom: "-5px",
                                        marginRight: "5px"
                                      }}
                                    />
                                    AREA UPTO {item.area} Sq.Ft. - Rs.
                                    {item.price}
                                  </p>
                                </Zoom>
                              ))}
                          </TransitionGroup>

                          <div className="mt-2 text-right">
                            <Link
                              className="btn btn-custom-1"
                              to={`/product/${premiumId}`}
                            >
                              <span>More Details</span>{" "}
                              <FaLongArrowAltRight className="button-icon" />
                            </Link>
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
    </div>
  );
};
export default MainPageProducts;
