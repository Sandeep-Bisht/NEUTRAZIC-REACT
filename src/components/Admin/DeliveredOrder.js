import React, { useEffect, useState } from 'react';
import Sidemenu from './Sidemenu';
import './Dashboard.css';
import { baseUrl } from '../../utils/services';
import DashboardHeaader from './DashboardHeaader';
import { Table, Modal, Button } from "antd";
import { BiSearchAlt } from "react-icons/bi";
import { useHistory } from "react-router-dom";

const DeliveredOrder = () => {
  const [orders, setOrders] = useState([])
  const [OrderDetails, setOrderDetails] = useState([])
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
      .then(res => res.json())
      .then(async (data) => {
        let arr = [];
        for (let item of data.data) {
          if (item.orderStatus == "Delivered") {
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
    { title: "Order No", dataIndex: "order_no", key: "order_no" },
    { title: "Status", dataIndex: "orderStatus", key: "stauts" },
    { title: "Delivered Date", dataIndex: "delivery_date", key: "delivery_date" },
    { title: "Paid Amount", dataIndex: "totalamount", key: "totalamount" },

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

      {/* end modal */}
      <section id="body-pd">
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

export default DeliveredOrder;