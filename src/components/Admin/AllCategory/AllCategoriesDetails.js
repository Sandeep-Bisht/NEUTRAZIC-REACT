import React, { useState } from "react";
import { Table, Input } from "antd";
import axios from "axios";
// import { data } from "./columns";
import { useTableSearch } from "../useTableSearch";
import Sidemenu from "../Sidemenu";
import "../Dashboard.css";
import {BiSearchAlt} from 'react-icons/bi';

const { Search } = Input;

const fetchUsers = async () => {
  const data = await axios.get(
    "http://localhost:3033/api/category/all_category"
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
    title: "Description",
    dataIndex: "description",
    key: "description"
  }
]

export default function AllCategoriesDetails() {
  const [searchVal, setSearchVal] = useState(null);

  const { filteredData, loading } = useTableSearch({
    searchVal,
    retrieve: fetchUsers
  });

  return (
    <>
          <div className="row">
          <div className="col-12">
              <div className="d-flex justify-content-between align-items-center">
              <h3 className="sub-category-head">All categories</h3>
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
              dataSource={filteredData}
              columns={columns}
              loading={loading}
              pagination={false}
            />


          </div>
        </div>

    </>
  );
}
