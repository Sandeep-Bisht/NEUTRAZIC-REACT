import React, { useEffect, useState } from "react";
import DashboardHeaader from "./DashboardHeaader";
import Sidemenu from "./Sidemenu";
import "./Dashboard.css";
import { baseUrl } from "../../utils/services";
import { Table, Input, Typography, Popconfirm, Space } from "antd";
import {BiSearchAlt} from 'react-icons/bi';

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
  const userfilter = data.data.filter((value)=>{ return value.role === "user"});
   setUserdata(userfilter);
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
        <div className="all-manufacture-details-section">
              <h3 className="all-manufacturer-head">All Users </h3>
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

