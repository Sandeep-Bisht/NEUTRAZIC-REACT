import React, { useEffect, useState } from 'react';
// import DataTable from '@bit/adeoy.utils.data-table';
// import Sidemenu from './Sidemenu';
// import './Dashboard.css';
import Baseline from "../components/Baseline";
import { baseUrl } from '../utils/services';
import { useHistory } from 'react-router-dom';
// import DashboardHeaader from './DashboardHeaader';
import { Table, Input, Space, Popconfirm, Typography,Dropdown, Modal, Button } from "antd";
import { BiSearchAlt } from "react-icons/bi";
import {MdPlaylistAdd} from 'react-icons/md'
import {Link} from "react-router-dom";
import Orders from '../Orders';
import { DownOutlined } from '@ant-design/icons';
import { render } from 'react-dom';
import Header1 from "../components/Header1";
import Footer from "../components/Footer";


var Userdata = "";
const UserOrder = () => {
  const [orders, setOrders] = useState([])
  const [OrderDetails, setOrderDetails] = useState([])
  const [filteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [PendingOrders,setPendingOrders]=useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [prticularUserOrder,setPrticularUserOrder]=useState([]);


  const history=useHistory();
  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    GetOrders();
  }, []);


console.log(Userdata,"userDATA");
  const GetOrders = async () => {

    await fetch(`${baseUrl}/api/order/all_order`)
      .then(res => res.json())
      .then(async (data) => {
         let arr=[];
         for(let item of data.data)
         {
            if(item.userid===Userdata._id)

            {
               arr.push(item);
            }
         }
         setOrderDetails(arr);
      }
      )
      .catch((err) => {
        console.log(err, "errors");
      });
  }

  const updateUserOrder = async (productId, status) => {
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

  const handleDelete=(id)=>{
alert(id);
  }


 
  const showModal = (order) => {
    console.log(order,"order");
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

    { title: "Order No.", dataIndex: "order_no", key: "order_no",
      },
    { title: "Actual Amount.", dataIndex: "actualamount", key: "actualamount" },
    { title: "Paid Amount.", dataIndex: "totalamount", key: "totalamount" },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
           <Button type="primary" 
        onClick={()=>showModal(record)}>
            Check Details</Button>
      ),
    },
  ];

  const imageHandler=(id)=>{
history.push("/SingleProduct/"+id);
  }

  return (
    <>
      {/* table modal */}
     
     
  <Modal title="Order Details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
  <table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Image</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
  
  { prticularUserOrder &&
    prticularUserOrder.length>0 && prticularUserOrder.map((item)=>{
      console.log(item,"itemssss");
      return(
        <>  
        <tr>  
    <td>{item.name}</td>
    <td><img onClick={()=>imageHandler(item.productid)} style={{cursor:'pointer'}}src={`${baseUrl}/${item.image}`}></img></td>
    <td>{item.singleprice}</td> 
    </tr>               
        </>
      ) 
    })
  }
   
 </tbody>
</table>
 </Modal>

      {/* end modal */}
      <Header1/>
      <section id="body-pd">
        <div className="container-fluid">
          {/* <DashboardHeaader /> */}
          <div className="row">
            <div className="col-1 px-0">
              {/* <Sidemenu /> */}
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
      <Baseline />
      <Footer />
    </>
  );
}

export default UserOrder;