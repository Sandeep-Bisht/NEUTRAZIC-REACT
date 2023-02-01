import React from "react";
import { Router } from "react-router";
import "../components/PageNotFound.css";
import { Link } from "react-router-dom";
import pageNotFound from "../Images/page-not-found.png";

function PageNotFound() {
  return (
    <>
      <section className="page-not-found-page">
        <div className="container m-auto">
          <div className="row mt-0">
            <div className="col-8 mx-auto">
              <div className="d-flex justify-content-center align-items-center">
                <div className="pt-5">
                  <img src={pageNotFound} alt="" className="error-image" />
                  <p className="error-1">Page Not Found</p>
                  <p className="error-message">
                  We're sorry, the page you requested could not be found. Please click on the Home.
                  </p><div className="error-home-btn">
                  <button type="button">
                    <Link to="/">Back to Home</Link>
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PageNotFound;
