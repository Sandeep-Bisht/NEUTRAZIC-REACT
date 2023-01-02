import React, { useState } from "react";
import { Table, Input } from "antd";
import axios from "axios";
// import { data } from "./columns";
import { useTableSearch } from "../useTableSearch";
import Sidemenu from "../Sidemenu";
import "../Dashboard.css";

const { Search } = Input;

const fetchUsers = async () => {


  
  const data = await axios.get(
    "http://localhost:3033/api/product/all_product"

  );
 
  return data.data;
};

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
     
];



export default function AllProductsDetails() {
  const [searchVal, setSearchVal] = useState(null);

  const { filteredData, loading } = useTableSearch({
    searchVal,
    retrieve: fetchUsers
  });
  

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
                onChange={e => setSearchVal(e.target.value)}
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
              dataSource={filteredData}
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
