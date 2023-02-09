import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import InProgressOrder from "./InProgressOrder";
import NewOrder from "./NewOrder";
import DeliveredOrder from "./DeliveredOrder";

import $ from "jquery";
var Userdata;

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
    window.location.replace("/");
  };

  return (
    <>
      {/* <div className="container-fluid"> <a href="#" className="nav__logo">
                    <img src={require('../../Images/logo2.png')}  className="dashboard-logo" alt="image" />
                    </a>
</div> */}
      <div
        id="body-pd "
        className="dasboard-nav"
        style={{ position: "relative" }}
      >
        {/* <section className="headsec">
          <header className="header" id="header">
            <div className="container headertoggle">
              <div className="row">
                <div className="col-2">
                  <div className="header__toggle">
                    <i
                      className="bx bx-menu header-toggle-button"
                      id="header-toggle"
                    ></i>
                  </div>
                </div>
                <div className="col-4">
                            <div className="input-group search-in">
                                <div className="form-outline">
                                    <input type="search" id="form1" className="form-control Dashborad-search" placeholder="Search" />
                                </div>
                                <button type="button" className="btn btn-primary search-button">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                <div className="col-6 avatar-icon">
                            <div className="d-flex">
                        <i className='bx bxs-user-circle' style={{fontSize:"18px"}}></i>
                        <h6 style={{fontSize:"16px"}}>Howdy Admin</h6>
                        </div>
                        </div>
              </div>
            </div>
          </header>
        </section> */}
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
                {/* <div className="col-4">
                            <div className="input-group search-in">
                                <div className="form-outline">
                                    <input type="search" id="form1" className="form-control Dashborad-search" placeholder="Search" />
                                </div>
                                <button type="button" className="btn btn-primary search-button">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                <div className="col-6 avatar-icon">
                            <div className="d-flex">
                        <i className='bx bxs-user-circle' style={{fontSize:"18px"}}></i>
                        <h6 style={{fontSize:"16px"}}>Howdy Admin</h6>
                        </div>
                        </div> */}
              </div>
            </div>
          </header>
          <nav className="nav">
            <div>
              {/* <a href="#" className="nav__logo">
                    <img src={require('../../Images/logo2.png')}  className="dashboard-logo" alt="image" />
                    </a> */}

              <div className="nav__list">
                <Link to="Dashboard" className="nav__link active">
                  <i className="bx bx-grid-alt nav__icon"></i>
                  <span className="nav__name">Dashboard</span>
                </Link>
                <Link to="#" className="nav__link active">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <div className="d-flex align-items-center justify-content-center div1">
                        <i className="bx bx-dish nav__icon"></i>
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
                                      {/* <Link to="/Warehouse">
                                        {" "}
                                        <li>Warehouse</li>
                                      </Link> */}
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
                  <i className="bx bx-folder nav__icon"></i>
                  <span className="nav__name">All_Manufacture</span>
                </Link>
                 <Link to="/AllCategoriesDetails" className="nav__link">
                  <i className="bx bx-folder nav__icon"></i>
                  <span className="nav__name">All_Category</span>
                </Link>
                <Link to="/AllSubCategoriesDetails" className="nav__link">
                  <i className="bx bx-folder nav__icon"></i>
                  <span className="nav__name">All_SubCategory</span>
                </Link>
                <Link to="/ProductForm" className="nav__link">
                  <i className="bx bx-folder nav__icon"></i>
                  <span className="nav__name">Products</span>
                </Link>
                <Link to="/AllProductsDetails" className="nav__link">
                  <i className="bx bx-folder nav__icon"></i>
                  <span className="nav__name">All_Products</span>
                </Link>

                {/* <Link  className="nav__link configration">
                           <i className='bx bx-message-alt-check nav__icon'></i>
                            <span className="nav__name">Configration</span>
                        </Link> */}
              </div>
            </div>

            <div className="nav__link" onClick={() => logout()}>
              <i className="bx bx-log-out nav__icon"></i>
              <span className="nav__name" style={{ cursor: "pointer" }}>
                Log Out
              </span>
            </div>

            {/* accordin start */}

            {/* Accordin end */}
          </nav>
        </div>
      </div>
    </>
  );
};
export default Sidemenu;
