import React, { useState, useEffect } from "react";
import { read, listRelated } from "./ApiCore";
import { Link, Redirect } from "react-router-dom";
import { API } from "../config";
import { addItem } from "./CartHelper";
import renderHTML from "react-render-html";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";

import ReactPlayer from "react-player";
import TermsConditions from "./TermAndConditions";
import Carousel from "react-bootstrap/Carousel";
import { FaTags, FaPlay } from "react-icons/fa";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import "../index.css";
const ProductSingle = props => {
  let [product, setProduct] = useState({});

  const [price, setPrice] = useState();
  const [name, setName] = useState();
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const loadSingleProduct = productId => {
    read(productId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        setPrice(data.price);
        setName(data.name);

        // fetch related products
        listRelated(data._id).then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };
  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  const RenderVariant = e => {
    e.preventDefault();
    let price = e.target.dataset.price;
    let area = e.target.dataset.area;
    setPrice(e.target.dataset.price);
    let newProduct = product;
    if (product.name.includes("variant")) {
      product.name = product.name.split("variant")[0].trim();
    }
    product.name = `${product.name} variant - ${area} sq. ft.`;
    setName(product.name);
    newProduct.variantSelected = area + "sq. ft.";
    newProduct.price = parseInt(price);
    setProduct(newProduct);
  };

  const VideoShow = () => {
    if (product._id === "5de7b843438f401fbc563d3a") {
      return (
        <>
          <ReactPlayer
            url="https://www.youtube.com/embed/bhpKw3umAxE"
            className="react-player"
            width="100%"
            height="400px"
            controls
          />
        </>
      );
    } else if (product._id === "5debb2c7dfe05109846ed4ad") {
      return (
        <>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=4B4PubjVquk"
            className="react-player"
            width="100%"
            height="400px"
            controls
          />
        </>
      );
    } else if (product._id === "5dcc1f0504510f454493aa72") {
      return (
        <>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=c6pkHIrIgTI"
            className="react-player"
            width="100%"
            height="400px"
            controls
          />
        </>
      );
    }
  };

  const playIcon = () => {
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

  const ShowShortPic = () => {
    if (product._id === "5de7b843438f401fbc563d3a") {
      return (
        <>
          <div className="container-fluid card   mt-2 pt-1 pb-0 pl-3 pr-3 ">
            <div className="row ">
              <div className="col-xl-8 col-md-8 col-sm-6 col-6 p-1">
                <div className="short-box-content ">
                  <h3>
                    <u>LIST OF DRAWINGS PROVIDED</u>
                  </h3>
                  <ul>
                    <li>
                      Floor Planning <br />
                      <span className="ml-2" style={{ color: "#52C41A" }}>
                        (As Per Vaastu Norms)
                      </span>
                    </li>
                    <li>
                      Structure Drawings <br />
                      <span className="ml-2" style={{ color: "#52C41A" }}>
                        (Footing, Column, Beam, Lintel Slab, etc)
                      </span>
                    </li>
                    <li>Electrical & Plumbing Layout</li>
                    <li>Door-Window Deisgns</li>
                    <li>Other Site Work Drawings</li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-4 col-md-4 col-sm-6 col-6 p-1">
                <div className="card">
                  <div className="short-box-carsuel">
                    <Carousel>
                      <Carousel.Item>
                        <img
                          className="card-img-top "
                          src="https://res.cloudinary.com/djnv06fje/image/upload/v1576928446/BASIC%20PIC/03_wxm2td.jpg"
                          alt="First slide"
                        />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          className="card-img-top "
                          src="https://res.cloudinary.com/djnv06fje/image/upload/v1576928445/BASIC%20PIC/04_yy9yoi.jpg"
                          alt="Third slide"
                        />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          className="card-img-top "
                          src="https://res.cloudinary.com/djnv06fje/image/upload/v1576928445/BASIC%20PIC/05_etj3hm.jpg"
                          alt="Third slide"
                        />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          className="card-img-top "
                          src="https://res.cloudinary.com/djnv06fje/image/upload/v1576928445/BASIC%20PIC/05_etj3hm.jpg"
                          alt="Third slide"
                        />
                      </Carousel.Item>
                    </Carousel>
                  </div>
                  <div className="button-download text-center mt-1 ">
                    <Link className=" btn btn-sm btn-block  btn-warning">
                      Veiw Complete File
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 p-0">
                <div className="card">
                  <ReactPlayer
                    playing
                    url="https://www.youtube.com/embed/bhpKw3umAxE"
                    className="react-player"
                    controls
                    light="https://res.cloudinary.com/djnv06fje/image/upload/v1575724968/maxresdefault_1_vmd2ll.jpg"
                    playIcon={playIcon()}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else if (product._id === "5debb2c7dfe05109846ed4ad") {
      return (
        <>
          <div className="container-fluid card   mt-2 pt-2 pb-0 pl-3 pr-3 ">
            <div className="row ">
              <div className="col-xl-8 col-md-8 col-sm-6 col-6 p-1">
                <div className="short-box-content ">
                  <h3>
                    <u>LIST OF DRAWINGS PROVIDED</u>
                  </h3>
                  <ul>
                    <li>
                      Floor Planning <br />
                      <span className="ml-2" style={{ color: "#52C41A" }}>
                        (As Per Vaastu Norms)
                      </span>
                    </li>
                    <li>
                      Structure Drawings <br />
                      <span className="ml-2" style={{ color: "#52C41A" }}>
                        (Footing, Column, Beam, Lintel Slab, etc)
                      </span>
                    </li>
                    <li>Electrical & Plumbing Layout</li>
                    <li>Door-Window Deisgns</li>
                    <li>Other Site Work Drawings</li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-4 col-md-4 col-sm-6 col-6 p-1">
                <div className="card">
                  <div className="short-box-carsuel">
                    <Carousel>
                      <Carousel.Item>
                        <img
                          className="card-img-top "
                          src="https://res.cloudinary.com/djnv06fje/image/upload/v1576928446/BASIC%20PIC/03_wxm2td.jpg"
                          alt="First slide"
                        />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          className="card-img-top "
                          src="https://res.cloudinary.com/djnv06fje/image/upload/v1576928445/BASIC%20PIC/04_yy9yoi.jpg"
                          alt="Third slide"
                        />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          className="card-img-top "
                          src="https://res.cloudinary.com/djnv06fje/image/upload/v1576928445/BASIC%20PIC/05_etj3hm.jpg"
                          alt="Third slide"
                        />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          className="card-img-top "
                          src="https://res.cloudinary.com/djnv06fje/image/upload/v1576928445/BASIC%20PIC/05_etj3hm.jpg"
                          alt="Third slide"
                        />
                      </Carousel.Item>
                    </Carousel>
                  </div>
                  <div className="button-download text-center mt-1 ">
                    <Link className=" btn btn-sm btn-block  btn-warning">
                      Veiw Complete File
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 p-0">
                <div className="card">
                  <ReactPlayer
                    playing
                    url="https://www.youtube.com/watch?v=4B4PubjVquk"
                    className="react-player"
                    controls
                    light="https://res.cloudinary.com/djnv06fje/image/upload/v1575728334/maxresdefault_2_clzgfr.jpg"
                    playIcon={playIcon()}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else if (product._id === "5dcc1f0504510f454493aa72") {
      return (
        <>
          <div className="container-fluid card   mt-2 pt-2 pb-0 pl-3 pr-3 ">
            <div className="row ">
              <div className="col-xl-8 col-md-8 col-sm-6 col-6 p-1">
                <div className="short-box-content ">
                  <h3>
                    <u>LIST OF DRAWINGS PROVIDED</u>
                  </h3>
                  <ul>
                    <li>
                      Floor Planning <br />
                      <span className="ml-2" style={{ color: "#52C41A" }}>
                        (As Per Vaastu Norms)
                      </span>
                    </li>
                    <li>
                      Structure Drawings <br />
                      <span className="ml-2" style={{ color: "#52C41A" }}>
                        (Footing, Column, Beam, Lintel Slab, etc)
                      </span>
                    </li>
                    <li>
                      Front Elevation 3D Video Walkthru <br />
                      <span className="ml-2" style={{ color: "#52C41A" }}>
                        (1 - 1.5 Min Walkthru Video of Front Elevation)
                      </span>
                    </li>
                    <li>Electrical & Plumbing Layout</li>
                    <li>Door-Window Deisgns</li>
                    <li>Other Site Work Drawings</li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-4 col-md-4 col-sm-6 col-6 p-1">
                <div className="card">
                  <div className="short-box-carsuel">
                    <Carousel>
                      <Carousel.Item>
                        <img
                          className="card-img-top "
                          src="https://res.cloudinary.com/djnv06fje/image/upload/v1576928446/BASIC%20PIC/03_wxm2td.jpg"
                          alt="First slide"
                        />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          className="card-img-top "
                          src="https://res.cloudinary.com/djnv06fje/image/upload/v1576928445/BASIC%20PIC/04_yy9yoi.jpg"
                          alt="Third slide"
                        />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          className="card-img-top "
                          src="https://res.cloudinary.com/djnv06fje/image/upload/v1576928445/BASIC%20PIC/05_etj3hm.jpg"
                          alt="Third slide"
                        />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          className="card-img-top "
                          src="https://res.cloudinary.com/djnv06fje/image/upload/v1576928445/BASIC%20PIC/05_etj3hm.jpg"
                          alt="Third slide"
                        />
                      </Carousel.Item>
                    </Carousel>
                  </div>
                  <div className="button-download text-center mt-1 ">
                    <Link className=" btn btn-sm btn-block  btn-warning">
                      Veiw Complete File
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 p-0">
                <div className="card">
                  <ReactPlayer
                    playing
                    url="https://www.youtube.com/watch?v=c6pkHIrIgTI"
                    className="react-player"
                    controls
                    light="https://res.cloudinary.com/djnv06fje/image/upload/v1575729784/maxresdefault_3_ouz9o1.jpg"
                    playIcon={playIcon()}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <div className="container-fluid  section-standard-height">
      <div className="container product-box">
        <div className="row">
          <div className="col-xl-6 col-md-6 col-sm-12 p-2">
            <div className="card product-card-back">
              <div className="product-img-div">
                <img
                  className="card-img-top product-img"
                  src={`${API}/product/photo/${product._id}`}
                  alt={name}
                />
              </div>

              <div className="card product-content">
                <h4 className="product-name mb-0">{name}</h4>
              </div>

              <div className="card product-content-2">
                <h4 className="text-center text-muted">
                  Please Select Area Size
                </h4>
                <div className="row">
                  {product.variants &&
                    product.variants.length > 0 &&
                    product.variants.map((item, index) => (
                      <div
                        key={index}
                        className="col-xl-3 col-md-4 col-sm-6 col-6 text-center mb-2"
                      >
                        <div className="card">
                          <div
                            className="badge badge-danger"
                            data-area={item.area}
                            data-price={item.price}
                            onClick={RenderVariant}
                            style={{
                              cursor: "pointer"
                            }}
                          >
                            AREA UPTO {item.area} Sq.Ft.
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="row mt-2">
                  <div className="col-xl-12 col-md-12 col-sm-12 col-12">
                    <div className="Buy-option text-center">
                      <div className="row">
                        <div className="col-6">
                          <div className="price-block text-left">
                            <h4 className=" mt-2">
                              <FaTags
                                style={{
                                  color: "#52C41A",
                                  fontSize: "18px",
                                  marginRight: "5px",
                                  marginBottom: "-1.5px"
                                }}
                              />
                              ₹{price}
                            </h4>
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="buy-block text-right">
                            <button
                              className="btn btn-raised "
                              style={{
                                borderRadius: "30px",
                                color: "#fff",
                                background: "#52C41A"
                              }}
                            >
                              Buy Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-12 col-md-12 col-sm-12 col-12">
                {ShowShortPic()}
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-md-6 col-sm-12 p-2">
            <div className="card description-box pl-2 pr-2">
              <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Home">
                  <div className="pt-3">
                    <p>{ReactHtmlParser(product.description)}</p>
                  </div>
                </Tab>
                <Tab eventKey="term&condition" title="Term & Condition">
                  <TermsConditions />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSingle;
