import React from "react";
import { Link, withRouter } from "react-router-dom";
import "../index.css";
import {
  FaUserCircle,
  FaAngleDoubleRight,
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagram,
  FaYoutubeSquare,
  FaAngleDoubleLeft
} from "react-icons/fa";
import { TiSocialInstagram } from "react-icons/ti";

const Footer = () => (
  <section className="container-fluid " id="footer">
    <div class="container  " style={{ minWidth: "80%" }}>
      <div class="row text-center  text-md-center">
        <div className="col-md-3">
          <div
            className="card bg-transparent text-left"
            style={{ boxShadow: "none" }}
          >
            <p className=" text-white">
              FloorPlanBazaar has the largest online database of Ready-to-Use
              Floor Plans. Thousands of homes have been built, remodeled and
              renovated using plans from FloorPlanBazaar.com
            </p>
            <img
              src="https://res.cloudinary.com/djnv06fje/image/upload/v1574864028/Copy_of_A1_i6w3xi.png"
              style={{ width: "250px", height: "125px" }}
              alt="floorplanbazaar"
            />
          </div>
        </div>

        <div class=" col-md-3">
          <div
            className="card bg-transparent text-center"
            style={{ boxShadow: "none" }}
          >
            <h5>PRODUCTS</h5>
            <ul class="list-unstyled quick-links">
              <li>
                <a href="#">
                  <FaAngleDoubleRight className="i" />
                  Floor Planning
                </a>
              </li>
              <li>
                <a href="#">
                  <FaAngleDoubleRight className="i" />
                  3D Front Elevation
                </a>
              </li>
              <li>
                <a href="#">
                  <FaAngleDoubleRight className="i" />
                  3D Floor Plans
                </a>
              </li>
              <li>
                <a href="#">
                  <FaAngleDoubleRight className="i" />
                  3D Interior Views
                </a>
              </li>
              <li>
                <a href="#">
                  <FaAngleDoubleRight className="i" />
                  3D Video Walkthru
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class=" col-md-3">
          <div
            className="card bg-transparent text-center"
            style={{ boxShadow: "none" }}
          >
            <h5>PACKAGES</h5>
            <ul class="list-unstyled quick-links">
              <li>
                <a href="#">
                  <FaAngleDoubleRight className="i" />
                  LUXURY House Design Package
                </a>
              </li>
              <li>
                <a href="#">
                  <FaAngleDoubleRight className="i" />
                  PREMIUM House Design Package
                </a>
              </li>
              <li>
                <a href="#">
                  <FaAngleDoubleRight className="i" />
                  MODERN House Design Package
                </a>
              </li>
              <li>
                <a href="#">
                  <FaAngleDoubleRight className="i" />
                  BASIC House Design Package
                </a>
              </li>
              <li>
                <a href="#">
                  <FaAngleDoubleRight className="i" />
                  Structure Drawings Package
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class=" col-md-3">
          <div
            className="card bg-transparent text-center"
            style={{ boxShadow: "none" }}
          >
            <div class="row ">
              <div class="  col-md-12  text-center">
                <ul class="list-unstyled list-inline social ">
                  <li class="list-inline-item">
                    <a
                      href="https://www.facebook.com/floorplanbazaar/"
                      target="_blank"
                    >
                      <FaFacebookSquare className="i" />
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a href="#" target="_blank">
                      <FaTwitterSquare className="i" />
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a
                      href="https://www.facebook.com/floorplanbazaar/"
                      target="_blank"
                    >
                      <TiSocialInstagram className="i" />
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a
                      href="https://www.youtube.com/channel/UCgSvEsQxUJpx6bIswJHcQ5w?view_as=subscriber"
                      target="_blank"
                    >
                      <FaYoutubeSquare className="i" />
                    </a>
                  </li>
                </ul>
              </div>
              <hr />
            </div>

            <div className="row">
              <div className="col-md-12">
                <ul class="list-unstyled quick-links">
                  <li>
                    <a href="#">
                      About Us <FaAngleDoubleLeft className="k" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Gallery
                      <FaAngleDoubleLeft className="k" />{" "}
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Career
                      <FaAngleDoubleLeft className="k" />{" "}
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Support
                      <FaAngleDoubleLeft className="k" />{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container-fluid p-2" style={{ background: "#1F1F1F" }}>
      <div class="row">
        <div class=" col-md-12 mt-2  text-center text-white">
          <p class="h6">
            Copyright © 2022 All Rights Reserved by Floor Plan Bazaar Pvt. Ltd |
            Design & Developed By
            <a
              className="ml-1"
              target="_blank"
              href="https://www.shubhamaryan.com/"
            >
              Shubham Aryan
            </a>
            .
          </p>
        </div>
        <hr></hr>
      </div>
    </div>
  </section>
);

export default withRouter(Footer);
