import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import { RxDashboard } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import { GiFactory } from "react-icons/gi";
import { BiCategory } from "react-icons/bi";
import { BsListNested } from "react-icons/bs";
import { GiBoxUnpacking } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";
import { FaBoxOpen } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { BsBox } from "react-icons/bs";

import { FaBlogger } from "react-icons/fa";
import { FaShippingFast, FaWarehouse } from "react-icons/fa";
import { BsCartXFill } from "react-icons/bs";
import { MdRealEstateAgent } from "react-icons/md";
import { GrConfigure } from "react-icons/gr";
import { RiUserSettingsLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";

import $ from "jquery";
var Userdata = "";

const Sidemenu = () => {
  const SidebarMenu = () => {
    /*===== SHOW NAVBAR  =====*/

    const showNavbar = (toggleId, navId, bodyId, headerId) => {
      const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId),
        bodypd = document.getElementById(bodyId),
        headerpd = document.getElementById(headerId);

      // Validate that all variables exist
      if (toggle && nav && bodypd && headerpd) {
        toggle.addEventListener("click", () => {
          // show navbar
          nav.classList.toggle("show");
          // change icon
          toggle.classList.toggle("bx-x");
          // add padding to body
          bodypd.classList.toggle("body-pd");
          // add padding to header
          // headerpd.classList.toggle('body-pd')
        });
      }
    };

    showNavbar("header-toggle", "nav-bar", "body-pd", "header");

    /*===== LINK ACTIVE  =====*/

    const linkColor = document.querySelectorAll(".nav__link");
    function colorLink() {
      if (linkColor) {
        linkColor.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");
      }
    }
    linkColor.forEach((l) => l.addEventListener("click", colorLink));
    $(document).ready(function() {
      $("#example").DataTable();
    });
  };

  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    SidebarMenu();
  });

  const logout = () => {
    localStorage.setItem("Userdata", null);
    toast.success("Logout Successfully", {
      position: "bottom-right",
      autoClose: 1000,
    });
    window.location.replace("/");
  };

  return (
    <> 

      <div className="nav__list">
        <Link to="/Dashboard" className="nav__link active">
          <RxDashboard className="nav__icon" />
          <span className="nav__name">Dashboard</span>
        </Link>
        <div className="nav__link active">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <div className="d-flex align-items-center justify-content-center div1"
               type="button"
               data-bs-toggle="collapse"
               data-bs-target="#collapseTwo"
               aria-expanded="false"
               aria-controls="collapseTwo"
               >
                <BsCartPlus className="nav__icon" />
                <button
                   className="accordion-button collapsed"
                   type="button"
                >
                  <span className="pl-3 nav__name">Orders</span>
                </button>
              </div>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div className="dashboard-accordion-body">
                <ul className="Configration-List">
                  <Link to={"/NewOrder/" + "Pending"}>
                    <li>
                      {" "}
                      <FaCartPlus className="configuration-icons-wrap" />
                      New Orders
                    </li>
                  </Link>
                  <Link to={"/InProgressOrderInProgress"}>
                    <li>
                      {" "}
                      <GrInProgress className="configuration-icons-wrap" />
                      In Progress
                    </li>
                  </Link>
                  <Link to={"/InProgressOrderPacked"}>
                    <li>
                      {" "}
                      <BsBox className="configuration-icons-wrap" />
                      Packed
                    </li>
                  </Link>
                  <Link to={"/InProgressOrderShipped"}>
                    <li>
                      {" "}
                      <FaShippingFast className="configuration-icons-wrap" />
                      Shipped
                    </li>
                  </Link>
                  <Link to={"/DeliveredOrder"}>
                    <li>
                      {" "}
                      <MdRealEstateAgent className="configuration-icons-wrap" />
                      Delivered
                    </li>
                  </Link>
                  <Link to={"/CanceledOrder"}>
                    <li>
                      {" "}
                      <BsCartXFill className="configuration-icons-wrap" />
                      Cancel Order
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {Userdata != undefined ? (
          Userdata.role == "superAdmin" || Userdata.role == "Vendor" ? (
            <div className="nav__link">
              <span className="nav__name">
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <div className="d-flex align-items-center justify-content-center div1"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                      >
                        <GrConfigure className="nav__icon" />
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          
                        >
                          <span className="pl-3 nav__name">Configuration</span>
                        </button>
                      </div>
                    </h2>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="dashboard-accordion-body">                    
                              
                        {Userdata != undefined ? (
                          Userdata.role == "superAdmin" ? (
                            <ul className="Configration-List">
                              <Link to="/AllManufactureDetails">
                                <li className="nav-name">
                                  <GiFactory className="configuration-icons-wrap" />
                                  Manufacturer
                                </li>
                              </Link>
                              <Link to="/AllCategoriesDetails">
                                <li>
                                  <BiCategory className="configuration-icons-wrap" />
                                  Category
                                </li>
                              </Link>
                              <Link to="/AllSubCategoriesDetails">
                                <li>
                                  <BsListNested className="configuration-icons-wrap" />
                                  SubCategory
                                </li>
                              </Link>
                              <Link to="/AllProductsDetails">
                                <li>
                                  <GiBoxUnpacking className="configuration-icons-wrap" />
                                  Products
                                </li>
                              </Link>
                              {/* <Link to="/Blog">
                                <li>
                                  <FaBlogger className="configuration-icons-wrap" />
                                  Blog
                                  </li>
                                  </Link> */}

                              <Link to="/AllWarehouseDetails">
                                <li>
                                  <FaWarehouse className="configuration-icons-wrap" />
                                  Warehouse
                                </li>
                              </Link>
                            </ul>
                          ) : (
                            <ul className="Configration-List">
                              <Link to="/AllManufactureDetails">
                                <li className="nav-name">
                                  <GiFactory className="configuration-icons-wrap" />
                                  Manufacturer
                                </li>
                              </Link>
                              <Link to="/AllProductsDetails">
                                <li>
                                  <GiBoxUnpacking className="configuration-icons-wrap" />
                                  Products
                                </li>
                              </Link>
                              <Link to="/AllWarehouseDetails">
                                <li>
                                  <FaWarehouse className="configuration-icons-wrap" />
                                  Warehouse
                                </li>
                              </Link>
                              <Link to="/Roles">
                                {" "}
                                <li>User Roles</li>
                              </Link>
                            </ul>
                          )
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </span>
            </div>
          ) : null
        ) : null}

        <div className="nav__link active">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingfour">
              <div className="d-flex align-items-center justify-content-center div1"
               data-bs-toggle="collapse"
               data-bs-target="#collapsefour"
               aria-expanded="false"
               aria-controls="collapsefour"
               >

                <BsCartPlus className="nav__icon" />
                <button
                  className="accordion-button collapsed"
                  type="button"
                 
                >
                  <span className="pl-3 nav__name">IAM</span>
                </button>
              </div>
            </h2>
            <div
              id="collapsefour"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div className="dashboard-accordion-body">
                <ul className="Configration-List">
                  <Link to="/AllUsers">
                    <li>
                      <AiOutlineUser className="configuration-icons-wrap" />
                      Users
                    </li>
                  </Link>
                  <Link to="/Roles">
                    {" "}
                    <li>
                      <RiUserSettingsLine className="configuration-icons-wrap" />
                      User Roles
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="nav__link active">
          <div className="d-flex align-items-center justify-content-center div1">
            <Link to="/ALLBlogs">
              <FaBlogger className="nav__icon" />
              <span className="pl-3 nav__name"> Blogs</span>
            </Link>
          </div>
        </div>

        <div className="nav__link" onClick={() => logout()}>
          <BiLogOut className="nav__icon" />
          <span className="nav__name" style={{ cursor: "pointer" }}>
            Log Out
          </span>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
export default Sidemenu;
