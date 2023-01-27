import React from "react";
import { Router } from "react-router";
import "../components/PageNotFound.css";
import { Link } from "react-router-dom";
import pageNotFound from "../Images/page-not-found.png";
import Footer from './Footer'
import Header1 from './Header1'

function PageNotFound() {
  return (
    <>
    <Header1/>
      <section className="page-not-found-page">
        <div className="container m-auto">
          <div className="row">
            <div className="col-8 mx-auto">
              <div className="d-flex justify-content-center align-items-center">
                <div>
                  <img src={pageNotFound} alt="" className="error-image" />
                  <p className="error-1">Page Not Found</p>
                  <p className="error-message">
                  We're sorry, the page you requested could not be found. Please click on the Homepage.
                  </p><div className="error-home-btn">
                  <button type="button">
                    <Link to="/">Back to Home</Link>
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer/>
        </div>
      </section>
    </>
  );
}

export default PageNotFound;
