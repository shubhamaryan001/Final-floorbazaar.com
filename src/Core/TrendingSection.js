import React, { useState, useEffect } from "react";
import { getProducts } from "./ApiCore";
import Carousel from "react-multi-carousel";
import { API } from "../config";
import Fade from "react-reveal/Fade";
import { Link, Redirect } from "react-router-dom";

import "react-multi-carousel/lib/styles.css";
import "../index.css";

const TrendingSection = () => {
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 1980, min: 800 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1360 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1360, min: 960 },
      items: 3
    },
    smalltab: {
      breakpoint: { max: 960, min: 0 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
        console.log(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
  }, []);

  return (
    <div className="container-fluid section-standard-height background-trending">
      <div className=" text-center heading-trending  mb-4 ">
        <h1 className="heading-first p-2 ">Trending Services</h1>
        <p
          className=""
          style={{ color: " rgb(166, 166, 166)", fontSize: "18px" }}
        >
          We stay on top of our industry by being experts in yours.
        </p>
      </div>
      <Fade center duration={2500}>
        <div className="container p-3" style={{ minWidth: "90%" }}>
          <div className="row">
            <div className="col-xl-12 col-md-12 col-sm-12">
              <div className="main-trending-part" style={{ margin: "0 auto" }}>
                <Carousel
                  swipeable={true}
                  draggable={false}
                  ssr={true}
                  infinite={true}
                  autoPlay={true}
                  transitionDuration={1000}
                  autoPlaySpeed={1000}
                  responsive={responsive}
                >
                  {productsByArrival &&
                    productsByArrival.length > 0 &&
                    productsByArrival.map((p, i) => {
                      return (
                        <div key={i} className="card trending-card m-2">
                          <img
                            className="card-img-top img-postion"
                            src={`${API}//product/photo/${p._id}`}
                            style={{ maxWidth: "100%", height: "225px" }}
                            alt={p.name}
                          />
                          <div className=" card heading-block text-left ">
                            <h6 className=" text-uppercase p-0 ">{p.name}</h6>
                          </div>

                          <div className="p-3">
                            <p className="card-text">
                              {p.short_description.substring(0, 150)}
                              <Link
                                className="text-muted ml-2"
                                to={`/product/${p._id}`}
                              >
                                Read More
                              </Link>
                            </p>
                            <div className="bottom-section-card p-3">
                              <div className="row">
                                <div className="col-md-6">
                                  <h4>₹{p.price}</h4>
                                </div>
                                <div className="col-md-6 text-right">
                                  <Link
                                    className="btn btn-raised btn-info"
                                    to={`/product/${p._id}`}
                                  >
                                    Know More
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default TrendingSection;
