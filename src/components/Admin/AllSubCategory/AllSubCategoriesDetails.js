import React, { useState,useEffect } from "react";
import { Table, Input, Space, Popconfirm, Typography  } from "antd";
import axios from "axios";
// import { data } from "./columns";
import { useTableSearch } from "../useTableSearch";
import Sidemenu from "../Sidemenu";
import "../Dashboard.css";
import {BiSearchAlt} from 'react-icons/bi';
import { useHistory,Link } from "react-router-dom";

const { Search } = Input;



export default function AllSubCategoriesDetails() {

  const [getuser,setGetuser]=useState([])
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
      "http://localhost:3033/api/subcategory/all_subcategory"
    );
    setGetuser(response.data.data);
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

  const handleDelete=(_id)=>{
    // const DeletedData=axios.delete("http://localhost:3033/api/subcategory/delete_subcategory_by_id",{state: {_id:_id}});
    // setGetuser(DeletedData.data.data);
    alert(_id);
  }

  // const editHandler=(_id)=>{
  //   history.push({
  //     pathname:"/SubCategoryCreation",
  //     state:{
  //       _id:"_id",
  //     }
  //   })
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
    },
    {
      title: 'Image',
      dataIndex: 'image[0].path',
      width: 80,
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
           <Link to={{pathname:"/SubCategoryCreation", 
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
      {/* <div className="container-fluid">
        {" "}
        <a href="#" className="nav__logo">
          <img
            src={require("../../../Images/new-logo.png")}
            className="dashboard-logo"
            alt="image"
          />
        </a>
      </div> */}
        <section className="sub-category-details-section">      
            <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center">
              <h3 className="sub-category-head">All sub categories</h3>
              <div className="subcategory-search-wrap">
              <input type='text' placeholder='Search..' className='sub-category-search-input' onChange={e => setSearchVal(e.target.value)}/>
              <button className="sub-category-btn" type="button"><BiSearchAlt/></button>
              </div>
              </div>
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
          </section>
    </>
  );
}
