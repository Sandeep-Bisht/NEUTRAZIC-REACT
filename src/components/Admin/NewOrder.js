import React, { useEffect, useState } from 'react';
// import DataTable from '@bit/adeoy.utils.data-table';
import Sidemenu from './Sidemenu';
import './Dashboard.css';
import { baseUrl } from '../../utils/services';
import DashboardHeaader from './DashboardHeaader';
import { Table, Input, Space, Popconfirm, Typography,Dropdown } from "antd";
import { BiSearchAlt } from "react-icons/bi";
import {MdPlaylistAdd} from 'react-icons/md'
import {Link} from "react-router-dom";
import Orders from '../Orders';
import { DownOutlined } from '@ant-design/icons';
import { render } from 'react-dom';

const NewOrder = () => {
  const [orders, setOrders] = useState([])
  const [OrderDetails, setOrderDetails] = useState([])
  const [filteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [PendingOrders,setPendingOrders]=useState([]);
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
            if(item.status=="Pending")

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



 const clickHandler=(id)=>{
  console.log(id,"order idddd");
 }

  const columns = [
   //  { title: "SR NO", dataIndex: "sr_no", key: "sr_no" },
   //  { title: "Name", dataIndex: "name", key: "name" },
   //  { title: "Mobile No.", dataIndex: "Mobile", key: "Mobile" },
   //  { title: "Addtional number.", dataIndex: "Addtionalnumber", key: 'Addtionalnumber' },

    { title: "Order No.", dataIndex: "order_no", key: "order_no" },
    { title: "Transaction Id", dataIndex: "transaction_id", key: "transaction_id" },
    { title: "Paid Amount.", dataIndex: "totalamount", key: "totalamount" },
    { title: "Payment Status", dataIndex: "payment_status", key: "payment_status" },
    {
      title: "Status", 
      render: (a, item) => (
        <Space size="middle">
          <Dropdown
            menu={{
              items: [
                {
                  key: '1',
                  label: (
                    <a onClick={() =>UpdateOrderStatus(item._id,"Cancel")}>
                      Cancel
                    </a>
                  ),
                },
                {
                  key: '2',
                  label: (
                    <a onClick={() =>UpdateOrderStatus(item._id,"inProgress")}>
                      inProgress
                    </a>
                  ),
                },
              ],
            }}
          >
            <a>
              Pending <DownOutlined />
            </a>
          </Dropdown>
        </Space>
      ),
    },

  ];
  






  return (
    <>
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

export default NewOrder;