import React, { useEffect,useState,useContext } from "react";
import { Link } from "react-router-dom";
import "../views/landing/homepage.css";
import CurrencyContext from "../routes/ContextApi/CurrencyContext";
import $ from "jquery";
var Userdata="";
const Footer = () => {
  const { loginState, setLoginState } = useContext(CurrencyContext);
  const [isLogin, setIsLogin] = useState(loginState);
const ContactHandler=()=>{
  window.scroll(0,0);
}

const WishlistHandler=()=>{
  window.scroll(0,0);
}

useEffect(()=>{
  Userdata = JSON.parse(localStorage.getItem("Userdata"));
  // setLoginState(loginState);
  setIsLogin(loginState);
  window.scroll(0,0);
  console.log(Userdata,"helo userData");
},[loginState])

  return (
    <>
    <div className="container">
      <footer className="footer-area">
        <div className="container-fluid m-auto">
          <div className="row">
            <div className="col-lg-3 col-sm-6 col-md-6">
              <div className="single-footer-widget">
                <a className="logo d-inline-block" href="#">
                  <img
                src={require("../Images/new-logo.png")}
                alt="logo"
                className="logo2"
              />
                </a>
                <ul className="footer-contact-info">
                  
                  <li>
                    <span>Phone:</span>{" "}
                    <a href="tel:+91-7500872014">+91-7500872014</a>
                  </li>
                  <li>
                    <span>Email:</span>{" "}
                    <a href="mailto:info@nutrazik.com" target="_blank">
                    info@nutrazik.com
                    </a>
                  </li>
                  <li>
                    <span>Address:</span>{" "}
                    
                      NutraZik Corp 539 W. Commerce Suite #6696 Dallas, TX 75208{" "}
                    
                  </li>
                </ul>
                <ul className="social">
                  <li>
                    <a href="https://www.facebook.com/Nutrazik" target="_blank">
                      <i className="bx bxl-facebook-square"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/nutrazik" target="_blank">
                      <i className="bx bxl-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/nutrazik/" target="_blank">
                      <i className="bx bxl-instagram-alt"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/company/70941207/admin/" target="_blank">
                      <i className="bx bxl-linkedin-square"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://in.pinterest.com/nutrazik/" target="_blank">
                      <i className="bx bxl-pinterest"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-md-6">
              <div className="single-footer-widget">
                <h3>Information</h3>
                <ul className="link-list">
                  <li>
                    <Link to="/aboutus">About Us</Link>
                  </li>
                  <li>
                    <Link to="/ContactUs" onClick={ContactHandler}>Contact Us</Link>
                  </li>
                  <li>
                    <Link to='/privacy&policy'>Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/termsofservices">Terms &amp; Conditions</Link>
                  </li>
                  <li>
                    <Link to="/shippingPolicy">Shipping Policy</Link>
                  </li>
                  <li>
                  <Link to="/crpolicy">Return & Refund</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-md-6">
              <div className="single-footer-widget">
                <h3>Customer Care</h3>
                <ul className="link-list">
                  <li>
                    <Link to="/Faq">FAQs</Link>
                  </li>
                  <li>
                    {
                      Userdata===null ? 
                      <Link
                                
                      data-bs-toggle="modal"
                      data-bs-target={
                        Userdata == null ? "#exampleModal" : null
                      }
                    >
                      My Account
                    </Link> : 
                      <Link to="/MyAccount">My Account</Link>
                      
                      
                      
                    }
                 
                  </li>
                  <li>
                    <Link to="/UserOrder">Order History</Link>
                  </li>
                  
                  <li>
                    <Link to="/WishList" onClick={WishlistHandler}>Wishlist</Link>
                  </li>
                  <li>
                    <Link to="/support">Need Support?</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-md-6">
              <div className="single-footer-widget">
                <h3>Newsletter</h3>
                <p className="Subscribe">
                  Sign up for our mailing list to get the latest updates &amp;
                  offers.
                </p>
                <form className="newsletter-form">
                  <input
                    type="text"
                    className="input-newsletter"
                    placeholder="Enter your email address"
                    name="email"
                    required
                  />
                  <div className="align-items-center">
                    <button type="submit" className="default-btn">
                      Subscribe Now
                      <img
                        src={require("../Images/Icons/cib_telegram-plane.png")}
                        className="pl-2 pb-1"
                      />
                    </button>
                  </div>

                  <div id="validator-newsletter" className="form-result"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom-area container-fluid m-auto">
          <div className="container m-auto">
            <div className="row mt-0 align-items-center">
              <div className="col-lg-6 col-md-6 link-footer-first">
                <p>
                  Designed & Developed by <i className="bx bx-copyright"></i>2023
                  <a href="https://giksindia.com/" target='_blank' className="giks-link"> GIKSINDIA</a>
                </p>
              </div>
              <div className="col-lg-6 col-md-6 link-footer-second">
                <div className="payment-types">
                  <ul className="d-flex align-items-center justify-content-end">
                    <li>We accept payment via:</li>
                    <li>
                      <a href="#" target="_blank">
                        <img
                          src={require(".././Images/payment-types/visa.png")}
                          alt="image"
                        />
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <img
                          src={require(".././Images/payment-types/mastercard.png")}
                          alt="image"
                        />
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <img
                          src={require(".././Images/payment-types/paypal.png")}
                          alt="image"
                        />
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <img
                          src={require(".././Images/payment-types/descpver.png")}
                          alt="image"
                        />
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <img
                          src={require(".././Images/payment-types/american-express.png")}
                          alt="image"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
};
export default Footer;
