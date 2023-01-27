import React, { useEffect, useState } from "react";
import "./Dashboard.css";
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
import UserImg from "../../Images/user3.jpg";
import AllManufactureDetails from "./AllManufacture/AllManufactureDetails";
import AllSubCategoriesDetails from "./AllSubCategory/AllSubCategoriesDetails";
import AllProductsDetails from "./AllProducts/AllProductsDetails";
import AllCategoriesDetails from "./AllCategory/AllCategoriesDetails";
import DashboardHeaader from "./DashboardHeaader";
import { baseUrl } from "../../utils/services"
import PageNotFound from "../PageNotFound";

// var ManufacturerCount1='';
// var productCount1=''

const Dashboard = () => {
  const [Manufacturer, setManufacturer] = useState("");
  const [products, Setproducts] = useState("");
  const [Orders, setOrders] = useState("");
  const [users, setUsers] = useState("");
  const [categories, setCategories] = useState("");
  const [subCategories, setSubCategories] = useState("");
  const [localuser,setLocaluser] = useState("");
  var Userdata;


  useEffect(() => {
    setCount();
    GetUser();
    GetCategory();
    GetSubCategory();
    GetManufacturer();
    GetOrders();
    GetProducts();
    GetLocalUserData();
    

    // Subtotal1 =  localStorage.getItem("Subtotal")
  }, []);

  const GetLocalUserData = ()=>{
    Userdata = JSON.parse( localStorage.getItem("Userdata"));
    const users = Userdata;
    setLocaluser(users);
  }
  


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
  const GetCategory = async () => {
    await fetch(`${baseUrl}/api/category/all_category`)
      .then((res) => res.json())
      .then(async (data) => {
        setCategories(data.data.length);
        // console.log("dsd dfz sf " + data.data.length);
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
        //  console.log(" length "+data.data.length)
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
        console.log(err,"errors");
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
    
    {
    localuser && localuser.role === "superAdmin"  ? (
      <section id="body-pd">
        <div className="container-fluid">
          <DashboardHeaader/>
      
        
          <div className="row">
            <div className="col-2 px-0">
              <Sidemenu />
            </div>
            <div className="col-10">
              <main className="main">
                <div className="row cardsec-row">
                  <div className="col-3">
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
                                <span className="count">{Manufacturer}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  
                  <div className="col-3">
                  <Link to = "/AllUsers">
                    <div className="card cardsec">
                      <div className="row">
                        <div className="col-12">
                          <div className="d-flex justify-content-between align-items-center">
                            
                            <div>
                              <FiUserCheck className="cardicon" />
                              <h6 className="cardheads">Users </h6>
                            </div>
                            <div>
                              
                                <span className="count">{users}</span>
                              
                            </div>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                    </Link>
                  </div>
                  
                  
                  <div className="col-3">
                    <Link to="/Orders">
                      <div className="card cardsec">
                        <div className="row">
                          <div className="col-12">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <BsCartPlus className="cardicon" />
                                <h6 className="cardheads">Orders </h6>
                              </div>
                              <div>
                                <span className="count">{Orders}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="col-3">
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
                                <span className="count">{products}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="col-3 pt-4">
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
                                <span className="count">{categories}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="col-3 pt-4">
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
                                <span className="count">{subCategories}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
        </section>
    ):(
      <>
      <PageNotFound/>
      </>
    )
}

    </>
  );
};
export default Dashboard;
