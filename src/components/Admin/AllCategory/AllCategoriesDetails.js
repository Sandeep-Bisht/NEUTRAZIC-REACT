import React, { useState,useEffect } from "react";
import { Table, Input, Space, Popconfirm, Typography } from "antd";
import axios from "axios";
// import { data } from "./columns";
import { useTableSearch } from "../useTableSearch";
import Sidemenu from "../Sidemenu";
import "../Dashboard.css";
import {BiSearchAlt} from 'react-icons/bi';
import { useHistory, Link } from "react-router-dom";


const { Search } = Input;



export default function AllCategoriesDetails() {

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
      "http://localhost:3033/api/category/all_category"
    );
    setGetuser(response.data.data);
    setLoading(false);
  };

  const onChangeHandler=(e)=>{
    setSearchVal(e.target.value);
    if(e.target.value==="")
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


  const handleDelete=(_id)=>{
    // const DeletedData=axios.delete("http://localhost:3033/api/category/delete_category_by_id",{state : {_id:_id}});
    // setGetuser(DeletedData.data.data);
    alert(_id);
  }

  // const editHandler=(_id)=>{
  //    history.push({
  //     pathname:"/Category",
  //     state :{
  //       _id:"_id",
  //     }
  //    })
  // }
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description"
    },{
      
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
           <Link to={{pathname:"/Category", 
           state:
           {
            ...record,
          }}} 
           style={{color:"blue"}}>Edit</Link> 
          </Typography.Link>
         </Space>
        ) : null,
    },
  ]

  return (
    <>
          <div className="row">
            <div className="col-8">
              <h3>All categories</h3>
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

          <div className="row">
<div className="col-12">
            <Table
              rowKey="name"
              dataSource={filteredData && filteredData.length ? filteredData : getuser}
              columns={columns}
              loading={loading}
              pagination={false}
            />


          </div>
        </div>

    </>
  );
}
