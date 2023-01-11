import React from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import Header1 from "./Header1";
import Baseline from "./Baseline";
import "../views/landing/homepage.css";

const ContactUs = () => {
  return (
    <>
      <Header1 />
      <div className="first-nav container-fluid">
        <span>
          <Link to="/">Home</Link>/ Contact Us
        </span>
      </div>

      <div className="contact-info-area pt-70 pb-40">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-sm-6 col-md-6">
              <div className="single-contact-info-box">
                <div className="icon">
                  <i className="flaticon-placeholder"></i>
                </div>
                <h3>Address</h3>
                <p>
                  <a href="#" target="_blank">
                    NutraZik Corp Devasenapathi Krishnan 539 W. Commerce Suite
                    #6696 Dallas, TX 75208{" "}
                  </a>
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-md-6">
              <div className="single-contact-info-box">
                <div className="icon">
                  <i className="flaticon-phone-ringing"></i>
                </div>
                <h3>Phone</h3>
                <p>
                  <a href="tel:16798">Hotline: 16798</a>
                </p>
                <p>
                  <a href="tel:+1234567898">Tech support: 0135-3557207</a>
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-md-6">
              <div className="single-contact-info-box">
                <div className="icon">
                  <i className="flaticon-email"></i>
                </div>
                <h3>Email</h3>
                <p>
                  <a href="cdn-cgi/l/email-protection.html#91f9f4fdfdfed1fcf4f5e0bff2fefc">
                    <span
                      className="__cf_email__"
                      data-cfemail="244c4148484b64494140550a474b49"
                    >
                      {" "}
                      info@giksindia.com
                    </span>
                  </a>
                </p>
                <p>
                  <a href="#">Skype: hello.MedQ</a>
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-md-6">
              <div className="single-contact-info-box">
                <div className="icon">
                  <i className="flaticon-clock"></i>
                </div>
                <h3>Working Hours</h3>
                <p>Sunday - Friday</p>
                <p>8:00AM - 8:00PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="contact-area pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="contact-form">
                <span className="sub-title">Get In Touch</span>
                <h2>We want to provide you with a great experience</h2>
                <form id="contactForm">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="form-group">
                        <label>Full Name</label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          id="name"
                          required=""
                          data-error="Please enter your name"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="form-group">
                        <label>Email Address</label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          id="email"
                          required=""
                          data-error="Please enter your email"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="form-group">
                        <label>Mobile No.</label>
                        <input
                          type="text"
                          name="phone_number"
                          className="form-control"
                          id="phone_number"
                          required=""
                          data-error="Please enter your phone number"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="form-group">
                        <label>Subject</label>
                        <input
                          type="text"
                          name="subject"
                          className="form-control"
                          id="subject"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="form-group">
                        <label>Message</label>
                        <textarea
                          name="message"
                          id="message"
                          className="form-control"
                          cols="30"
                          rows="6"
                          required=""
                          data-error="Please enter your message"
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <button type="submit" className="btn btn cosmetic-shop-now">
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="contact-image text-center">
                <img src={require("../Images/contact.png")} alt="image" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div id="maps">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3443.613646880765!2d78.00991851445086!3d30.33350551181559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39092a9d312d2add%3A0x2881f11554c636b7!2sGIKS%20INDIA%20PRIVATE%20LIMITED!5e0!3m2!1sen!2sin!4v1627904731571!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: "0", allowfullscreen: "", loading: "lazy" }}
        ></iframe>
      </div>
      <Baseline />
      <div className="go-top ">
        <i className="bx bx-up-arrow-alt"></i>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
