import React, { useEffect, useState } from "react";
import DashboardHeaader from "../DashboardHeaader";
import Sidemenu from "../Sidemenu";
import { baseUrl } from "../../../utils/services";
import { Table, Space, Popconfirm, Typography } from "antd";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineEditNote } from "react-icons/md";
import { MdPlaylistAdd } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import axios from "axios";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState("");
  const [searchVal,setSearchVal] = useState();

  useEffect(() => {
    getAllBlogs();
  }, []);
  const getAllBlogs = async () => {
    await fetch(`${baseUrl}/api/blogs/find_all_slug`)
      .then((res) => res.json())
      .then(async (data) => {
        setBlogs(data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
 
  const onChangeHandler = (e) => {
    setSearchVal(e.target.value);
    if (e.target.value === "") {
      getAllBlogs();
    }
  };

  const searchHandler = () => {
    const filteredData = blogs.filter((value) => {
      return value.title.toLowerCase().includes(searchVal.toLowerCase());
    });
    setBlogs(filteredData);
  };
    const handleDelete = async (_id) => {
        try{
          const DeletedData=await axios.delete(`${baseUrl}/api/blogs/delete_slug_by_id`,{data : {_id:_id}});
          getAllBlogs();
        }catch(error){
        }
      };
  

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "featuredImage",
      dataIndex: "featuredImage[0].path",
      key: "featuredImage",
      width: 80,
      maxWidth: 90,
      render: (t,r)=><img src={`${baseUrl}/${r.featuredImage[0].path}`}/>
    },
  
      {
        title: "Action",
        dataIndex: "Action",
        width: "20%",
        render: (_, record) =>
          blogs.length >= 1 ? (
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
                    pathname: "/CreateBlog",
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
          <DashboardHeaader />

          <div className="row px-0 dashboard-container">
            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-4 sidebar-dashboard">
              <Sidemenu />
            </div>
            <div className="col-xl-10 col-lg-9 col-md-9 col-sm-8 col-8 mt-2">
              <div className="all-products-details-section">
                <h3 className="all-products-head">All Blogs</h3>
                <div className="all-products-search-wrap">
                  <Link to="/CreateBlog" className="add-icon">
                    <MdPlaylistAdd />
                    Add
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
                dataSource={blogs && blogs.length ? blogs : ""}
                columns={columns}
                pagination={false}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default AllBlogs;
