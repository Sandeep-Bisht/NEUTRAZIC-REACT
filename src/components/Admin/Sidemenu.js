import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Dashboard.css";
import { RxDashboard } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import { GiFactory } from "react-icons/gi";
import { BiCategory } from "react-icons/bi";
import { BsListNested } from "react-icons/bs";
import { GiBoxUnpacking } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";
import { FaCartPlus } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { BsBox } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { FaBlogger } from "react-icons/fa";
import { FaShippingFast, FaWarehouse } from "react-icons/fa";
import { BsCartXFill } from "react-icons/bs";
import { MdRealEstateAgent } from "react-icons/md";
import { GrConfigure } from "react-icons/gr";
import { RiUserSettingsLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";

var Userdata = "";

const Sidemenu = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const history = useHistory();
  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
  });
  const logout = () => {
    localStorage.setItem("Userdata", null);
    toast.success("Logout Successfully", {
      position: "bottom-right",
      autoClose: 1000,
    });
    history.push("/");
  };

  return (
    <>
      <div className="nav__list">
        <Link to="/Dashboard" className="nav__link active">
          <RxDashboard className="nav__icon" />
          <span className="nav__name">Dashboard</span>
        </Link>
        <div className="accordion" id="accordionExample">
        <div className="nav__link active">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <div className="d-flex align-items-center justify-content-center div1">
                <BsCartPlus className="nav__icon" />
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  <span className="pl-3 nav__name">Orders</span>
                </button>
              </div>
            </h2>
            <div
              id="collapseOne"
              className={`accordion-collapse collapse ${pathName.includes(
                "NewOrder"
              ) && "show"}`}
              aria-labelledby="headingOne"
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
                  <Link to={"/NewOrder/" + "InProgress"}>
                    <li>
                      {" "}
                      <GrInProgress className="configuration-icons-wrap" />
                      In Progress
                    </li>
                  </Link>
                  <Link to={"/NewOrder/" + "Packed"}>
                    <li>
                      {" "}
                      <BsBox className="configuration-icons-wrap" />
                      Packed
                    </li>
                  </Link>
                  <Link to={"/NewOrder/" + "Shipped"}>
                    <li>
                      {" "}
                      <FaShippingFast className="configuration-icons-wrap" />
                      Shipped
                    </li>
                  </Link>
                  <Link to={"/NewOrder/" + "Delivered"}>
                    <li>
                      {" "}
                      <MdRealEstateAgent className="configuration-icons-wrap" />
                      Delivered
                    </li>
                  </Link>
                  <Link to={"/NewOrder/" + "Canceled"}>
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
        {Userdata !== undefined ? (
          Userdata.role === "superAdmin"? (
            <div className="nav__link active">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <div className="d-flex align-items-center justify-content-center div1">
                      <GrConfigure className="nav__icon" />
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        <span className="pl-3 nav__name">Configuration</span>
                      </button>
                    </div>
                  </h2>
                  <div
                    id="collapseTwo"
                    className={`accordion-collapse collapse ${pathName.includes(
                      "Configuration"
                    ) && "show"}`}
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="dashboard-accordion-body">
                      {Userdata !== undefined ? (
                        Userdata.role === "superAdmin" ? (
                          <ul className="Configration-List">
                            <Link
                              to={"/Configuration/" + "AllManufactureDetails"}
                            >
                              <li className="nav-name">
                                <GiFactory className="configuration-icons-wrap" />
                                Manufacturer
                              </li>
                            </Link>
                            <Link
                              to={"/Configuration/" + "AllCategoriesDetails"}
                            >
                              <li>
                                <BiCategory className="configuration-icons-wrap" />
                                Category
                              </li>
                            </Link>
                            <Link
                              to={"/Configuration/" + "AllSubCategoriesDetails"}
                            >
                              <li>
                                <BsListNested className="configuration-icons-wrap" />
                                SubCategory
                              </li>
                            </Link>
                            <Link to={"/Configuration/" + "AllProductsDetails"}>
                              <li>
                                <GiBoxUnpacking className="configuration-icons-wrap" />
                                Products
                              </li>
                            </Link>
                            <Link
                              to={"/Configuration/" + "AllWarehouseDetails"}
                            >
                              <li>
                                <FaWarehouse className="configuration-icons-wrap" />
                                Warehouse
                              </li>
                            </Link>
                          </ul>
                        ) : (
                          <ul className="Configration-List">
                            <Link
                              to={"/Configuration/" + "AllManufactureDetails"}
                            >
                              <li className="nav-name">
                                <GiFactory className="configuration-icons-wrap" />
                                Manufacturer
                              </li>
                            </Link>
                            <Link to={"/Configuration/" + "AllProductsDetails"}>
                              <li>
                                <GiBoxUnpacking className="configuration-icons-wrap" />
                                Products
                              </li>
                            </Link>
                            <Link
                              to={"/Configuration/" + "AllWarehouseDetails"}
                            >
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
            </div>
          ) : 
          <div className="nav__link active">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <div className="d-flex align-items-center justify-content-center div1">
                  <GrConfigure className="nav__icon" />
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    <span className="pl-3 nav__name">Configuration</span>
                  </button>
                </div>
              </h2>
              <div
                id="collapseTwo"
                className={`accordion-collapse collapse ${pathName.includes(
                  "Configuration"
                ) && "show"}`}
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="dashboard-accordion-body">
                  {Userdata !== undefined ? (
                    Userdata.role === "vendor" ? (
                      <ul className="Configration-List">
                        <Link
                          to={"/Configuration/" + "AllManufactureDetails"}
                        >
                          <li className="nav-name">
                            <GiFactory className="configuration-icons-wrap" />
                            Manufacturer
                          </li>
                        </Link>
                        <Link
                          to={"/Configuration/" + "AllCategoriesDetails"}
                        >
                          <li>
                            <BiCategory className="configuration-icons-wrap" />
                            Category
                          </li>
                        </Link>
                        <Link
                          to={"/Configuration/" + "AllSubCategoriesDetails"}
                        >
                          <li>
                            <BsListNested className="configuration-icons-wrap" />
                            SubCategory
                          </li>
                        </Link>
                        <Link to={"/Configuration/" + "AllProductsDetails"}>
                          <li>
                            <GiBoxUnpacking className="configuration-icons-wrap" />
                            Products
                          </li>
                        </Link>
                        <Link
                          to={"/Configuration/" + "AllWarehouseDetails"}
                        >
                          <li>
                            <FaWarehouse className="configuration-icons-wrap" />
                            Warehouse
                          </li>
                        </Link>
                      </ul>
                    ) : (
                      <ul className="Configration-List">
                        
                        <Link to={"/Configuration/" + "AllProductsDetails"}>
                          <li>
                            <GiBoxUnpacking className="configuration-icons-wrap" />
                            Products
                          </li>
                        </Link>
                      </ul>
                    )
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        ) : null}

           {
            Userdata!==undefined && Userdata.role==="superAdmin" ?
              (
                <div className="nav__link active">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <div className="d-flex align-items-center justify-content-center div1">
                <BsCartPlus className="nav__icon" />
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  <span className="pl-3 nav__name">IAM</span>
                </button>
              </div>
            </h2>
            <div
              id="collapseThree"
              className={`accordion-collapse collapse ${pathName.includes(
                "IAM"
              ) && "show"}`}
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div className="dashboard-accordion-body">
                <ul className="Configration-List">
                  <Link to={"/IAM/"+"AllUsers"}>
                    <li>
                      <AiOutlineUser className="configuration-icons-wrap" />
                      Users
                    </li>
                  </Link>
                  <Link to={"/IAM/"+"Roles"}>
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
              )
              :
              null
           }
        
        <div className="nav__link active">
          <div className="d-flex align-items-center justify-content-center div1">
            <Link to="/ALLBlogs">
              <FaBlogger className="nav__icon" />
              <span className="pl-3 nav__name"> Blogs</span>
            </Link>
          </div>
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
