import React, { useEffect, useState } from 'react';
// import DataTable from '@bit/adeoy.utils.data-table';
import Sidemenu from './Sidemenu';
import './Dashboard.css';
import { baseUrl } from '../../utils/services';
import DashboardHeaader from './DashboardHeaader';
import { Table, Input, Space, Popconfirm, Typography,Dropdown,Modal } from "antd";
import { BiSearchAlt } from "react-icons/bi";
import {MdPlaylistAdd} from 'react-icons/md'
import {Link} from "react-router-dom";
import { DownOutlined } from '@ant-design/icons';

const ShippedOrder = () => {
  const [orders, setOrders] = useState([])
  const [OrderDetails, setOrderDetails] = useState([])
  const [filteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [shippedOrder,setShippedOrder]=useState([]);
  const [orderItem,setOrderItem]=useState([]);
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
            if(item.status=="Shipped")

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

  const UpdateOrderStatus = async (e,orderId, status) => {
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
  
  

  const showModal = (item) => {
    setShippedOrder(item.address);
    setOrderItem(item);
    setIsModalVisible(true);
    };


  const columns = [
    { title: "Order No.", dataIndex: "order_no", key: "order_no" },
    { title: "Paid Amount.", dataIndex: "totalamount", key: "totalamount" },
    { title: "Payment Status", dataIndex: "payment_status", key: "payment_status" },
    {
        title: 'Status',
        key: 'action',
        render: (_,item) => (
              <a
          onClick={()=>showModal(item)}>
            Shipped
          </a> 
        ),
      },
  ];


  return (
    <>
    {/* table modal */}
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header float-right">
        <h5>User details</h5>
        <div class="text-right">
          <i data-dismiss="modal" aria-label="Close" class="fa fa-close"></i>
        </div>
      </div>
      <div class="modal-body">
        <div>       
        <Modal title="Shipped Details" visible={isModalVisible}>
        <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Address</label>
    <input type="text" class="form-control" id="exampleInputEmail1" value={shippedOrder.line1} aria-describedby="emailHelp" />
  </div>
  <div class="mb-3">
  <label for="Blue Dart">Choose a Shipper</label>
    <select className='m-1'>
      <option value="Blue Dart">Blue Dart</option>
      <option value="XpressBees">XpressBees</option>
      <option value="DHL Shipping">DHL Shipping</option>
      <option value="DTDC Courier">DTDC Courier</option>
    </select>
  </div>
  <button className='btn btn-primary m-2' onClick={(e)=>UpdateOrderStatus(e,orderItem._id,"Delivered")}>Delivered</button>
  <button className='btn btn-primary m-2'onClick={(e)=>UpdateOrderStatus(e,orderItem._id,"Cancel")}>Cancle</button>
  {/* <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div> */}
</form>
                    </Modal> 
 </div>
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
      <div class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
    </>
  );
}

export default ShippedOrder;