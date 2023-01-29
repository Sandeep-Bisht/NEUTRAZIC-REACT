import React, { useEffect, useState } from 'react';
// import DataTable from '@bit/adeoy.utils.data-table';
import Sidemenu from './Sidemenu';
import './Dashboard.css';
import { baseUrl } from '../../utils/services';
import DashboardHeaader from './DashboardHeaader';
import { Table, Input, Space, Popconfirm, Typography } from "antd";
import { BiSearchAlt } from "react-icons/bi";
import {MdPlaylistAdd} from 'react-icons/md'
import {Link} from "react-router-dom";

const InProgressOrder = () => {
  const [orders, setOrders] = useState([])
  const [OrderDetails, setOrderDetails] = useState([])
  const [filteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");
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
            if(item.status=="Packed")

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

  const UpdateOrderStatus = async (productId, status) => {
    await fetch(`${baseUrl}/api/order/update_order`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: productId,
        status: status,
        justification: '',
        delivery_time: ''
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
    // { title: "SR NO", dataIndex: "sr_no", key: "sr_no" },
    // { title: "Name", dataIndex: "name", key: "name" },
    // { title: "Mobile No.", dataIndex: "Mobile", key: "Mobile" },
    // { title: "Addtional number.", dataIndex: "Addtionalnumber", key: 'Addtionalnumber' },
    { title: "Order No.", dataIndex: "order_no", key: "order_no" },
    { title: "Actual Amount.", dataIndex: "actualamount", key: "actualamount" },
    { title: "Paid Amount.", dataIndex: "totalamount", key: "totalamount" },
    { title: "Status", dataIndex: "status", key: "status" }

  ];
  const click = (row) => {
    console.log(row);
  };

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
                dataSource={filteredData && filteredData.length ? filteredData : orders}
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