import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import $ from "jquery";
import DataTable from "datatables.net";
import Sidemenu from "./Sidemenu";
import { Link } from "react-router-dom";
// var ManufacturerCount1='';
// var productCount1=''
var test = "";
const Dashboard = () => {
  const [Manufacturer, setManufacturer] = useState("");
  const [products, Setproducts] = useState("");
  const [Orders, setOrders] = useState("");
  const [users, setUsers] = useState("");
  const [categories, setCategories] = useState("");
  const [subCategories, setSubCategories] = useState("");
  useEffect(() => {
    setCount();
    GetUser();
    GetCategory();
    GetSubCategory();
    GetManufacturer();
    GetOrders();
    GetProducts();

    // Subtotal1 =  localStorage.getItem("Subtotal")
  }, []);
  const GetProducts = async () => {
    //await fetch("http://144.91.110.221:3033/api/product/all_product")
    await fetch("http://localhost:3033/api/product/all_product")
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data, "product");
        Setproducts(data.data.length);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const GetCategory = async () => {
    //await fetch("http://144.91.110.221:3033/api/category/all_category")
    await fetch("http://localhost:3033/api/category/all_category")
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
    //await fetch("http://144.91.110.221:3033/api/subcategory/all_subcategory")
    await fetch("http://localhost:3033/api/subcategory/all_subcategory")
      .then((res) => res.json())
      .then(async (data) => {
        setSubCategories(data.data.length);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const GetUser = async () => {
    //await fetch("http://144.91.110.221:3033/api/auth/allusers")
    await fetch("http://localhost:3033/api/auth/allusers")
      .then((res) => res.json())
      .then(async (data) => {
        setUsers(data.data.length);
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };
  const GetOrders = async () => {
    //await fetch("http://144.91.110.221:3033/api/order/all_order")
    await fetch("http://localhost:3033/api/order/all_order")
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data, "hello vineet");
        setOrders(data.data.length);
        //  console.log(" length "+data.data.length)
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };

  const GetManufacturer = async () => {
    //await fetch("http://144.91.110.221:3033/api/manufacture/all_manufacture")
    await fetch("http://localhost:3033/api/manufacture/all_manufacture")
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data, "hello");
        setManufacturer(data.data.length);
        console.log(data);
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };
  const setCount = async () => {
    //  await setManufacturerCount1(localStorage.getItem("ManufacturerCount"));
    // await  setproductCount1(JSON.parse(localStorage.getItem("TotalProduct")))
  };

  return (
    <>
      <div className="container-fluid nav__logo">
        {" "}
        <a href="/" style={{ cursor: "pointer" }}>
          <img
            src={require("../../Images/logo2.png")}
            className="dashboard-logo"
            alt="image"
          />
        </a>
      </div>
      <div id="body-pd">
        <Sidemenu />
        <main className="main">
          <div className="container">
            <div className="row cardsec-row">
              <div className="col-3">
                <Link to="/Manufacturer">
                  <div className="card cardsec">
                    <div className="row">
                      <div className="col-4">
                        <i className="bx bxs-user cardicon"></i>
                      </div>

                      <div className="col-8">
                        <h6 className="cardheads">Manufacturer </h6>
                        <span className="count">{Manufacturer}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-3">
                <div className="card cardsec">
                  <div className="row">
                    <div className="col-4">
                      <i className="bx bxs-user cardicon"></i>
                    </div>

                    <div className="col-8">
                      <Link to="/Orders">
                        <h6 className="cardheads">Users </h6>
                        <span className="count">{users}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <Link to="/Orders">
                  <div className="card cardsec">
                    <div className="row">
                      <div className="col-4">
                        <i className="bx bxs-cart cardicon"></i>
                      </div>
                      <div className="col-8">
                        <h6 className="cardheads">Orders </h6>
                        <span className="count">{Orders}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-3">
                <Link to="/ProductForm">
                  <div className="card cardsec">
                    <div className="row">
                      <div className="col-5">
                        <i className="bx bxs-user cardicon"></i>
                      </div>
                      <div className="col-7">
                        <h6 className="cardheads">Products </h6>
                        <span className="count">{products}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-3 pt-5">
                <Link to="/Category">
                  <div className="card cardsec">
                    <div className="row">
                      <div className="col-5">
                        <i className="bx bxs-user cardicon"></i>
                      </div>
                      <div className="col-7">
                        <h6 className="cardheads">Category </h6>
                        <span className="count">{categories}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-3 pt-5">
                <Link to="/SubCategoryCreation">
                  <div className="card cardsec">
                    <div className="row">
                      <div className="col-5">
                        <i className="bx bxs-user cardicon"></i>
                      </div>
                      <div className="col-7">
                        <h6 className="cardheads">Sub category</h6>
                        <span className="count">{subCategories}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          {/* <section className="chartsec">
            <div className="container ">
                <div className="row">
                    <div className="col-8">
                        <div className="card chart-card">
                            <h3 >Monthly Users</h3>
                        <div id="chartdiv"></div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card piechart-card">
                            <h3>Unresolved Complains</h3>
                        <div id="piechartdiv"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section> */}
        </main>
      </div>
    </>
  );
};
export default Dashboard;
