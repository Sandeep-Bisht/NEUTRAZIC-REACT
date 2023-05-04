import React, { useEffect, useState } from "react";
import Baseline from "../components/Baseline";
import { baseUrl } from "../utils/services";
import { useHistory } from "react-router-dom";
import "../components/userOrder.css";
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

var Userdata = "";
const UserOrder = () => {
  const [orders, setOrders] = useState([]);
  const [OrderDetails, setOrderDetails] = useState([]);
  const [filteredData] = useState([]);
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

  const onChangeHandler = (e) => {
    setSearchVal(e.target.value);
    if (e.target.value === "") {
      GetOrders();
    }
  };
  const searchHandler = () => {
    const filteredData = orders.filter((value) => {
      return value.name.toLowerCase().includes(searchVal.toLowerCase());
    });
    setOrders(filteredData);
  };

  const showModal = (order) => {
    setPrticularUserOrder(order.order);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    { title: "Order No.", dataIndex: "order_no", key: "order_no" },
    { title: "Actual Amount.", dataIndex: "actualamount", key: "actualamount" },
    { title: "Paid Amount.", dataIndex: "totalamount", key: "totalamount" },
    {
      title: "View Order",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => showModal(record)}>
          See Order
        </Button>
      ),
    },
  ];
  const CustomCloseIcon = () => (
    <svg
      className="custom-close-icon-forget"
      viewBox="0 0 12 12"
      width="12"
      height="12"
    >
      <line x1="1" y1="11" x2="11" y2="1" strokeWidth="2" />
      <line x1="1" y1="1" x2="11" y2="11" strokeWidth="2" />
    </svg>
  );

  const imageHandler = (id) => {
    history.push("/SingleProduct/" + id);
  };

  return (
    <>
      {/* table modal */}

      <div class="modal-body">
        <Modal
          title="Order Details"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          closeIcon={<CustomCloseIcon />}
          className="forget-modal-body"
        >
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {prticularUserOrder &&
                prticularUserOrder.length > 0 &&
                prticularUserOrder.map((item, ind) => {
                  return (
                    <>
                      <tr key={ind}>
                        <td className="width-adjust-of-td">
                          <div className="width-adjust-of-image">
                            <img
                              onClick={() =>
                                imageHandler(item.order[0].productid)
                              }
                              style={{ cursor: "pointer" }}
                              src={`${baseUrl}/${item.order[0].image}`}
                            ></img>
                          </div>
                        </td>
                        <td>{item.order[0].name}</td>
                        <td>{item.order[0].singleprice}</td>
                        <td className="text-center">
                          <button
                            onClick={() => imageHandler(item.order[0].productid)}
                            type="button"
                            className="btn btn-primary button-order"
                          >
                            Re-Order
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </Modal>
      </div>

      {/* end modal */}
      <Header1 />
      <section id="body-pd">
        <div className="container user-order-div">
          <div className="row">
            <div className="col-md-1 col-sm-1  px-0"></div>
            <div className="col-md-10 col-sm-10 col-12">
              {OrderDetails && OrderDetails.length > 0 ? (
                <>
                  <div className="category-details-section">
                    <h3 className="all-category-head">Orders </h3>
                    <div className="all-category-search-wrap">
                      <input
                        type="text"
                        onChange={(e) => onChangeHandler(e)}
                        onKeyUp={searchHandler}
                        placeholder="Search.."
                        enterButton
                        style={{ position: "sticky", top: "0", left: "0" }}
                      />
                      <button type="button" className="dashboard-search-btn">
                        <BiSearchAlt />
                      </button>
                    </div>
                  </div>

                  <Table
                    rowKey="name"
                    dataSource={
                      filteredData && filteredData.length
                        ? filteredData
                        : OrderDetails
                    }
                    columns={columns}
                    loading={loading}
                    pagination={false}
                  />
                </>
              ) : (
                <>
                  <lottie-player
                    src="https://assets10.lottiefiles.com/packages/lf20_yRyM3f.json"
                    background="transparent"
                    speed="1"
                    style={{
                      width: "300px",
                      height: "300px",
                      margin: "auto",
                    }}
                    loop
                    autoplay
                  ></lottie-player>
                  <div className="row">
                    <div className="col-md-12">
                      <p className="text-center mt-3">No Order Placed yet</p>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="col-md-1 col-sm-1  px-0"></div>
          </div>
        </div>
      </section>
      <Baseline />
      <Footer />
    </>
  );
};

export default UserOrder;
