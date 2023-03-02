import React, { useState,useEffect } from "react";
import { Table, Input, Typography, Popconfirm, Space } from "antd";
import axios from "axios";
// import { data } from "./columns";
import Sidemenu from "../Sidemenu";
import "../Dashboard.css";
import {BiSearchAlt} from 'react-icons/bi';
import UserImg from "../../../Images/user3.jpg";
import DashboardHeaader from "../DashboardHeaader";
import {Link} from 'react-router-dom'
import {FaTrashAlt} from 'react-icons/fa';
import {MdOutlineEditNote} from 'react-icons/md';
import {MdPlaylistAdd} from 'react-icons/md';
import { baseUrl } from "../../../utils/services";

 

export default function AllManufactureDetails() {
  const [getuser,setGetuser]=useState([])
  const [loading,setLoading]=useState(false);
  const [searchVal,setSearchVal]=useState("");
  const [filteredData]=useState([]);

  const { Search } = Input;
  const [Manufacturer, setManufacturer] = useState("");
  
  useEffect(()=>{
    fetchUsers();
    setCount();
    GetManufacturer();
   },[])


   const setCount = async () => {
    //  await setManufacturerCount1(localStorage.getItem("ManufacturerCount"));
    // await  setproductCount1(JSON.parse(localStorage.getItem("TotalProduct")))
  };

  const GetManufacturer = async () => {
    await fetch(`${baseUrl}/api/manufacture/all_manufacture`)
      .then((res) => res.json())
      .then(async (data) => {
        setManufacturer(data.data.length);
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };

  const fetchUsers = async () => {
    setLoading(true);
  const response = await axios.get( 
    `${baseUrl}/api/manufacture/all_manufacture`
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

const handleDelete = async (_id)=>{
  try{
    const DeletedData=await axios.delete(`${baseUrl}/api/manufacture/delete_manufacturer_by_id`, {data: {_id:_id}});
    fetchUsers();
  }catch(error){
  }
  
}


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
    title: "Image",
    dataIndex: "image[0].path",
    width: 80,
    maxWidth: 90,
    render: (t, r) => <img src={`${baseUrl}/${r.image[0].path}`} />,
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
                pathname: "/Manufacturer",
                state: {
                  ...record,
                },
              }} 
              className='edit-icon-wrap'
              title="Edit"
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
      <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-4  sidebar-dashboard">
              <Sidemenu />
            </div>
        <div className="col-xl-10 col-lg-9 col-md-9 col-sm-8 col-8">
        <div className="all-manufacture-details-section">
              <h3 className="all-manufacturer-head">All Manufacturer <span className="count">{Manufacturer}</span></h3>
              <div className="all-manufacturer-search-wrap">
                <Link to="/Manufacturer" className="add-icon">
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