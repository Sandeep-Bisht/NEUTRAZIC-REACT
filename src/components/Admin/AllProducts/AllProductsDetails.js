import React, { useEffect, useState } from "react";
import { Table, Input, Popconfirm, Typography, Space } from "antd";
import axios from "axios";
// import { data } from "./columns";
import { useTableSearch } from "../useTableSearch";
import Sidemenu from "../Sidemenu";
import "../Dashboard.css";
import { useHistory,Link } from "react-router-dom";

const { Search } = Input;

export default function AllProductsDetails() {
  
   
  
  const [gridData,setGridData]=useState([]);
  const [loading,setLoading]=useState(false);
  const [searchVal,setSearchVal]=useState([]);
  let [filteredData]=useState();
 
  const history= useHistory();

  useEffect(()=>{
    loadData();
  },[])

  const loadData = async () => {
    setLoading(true);
    const response = await axios.get(
      "http://localhost:3033/api/product/all_product" 
    );
    setGridData(response.data.data);
    setLoading(false);
  };

  const searchHandler=(e)=>{
    setSearchVal(e.target.value);
    if(e.target.value=="")
    {
      loadData();
    }
  }

  const globalSearch=(e)=>{
    const filteredData=gridData.filter((value)=>{
      return(
        value.name.toLowerCase().includes(searchVal.toLowerCase())
      )
    })
    setGridData(filteredData);
  }

  // const editHandler=(record)=>{
  //   history.push(
  //     {
  //      pathname :"/ProductForm",
  //      state : {...record.value}
  //     });      
  // }


  const handleDelete = (_id)=>{
    // const response=axios.delete("http://localhost:3033/api/product/delete_product_by_id", {data: {_id:_id}});
    // setGridData(response.data.data);
    alert(_id);
  }


   const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Price",
      dataIndex: "inrMrp",
      key: "inrMrp"
    },
    {
      title: "Discount",
      dataIndex: "inrDiscount",
      key: "inrDiscount"
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
      render: (_, record) =>
      gridData.length >= 1 ? (
        <Space size="middle">
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
            <a style={{color:"blue"}}>Delete</a>
          </Popconfirm>
          <Typography.Link   >
           <Link to={{pathname:"/ProductForm", 
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
              <h3>All Products</h3>
            </div>
            <div className="col-4">
                <Search
                onChange={e => searchHandler(e)}
                placeholder="Search"                
                onKeyUp={globalSearch}
                value={searchVal}
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
              columns={columns}
              dataSource={filteredData && filteredData.length ? filteredData : gridData}
              bordered
              loading={loading}
              pagination={false}
            />


          </div>
        </div>
      </div>

    </>
  );
}
