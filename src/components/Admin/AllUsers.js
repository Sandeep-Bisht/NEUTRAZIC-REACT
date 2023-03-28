import React, { useEffect, useState } from "react";
import DashboardHeaader from "./DashboardHeaader";
import axios from "axios";
import Sidemenu from "./Sidemenu";
import "./Dashboard.css";
import {Link} from "react-router-dom"
import { baseUrl } from "../../utils/services";
import { Table, Input, Space, Popconfirm, Typography, Dropdown, Modal, Button,} from "antd";
import {BiSearchAlt} from 'react-icons/bi';
import {FaTrashAlt} from 'react-icons/fa';
import {MdOutlineEditNote} from 'react-icons/md';
import {MdPlaylistAdd} from 'react-icons/md';
import { DownOutlined } from '@ant-design/icons';

const UserPage = () => {

const [userdata,setUserdata] = useState([]);
const [filteredData]=useState([]);
const [loading,setLoading]=useState(false);
const [searchVal,setSearchVal]=useState("");

useEffect(()=>{
  GetUserData();
},[]);

//Getting Userdata//

const GetUserData = async()=>{
await fetch(`${baseUrl}/api/auth/allusers`)
.then((res)=>res.json())
.then(async(data)=>{
   setUserdata(data.data);
})
.catch((err) => {
  console.log(err, "error");
});
}

const searchHandler=()=>{
  const filteredData=userdata.filter((value)=>{
    return value.username.toLowerCase().includes(searchVal.toLowerCase());
  })
  setUserdata(filteredData);
}

const onChangeHandler=(e)=>{
  setSearchVal(e.target.value);
  if(e.target.value=="")
  {
    GetUserData();
  }
}
const handleDelete=async (_id)=>{
  try{
    const DeletedData=await axios.delete(`${baseUrl}/api/auth/delete_user_by_id`,{data: {_id:_id}});
    GetUserData();
  }catch(error)
  {
    console.log(error, "error")
  }
  
}
const UpdateUserStatus = async (userId, userStatus) => {
  try {
    const response = await fetch(`${baseUrl}/api/auth/update_user_by_id`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userId, userStatus:userStatus }),
    });
    const data = await response.json();
  } catch (error) {
    console.log(error);
  }
};



const columns = [
  {
    title: "Name",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone Number",
    dataIndex: "phonenumber",
    key: "phonenumber",
  },
  {
    title: "Action",
    dataIndex: "Action",
    width: "20%",
    render: (_, record) =>
      userdata.length >= 1 ? (
        <Space size="middle">
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record._id)}
          >
            <a className="delete-icon-wrap" title="Delete" style={{ color: "blue" }}><FaTrashAlt/></a>
          </Popconfirm>
          <Typography.Link>
            <Link
              to={{
                pathname: "/UserProfile",
                state: {
                  ...record,
                },
              }}
              title="Edit"
              className='edit-icon-wrap'
              style={{ color: "blue" }}
            >
              <MdOutlineEditNote/>
            </Link>
          </Typography.Link>
        </Space>
      ) : null,
  },
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
                  <a onClick={() =>UpdateUserStatus(item,"Activate")}>
                  Activate
                  </a>
                ),
              },
              {
                key: '2',
                label: (
                  <a onClick={() =>UpdateUserStatus(item,"De-Activate")}>
                    De-Activate
                  </a>
                ),
              },
            ],
          }}
        >
          <a>
            Status <DownOutlined />
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
    <DashboardHeaader/>
      <div className="row px-0 dashboard-container">
      <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-4 sidebar-dashboard">
              <Sidemenu />
            </div>
        <div className="col-xl-10 col-lg-9 col-md-9 col-sm-8 col-8 mt-2">
        <div className="all-manufacture-details-section">
              <h3 className="all-manufacturer-head">All Users</h3>
              <div className="all-manufacturer-search-wrap">
              <input
              type='text'
                onChange={e => onChangeHandler(e)}
                onKeyUp={searchHandler}
                placeholder="Search.."
                enterButton
                style={{ position: "sticky", top: "0", left: "0" }}
              />
              <button type="button" className="dashboard-search-btn"><BiSearchAlt/></button>
              </div>
              </div>
        
          <Table
            rowKey="name"
            dataSource={filteredData && filteredData.length ? filteredData : userdata}
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
export default UserPage;

