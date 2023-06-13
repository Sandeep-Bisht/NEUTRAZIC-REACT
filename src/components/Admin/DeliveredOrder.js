import React, { useEffect, useState } from 'react';
import Sidemenu from './Sidemenu';
import './Dashboard.css';
import { baseUrl } from '../../utils/services';
import DashboardHeaader from './DashboardHeaader';
import { Table, Modal, Button } from "antd";
import { BiSearchAlt } from "react-icons/bi";
import { useHistory } from "react-router-dom";

var Userdata="";

const DeliveredOrder = () => {
  const [orders, setOrders] = useState([]);
  const [OrderDetails, setOrderDetails] = useState([]);
  const [filteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [prticularUserOrder, setPrticularUserOrder] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [vendor,setVendor]=useState(false);
  const history = useHistory();

  useEffect(() => {
    Userdata=JSON.parse(localStorage.getItem("Userdata"));
    GetOrders();
  }, []);

  const GetOrders = async () => {
    setLoading(true);
    await fetch(`${baseUrl}/api/order/all_order`)
      .then((res) => res.json())
      .then(async (data) => {
        if(Userdata!==undefined || Userdata!=="")
        {
          if(Userdata.role==="Vendor")
          {
            setVendor(true);
            let arr = [];         
              for (let item of data.data) {
                if (item.orderStatus == "Delivered" && Userdata && Userdata.manufacturer==item.order[0].order[0].manufacturer) {
                  arr.push(item);
                }
              }
        setOrderDetails(arr);
          }
          else{
            let arr = [];  
            for (let item of data.data) {
              if (item.orderStatus == "Delivered") {
                item.createdAt=item.createdAt.slice(0,10);
                arr.push(item);
              }
            }
            setOrderDetails(arr);
        }
          }
          setLoading(false);
       }
      )
      .catch((err) => {
        console.log(err, "errors");
      });
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

  const columns = [
    { title: "Order No", dataIndex: "order_no", key: "order_no" },
    {
      title: "Order Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Shipping Date",
      dataIndex: "shippingDate",
      key: "shippingDate",
    },
    {
      title: "Delivered Date",
      dataIndex: "delivery_time",
      key: "delivery_time",
    },
    { title: "Paid Amount", dataIndex: "totalamount", key: "totalamount" },
    { title: "Status", dataIndex: "orderStatus", key: "stauts" },
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
    if(Userdata!==null || Userdata!=="")
    {
      if(Userdata.role==="Vendor")
      {
        const response=order.order[0].order.filter((item)=>{
        return (Userdata.manufacturer == item.manufacturer)
        })
        setPrticularUserOrder(response);
        setIsModalVisible(true);
      }
      else{
        setPrticularUserOrder(order.order);
        setIsModalVisible(true);
      }   
    }
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
          closeIcon={<CustomCloseIcon />}
          className="New-order-details"
        >
          <table className="table order-details">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
                      {
                      vendor ? (prticularUserOrder &&
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
                                <td className="width-adjust-of-td">{item.name}</td>
                                <td className="width-adjust-of-td">{item.singleprice}</td>
                              </tr>
                            </>
                          );
                        })):
                        (prticularUserOrder &&
                          prticularUserOrder.length > 0 &&
                          prticularUserOrder[0].order.length > 0 &&
                          prticularUserOrder[0].order.map((item, ind) => {
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
                                  <td className="width-adjust-of-td">{item.name}</td>
                                  <td className="width-adjust-of-td">{item.singleprice}</td>
                                </tr>
                              </>
                            );
                          }))}
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
              <Sidemenu />
            </div>
            <div className="col-xl-10 col-lg-9 col-md-9 col-sm-8 col-8 mt-2">
              <div className="category-details-section all-order-details-section ">
                <h3 className="all-category-head all-products-head">Orders </h3>
                <div className="all-category-search-wrap all-products-search-wrap input">
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

export default DeliveredOrder;
