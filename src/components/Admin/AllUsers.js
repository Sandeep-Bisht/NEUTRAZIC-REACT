import React, { useEffect, useState } from "react";
import DashboardHeaader from "./DashboardHeaader";
import axios from "axios";
import Sidemenu from "./Sidemenu";
import "./Dashboard.css";
import {Link} from "react-router-dom"
import { baseUrl } from "../../utils/services";
import { Table, Input, Typography, Popconfirm, Space } from "antd";
import {BiSearchAlt} from 'react-icons/bi';
import {FaTrashAlt} from 'react-icons/fa';
import {MdOutlineEditNote} from 'react-icons/md';
import {MdPlaylistAdd} from 'react-icons/md';

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
  // const userfilter = data.data.filter((value)=>{ return value.role === "user"});
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
  // {
  //   title: "Password",
  //   dataIndex: "password",
  //   key: "password",
  // },
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
              {/* <Link to="/UserProfile" className="add-icon">
                  <MdPlaylistAdd/>Add
                </Link> */}
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

