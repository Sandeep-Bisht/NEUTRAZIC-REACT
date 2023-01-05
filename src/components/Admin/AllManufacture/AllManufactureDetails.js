import React, { useState,useEffect } from "react";
import { Table, Input, Typography, Popconfirm, Space } from "antd";
import axios from "axios";
// import { data } from "./columns";
import Sidemenu from "../Sidemenu";
import "../Dashboard.css";
import { useHistory } from "react-router-dom";
import {Link} from 'react-router-dom';

const { Search } = Input;




export default function AllManufactureDetails() {

  const [getuser,setGetuser]=useState([]);
  const [loading,setLoading]=useState(false);
  const [searchVal,setSearchVal]=useState("");
  const [filteredData]=useState([]);

  const history=useHistory();

  useEffect(()=>{
    fetchUsers();
  },[])

  const fetchUsers = async () => {
    setLoading(true);
    const response = await axios.get(
      "http://localhost:3033/api/manufacture/all_manufacture"
  
    );
    setGetuser(response.data.data);
    console.log(response.data);
    setLoading(false);
  };

  const onChangeHandler=(e)=>{
    setSearchVal(e.target.value);
    if(e.target.value=="")
    {
      fetchUsers();
    }
  }

  const searchHandler=()=>{
    const filteredData=getuser.filter((value)=>{
      return value.name.toLowerCase().includes(searchVal.toLowerCase());
    })
    setGetuser(filteredData);
  }
  

 const handleDelete=async(_id)=>{
    //  const DeletedData=axios.delete("http://localhost:3033/api/manufacture/delete_manufacturer_by_id",{data: {_id:_id}})
    //  setGetuser(DeletedData.data.data);
     alert(_id);
 }

//  const editHandler=(_id)=>{
//    history.push({
//     pathname:"/Manufacturer",
//     state:{
//       _id:_id,
//     }
//    });
//  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width:"10%",
      key: "name"
    },
    {
      title: "Description",
      dataIndex: "description",
      width:"50%",
      key: "description"
    },
    {
      title: 'Image',
      dataIndex: 'image[0].path',
      width: "10%",
      maxWidth: 90,
      render: (t, r) => <img src={`http://localhost:3033/${r.image[0].path}`} />
    },
    {
      
      title: 'Action',
      dataIndex: 'Action',
      width:"20%",
      render: (_, record) =>
      getuser.length >= 1 ? (
        <Space size="middle">
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
            <a style={{color:"blue"}}>Delete</a>
          </Popconfirm>
          <Typography.Link   >
           <Link to={{pathname:"/Manufacturer", 
           state:
           {
            ...record,
          }}} 
           style={{color:"blue"}}>Edit</Link> 
          </Typography.Link>
         </Space>
        ) : null,
    },

    
  ];

  return (
    <>
      <div className="container-fluid">
        {" "}
        <a href="#" className="nav__logo">
          <img
            src={require("../../../Images/logo2.png")}
            className="dashboard-logo"
            alt="image"
          />
        </a>
      </div>
      <div id="body-pd">
        <Sidemenu />
        <div className="container">
          <div className="row">
            <div className="col-8">
              <h3>All Manufactures</h3>
            </div>
            <div className="col-4">
              <Search
                onChange={e => onChangeHandler(e)}
                onKeyUp={searchHandler}
                placeholder="Search"
                enterButton
                style={{ position: "sticky", top: "0", left: "0" }}
              />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">

            <Table
              rowKey="name"
              dataSource={filteredData && filteredData.length ? filteredData : getuser}
              columns={columns}
              loading={loading}
              pagination={false}
            />


          </div>
        </div>
      </div>

    </>
  );
}
