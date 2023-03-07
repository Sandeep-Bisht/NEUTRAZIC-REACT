import React, { useEffect, useState } from "react";
import DashboardHeaader from "./DashboardHeaader";
import Sidemenu from "./Sidemenu";
import $ from "jquery";
import "./Dashboard.css";
import { baseUrl } from "../../utils/services";
import axios from "axios";
import { useHistory } from "react-router-dom";
import slugify from "react-slugify";
import JoditEditor from "jodit-react";

const Blog = (props) => {
  const [editableData] = useState(props.history.location.state);
  console.log(editableData);
  const [data, setData] = useState({
    title: "",
    featuredImage: [],
    description: "",
    content: "",
  });
  useEffect(()=>{
    if (editableData) {
      setData(editableData);
    }
  },[])
  const history = useHistory();
const addBlogs = async(e)=>{
  e.preventDefault();
  const formData = new FormData();
  await formData.append("title",data.title);
  await formData.append("description",data.description);
  await formData.append("featuredImage",data.featuredImage);
  await formData.append("content",data.content);
  await formData.append("slug",slugify(data.title));
  const url = `${baseUrl}/api/blogs/add_blog`;
    await fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        
        res.json();
      })
      .then((res) => {
        
      })
      .catch((err) => console.log(err));
      history.push("/AllBlogs");
}
const UpdateBlogs = async (e,_id) => {
  e.preventDefault();
  const formData = new FormData();
  await formData.append("_id", data._id);
  await formData.append("description", data.description);
  await formData.append("title", data.title);
  await formData.append("featuredImage", data.featuredImage);
  await formData.append("content", data.content);
  await formData.append("slug",slugify(data.title));
    try{
      const response = await axios.put(`${baseUrl}/api/blogs/update_slug_by_id`, formData)
      
      await addBlogs();
      
    }catch(error)
    {
      console.log(error);
    }
    history.push("/AllBlogs");
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
                <div className="col-12">
                  <div className="card p-3">
                    <h5 className="Blog-Heading">Create Blog</h5>
                    <div className="row">
                      <div className="col-5 p-1 m-2 form-floating">
                        <input
                          type="text"
                          id="floatingInputValue"
                          className="form-control Dashborad-search"
                          placeholder="Title"
                          defaultValue={editableData ? editableData.title : ""}
                          onChange={(e) =>
                            setData({ ...data, title: e.target.value })
                          }
                        />
                        <label for="floatingInputValue">Title</label>
                      </div>
                      <div className="col-5">
                        <label className="featured-Image"><p>Featured Image:</p></label>
                        <input
                          type="file"
                          className="form-control Dashborad-search featured"  
                          onChange={(e) =>
                            setData({
                              ...data,
                              featuredImage: e.target.files[0],
                            })
                          }
                        />
                      </div>
                      <div className="col-5 p-1 m-2 form-floating">
                          
                        <textarea
                          className="form-control h-100"
                          id="floatingInputValue"
                          placeholder="Description"
                          defaultValue={editableData ? editableData.description : ""}
                          rows="4"
                          onChange={(e) =>
                            setData({ ...data, description: e.target.value })
                          }
                        ></textarea>
                        <label for="floatingInputValue">Description</label>
                      </div>
                      <div className="col-12">
                        <JoditEditor
                        value={editableData ? editableData.content : ""}
                        onChange={(newText)=> setData({...data, content: newText})}
                        />
                      </div>
                      { editableData ? (
                        <div className="col-12 p-1">
                        <button className="m-2 ps-2 btn btn-primary"
                        onClick={(e)=>UpdateBlogs(e)}
                        >
                          Update
                        </button>
                      </div>
                        ):
                        (
                      <div className="col-12 p-1">
                        <button className="m-2 ps-2 btn btn-primary"
                        onClick={(e)=>addBlogs(e)}
                        >
                        Submit
                        </button>
                      </div>
                      )
                      }
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
