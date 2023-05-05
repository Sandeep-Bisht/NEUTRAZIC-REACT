import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Header1 from "./Header1";
import Footer from "./Footer";
import Baseline from "./Baseline";
import { baseUrl } from "../utils/services";
import "../components/SingleBlogPage.css";

const SingleBlog = (props) => {
  const blogSlug = props.match.params.slug;
  const [blog, setSingleBlog] = useState();
  const [otherblogs, setOtherBlogs] = useState();
  const [data, setData] = useState();
  const [titleforheader, setTitleforHeader] = useState();
  const history = useHistory();

  useEffect(() => {
    window.scroll(0, 0);
    getSingleBlog();
    otherBlog();
  }, []);

  const ChangeBlog = async (id,title,description) => {
    await fetch(`${baseUrl}/api/blogs/find_blog_by_slug`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug: id,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        setSingleBlog(data.data);
        history.push(id,title,description);
      })
      .catch((err) => {
        console.log(err, "error");
      });
    window.scroll(0, 0);
  };

  const getSingleBlog = async () => {
    await fetch(`${baseUrl}/api/blogs/find_blog_by_slug`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug: props.match.params.slug,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        setSingleBlog(data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  const otherBlog = async () => {
    await fetch(`${baseUrl}/api/blogs/find_all_slug`)
      .then((res) => res.json())
      .then(async (data) => {
        setData(data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  return (
    <>
      <Header1 />

      <div className="container product-div blog-container">
        {/* <div className="row">
          <div className="col-md-12">
            <div className="Single-Blog-Heading">
              {blog &&
                blog.map((item, ind) => {
                  return (
                    <>
                      <h1 className="blog-heading1" key={ind}>{item.title}</h1>
                    </>
                  );
                })}
            </div>
          </div>
        </div> */}
        <div className="row">
          <div className="col-md-12">
            {blog &&
              blog.map((item,ind) => {
                return (
                  <>
                    <div className="row" key={ind}>
                      <div className="col-md-12">
                        <img
                          className="single-blog-image1"
                          src={
                            item.featuredImage &&
                            `${baseUrl}/` + item.featuredImage[0].path
                          }
                        ></img>
                      </div>
                      <div className="col-md-12">
                        <div
                          className="single-blog-page-header"
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
        <div className="row">
          <div className="blog-page-section-2">
            <div className="row">
              <div className="col-md-12">
                <div className="latest-blogs-section">
                  <h2>Other Blogs</h2>
                  <div className="row">
                    {data &&
                      data
                        .filter((data) => data.slug !== props.match.params.slug)
                        .map((item, ind) => {
                          return (
                            <div className="col-md-6 col-lg-3" key={ind}>
                              <div className="card" onClick={() => ChangeBlog(item.slug)}>
                                <img
                                  src={
                                    item.featuredImage &&
                                    `${baseUrl}/` + item.featuredImage[0].path
                                  }
                                  
                                  className="card-img-top singleblog-card-image"
                                  alt="blog-image"
                                />
                                <div className="card-body single-blog-page-text" style = {{cursor:"pointer"}}>
                                  <h6 className="blog-title-text">{item.title}</h6>
                                  <p className="card-text" >{item.description.slice(0,110)}</p>
                                  <span className="Read-more-singleblog text-primary">Read More</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Baseline />
      <Footer />
    </>
  );
};
export default SingleBlog;
