import React, { useEffect, useState } from 'react';
import Sidemenu from './Sidemenu';
import './Dashboard.css';
import { baseUrl } from '../../utils/services';
import DashboardHeaader from './DashboardHeaader';
import { Table, Input, Space, Button, Popconfirm, Modal, Typography, Dropdown } from "antd";
import { BiSearchAlt } from "react-icons/bi";
import { MdPlaylistAdd } from 'react-icons/md'
import { Link, useHistory } from "react-router-dom";
import { DownOutlined } from '@ant-design/icons';

const InProgressOrder = () => {
  const [orders, setOrders] = useState([])
  const [OrderDetails, setOrderDetails] = useState([])
  const [filteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [prticularUserOrder, setPrticularUserOrder] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [shippedOrder, setShippedOrder] = useState([]);
  const [orderItem, setOrderItem] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [shipper, setShipper] = useState("Blue Dart")
  const [endDate, setEndDate] = useState('');

  const today = new Date().toISOString().substr(0, 10);
  const history = useHistory();

  useEffect(() => {
    GetOrders();
  }, []);

  const GetOrders = async () => {

    await fetch(`${baseUrl}/api/order/all_order`)
      .then(res => res.json())
      .then(async (data) => {
        let arr = [];
        for (let item of data.data) {
          if (item.orderStatus == "Packed") {
            arr.push(item);
          }
        }
        setOrderDetails(arr)

      }
      )
      .catch((err) => {
        console.log(err, "errors");
      });
  }

  const UpdateOrderStatus = async (e, order, orderStatus) => {
    e.preventDefault()
    order.shipperName = shipper;
    order.shippingDate = startDate;
    order.delivery_time = endDate;
    order.orderStatus = orderStatus;
    delete order.createdAt;
    await fetch(`${baseUrl}/api/order/update_order`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
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
    setOrderDetails(orders)

  }
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


  const columns = [
    { title: "Order No.", dataIndex: "order_no", key: "order_no" },
    { title: "Transaction Id", dataIndex: "transaction_id", key: "transaction_id" },
    { title: "Paid Amount.", dataIndex: "totalamount", key: "totalamount" },
    { title: "Payment Status", dataIndex: "payment_status", key: "payment_status" },
    {
      title: "Action",
      key: "orderStatus",
      render: (_, item) =>
        <Button type="primary" onClick={() => moveForShipping(item)}>
          Move for Shipping
        </Button>
    },

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

  // Move for shipping modal

  const moveForShipping = (item) => {
    setShippedOrder(item.address);
    setOrderItem(item);
    setShowShippingModal(true);
  };

  const handleShippingModal = () => {
    setShowShippingModal(false);
  };

  const cancelShippingModal = () => {
    setShowShippingModal(false);
  };



  const imageHandler = (id) => {
    history.push("/SingleProduct/" + id);
  };


  return (
    <>

      <div>
        <Modal
          title="Order Details"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
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
                              onClick={() => imageHandler(item.productid)}
                              style={{ cursor: "pointer" }}
                              src={`${baseUrl}/${item.image}`}
                            ></img>
                          </div>
                        </td>
                        <td >{item.name}</td>
                        <td>{item.singleprice}</td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </Modal>
      </div>
      <div>
        <Modal title="Shipped Details" aria-hidden="true" visible={showShippingModal} onOk={handleShippingModal}
          onCancel={cancelShippingModal}>
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
              {shippedOrder && shippedOrder.line2 &&
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
                  value={shippedOrder.country == "IN" && "India"}
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="col-md-4 mb-3">
                <label for="Blue Dart" class="form-label">Choose a Shipper</label>
                <select className="m-1 form-control custom-select"

                  onChange={(e) => {
                    setShipper(e.target.value);
                  }}>
                  <option value="Blue Dart">Blue Dart</option>
                  <option value="XpressBees">XpressBees</option>
                  <option value="DHL Shipping">DHL Shipping</option>
                  <option value="DTDC Courier">DTDC Courier</option>
                </select>
              </div>
              <div class="col-md-4 mb-3">
                <label htmlFor="start-date-input" className='form-labe'>Shipping date</label>
                <input
                  className='form-control'
                  type="date"
                  id="start-date-input"
                  name="start-date-input"
                  min={today}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div class="col-md-4 mb-3">
                <label htmlFor="end-date-input" className='form-labe'>Delivery date</label>
                <input
                  className='form-control'
                  type="date"
                  id="end-date-input"
                  name="end-date-input"
                  min={startDate}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            <button
              className="btn btn-primary m-2"
              onClick={(e) =>
                UpdateOrderStatus(e, orderItem, "Shipping")
              }
            >
              Proceed for Shipping
            </button>
            <button
              className="btn btn-primary m-2"
              onClick={(e) =>
                UpdateOrderStatus(e, orderItem._id, "Cancel")
              }
            >
              Cancel Order
            </button>

          </form>
        </Modal>
      </div><section id="body-pd">
        <div className="container-fluid">
          <DashboardHeaader />
          <div className="row px-0 dashboard-container">
            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-4  sidebar-dashboard">
              <Sidemenu />
            </div>
            <div className="col-xl-10 col-lg-9 col-md-9 col-sm-8 col-8 mt-2">
              <div className="category-details-section">
                <h3 className="all-category-head">Orders </h3>
                <div className="all-category-search-wrap">
                  <input
                    type='text'
                    onChange={e => onChangeHandler(e)}
                    onKeyUp={searchHandler}
                    placeholder="Search.."
                    enterButton
                    style={{ position: "sticky", top: "0", left: "0" }}
                  />
                  <button type="button" className="dashboard-search-btn"><BiSearchAlt /></button>
                </div>
              </div>

              <Table
                rowKey="name"
                dataSource={filteredData && filteredData.length ? filteredData : OrderDetails}
                columns={columns}
                loading={loading}
                pagination={false}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default InProgressOrder;