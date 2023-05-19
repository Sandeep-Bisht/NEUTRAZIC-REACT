import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../views/landing/homepage.css";
import CurrencyContext from "../routes/ContextApi/CurrencyContext";
import $ from "jquery";
import { baseUrl } from "../utils/services";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from "axios";
import { SocialIcon } from 'react-social-icons';

var Userdata = "";
const Footer = () => {
  const {modalreset,setModalreset} = useContext(CurrencyContext);
  const { loginState, setLoginState } = useContext(CurrencyContext);
  const [isLogin, setIsLogin] = useState(loginState);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState();
  const [msg, setMsg] = useState();
  const ContactHandler = () => {
    window.scroll(0, 0);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
  });

  let { resetForm,setResetForm } = useContext(CurrencyContext);
  const clickModalResetHandler=()=>{
    if(resetForm===0)
    {
      setResetForm(1);
    }
    else{
      setResetForm(0);
    }
  }

  const WishlistHandler = () => {
    window.scroll(0, 0);
  };

  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    // setLoginState(loginState);
    setIsLogin(loginState);
    window.scroll(0, 0);
  }, [loginState]);

  const Subscribed = async (data) => {
    try{
      const response= await axios.post(`${baseUrl}/api/subscribed/subscribed`,
      {
       email:data.email,
      }
      )
      if(response && response.data.success===200)
      {
        setMessage(response.data.message);
        setInterval(function(){
          setMessage("");
          },5000);
      }
      else{
        setMsg(response.data.message);
        setInterval(function(){
          setMsg("");
          },5000);
      }
    }
    catch(error)
    {
      setMessage("User already subscribed")
      setInterval(function(){
        setMessage("");
        },5000);  
    }
    reset();  
  };

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
                      <span>Phone:</span >{" "}
                      <a href="tel:+91-7500872014">+91-7500872014</a>
                    </li>
                    <li>
                      <span>Email:</span>{" "}
                      <a href="mailto:info@nutrazik.com" target="_blank">
                        info@nutrazik.com
                      </a>
                    </li>
                    <li>
                      <span>Address:</span> NutraZik Corp 539 W. Commerce Suite
                      #6696 Dallas, TX 75208{" "}
                    </li>
                  </ul>
                  <ul className="social">
                    <li>
                      <a
                        href="https://www.facebook.com/Nutrazik"
                        target="_blank"
                      >
                      <SocialIcon className="social-react-icons" network="facebook" bgColor="#fff"/>
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/nutrazik" target="_blank">
                      <SocialIcon className="social-react-icons" network="twitter" bgColor="#fff"/>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/nutrazik/"
                        target="_blank"
                      >
                      <SocialIcon className="social-react-icons" network="instagram" bgColor="#fff"/>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.linkedin.com/company/70941207/admin/"
                        target="_blank"
                      >
                      <SocialIcon className="social-react-icons" network="linkedin" bgColor="#fff"/>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://in.pinterest.com/nutrazik/"
                        target="_blank"
                      >
                      <SocialIcon className="social-react-icons" network="pinterest" bgColor="#fff"/>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-md-6 col-6">
                <div className="single-footer-widget">
                  <h3>Information</h3>
                  <ul className="link-list">
                    <li>
                      <Link to="/aboutus">About Us</Link>
                    </li>
                    <li>
                      <Link to="/ContactUs" onClick={ContactHandler}>
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link to="/privacy&policy">Privacy Policy</Link>
                    </li>
                    <li>
                      <Link to="/terms&condition">Terms &amp; Conditions</Link>
                    </li>
                    <li>
                      <Link to="/shippingPolicy">Shipping Policy</Link>
                    </li>
                    <li>
                      <Link to="/return&refund">Return & Refund</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-md-6 col-6">
                <div className="single-footer-widget">
                  <h3>Customer Care</h3>
                  <ul className="link-list">
                    <li>
                      <Link to="/Faq">FAQs</Link>
                    </li>
                    <li>
                      {Userdata === null ? (
                        <Link
                          data-bs-toggle="modal"
                          data-bs-target={
                            Userdata == null ? "#exampleModal" : null
                          }
                          onClick={()=>clickModalResetHandler()}
                        >
                          My Account
                        </Link>
                      ) : (
                        <Link to="/MyAccount">My Account</Link>
                      )}
                    </li>
                    <li>
                      {Userdata === null ? (
                        <Link
                          data-bs-toggle="modal"
                          data-bs-target={
                            Userdata == null ? "#exampleModal" : null
                          }
                          onClick={()=>clickModalResetHandler()}
                        >
                          Order History
                        </Link>
                      ) : (
                        <Link to="/UserOrder">Order History</Link>
                      )}
                    </li>
                     
                     <li>
                      {Userdata === null ? (
                        <Link
                          data-bs-toggle="modal"
                          data-bs-target={
                            Userdata == null ? "#exampleModal" : null
                          }
                          onClick={()=>clickModalResetHandler()}
                        >
                          Wishlist
                        </Link>
                      ) : (
                        <Link to="/WishList">Wishlist</Link>
                      )}
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
                  <form
                    className="newsletter-form"
                    onSubmit={handleSubmit(Subscribed)}
                  >
                    <input
                      type="text"
                      className="input-newsletter"
                      placeholder="Enter your email address"
                      onInput={() => setMessage("")}
                      {...register("email", {
                        required: true,
                        pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.com+$/,
                      })}
                    />
                    {errors?.email?.type === "pattern" && (
                      <p className="text-danger">
                        Please enter Valid email Address
                      </p>
                    )}
                    <p className="sendSubscribeLink">{message}</p>
                    <p className="sendSubscribeError">{msg}</p>
                    <div className="align-items-center">
                        <button type="submit" className="default-btn">
                          Subscribe Now
                          <img
                            src={require("../Images/Icons/cib_telegram-plane.png")}
                            className="pl-2 pb-1"
                          />
                        </button>
                    </div>

                    <div
                      id="validator-newsletter"
                      className="form-result"
                    ></div>
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
                    Designed & Developed by <i className="bx bx-copyright"></i>
                    2023
                    <a
                      href="https://giksindia.com/"
                      target="_blank"
                      className="giks-link"
                    >
                      {" "}
                      GIKSINDIA
                    </a>
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
