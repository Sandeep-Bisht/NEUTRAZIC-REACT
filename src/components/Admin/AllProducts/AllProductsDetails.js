import React, { useEffect, useState } from "react";
import { Table, Input, Popconfirm, Typography, Space } from "antd";
import axios from "axios";
// import { data } from "./columns";
import Sidemenu from "../Sidemenu";
import "../Dashboard.css";
import { BiSearchAlt } from "react-icons/bi";
import DashboardHeaader from "../DashboardHeaader";
import {Link} from "react-router-dom"





export default function AllProductsDetails() {

  const [getuser,setGetuser]=useState([])
  const [loading,setLoading]=useState(false);
  const [searchVal,setSearchVal]=useState("");
  const [filteredData]=useState([]);
  
  const { Search } = Input;

  useEffect(()=>{
    fetchUsers();
   },[])

  const fetchUsers = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:3033/api/product/all_product");
    setGetuser(response.data.data);
    setLoading(false);
  };
  
  const handleDelete=(_id)=>{
    // const DeletedData=axios.delete("http://localhost:3033/api/subcategory/delete_product_by_id",{state: {_id:_id}});
    // setGetuser(DeletedData.data.data);
    alert(_id);
  }

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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "inrMrp",
      key: "inrMrp",
    },
    {
      title: "Discount",
      dataIndex: "inrDiscount",
      key: "inrDiscount",
    },
    {
      title: "Image",
      dataIndex: "image[0].path",
      width: 80,
      maxWidth: 90,
      render: (t, r) => <img src={`http://localhost:3033/${r.image[0].path}`} />,
    },
    {
      title: "Action",
      dataIndex: "Action",
      width: "20%",
      render: (_, record) =>
        getuser.length >= 1 ? (
          <Space size="middle">
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record._id)}
            >
              <a style={{ color: "blue" }}>Delete</a>
            </Popconfirm>
            <Typography.Link>
              <Link
                to={{
                  pathname: "/ProductForm",
                  state: {
                    ...record,
                  },
                }}
                style={{ color: "blue" }}
              >
                Edit
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

    <div className="row">
      <div className="col-2 px-0">
              <Sidemenu />
            </div>
        <div className="col-10">
        <div className="d-flex justify-content-between align-items-center">
              <h3 className="sub-category-head">All Products</h3>
              <div className="subcategory-search-wrap">
              <Search
                onChange={e => onChangeHandler(e)}
                onKeyUp={searchHandler}
                placeholder="Search"
                enterButton
                style={{ position: "sticky", top: "0", left: "0" }}
              />
              </div>
              </div>
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
      </section>
    </>
  );
}