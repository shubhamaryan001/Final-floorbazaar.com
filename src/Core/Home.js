import React, { Component } from "react";
import ModalVideo from "react-modal-video";
import { FaPlay } from "react-icons/fa";
import Typed from "react-typed";
import Slide from "react-reveal/Slide";
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
                    <div className="header text-left">
                      <h4
                        className="mb-0"
                        style={{ fontSize: "25px", fontWeight: "600" }}
                      >
                        WE'LL GET YOUR PROJECT DONE
                      </h4>
                      <small>One stop solution for all your needs.</small>
                    </div>
                    <div className="sections">
                      <div className="block-1 pt-2">
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

                      <div className="block-1">
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

                      <div className="block-1 ">
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
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-8 col-md-8 col-sm-12 align-self-center">
                <div className="container-fluid p-0">
                  <div className="card  left-box">
                    <p style={{ fontSize: "20px", textAlign: "center" }}>
                      PREMIUM BUT AFFORDABLE SERVICES FOR EVERYONE​ ​
                      RESIDENTIAL OR COMMERCIAL PROJECTS ​ GET EVERYTHING ONLINE
                      . ALL ACROSS INDIA
                    </p>
                    <div className="content-left text-center">
                      <h2
                        style={{
                          fontSize: "50px",
                          fontWeight: "700",
                          color: "rgb(251, 162, 17)"
                        }}
                      >
                        FLOOR PLAN'S
                      </h2>

                      <h3
                        style={{
                          fontSize: "50px",
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
                      >
                        Buy Now
                      </Link>
                    </div>
                  </div>
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
