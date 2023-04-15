import React, { useEffect } from "react";
import Header1 from "./Header1";
import Footer from "./Footer";
import ComingSoonImg from "../Images/Mobile-app.jpg";
import "../components/AppstoreNutrazik.css";
import { Link } from "react-router-dom";
import "../views/landing/homepage.css";

const AppStoreNutrazik = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <Header1 />
      <section className="Appstore-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="Left-Content">
                <div className="content-box">
                  <div className="heading-left">
                    <h2>Coming Soon...</h2>
                  </div>
                  <div className="Buttons-store">
                    <Link to="/AllProducts">
                      <button>Go To Shop</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="Right-Content">
                <div className="coming-soon-img">
                  <img src={ComingSoonImg}></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default AppStoreNutrazik;
