import React, { useState, useEffect } from "react";
import { Table, Input, Space, Popconfirm, Typography } from "antd";
import axios from "axios";
// import { data } from "./columns";
import { useTableSearch } from "../useTableSearch";
import Sidemenu from "../Sidemenu";
import "../Dashboard.css";
import { BiSearchAlt } from "react-icons/bi";
import { useHistory, Link } from "react-router-dom";
import DashboardHeaader from "../DashboardHeaader";
import {FaTrashAlt} from 'react-icons/fa';
import {MdOutlineEditNote} from 'react-icons/md';
import {MdPlaylistAdd} from 'react-icons/md';



export default function AllCategoriesDetails() {
  const [getuser, setGetuser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [filteredData] = useState([]);
  const [categories, setCategories] = useState("");

  const { Search } = Input;

  const history = useHistory();

  useEffect(() => {
    fetchUsers();
    GetCategory();
  }, []);


  const GetCategory = async () => {
    //await fetch("http://144.91.110.221:3033/api/category/all_category")
    await fetch("http://localhost:3033/api/category/all_category")
      .then((res) => res.json())
      .then(async (data) => {
        setCategories(data.data.length);
        // console.log("dsd dfz sf " + data.data.length);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };


  const fetchUsers = async () => {
    setLoading(true);
    const response = await axios.get(
      "http://localhost:3033/api/category/all_category"
    );
    setGetuser(response.data.data);
    setLoading(false);
  };

  const onChangeHandler = (e) => {
    setSearchVal(e.target.value);
    if (e.target.value === "") {
      fetchUsers();
    }
  };

  const searchHandler = () => {
    const filteredData = getuser.filter((value) => {
      return value.name.toLowerCase().includes(searchVal.toLowerCase());
    });
    setGetuser(filteredData);
  };

  const handleDelete = async (_id) => {
    try{
      const DeletedData=await axios.delete("http://localhost:3033/api/category/delete_category_by_id",{data : {_id:_id}});
      fetchUsers();
    }catch(error){
    }
  };

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
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
              <a className="delete-icon-wrap" title="Delete" style={{ color: "blue" }}><FaTrashAlt/></a>
            </Popconfirm>
            <Typography.Link>
              <Link
                to={{
                  pathname: "/Category",
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
      <div className="row">
      <div className="col-2 px-0">
              <Sidemenu />
            </div>
        <div className="col-10">
        <div className="category-details-section">
              <h3 className="all-category-head">All Category <span className="count">{categories}</span></h3>
              <div className="all-category-search-wrap">
                <Link to="/Category" className="add-icon">
                  <MdPlaylistAdd/>Add
                </Link>
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
