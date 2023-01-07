import React, { useState } from "react";
import { Table, Input } from "antd";
import axios from "axios";
// import { data } from "./columns";
import { useTableSearch } from "../useTableSearch";
import Sidemenu from "../Sidemenu";
import "../Dashboard.css";
import { BiSearchAlt } from "react-icons/bi";

const { Search } = Input;

const fetchUsers = async () => {
  const data = await axios.get("http://localhost:3033/api/product/all_product");

  return data.data;
};

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
];

export default function AllProductsDetails() {
  const [searchVal, setSearchVal] = useState(null);

  const { filteredData, loading } = useTableSearch({
    searchVal,
    retrieve: fetchUsers,
  });

  return (
    <>
    <section className="all-products-details-section">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="sub-category-head">All Products</h3>
            <div className="subcategory-search-wrap">
              <input
                type="text"
                placeholder="Search.."
                className="sub-category-search-input"
                onChange={(e) => setSearchVal(e.target.value)}
              />
              <button className="sub-category-btn" type="button">
                <BiSearchAlt />
              </button>
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
      </section>
    </>
  );
}
