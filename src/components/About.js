import React, { useEffect } from "react";
import About1 from "../Images/about/about-1.png";
import About2 from "../Images/about/about-1.png";
import About3 from "../Images/about/about-1.png";
import About4 from "../Images/about/about-1.png";
import Header1 from "./Header1";
import Footer from "./Footer";
import Baseline from "./Baseline";



const About = () => {
  

  const responsiveOptions = [
    {
      breakpoint: "1399px",
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: "768px",
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const productTemplate = (image) => {
    return (
      <div className="product-item-1 text-center">
        <div className="product-item-content-1">
          <img src={image} alt="" className="product-image-1" />
          <p className="common-para colour-change">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p className="common-para colour-change-1">Name</p>
          <div></div>
        </div>
      </div>
    );
  };

  return (
    <>
    <Header1 />
      <section className="about-page">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="about-left-image">
                <img src={About1} alt="" className="img-fluid" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="about-right-text">
                <h1 className="common-heading-2">Our Story</h1>
                <p className="common-para text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section-2">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="about-section-2-header">
                <h2 className="common-heading">Who We Are</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 mx-auto">
              <div className="about-section-2-para">
                <p className="common-para text-center pb-5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="about-section-2-image">
                <img src={About2} alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section-3">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="our-team-left-text">
                <h3 className="common-heading-2">Our Team</h3>
                <p className="common-para text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <button className="login-btn mt-3">View all Team</button>
              </div>
            </div>
            <div className="col-md-8">
              <div className="our-team-right-carousel">
                <div className="carousel-demo">
                  <div className="card">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="our-vision-left-image">
                <img src={About3} alt="" className="img-fluid" />
              </div>
            </div>
            <div className="col-md-5 mx-auto">
              <div className="our-vision-right-text">
                <h4 className="common-heading-2">Our Vision</h4>
                <p className="common-para text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="easy-payment-left-text">
                <h5 className="common-heading-2">Easy payment method</h5>
                <p className="common-para text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="easy-payment-right-image">
                <img src={About4} alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section-6">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="about-page-carousel">
                <h6 className="common-heading">What is Everyone saying?</h6>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="about-main-carousel"></div>
          </div>
          <div className="carousel-demo">
            <div className="card">
            </div>
          </div>
        </div>
      </section>
      <Baseline />
      <div className="go-top ">
        <i className="bx bx-up-arrow-alt"></i>
      </div>
      <Footer />
      
    </>
  );
};

export default About;
