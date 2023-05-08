import React, { useEffect, useState } from "react";
import Baseline from "../components/Baseline";
import { baseUrl } from "../utils/services";
import { useHistory } from "react-router-dom";
import "../components/userOrder.css";
// import "../views/landing/homepage.css";

import { Accordion, AccordionTab } from "primereact/accordion";
import product from "../Images/abayakasthaa-image.png";
import {
  Table,
  Input,
  Space,
  Popconfirm,
  Typography,
  Dropdown,
  Modal,
  Button,
} from "antd";
import { BiSearchAlt } from "react-icons/bi";
import { MdPlaylistAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { render } from "react-dom";
import Header1 from "../components/Header1";
import Footer from "../components/Footer";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

var Userdata = "";
const UserOrder = () => {
  const [orders, setOrders] = useState([]);
  const [OrderDetails, setOrderDetails] = useState([]);
  const [filteredData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [PendingOrders, setPendingOrders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [prticularUserOrder, setPrticularUserOrder] = useState([]);

  const history = useHistory();
  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    GetOrders();
    window.scrollTo(0, 0);
  }, []);

  const GetOrders = async () => {
    await fetch(`${baseUrl}/api/order/all_order`)
      .then((res) => res.json())
      .then(async (data) => {
        let arr1 = [];
        for (let item of data.data) {
          if (item.userid === Userdata._id) {
            arr1.push(item.order[0].order[0]);
          }
        }
        setFilterData(arr1);
        let arr = [];
        for (let item of data.data) {
          if (item.userid === Userdata._id) {
            arr.push(item);
          }
        }
        setOrderDetails(arr);
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };
  console.log(OrderDetails, "Checking for map");
  return (
    <>
      <Header1 />
      <section className="orders-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {OrderDetails &&
                OrderDetails.length > 0 &&
                OrderDetails.map((el, ind) => {
                  return (
                    <div className="Order-page">
                      <Accordion activeIndex={el._id}>
                        <AccordionTab
                          header={
                            <div className="container">
                              <div className="row">
                                <div className="orders-Header d-flex justify-content-between">
                                  <div className="col-md-12">
                                    <div className="row">
                                      <div className="col-md-3 d-flex justify-content-center">
                                        <div>
                                          <div className="orderno-heading">
                                            <h6 className="order-status-heading">
                                              Order Number
                                            </h6>
                                          </div>
                                          <p className="para-order-text">
                                            {el.order_no}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="col-md-3 d-flex justify-content-center">
                                        <div>
                                          <div className="orderno-heading">
                                            <h6 className="order-status-heading">
                                              Total Amount
                                            </h6>
                                          </div>
                                          <p className="para-order-text">
                                            ₹{el.totalamount}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="col-md-3 d-flex justify-content-center">
                                        <div>
                                          <div className="orderno-heading">
                                            <h6 className="order-status-heading">
                                              Order Status
                                            </h6>
                                          </div>
                                          {el.orderStatus === "Delivered" ? (
                                            <p
                                              className="para-text"
                                              style={{ color: "#4cd07d" }}
                                            >
                                              {el.orderStatus === "Cancel"}
                                            </p>
                                          ) : (
                                            <p
                                              className="para-text"
                                              style={{
                                                color:
                                                  "var(--toastify-color-error)",
                                              }}
                                            >
                                              {el.orderStatus}
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                      <div className="col-md-3 d-flex justify-content-center">
                                        <div>
                                          <div className="orderno-heading">
                                            <h6 className="order-status-heading">
                                              Order Date
                                            </h6>
                                          </div>
                                          <p
                                            className="para-text"
                                            style={{
                                              color: "rgb(76, 208, 125)",
                                            }}
                                          >
                                            {el.createdAt.slice(0, 10)}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          }
                        >
                          {el &&
                            el.order[0].order.map((item, ind) => {
                              console.log(
                                item.image,
                                "This is checking inside order number"
                              );
                              return (
                                <>
                                  <div className="row" key={ind}>
                                    <div className="col-md-12">
                                      <div className="row">
                                        <div className="col-md-2 d-flex  align-items-center">
                                          <div className="order-details-image">
                                            <img
                                              src={`${baseUrl}/${item.image}`}
                                              className="order-main-Image"
                                            ></img>
                                          </div>
                                        </div>
                                        <div className="col-md-4 d-flex  align-items-center">
                                          <div>
                                          <div className="Price-box">
                                            <h4 className="userorder-product">{item.name}</h4>
                                          </div>
                                          {/* <div className="Price-box">
                                            <h6>₹{item.singleprice}</h6>
                                          </div> */}
                                          <div className="Price-box">
                                            <Link to = {"/SingleProduct/"+item.productid}>
                                            <button className="Re-order-button">Buy it again</button>
                                            </Link>
                                          </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <hr />
                                </>
                              );
                            })}
                        </AccordionTab>
                      </Accordion>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default UserOrder;



