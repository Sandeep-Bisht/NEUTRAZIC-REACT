import React from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import Header1 from "./Header1";
import Baseline from "./Baseline";
import "../views/landing/homepage.css";
import { useForm } from "react-hook-form";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      mobilenumber: "",
      subject: "",
    },
    mode: "onBlur",
  });
  const RegisterUser = (data) => {
    console.log(data);
    reset();
  };
  return (
    <>
      <Header1 />

      <div className="first-nav container-fluid">
        <span>
          <Link to="/">Home</Link>/ Contact Us
        </span>
      </div>
      <section className="container contact-container-div">
        <div className="contact-info-area pt-70 pb-40">
          <div className="container-fluid contact-container">
            <div className="row">
              <div className="col-lg-3 col-sm-6 col-md-6 contact-card">
                <div className="single-contact-info-box">
                  <div className="icon">
                    <i className="flaticon-placeholder"></i>
                  </div>
                  <h3>Address</h3>
                  <p>
                    <a href="#" target="_blank">
                      Sujok Building, 2nd floor, mansarovar colony, Ballupur
                      Chowk, Ballupur, Dehradun, Uttarakhand 248001{" "}
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
                  <a href="tel:+91-7500872014">+91-7500872014</a>
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
                  <span>Email:</span>{" "}
                    <a href="mailto:info@nutrazik.com" target="_blank">
                    info@nutrazik.com
                    </a>
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-md-6">
                <div className="single-contact-info-box">
                  <div className="icon">
                    <i className="flaticon-clock"></i>
                  </div>
                  <h3>Working Hours</h3>
                  <p>Monday - Saturday</p>
                  <p>9:30AM - 6:30PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="contact-area pb-70">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-8 col-md-12">
                <div className="contact-form">
                  <span className="sub-title">Get In Touch</span>
                  <h2>We want to provide you with a great experience</h2>
                  <form id="contactForm" onSubmit={handleSubmit(RegisterUser)}>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="form-group">
                          <label>Full Name</label>
                          <input
                            type="text"
                            // name="name"
                            className="form-control"
                            id="name"
                            {...register("fullname", {
                              required: true,
                            })}
                          />
                          {errors?.fullname?.type === "required" && (
                            <p className="text-danger">
                              This field is required
                            </p>
                          )}
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
                            {...register("email", {
                              required: true,
                              pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.com+$/,
                            })}
                            // data-error="Please enter your email"
                          />
                          {errors?.email?.type === "required" && (
                            <p className="text-danger">
                              This field is required
                            </p>
                          )}
                          {errors?.email?.type === "pattern" && (
                            <p className="text-danger">
                              Please enter the valid Email
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="form-group">
                          <label>Mobile No.</label>
                          <input
                            type="text"
                            // name="phone_number"
                            className="form-control"
                            id="phone_number"
                            {...register("mobilenumber", {
                              required: true,
                            })}
                            // data-error="Please enter your phone number"
                            maxLength={10}
                          />
                          {errors?.mobilenumber?.type === "required" && (
                            <p className="text-danger">
                              This field is required
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="form-group">
                          <label>Subject</label>
                          <input
                            type="text"
                            // name="subject"
                            className="form-control"
                            id="subject"
                            {...register("subject", {
                              required: true,
                            })}
                          />
                          {errors?.subject?.type === "required" && (
                            <p className="text-danger">
                              This field is required
                            </p>
                          )}
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
                        <button type="submit" className="cosmetic-shop-now">
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
        <div className="container-fluid">
          <div id="maps">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3443.613646880765!2d78.00991851445086!3d30.33350551181559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39092a9d312d2add%3A0x2881f11554c636b7!2sGIKS%20INDIA%20PRIVATE%20LIMITED!5e0!3m2!1sen!2sin!4v1627904731571!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: "0", allowfullscreen: "", loading: "lazy" }}
            ></iframe>
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

export default ContactUs;
