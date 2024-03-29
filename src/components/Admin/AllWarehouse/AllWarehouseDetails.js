import React, { useState, useEffect } from "react";
import { Table, Space, Popconfirm, Typography } from "antd";
import axios from "axios";
import Sidemenu from "../Sidemenu";
import "../Dashboard.css";
import { BiSearchAlt } from "react-icons/bi";
import {  Link } from "react-router-dom";
import DashboardHeaader from "../DashboardHeaader";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineEditNote } from "react-icons/md";
import { MdPlaylistAdd } from "react-icons/md";
import { baseUrl } from "../../../utils//services";

export default function AllWarehouseDetails() {
  const [getuser, setGetuser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [filteredData] = useState([]);
  const [warehouse, setWarehouse] = useState("");

  useEffect(() => {
    fetchUsers();
    GetWarehouse();
  }, []);

  const GetWarehouse = async () => {
    await fetch(`${baseUrl}/api/warehouse/get_all_warehouse`)
      .then((res) => res.json())
      .then(async (data) => {
        setWarehouse(data.data.length);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const fetchUsers = async () => {
    setLoading(true);
    const response = await axios.get(
      `${baseUrl}/api/warehouse/get_all_warehouse`
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
    try {
      const DeletedData = await axios.delete(
        `${baseUrl}/api/warehouse/delete_warehouse_by_id`,
        { data: { _id: _id } }
      );
      fetchUsers();
    } catch (error) {
      console.log(error, "error");
    }
  };

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
              <a
                className="delete-icon-wrap"
                title="Delete"
                style={{ color: "blue" }}
              >
                <FaTrashAlt />
              </a>
            </Popconfirm>
            <Typography.Link>
              <Link
                to={{
                  pathname: "/Warehouse",
                  state: {
                    ...record,
                  },
                }}
                title="Edit"
                className="edit-icon-wrap"
                style={{ color: "blue" }}
              >
                <MdOutlineEditNote />
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
          <DashboardHeaader />
          <div className="row px-0 dashboard-container">
            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-4  sidebar-dashboard">
              <Sidemenu />
            </div>
            <div className="col-xl-10 col-lg-9 col-md-9 col-sm-8 col-8 mt-2">
              <div className="category-details-section all-products-details-section">
                <h3 className="all-category-head all-products-head">
                  All Warehouses <span className="count">{warehouse}</span>
                </h3>
                <div className="all-category-search-wrap all-products-search-wrap">
                  <Link to="/Warehouse" className="add-icon">
                    <MdPlaylistAdd />
                    Add
                  </Link>
                  <div>
                  <input
                    type="text"
                    onChange={(e) => onChangeHandler(e)}
                    onKeyUp={searchHandler}
                    placeholder="Search.."
                    enterButton
                    style={{ position: "sticky", top: "0", left: "0" }}
                  />
                  <button type="button" className="dashboard-search-btn">
                    <BiSearchAlt />
                  </button>
                  </div>
                </div>
              </div>

              <Table
                rowKey="name"
                dataSource={
                  filteredData && filteredData.length ? filteredData : getuser
                }
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
