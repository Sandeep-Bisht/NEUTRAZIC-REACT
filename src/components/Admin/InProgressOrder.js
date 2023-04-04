import React, { useEffect, useState } from "react";
import Sidemenu from "./Sidemenu";
import "./Dashboard.css";
import { baseUrl } from "../../utils/services";
import DashboardHeaader from "./DashboardHeaader";
import {
  Table,
  Space,
  Modal,
  Button,
  Dropdown,
} from "antd";
import { BiSearchAlt } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";

const InProgressOrder = () => {
  const [orders, setOrders] = useState([]);
  const [OrderDetails, setOrderDetails] = useState([]);
  const [filteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [prticularUserOrder, setPrticularUserOrder] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const history = useHistory();

  useEffect(() => {
    GetOrders();
  }, []);

  const GetOrders = async () => {
    await fetch(`${baseUrl}/api/order/all_order`)
      .then((res) => res.json())
      .then(async (data) => {
        setOrders(data.data)
      }
      )
      .catch((err) => {
        console.log(err, "errors");
      });
  };

  const UpdateOrderStatus = async (order, orderStatus) => {
    delete order.createdAt;
    order.orderStatus = orderStatus;
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
  const data1 = [];
  {
    orders.map((item, index) => {
      if (item.status.includes('InProgressOrder') || item.status.includes('In Progress')) {

        data1.push({
          "sr_no": index + 1, "name": item.username, "Mobile": item.mobile, "Addtionalnumber": item.othermobile, "Address": item.address, "actualamount": item.actualamount, "totalamount": item.totalamount, "status": <select value={item.status} onChange={(e) => UpdateOrderStatus(item._id, e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In progress</option>
            <option value="Delivered">Delivered</option>
          </select>, "Action": <><button onClick={() => DeleteOrder(item._id)}><i className="bx bx-trash"></i></button>
            <button className="ml-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => CaptureDetails(JSON.parse(item.order))}><i className='bx bx-show-alt'></i></button>
          </>
        })
      }
    })
  }

  const columns = [
    { title: "Order No.", dataIndex: "order_no", key: "order_no" },
    {
      title: "Transaction Id",
      dataIndex: "transaction_id",
      key: "transaction_id",
    },
    { title: "Paid Amount.", dataIndex: "totalamount", key: "totalamount" },
    {
      title: "Payment Status",
      dataIndex: "payment_status",
      key: "payment_status",
    },
    {
      title: "Status",
      render: (a, item) => (
        <Space size="middle">
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <a onClick={() => UpdateOrderStatus(item, "Cancel")}>
                      Cancel Order
                    </a>
                  ),
                },
                {
                  key: "2",
                  label: (
                    <a onClick={() => UpdateOrderStatus(item, "Packed")}>
                     Move for Packing
                    </a>
                  ),
                },
              ],
            }}
          >
            <a>
              In-Progress <DownOutlined />
            </a>
          </Dropdown>
        </Space>
      ),
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

  const imageHandler = (id) => {
    history.push("/SingleProduct/" + id);
  };

  return (
    <>
      {/* table modal */}
     
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
                        prticularUserOrder.map((item,ind) => {
                          return (
                            <>
                              <tr key={ind}>
                                <td className="width-adjust-of-td">
                                  <div className="width-adjust-of-image">
                                    <img
                                      onClick={() =>
                                        imageHandler(item.productid)
                                      }
                                      style={{ cursor: "pointer" }}
                                      src={`${baseUrl}/${item.image}`}
                                    ></img>
                                  </div>
                                </td>
                                <td>{item.name}</td>
                                <td>{item.singleprice}</td>
                              </tr>
                            </>
                          );
                        })}
                    </tbody>
                  </table>
                </Modal>
              </div>
            
      {/* end modal */}
      <section id="body-pd">
        <div className="container-fluid">
          <DashboardHeaader />
          <div className="row px-0 dashboard-container">
            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-4  sidebar-dashboard">
              <Sidemenu/>
            </div>
            <div className="col-xl-10 col-lg-9 col-md-9 col-sm-8 col-8 mt-2">
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
  );
};

export default InProgressOrder;
