import React, { useEffect, useState } from "react";
// import DataTable from '@bit/adeoy.utils.data-table';
import Sidemenu from "./Sidemenu";
import "./Dashboard.css";
import { baseUrl } from "../../utils/services";
import DashboardHeaader from "./DashboardHeaader";
import {
  Table,
  Input,
  Space,
  Popconfirm,
  Typography,
  Dropdown,
  Modal,
} from "antd";
import { BiSearchAlt } from "react-icons/bi";
import { MdPlaylistAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";

const ShippedOrder = () => {
  const [orders, setOrders] = useState([]);
  const [OrderDetails, setOrderDetails] = useState([]);
  const [filteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [shippedOrder, setShippedOrder] = useState([]);
  const [orderItem, setOrderItem] = useState([]);
  useEffect(() => {
    GetOrders();
  }, []);

  const GetOrders = async () => {
    await fetch(`${baseUrl}/api/order/all_order`)
      .then((res) => res.json())
      .then(async (data) => {
        let arr = [];
        for (let item of data.data) {
          if (item.status == "Shipped") {
            arr.push(item);
          }
        }
        setOrderDetails(arr);
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };

  const UpdateOrderStatus = async (e, orderId, status) => {
    e.preventDefault();
    await fetch(`${baseUrl}/api/order/update_order`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: orderId,
        status: status,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        GetOrders();
        setIsModalVisible(false);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  const DeleteOrder = async (productId) => {
    await fetch(`${baseUrl}/api/order/delete_order_by_id`, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: productId,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        GetOrders();
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const CaptureDetails = (orders) => {
    setOrderDetails(orders);
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

  const showModal = (item) => {
    setShippedOrder(item.address);
    setOrderItem(item);
    setIsModalVisible(true);
  };

  const columns = [
    { title: "Order No.", dataIndex: "order_no", key: "order_no" },
    { title: "Paid Amount.", dataIndex: "totalamount", key: "totalamount" },
    {
      title: "Payment Status",
      dataIndex: "payment_status",
      key: "payment_status",
    },
    {
      title: "Status",
      key: "action",
      render: (_, item) => <a onClick={() => showModal(item)}>Shipped</a>,
    },
  ];
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      {/* table modal */}
      
       
            <div class="modal-body">
              <div>
                <Modal title="Shipped Details" aria-hidden="true" visible={isModalVisible} onOk={handleOk}
                  onCancel={handleCancel}>
                  <form>
                    <div className="row">
                    <div class="col-md-4 mb-3">
                      <label for="line1" class="form-label">
                        Line 1
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="line1"
                        value={shippedOrder.line1}
                        //aria-describedby="emailHelp"
                      />
                    </div>
                    { shippedOrder && shippedOrder.line2 &&
                    <div class="col-md-4 mb-3">
                      <label for="line2" class="form-label">
                        Line 2
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="line2"
                        value={shippedOrder.line2}
                        //aria-describedby="emailHelp"
                      />
                    </div>
                    }
                    <div class="col-md-4 mb-3">
                      <label for="city" class="form-label">
                        City
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="city"
                        value={shippedOrder.city}
                        //aria-describedby="emailHelp"
                      />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label for="state" class="form-label">
                        State
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="state"
                        value={shippedOrder.state}
                        //aria-describedby="emailHelp"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Postal Code</label>
                      <input
                      type="text"
                      className="form-control"
                      value={shippedOrder.postal_code}
                      //aria-describedby="emailHelp"
                      />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label for="country" class="form-label">
                        Country
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="country"
                        value={shippedOrder.country}
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label for="Blue Dart" class="form-label">Choose a Shipper</label>
                      <select className="m-1 form-control">
                        <option value="Blue Dart">Blue Dart</option>
                        <option value="XpressBees">XpressBees</option>
                        <option value="DHL Shipping">DHL Shipping</option>
                        <option value="DTDC Courier">DTDC Courier</option>
                      </select>
                    </div>
                    </div>
                    <button
                      className="btn btn-primary m-2"
                      onClick={(e) =>
                        UpdateOrderStatus(e, orderItem._id, "Delivered")
                      }
                    >
                      Delivered
                    </button>
                    <button
                      className="btn btn-primary m-2"
                      onClick={(e) =>
                        UpdateOrderStatus(e, orderItem._id, "Cancel")
                      }
                    >
                      Cancle
                    </button>
                    
                  </form>
                </Modal>
              </div>
            
      </div>
      {/* end modal */}
      <section id="body-pd">
        <div className="container-fluid">
          <DashboardHeaader />
          <div className="row">
            <div className="col-2 px-0">
              <Sidemenu />
            </div>
            <div className="col-10">
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
            </div>
          </div>
        </div>
      </section>
    </>
  )
};

export default ShippedOrder;
