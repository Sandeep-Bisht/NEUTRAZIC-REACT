import React, { useEffect, useState } from "react";
import DashboardHeaader from "./DashboardHeaader";
import Sidemenu from "./Sidemenu";
import { Editor } from "@tinymce/tinymce-react";
import $ from "jquery";
import "./Dashboard.css";
import { baseUrl } from "../../utils/services";
import axios from "axios";
import { useHistory } from "react-router-dom";

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
const addBlogs = async(e,_id)=>{
  e.preventDefault();
  const formData = new FormData();
  await formData.append("title",data.title);
  await formData.append("description",data.description);
  await formData.append("featuredImage",data.featuredImage);
  await formData.append("content",data.content);
  await formData.append("slug",data.title);
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
  
}
const UpdateBlogs = async (e,_id) => {
  e.preventDefault();
  const formData = new FormData();
  await formData.append("_id", data._id);
  await formData.append("description", data.description);
  await formData.append("title", data.title);
  await formData.append("featuredImage", data.featuredImage);
  await formData.append("content", data.content);
    try{
      const response = await axios.put(`${baseUrl}/api/blogs/update_slug_by_id`, formData)
      if(response.status==200)
      {
        history.push("/AllBlogs");
      }
      addBlogs();
      
    }catch(error)
    {
      console.log(error);
    }
};
  return (
    <>
      <section id="body-pd">
        <div className="container-fluid">
          <DashboardHeaader />
          <div className="row">
            <div className="col-2 px-0">
              <Sidemenu />
            </div>
            <div className="col-10 px-0">
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
                      <div className="col-5 p-1 m-2 form-floating">
                        <input
                          type="file"
                          className="form-control Dashborad-search"
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
                        <Editor
                        apiKey='3e3t370l1o9tq0i11p8ba9pnfv9le3omjw9zqsvm2tjgn3hn'
                        initialValue={editableData ? editableData.content : "Create Content"}
                        textareaName="content"
                        
                        onEditorChange={(newText)=>setData({...data, content: newText})}
                        init={{
                          height: 500,
                          mode: 'textareas',
                          menubar: true,
                          plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount','file',
                          ],
                          toolbar: 'undo redo | blocks | formatselect ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent image | ' +
                            'removeformat | help',
                          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        outputFormat="text"
                        />
                      </div>
                      { editableData ? (
                         <div className="col-12 p-1">
                         <button className="m-2 ps-2 btn btn-primary"
                         onClick={(e)=>UpdateBlogs(e,data._id)}
                         >
                           Update
                         </button>
                       </div>
                        ):
                        (
                      <div className="col-12 p-1">
                        <button className="m-2 ps-2 btn btn-primary"
                        onClick={(e)=>addBlogs(data._id)}
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
