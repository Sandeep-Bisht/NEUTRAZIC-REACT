import React, { useEffect } from "react";
import Header1 from "./Header1";
import "../components/NeedSupport.css";
import Footer from "./Footer";
import CustomerSupport from "../Images/Support/customerSupport.png";

function NeedSupport() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <Header1 />
      <section>
        <div className="container m-auto">
          <div className="Support-page-section">
            <div className="row">
              <div className="col-md-6">
                <div className="left-side-supportpage">
                  <div className="left-Heading">
                    <div>
                      <h1> Help and Support</h1>
                    </div>
                    <div className="support-left-text">
                      <p>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.
                      </p>
                    </div>
                    <div>
                      <button className="btn btn-primary">Learn More</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="right-side-supportpage">
                  <div className="support-page-image">
                    <img className="support-image" src={CustomerSupport}></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
export default NeedSupport;
