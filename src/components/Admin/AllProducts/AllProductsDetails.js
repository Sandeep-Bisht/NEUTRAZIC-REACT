import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Popconfirm, Typography, Space } from "antd";

import axios from "axios";
import Sidemenu from "../Sidemenu";
import "../Dashboard.css";
import { BiSearchAlt } from "react-icons/bi";
import DashboardHeaader from "../DashboardHeaader";
import { Link, useHistory } from "react-router-dom"
import { FaTrashAlt } from 'react-icons/fa';
import { MdOutlineEditNote } from 'react-icons/md';
import { MdPlaylistAdd } from 'react-icons/md';
import { baseUrl } from "../../../utils/services";

var Userdata = "";

export default function AllProductsDetails() {

  const [getuser, setGetuser] = useState([])
  const [loading, setLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [filteredData] = useState([]);
  const [products, Setproducts] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [prticularUserOrder, setPrticularUserOrder] = useState([]);

  const history = useHistory();


  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    fetchUsers();
    GetProducts();
  }, [])

  const GetProducts = async () => {
    await fetch(`${baseUrl}/api/product/all_product`)
      .then((res) => res.json())
      .then(async (data) => {
        if (Userdata !== undefined && Userdata.role === "Vendor") {
          var responseData = data.data.filter((item) => {
            return (Userdata.manufacturer === item.manufacturer.name);
          })
          Setproducts(responseData.length);
        }
        else {
          Setproducts(data.data.length);
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  const fetchUsers = async () => {
    setLoading(true);
    const response = await axios.get(`${baseUrl}/api/product/all_product`);
    if (Userdata !== undefined && Userdata.role === "Vendor") {
      var responseData = response.data.data.filter((item) => {
        return (Userdata.manufacturer === item.manufacturer.name);
      })
      setGetuser(responseData);
      setLoading(false);
    }
    else {
      setGetuser(response.data.data);
      setLoading(false);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const DeletedData = await axios.delete(`${baseUrl}/api/product/delete_product_by_id`, { data: { _id: _id } });
      fetchUsers();
    } catch (error) {

    }

  }

  const onChangeHandler = (e) => {
    setSearchVal(e.target.value);
    if (e.target.value == "") {
      fetchUsers();
    }
  };

  const searchHandler = () => {
    const filteredData = getuser.filter((value) => {
      return value.name.toLowerCase().includes(searchVal.toLowerCase());
    });
    setGetuser(filteredData);
  };

  const showModal = (order) => {
    const orderDetails = [];
    orderDetails.push(order)
    setPrticularUserOrder(orderDetails);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Reorder Quantity",
      dataIndex: "reorderQuantity",
      key: "reorderQuantity",

    },
    {
      title: "maximumOrder",
      dataIndex: "maximumOrder",
      key: "maximumOrder",
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
              <a className="delete-icon-wrap" title="Delete" style={{ color: "blue" }}><FaTrashAlt /></a>
            </Popconfirm>
            <Typography.Link>
              <Link
                to={{
                  pathname: "/ProductForm",
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
    {
      title: "View Order",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => showModal(record)}>
          See Product
        </Button>
      ),
    },
  ];

  const imageHandler = (id) => {
    history.push("/SingleProduct/" + id);
  };
  const CustomCloseIcon = () => (
    <svg
      className="custom-close-icon-forget"
      viewBox="0 0 12 12"
      width="12"
      height="12"
    >
      <line x1="1" y1="11" x2="11" y2="1" strokeWidth="2" />
      <line x1="1" y1="1" x2="11" y2="11" strokeWidth="2" />
    </svg>
  );
  const rowClassName = (record) => {
    if (record.quantity <= record.reorderQuantity) {
      return "table-style";
    }
    return '';
  };

  return (
    <>
      <section id="body-pd">
        <div className="container-fluid">
          <DashboardHeaader />

          <div className="row px-0 dashboard-container">
            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-4  sidebar-dashboard">
              <Sidemenu />
            </div>
            <div className="col-xl-10 col-lg-9 col-md-9 col-sm-8 col-8 mt-2 table-outer-div">
              <div className="all-products-details-section">
                <h3 className="all-products-head">All Products <span className="count">{products}</span></h3>
                <div className="all-products-search-wrap all-products-search-wrap">
                  <Link to="/Productform" className="add-icon">
                    <MdPlaylistAdd />Add
                  </Link>
                  <div>
                    <input
                      type='text'
                      onChange={e => onChangeHandler(e)}
                      onKeyUp={searchHandler}
                      placeholder="Search.."
                      enterButton
                      style={{ position: "sticky", top: "0", left: "0" }}
                    />
                    <button type="button" className="dashboard-search-btn"><BiSearchAlt /></button>
                  </div>
                </div>
              </div>
              <Table
                rowClassName={rowClassName}
                rowKey="name"
                dataSource={filteredData && filteredData.length ? filteredData : getuser}
                columns={columns}
                loading={loading}
                pagination={false}
              />


            </div>
          </div>
          <Modal
            className="product-details New-order-details"
            title="Order Details"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            closeIcon={<CustomCloseIcon />}
          >
            <table className="table order-details ">
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Manufacturer</th>
                  <th scope="col">Category</th>
                  <th scope="col">Subcatrgory</th>
                </tr>
              </thead>
              <tbody>
                {prticularUserOrder &&
                  prticularUserOrder.length > 0 &&
                  prticularUserOrder.map((item, ind) => {
                    return (
                      <>
                        <tr key={ind}>
                          <td className="width-adjust-of-td">
                            <div className="width-adjust-of-image">
                              <img
                                onClick={() => imageHandler(item.productid)}
                                style={{ cursor: "pointer" }}
                                src={`${baseUrl}/${item.image[0].path}`}
                              ></img>
                            </div>
                          </td>
                          <td className="width-adjust-of-td">{item.name}</td>
                          <td className="width-adjust-of-td">{item.inrDiscount}</td>
                          <td className="width-adjust-of-td">{item.quantity}</td>
                          <td className="width-adjust-of-td">{item.manufacturer.name}</td>
                          <td className="width-adjust-of-td">{item.category.name}</td>
                          <td className="width-adjust-of-td">{item.subcategory.name}</td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
          </Modal>
        </div>
      </section>
    </>
  );
}
