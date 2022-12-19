import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Component.css";

const Carouselcomp = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <>
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all 1"
        transitionDuration={1000}
        containerclassName="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        // deviceType={this.props.deviceType}
        dotListclassName="custom-dot-list-style"
        itemclassName="carousel-item-padding-40-px"
      >
        {/* <div className="container-fluid"> */}
        <div className="container-fluid container-carousel  ">
          <div className="row align-ment carousel-row">
            <div className="col-0"></div>
            <div className="col-lg-8 col-sm-12 p-0">
              <div id="banner">
                <a href="/">
                  {/* <div id="target"></div> */}
                  <img src={require("../Images/headerposter-01.png")}></img>
                  <div id="badge">SAVE NOW!</div>
                  <div id="sale">
                    <span id="sale-text">30% off All Premium Products</span>
                    <br />
                    <span id="button">See Special</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="col-4 caresouel-4-p-main-div">
              <div className="caresouel-4-p-div">
                <div className="row mt-3">
                  <div className="col-6 justify-content-center carousel-images1 ">
                    <div className="container image-button">
                      <img
                        src={require("../Images/products/L1Sachet_400x 1.png")}
                        alt="image"
                        className=".img-button"
                      ></img>
                      {/* <div className="overlay"></div> */}
                      {/* <div className="button-hover"><button> ShopNow </button></div> */}
                    </div>

                    <div className="justify-content-center align-items-center d-flex caresouel-shop-div">
                      <button> Shop now</button>
                    </div>
                  </div>
                  <div className="col-6 justify-content-center carousel-images1 ">
                    <div className="container image-button">
                      <img
                        src={require("../Images/products/walk-easy-capsules-250x250.png")}
                        alt="image"
                        className=".img-button"
                      ></img>
                      {/* <div className="overlay"></div> */}
                      {/* <div className="button-hover"><button> ShopNow </button></div> */}
                    </div>

                    <div className="justify-content-center align-items-center d-flex caresouel-shop-div">
                      <button> Shop now</button>
                    </div>
                  </div>
                </div>

                <div className="row mt-0">
                  <div className="col-6 justify-content-center carousel-images1 ">
                    <div className="container image-button">
                      <img
                        src={require("../Images/products/TenchalotionListingcopy_400x-removebg-preview.png")}
                        alt="image"
                        className=".img-button"
                      ></img>
                      {/* <div className="overlay"></div> */}
                      {/* <div className="button-hover"><button> ShopNow </button></div> */}
                    </div>

                    <div className="justify-content-center align-items-center d-flex caresouel-shop-div">
                      <button> Shop now</button>
                    </div>
                  </div>
                  <div className="col-6 justify-content-center carousel-images1 ">
                    <div className="container image-button">
                      <img
                        src={require("../Images/products/Hepamax 1.png")}
                        alt="image"
                        className=".img-button"
                      ></img>
                      {/* <div className="overlay"></div> */}
                      {/* <div className="button-hover"><button> ShopNow </button></div> */}
                    </div>

                    <div className="justify-content-center align-items-center d-flex caresouel-shop-div">
                      <button> Shop now</button>
                    </div>
                  </div>

                  {/* <div className="row mt-4 shop-button ">
      <div className="col-sm-12 justify-content-center d-flex">
        <button>Shop Now</button>
        </div>
      </div> */}
                </div>
              </div>
              {/* <div className="col-2"><i className='bx bx-chevron-left carousel-LR'></i> <i className='bx bx-chevron-right carousel-LR ml-2'></i></div> */}
            </div>
            {/* <div className="col-1"></div> */}
          </div>
        </div>
        <div className="container-fluid container-carousel pt-5 pb-5">
          <div className="row align-ment mt-5 carousel-row">
            {/* <div className="col-1"></div> */}
            <div className="col-4">
              <p className="text-primary1">Premium Quality</p>
              <p className="heading">Surgical Mask With A Protective Layer</p>
              <p className=" heading mt-4">
                Using a 5 layers surgical mask, we can protect ourselves from
                various germs. Everyone should use this 5 layers surgical mask
              </p>
              <button className="btn btn-primary carousel-button">
                <i className="bx bx-cart"></i> Buy now
              </button>
            </div>
            <div className="col-1"></div>
            <div className="col-4">
              <img
                src={require("../Images/header-image.png")}
                className="Carousel-img"
                alt="image"
              />
            </div>
            <div className="col-2">
              <i className="bx bx-chevron-left carousel-LR"></i>{" "}
              <i className="bx bx-chevron-right carousel-LR ml-2"></i>
            </div>
          </div>
        </div>
        <div className="container-fluid container-carousel pt-5 pb-5">
          <div className="row align-ment mt-5 carousel-row">
            <div className="col-1"></div>
            <div className="col-4">
              <p className="text-primary1">Premium Quality</p>
              <p className="heading">Surgical Mask With A Protective Layer</p>
              <p className=" heading mt-4">
                Using a 5 layers surgical mask, we can protect ourselves from
                various germs. Everyone should use this 5 layers surgical mask
              </p>
              <button className="btn btn-primary carousel-button">
                <i className="bx bx-cart"></i> Buy now
              </button>
            </div>
            <div className="col-1"></div>
            <div className="col-4">
              <img
                src={require("../Images/header-image.png")}
                className="Carousel-img"
                alt="image"
              />
            </div>
            <div className="col-2">
              <i className="bx bx-chevron-left carousel-LR"></i>{" "}
              <i className="bx bx-chevron-right carousel-LR ml-2"></i>
            </div>
          </div>
        </div>
        <div className="container-fluid container-carousel pt-5 pb-5">
          <div className="row align-ment mt-5 carousel-row">
            <div className="col-1"></div>
            <div className="col-4">
              <p className="text-primary1">Premium Quality</p>
              <p className="heading">Surgical Mask With A Protective Layer</p>
              <p className=" heading mt-4">
                Using a 5 layers surgical mask, we can protect ourselves from
                various germs. Everyone should use this 5 layers surgical mask
              </p>
              <button className="btn btn-primary carousel-button">
                <i className="bx bx-cart"></i> Buy now
              </button>
            </div>
            <div className="col-1"></div>
            <div className="col-4">
              <img
                src={require("../Images/abayakasthaa-image.png")}
                className="Carousel-img"
                alt="image"
              />
            </div>
            <div className="col-2">
              <i className="bx bx-chevron-left carousel-LR"></i>{" "}
              <i className="bx bx-chevron-right carousel-LR ml-2"></i>
            </div>
          </div>
        </div>
      </Carousel>

      {/* Phone Carousel */}
      {/* phone single page caresouel */}
      <div
        id="carouselExampleIndicators"
        className="carousel slide single-page-caresouel"
        data-bs-ride="carousel"
      >
        {/* <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div> */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={require("../Images/header-image.png")} />
          </div>
          <div className="carousel-item">
            <img src={require("../Images/header-image.png")} />
          </div>
          <div className="carousel-item">
            <img src={require("../Images/header-image.png")} />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* end phone single page careousel */}
      {/* End Phone Carousel */}
    </>
  );
};
export default Carouselcomp;
