import React, { useEffect, useState } from "react";
import "./Dashboard.css";
//import "@ant - design/flowchart/dist/index.css";
import $ from "jquery";
import DataTable from "datatables.net";
import Sidemenu from "./Sidemenu";
import { Link, useLocation } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { GiFactory } from "react-icons/gi";
import { FiUserCheck } from "react-icons/fi";
import { GiBoxUnpacking } from "react-icons/gi";
import { BiCategory } from "react-icons/bi";
import { BsListNested } from "react-icons/bs";
import DashboardHeaader from "./DashboardHeaader";
import { baseUrl } from "../../utils/services";
import PageNotFound from "../PageNotFound";
import LineChart from "../../LineChart";
import PieChart from "../PieChart";

// var ManufacturerCount1='';
// var productCount1=''

const Dashboard = () => {
  const [Manufacturer, setManufacturer] = useState("");
  const [products, Setproducts] = useState("");
  const [Orders, setOrders] = useState("");
  const [users, setUsers] = useState("");
  const [categories, setCategories] = useState("");
  const [subCategories, setSubCategories] = useState("");
  const [localuser, setLocaluser] = useState("");
  const [blogs, setBlogs] = useState("");
  const [warehouse, setWarehouse] = useState("")
  var Userdata;

   

  useEffect(() => {
    setCount();
    GetUser();
    getAllBlogs();
    GetWarehouse();
    GetCategory();
    GetSubCategory();
    GetManufacturer();
    GetOrders();
    GetProducts();
    GetLocalUserData();
    GetBlogs();
  },[]);

  const GetLocalUserData = () => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    const users = Userdata;
    setLocaluser(users);
  };

  const GetProducts = async () => {
    await fetch(`${baseUrl}/api/product/all_product`)
      .then((res) => res.json())
      .then(async (data) => {
        Setproducts(data.data.length);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  const GetBlogs = async()=>{
    await fetch(`${baseUrl}/api/blogs/find_all_slug`)
    .then((res)=>res.json())
    .then(async (data)=>{
      setBlogs(data.data.length);
    })
  }
  const GetCategory = async () => {
    await fetch(`${baseUrl}/api/category/all_category`)
      .then((res) => res.json())
      .then(async (data) => {
        setCategories(data.data.length);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const GetWarehouse = async () => {
    await fetch(`${baseUrl}/api/warehouse/get_all_warehouse`)
      .then((res) => res.json())
      .then(async (data) => {
        setWarehouse(data.data.length); 
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const getAllBlogs = async () => {
    await fetch(`${baseUrl}/api/blogs/find_all_slug`)
      .then((res) => res.json())
      .then(async (data) => {
        setBlogs(data.data.length);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const GetSubCategory = async () => {
    await fetch(`${baseUrl}/api/subcategory/all_subcategory`)
      .then((res) => res.json())
      .then(async (data) => {
        setSubCategories(data.data.length);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const GetUser = async () => {
    await fetch(`${baseUrl}/api/auth/allusers`)
      .then((res) => res.json())
      .then(async (data) => {
        setUsers(data.data.length);
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };
  const GetOrders = async () => {
    await fetch(`${baseUrl}/api/order/all_order`)
      .then((res) => res.json())
      .then(async (data) => {
        setOrders(data.data.length);
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };

  const GetManufacturer = async () => {
    await fetch(`${baseUrl}/api/manufacture/all_manufacture`)
      .then((res) => res.json())
      .then(async (data) => {
        setManufacturer(data.data.length);
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };
  const setCount = async () => {
    //  await setManufacturerCount1(localStorage.getItem("ManufacturerCount"));
    // await  setproductCount1(JSON.parse(localStorage.getItem("TotalProduct")))
  };

  const logout = () => {
    localStorage.setItem("Userdata", null);
    window.location.replace("/");
  };
  return (
    <>
      {localuser && localuser.role === "superAdmin" || localuser.role === "Vendor" ? (
        <section id="body-pd">
          <div className="container-fluid">
            <DashboardHeaader />
            <div className="row px-0 dashboard-container">
              <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-4 sidebar-dashboard">
                <Sidemenu />
              </div>
              <div className="col-xl-10 col-lg-9 col-md-9 col-sm-8 col-8">
                <main className="main graph-main-div">
                  <div className="row cardsec-row">
                    <div className="col-lg-3 col-md-6 col-sm-6 col-12 pt-4">
                      <Link to="/AllManufactureDetails">
                        <div className="card cardsec">
                          <div className="row">
                            <div className="col-12">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <GiFactory className="cardicon" />
                                  <h6 className="cardheads">Manufacturer </h6>
                                </div>
                                <div>
                                  <span className="count1">{Manufacturer}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-6 col-12 pt-4">
                      <Link to="/AllUsers">
                        <div className="card cardsec">
                          <div className="row">
                            <div className="col-12">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <FiUserCheck className="cardicon" />
                                  <h6 className="cardheads">Users </h6>
                                </div>
                                <div>
                                  <span className="count1">{users}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-6 col-12 pt-4">
                      <Link to="/AllBlogs">
                        <div className="card cardsec">
                          <div className="row">
                            <div className="col-12">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <BsCartPlus className="cardicon" />
                                  <h6 className="cardheads">Blogs </h6>
                                </div>
                                <div>
                                  <span className="count1">{blogs}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6 col-12 pt-4">
                      <Link to="/AllProductsDetails">
                        <div className="card cardsec">
                          <div className="row">
                            <div className="col-12">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <GiBoxUnpacking className="cardicon" />
                                  <h6 className="cardheads">Products </h6>
                                </div>
                                <div>
                                  <span className="count1">{products}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6 col-12 pt-4">
                      <Link to="/AllCategoriesDetails">
                        <div className="card cardsec">
                          <div className="row">
                            <div className="col-12">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <BiCategory className="cardicon" />
                                  <h6 className="cardheads">Category </h6>
                                </div>
                                <div>
                                  <span className="count1">{categories}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6 col-12 pt-4">
                      <Link to="/AllSubCategoriesDetails">
                        <div className="card cardsec">
                          <div className="row">
                            <div className="col-12">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <BsListNested className="cardicon" />
                                  <h6 className="cardheads">Sub category</h6>
                                </div>
                                <div>
                                  <span className="count1">{subCategories}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6 col-12 pt-4">
                      <Link to="/AllWarehouseDetails">
                        <div className="card cardsec">
                          <div className="row">
                            <div className="col-12">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <BsListNested className="cardicon" />
                                  <h6 className="cardheads">Warehouse</h6>
                                </div>
                                <div>
                                  <span className="count1">{warehouse}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </main>
                <div className="container">
                <div className='row my-5'>
                <div className='col-md-6'>
                    <PieChart />
                  </div>
                  <div className='col-md-6'>
                    <LineChart />
                    </div> 
                    </div>
                    </div>
              </div>   
                </div>
                </div>
        </section>
    ):(
      <PageNotFound/>
    )
}

    </>
  );
};
export default Dashboard;
