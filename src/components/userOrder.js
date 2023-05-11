import React, { useEffect, useState } from "react";
import Baseline from "../components/Baseline";
import { baseUrl } from "../utils/services";
import { useHistory, useLocation } from "react-router-dom";
import { useRef } from "react";
import "../components/userOrder.css";
// import "../views/landing/homepage.css";
// import ProgressBar from "./ProgressBar";

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
import { green } from "@mui/material/colors";
import { AiOutlineCheck } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";

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
  const [orderstatus, setOrderStatus] = useState();
  const location = useLocation();

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
  console.log(OrderDetails, "This is setting order status");
  return (
    <>
      <Header1 />

      <section className="orders-section">
        <div className="container">
          <span className="nav-text">
            <Link to="/" className="nav-text">
              Home
            </Link>
            {location.pathname}
          </span>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {OrderDetails &&
                OrderDetails.length > 0 &&
                OrderDetails.map((el, ind) => {
                  return (
                    <div className="Order-page">
                      <Accordion>
                        <AccordionTab
                          header={
                            <div className="container">
                              <div className="user-order-header">
                                <div className="row">
                                  <div className="col-md-6 col-12">
                                    <div className="row">
                                      <div className="col-md-12 col-12">
                                        <div className="progress-box-div">
                                          <div class="progress-div">
                                            {el.orderStatus !== "Cancel" ? (
                                              <div class="progress-box">
                                                <div class="progress">
                                                  {/* {el.orderStatus ===
                                                    "In-Progress" && (
                                                    <div className="progress-color active33"></div>
                                                  )} */}
                                                  {el.orderStatus ===
                                                    "Shipped" && (
                                                    <div className="progress-color active35"></div>
                                                  )}
                                                  {el.orderStatus ===
                                                    "Delivered" && (
                                                    <div className="progress-color active36"></div>
                                                  )}
                                                  {el.orderStatus ===
                                                    "Packed" && (
                                                    <div className="progress-color active34"></div>
                                                  )}

                                                  {/* Circle */}
                                                  {el.orderStatus ===
                                                    "In-Progress" && (
                                                    <div className="circle1 active11">
                                                      <AiOutlineCheck className="Check-icon" />
                                                    </div>
                                                  )}
                                                  {el.orderStatus ===
                                                    "Packed" && (
                                                    <div className="circle1 active12">
                                                      <AiOutlineCheck className="Check-icon" />
                                                    </div>
                                                  )}
                                                  {el.orderStatus ===
                                                    "Shipped" && (
                                                    <div className="circle1 active13">
                                                      <TbTruckDelivery className="Check-icon-shipped" />
                                                    </div>
                                                  )}
                                                  {el.orderStatus ===
                                                    "Delivered" && (
                                                    <div className="circle1 active14">
                                                      <AiOutlineCheck className="Check-icon" />
                                                    </div>
                                                  )}
                                                  {/* <div class="circle1 active14"></div> */}
                                                </div>
                                                <div className="progress-text">
                                                  {el.orderStatus ===
                                                  "In-Progress" ? (
                                                    <span className="status-Highligted">
                                                      In Progress
                                                    </span>
                                                  ) : (
                                                    <span>In Progress</span>
                                                  )}
                                                  {el.orderStatus ===
                                                  "Packed" ? (
                                                    <span className="status-Highligted">
                                                      Packed
                                                    </span>
                                                  ) : (
                                                    <span>Packed</span>
                                                  )}
                                                  {el.orderStatus ===
                                                  "Shipped" ? (
                                                    <span className="status-Highligted">
                                                      Shipped
                                                    </span>
                                                  ) : (
                                                    <span>Shipped</span>
                                                  )}
                                                  {el.orderStatus ===
                                                  "Delivered" ? (
                                                    <span className="status-Highligted-delivered">
                                                      Delivered
                                                    </span>
                                                  ) : (
                                                    <span>Delivered</span>
                                                  )}

                                                  {/* <span>Shipped</span>
                                                  <span>Delivered</span> */}
                                                </div>
                                              </div>
                                            ) : (
                                              <>
                                                <div class="progress-box">
                                                  <div class="progress">
                                                    <div className="progress-color active37"></div>
                                                    <div class="progress-text text-center">
                                                      <span className="text-danger mt-4">
                                                        Order Cancelled
                                                      </span>
                                                    </div>
                                                  </div>
                                                </div>
                                              </>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-12">
                                    <div className="row">
                                      <div className="col-md-12">
                                        <div className="row">
                                          <div className="col-md-4 col-12 d-flex justify-content-center">
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
                                          <div className="col-md-4 col-12 d-flex justify-content-center">
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
                                          <div className="col-md-4 col-12 d-flex justify-content-center">
                                            <div>
                                              <div className="orderno-heading">
                                                <h6 className="order-status-heading">
                                                  Order Date
                                                </h6>
                                              </div>
                                              <p className="para-text">
                                                {el.createdAt.slice(0, 10)}
                                              </p>
                                            </div>
                                          </div>
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
                                    <div className="see-user-order">
                                      <div className="col-md-12">
                                        <div className="row">
                                          <div className="col-md-2">
                                            <div className="order-details-image">
                                              <img
                                                src={`${baseUrl}/${item.image}`}
                                                className="order-main-Image"
                                              ></img>
                                            </div>
                                          </div>
                                          <div className="col-md-3">
                                            <div className="detail-box-order">
                                              <div>
                                                <div className="Price-box">
                                                  <h6 className="userorder-product">
                                                    {item.name}
                                                  </h6>
                                                </div>
                                                <div className="Price-box">
                                                  <h6 className="userorder-product">
                                                    <span>Qty:</span>
                                                    <sapn
                                                      style={{
                                                        color: "#28a745",
                                                      }}
                                                    >
                                                      {item.quantity}
                                                    </sapn>
                                                  </h6>
                                                </div>
                                                {/* <div className="Price-box">
                                            <h6>₹{item.singleprice}</h6>
                                          </div> */}
                                                <div className="Price-box"></div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-md-5">
                                            <div className="description-box">
                                              <div>
                                                <p>{item.description}</p>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-md-2">
                                            <div className="button-box">
                                              <div>
                                                <Link
                                                  to={
                                                    "/SingleProduct/" +
                                                    item.productid
                                                  }
                                                >
                                                  <button className="Re-order-button">
                                                    Buy it again
                                                  </button>
                                                </Link>
                                              </div>
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
