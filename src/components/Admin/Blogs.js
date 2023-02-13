import React, { useEffect, useState } from "react";
import DashboardHeaader from "./DashboardHeaader";
import Sidemenu from "./Sidemenu";
import { Editor } from "@tinymce/tinymce-react";
import $ from "jquery";
import "./Dashboard.css";
import { baseUrl } from "../../utils/services";

const Blog = () => {
  const [data, setData] = useState({
    title: "",
    featuredImage: [],
    description: "",
    content: "",
  });
  
const addBlogs = async(e)=>{
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
                        initialValue="This is the initial content of the editor."
                        textareaName="content"
                        
                        onEditorChange={(newText)=>setData({...data, content: newText})}
                        init={{
                          height: 500,
                          mode: 'textareas',
                          menubar: true,
                          plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
                          ],
                          toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        outputFormat="text"
                        />
                      </div>
                      <div className="col-12 p-1">
                        <button className="m-2 ps-2 btn btn-primary"
                        onClick={(e)=>addBlogs(e)}
                        >
                          Submit
                        </button>
                      </div>
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
