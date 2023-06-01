import React, { useEffect, useState } from "react";
import DashboardHeaader from "./DashboardHeaader";
import Sidemenu from "./Sidemenu";
import "./Dashboard.css";
import { baseUrl } from "../../utils/services";
import axios from "axios";
import { useHistory } from "react-router-dom";
import slugify from "react-slugify";
import JoditEditor from "jodit-react";

const Blog = (props) => {
  const [editableData] = useState(props.history.location.state);
  const [formerror, setFormerror] = useState({});
  const [blogs,setBlogs]=useState({})
  const [editableArray,setEditableArray]=useState([]);
  const [data, setData] = useState({
    title: "",
    featuredImage: [],
    description: "",
    content: "",
  });
  useEffect(() => {
    GetBlog();
    if (editableData) {
      setData(editableData);
    }
  }, []);
  const history = useHistory();

  const GetBlog = async () => {
    await fetch(`${baseUrl}/api/blogs/find_all_slug`)
      .then((res) => res.json())
      .then(async (data) => {
        setBlogs(data.data);
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };

  const ValidattionForm = (value) => {
    const error = {};
    if (value.featuredImage.length === 0) {
      error.featuredImage = "This field is required";
    }
    if (!value.title) {
      error.title = "This field is required";
    }
    return error;
  };

  const addBlogs = async (e) => {
    e.preventDefault();
    const errors = ValidattionForm(data);
    setFormerror(errors);
    if (Object.keys(errors).length === 0) {
    const formData = new FormData();
    await formData.append("title", data.title);
    await formData.append("description", data.description);
    await formData.append("featuredImage", data.featuredImage);
    await formData.append("content", data.content);
    await formData.append("slug", slugify(data.title));
    const url = `${baseUrl}/api/blogs/add_blog`;
    await fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        res.json();
        history.push("/AllBlogs");
      })
      .then((res) => {})
      .catch((err) => console.log(err));
    }
  };

  const UpdateBlogs = async (e, _id) => {
    e.preventDefault();
    const errors = ValidattionForm(data);
    setFormerror(errors);
    if (Object.keys(errors).length === 0) {
    const formData = new FormData();
    await formData.append("_id", data._id);
    await formData.append("description", data.description);
    await formData.append("title", data.title);
    await formData.append("featuredImage", data.featuredImage);
    await formData.append("content", data.content);
    await formData.append("slug", slugify(data.title));
    try {
      const response = await axios.put(
        `${baseUrl}/api/blogs/update_slug_by_id`,
        formData
      );
      history.push("/AllBlogs");
      await addBlogs();
    } catch (error) {
      console.log(error);
    }
  }
  };

  useEffect(()=>{
    const arr=[];
    if (editableData) {
      arr.push(editableData)
      }
      setEditableArray(arr)
  },[])
    const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value
    });
    setFormerror({
      ...formerror,
      [name]: '' // clear error message for the current input field
    });
  };
  const handleBlur = (event) => {
    const { name, value } = event.target;
    const errors = { ...formerror };

    // Validate the input field on blur
    if (!value) {
      errors[name] = `This field is required`;
    }
    setFormerror(errors);
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
            <div className="col-xl-10 col-lg-9 col-md-9 col-sm-8 col-8 px-0">
              <form>
                <div className="col-12 px-0">
                  <div className="card p-4 m-2 mt-4 product-form">
                    <h5>Create Blog</h5>
                    <div className="row">
                      <div className="col-6 p-1">
                      <div className="">
                        <span className="category-select-div">Title</span>
                        <input
                        maxLength={50}
                          type="text"
                          name="title"
                          id="floatingInputValue"
                          className="form-control Dashborad-search"
                          defaultValue={editableData ? editableData.title : ""}
                          onChange={(e) =>{
                            setData({ ...data, title: e.target.value });
                            handleInputChange(e);
                          }
                          }
                          onBlur={handleBlur}
                        />
                        </div>
                        <p className="formerror">{formerror.title}</p>
                      </div>
                      <div className="col-6">
                              <div className="row">
                          {
                            editableArray && editableArray.length>0  ?
                            <div className="d-flex p-2">
                            <div className="col-10">
                            <div>
                              <span className="category-select-div">Featured Image</span>
                              <input
                                type="file"
                                name="image"
                                className="form-control Dashborad-search"
                                onChange={(e) => {
                                  setData({ ...data, featuredImage: e.target.files[0] });
                                  // handleInputChange(e);
                                }}
                              />
                            </div>
                            <p className="formerror">{formerror.image}</p>
                            </div>
                            <div className="col-2 p-2 d-flex align-items-end edit-images">
                             <img src={`${baseUrl}/${data.featuredImage[0].path}`} style={{width:"70px", height:"40px"}} alt=""/>
                          </div>
                          </div>:
                          <div className="col-12 p-2">
                          <div>
                            <span className="category-select-div">Image</span>
                            <input
                              type="file"
                              name="image"
                              className="form-control Dashborad-search"
                              onChange={(e) => {
                                setData({ ...data, featuredImage: e.target.files[0] });
                                // handleInputChange(e);
                              }}
                            />
                          </div>
                          <p className="formerror">{formerror.image}</p>
                        </div>
                          }
                          </div>
                          </div>
                      <div className="col-5 p-2">
                      <div className="">
                          <span className="category-select-div">Description</span>
                        <textarea
                          maxLength={150}
                          className="form-control h-100"
                          id="floatingInputValue"
                          defaultValue={
                            editableData ? editableData.description : ""
                          }
                          rows="4"
                          onChange={(e) =>
                            setData({ ...data, description: e.target.value })
                          }
                        ></textarea>
                        </div>
                      </div>
                      <div className="col-12">
                        <JoditEditor
                          value={editableData ? editableData.content : ""}
                          onChange={(newText) =>
                            setData({ ...data, content: newText })
                          }
                        />
                      </div>
                      {editableData ? (
                        <div className="col-12 p-2">
                          <button
                            className="m-2 ps-2 btn btn-primary"
                            onClick={(e) => UpdateBlogs(e, data._id)}
                          >
                            Update
                          </button>
                        </div>
                      ) : (
                        <div className="col-12 p-2">
                          <button
                            className="m-2 ps-2 btn btn-primary"
                            onClick={(e) => addBlogs(e)}
                          >
                            Submit
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Blog;
