import React, { useEffect, useState } from 'react';
// import DataTable from '@bit/adeoy.utils.data-table';
import Sidemenu from './Sidemenu';
import './Dashboard.css';
import { baseUrl } from '../../utils/services';
import DashboardHeaader from './DashboardHeaader';
import { Table, Input, Space, Popconfirm,Modal,Button, Typography,Dropdown } from "antd";
import { BiSearchAlt } from "react-icons/bi";
import {MdPlaylistAdd} from 'react-icons/md'
import {Link, useHistory} from "react-router-dom";
import { DownOutlined } from '@ant-design/icons';

const DeliveredOrder = () => {
  const [orders, setOrders] = useState([])
  const [OrderDetails, setOrderDetails] = useState([])
  const [filteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [prticularUserOrder, setPrticularUserOrder] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const history =  useHistory();

  useEffect(() => {
    GetOrders();
  }, []);

  const GetOrders = async () => {

    await fetch(`${baseUrl}/api/order/all_order`)
      .then(res => res.json())
      .then(async (data) => {
        let arr=[];
         for(let item of data.data)
         {
            if(item.status=="Delivered")

            {
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

  const UpdateOrderStatus = async (orderId, status) => {
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
    { title: "Order No", dataIndex: "order_no", key: "order_no" },
    { title: "Status", dataIndex: "status", key: "stauts" },
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
                  {/* <Link to="/Category" className="add-icon">
                    <MdPlaylistAdd />Add
                  </Link> */}
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