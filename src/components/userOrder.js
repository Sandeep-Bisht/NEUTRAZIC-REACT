import React, { useEffect, useState } from "react";
// import DataTable from '@bit/adeoy.utils.data-table';
// import Sidemenu from './Sidemenu';
// import './Dashboard.css';
import Baseline from "../components/Baseline";
import { baseUrl } from "../utils/services";
import { useHistory } from "react-router-dom";
import "../components/userOrder.css"
// import DashboardHeaader from './DashboardHeaader';
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
import Orders from "../Orders";
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
    console.log(order, "order");
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

  const imageHandler = (id) => {
    history.push("/SingleProduct/" + id);
  };

  return (
    <>
       {/* table modal */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header float-right">
              <h5>User details</h5>
              <div class="text-right">
                <i
                  data-dismiss="modal"
                  aria-label="Close"
                  class="fa fa-close"
                ></i>
              </div>
            </div>
            <div class="modal-body">
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
                        <th scope="col" className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prticularUserOrder &&
                        prticularUserOrder.length > 0 &&
                        prticularUserOrder.map((item) => {
                          console.log(item, "itemssss");
                          return (
                            <>
                              <tr>                                
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
                                <td className="text-center">
                                  <button onClick={()=>imageHandler(item.productid)} type="button" className="btn btn-primary">Re-Order</button>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                    </tbody>
                  </table>
                </Modal>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
     {/* end modal */}
      <Header1 />
      <section id="body-pd">
        <div className="container-fluid">
          <div className="row">
            <div className="col-1 px-0"></div>
            <div className="col-10">
            { OrderDetails  && OrderDetails.length > 0 ? (
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
              </> ) : (
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
              ) }
            </div>
          </div>
        </div>
      </section>
      <Baseline />
      <Footer />
    </>
  );
};

export default UserOrder;
