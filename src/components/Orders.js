import React from "react";
import Baseline from "./Baseline";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import "../components/singleproduct.css";
const Orders = () => {
  return (
    <>
      <div className="Orders-div">
        <h2>Orders</h2>
        <div className="orders">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-2">
                <img src={require("../Images/products/products-img3.jpg")} />
                <img src=""></img>
              </div>
              <div className="col-sm-9">
                <div className="row1 row">
                  <div className="div1 col-sm-10">
                    <span className="span1">Product Name</span>
                  </div>
                  <div className="div2 col-sm-2">
                    {" "}
                    <span className="span2">Price</span>
                  </div>
                </div>
                <div className=" row row2">
                  <div className="div1 col-sm-10">
                    <span className="span1">Alcohol Free Matcha Toner</span>
                  </div>
                  <div className="div2 col-sm-2">
                    {" "}
                    <span className="span2">$899</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="orders mt-5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-2">
                <img src={require("../Images/products/products-img3.jpg")} />
              </div>
              <div className="col-sm-9">
                <div className="row1 row">
                  <div className="div1 col-sm-10">
                    <span className="span1">Product Name</span>
                  </div>
                  <div className="div2 col-sm-2">
                    {" "}
                    <span className="span2">Price</span>
                  </div>
                </div>
                <div className=" row row2">
                  <div className="div1 col-sm-10">
                    <span className="span1">Alcohol Free Matcha Toner</span>
                  </div>
                  <div className="div2 col-sm-2">
                    {" "}
                    <span className="span2">$899</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="orders mt-5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-2">
                <img src={require("../Images/products/products-img3.jpg")} />
              </div>
              <div className="col-sm-9">
                <div className="row1 row">
                  <div className="div1 col-sm-10">
                    <span className="span1">Product Name</span>
                  </div>
                  <div className="div2 col-sm-2">
                    {" "}
                    <span className="span2">Price</span>
                  </div>
                </div>
                <div className=" row row2">
                  <div className="div1 col-sm-10">
                    <span className="span1">Alcohol Free Matcha Toner</span>
                  </div>
                  <div className="div2 col-sm-2">
                    {" "}
                    <span className="span2">$899</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
