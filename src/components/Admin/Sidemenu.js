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
import { FaShippingFast } from "react-icons/fa";
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
      {/* <div
        id="body-pd "
        className="dasboard-nav"
        style={{ position: "relative" }}
      >
        <div className="l-navbar" id="nav-bar">
        <header className="header" id="header">
        <div className="header__toggle">
                    <i
                      className="bx bx-menu header-toggle-button"
                      id="header-toggle"
                    ></i>
                  </div>
            <div className="container headertoggle">
              <div className="row">
                <div className="col-2">
                 
                </div>
                
              </div>
            </div>
          </header>
          <nav className="nav">
            <div>
             

              <div className="nav__list">
                <Link to="Dashboard" className="nav__link active">
                  <RxDashboard className="nav__icon"/>
                  <span className="nav__name">Dashboard</span>
                </Link>
                <Link to="#" className="nav__link active">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <div className="d-flex align-items-center justify-content-center div1">
                        <BsCartPlus className="nav__icon"/>
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
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
                      <div className="accordion-body">
                        <ul className="Configration-List">
                          <Link to={"/NewOrder/" + "Pending"}>
                            <li>New Orders</li>
                          </Link>
                          <Link to={"/NewOrder/" + "In Progress"}>
                            {" "}
                            <li>In Progress</li>
                          </Link>
                          <Link to={"/NewOrder/" + "Packed"}>
                            <li>Packed</li>
                          </Link>
                          <Link to={"/NewOrder/" + "Shipped"}>
                            <li>Shipped</li>
                          </Link>
                          <Link to={"/NewOrder/" + "Cancel"}>
                            <li>Cancel Order</li>
                          </Link>
                          <Link to={"/NewOrder/" + "Delivered"}>
                            {" "}
                            <li>Delivered</li>
                          </Link>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Link>
                {Userdata != undefined ? (
                  Userdata.role == "superAdmin" ||
                  Userdata.role == "Manager" ? (
                    <Link to="#" className="nav__link">
                      <span className="nav__name">
                        <div className="accordion" id="accordionExample">
                          <div className="accordion-item">
                            <h2 className="accordion-header" id="headingThree">
                              <div className="d-flex align-items-center justify-content-center div1">
                                <i className="bx bx-message-alt-check nav__icon"></i>

                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseThree"
                                  aria-expanded="false"
                                  aria-controls="collapseThree"
                                >
                                  <span className="pl-3 nav__name">
                                    {" "}
                                    Configration
                                  </span>
                                </button>
                              </div>
                            </h2>
                            <div
                              id="collapseThree"
                              className="accordion-collapse collapse"
                              aria-labelledby="headingThree"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                {Userdata != undefined ? (
                                  Userdata.role == "superAdmin" ? (
                                    <ul className="Configration-List">
                                      <Link to="/Manufacturer">
                                        <li>Manufacturer</li>
                                      </Link>
                                      <Link to="/Category">
                                        {" "}
                                        <li>Category</li>{" "}
                                      </Link>
                                      <Link to="/SubCategoryCreation">
                                        {" "}
                                        <li>SubCategory</li>
                                      </Link>
                                      <Link to="/Roles">
                                        {" "}
                                        <li>User Roles</li>
                                      </Link>
                                    </ul>
                                  ) : (
                                    <ul className="Configration-List">
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
                    </Link>
                  ) : null
                ) : null}
                 <Link to="/AllManufactureDetails" className="nav__link">
                  <GiFactory className="nav__icon"/>
                  <span className="nav__name">All_Manufacture</span>
                </Link>
                 <Link to="/AllCategoriesDetails" className="nav__link">
                  <BiCategory className="nav__icon"/>
                  <span className="nav__name">All_Category</span>
                </Link>
                <Link to="/AllSubCategoriesDetails" className="nav__link">
                  <BsListNested className="nav__icon"/>
                  <span className="nav__name">All_SubCategory</span>
                </Link>
                <Link to="/ProductForm" className="nav__link">
                  <i className="bx bx-folder nav__icon"></i>
                  <span className="nav__name">Products</span>
                </Link>
                <Link to="/AllProductsDetails" className="nav__link">
                  <GiBoxUnpacking className="nav__icon"/>
                  <span className="nav__name">All_Products</span>
                </Link>

                
              </div>
            </div>

            <div className="nav__link" onClick={() => logout()}>
              <BiLogOut className="nav__icon"/>
              <span className="nav__name" style={{ cursor: "pointer" }}>
                Log Out
              </span>
            </div>
          </nav>
        </div>
      </div> */}

      <div className="nav__list">
        <Link to="/Dashboard" className="nav__link active">
          <RxDashboard className="nav__icon" />
          <span className="nav__name">Dashboard</span>
        </Link>
        <div className="nav__link active">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <div className="d-flex align-items-center justify-content-center div1">
                <BsCartPlus className="nav__icon" />
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
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
                  <Link to={"/InProgressOrder/"+"Progress"}>
                    <li>
                      {" "}
                      <GrInProgress className="configuration-icons-wrap" />
                      In Progress
                    </li>
                  </Link>
                  <Link to={"/InProgressOrder/" + "Packed"}>
                    <li>
                      {" "}
                      <BsBox className="configuration-icons-wrap" />
                      Packed
                    </li>
                  </Link>
                  <Link to={"/InProgressOrder/" + "Shipped"}>
                    <li>
                      {" "}
                      <FaShippingFast className="configuration-icons-wrap" />
                      Shipped
                    </li>
                  </Link>
                  <Link to={"/InProgressOrder/" + "Cancel"}>
                    <li>
                      {" "}
                      <BsCartXFill className="configuration-icons-wrap" />
                      Cancel Order
                    </li>
                  </Link>
                  <Link to={"/InProgressOrder/" + "Delivered"}>
                    <li>
                      {" "}
                      <MdRealEstateAgent className="configuration-icons-wrap" />
                      Delivered
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {Userdata != undefined ? (
          Userdata.role == "superAdmin" || Userdata.role == "Manager" ? (
            <div className="nav__link">
              <span className="nav__name">
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <div className="d-flex align-items-center justify-content-center div1">
                        <GrConfigure className="nav__icon" />
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
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
                              <Link to="/Manufacturer">
                                <li>
                                  <GiFactory className="configuration-icons-wrap" />
                                  Add Manufacturer
                                </li>
                              </Link>
                              <Link to="/Category">
                                {" "}
                                <li>
                                  <BiCategory className="configuration-icons-wrap" />
                                  Add Category
                                </li>{" "}
                              </Link>
                              <Link to="/SubCategoryCreation">
                                {" "}
                                <li>
                                  <BsListNested className="configuration-icons-wrap" />
                                  Add SubCategory
                                </li>
                              </Link>
                              <Link to="/ProductForm">
                                {" "}
                                <li>
                                <GiBoxUnpacking className="configuration-icons-wrap" />
                                  Add Product
                                </li>
                              </Link>
                              <Link to="/Roles">
                                {" "}
                                <li>
                                  <RiUserSettingsLine className="configuration-icons-wrap" />
                                  User Roles
                                </li>
                              </Link>
                              <Link to="/AllManufactureDetails">
                                <li className="nav-name">
                                  <GiFactory className="configuration-icons-wrap" />
                                  All Manufacturer
                                </li>
                              </Link>
                              <Link to="/AllCategoriesDetails">
                                <li>
                                  <BiCategory className="configuration-icons-wrap" />
                                  All Category
                                </li>
                              </Link>
                              <Link to="/AllSubCategoriesDetails">
                                <li>
                                  <BsListNested className="configuration-icons-wrap" />
                                  All SubCategory
                                </li>
                              </Link>
                              <Link to="/AllProductsDetails">
                                <li>
                                  <GiBoxUnpacking className="configuration-icons-wrap" />
                                  All Products
                                </li>
                              </Link>
                            </ul>
                          ) : (
                            <ul className="Configration-List">
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
        {/* <Link to="/AllManufactureDetails" className="nav__link">
          <GiFactory className="nav__icon" />
          <span className="nav__name">All Manufacturer</span>
        </Link> */}
        {/* <Link to="/AllCategoriesDetails" className="nav__link">
          <BiCategory className="nav__icon" />
          <span className="nav__name">All Category</span>
        </Link> */}
        {/* <Link to="/AllSubCategoriesDetails" className="nav__link">
          <BsListNested className="nav__icon" />
          <span className="nav__name">All SubCategory</span>
        </Link> */}
        {/* <Link to="/ProductForm" className="nav__link">
          <FaBoxOpen className="nav__icon" />
          <span className="nav__name">Products</span>
        </Link> */}
        <Link to="/AllUsers" className="nav__link">
          
          <AiOutlineUser className="nav__icon" />
          <span className="nav__name">IAM</span>
        </Link>
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
