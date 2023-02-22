import React, { useState, useEffect } from "react";
import "../components/Blog.css";
import BlogImage from "../Images/blog-img.jpg";
import Footer from "./Footer";
import Header1 from "./Header1";
import { baseUrl } from "../utils/services";
import { Link } from "react-router-dom";
import Baseline from "./Baseline";
import ReadMoreReact from "read-more-react/dist/components/ReadMoreReact";

function Blogs() {
  const [data, setData] = useState([]);
  useEffect(() => {
    window.scroll(0, 0);
    getAllBlog();
  }, []);

  const getAllBlog = async () => {
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
      <section className="blog-page">
        <div className="container-fluid m-auto">
          <div className="row">
            <div className="col-md-12">
              <div className="blog-box-wrapper">
                <div className="row">
                  <div className="col-md-7">
                    {data &&
                      data.map((item, ind) => {
                        if (ind < 1)
                          return (
                            <div className="left-blog-image-wrap" key={ind}>
                              <img
                                src={
                                  item.featuredImage &&
                                  `${baseUrl}/` + item.featuredImage[0].path
                                }
                                alt=""
                                className=""
                              />
                              <div className="top-heading-box-1">
                                <Link to={"/SingleBlogPage/" + item.slug}>
                                  <button>Read More</button>
                                </Link>
                                <p>{item.description}</p>
                              </div>
                            </div>
                          );
                      })}
                  </div>
                  <div className="col-md-5 ps-0">
                    {data &&
                      data.map((item, ind) => {
                        if (ind < 2)
                          return (
                            <div className="right-blog-image-wrapper" key={ind}>
                              <div className="right-blog-image-wrap">
                                <img
                                  src={
                                    item.featuredImage &&
                                    `${baseUrl}/` + item.featuredImage[0].path
                                  }
                                  alt=""
                                  className=""
                                />
                                <div className="top-heading-box-2">
                                  <Link to={"/SingleBlogPage/" + item.slug}>
                                    <button>Read More</button>
                                  </Link>
                                  <p>{item.description}</p>
                                </div>
                              </div>
                            </div>
                          );
                      })}
                  </div>
                </div>
              </div>
            </div>
            <div className="blog-page-section-2">
              <div className="row">
                <div className="col-md-12">
                  <div className="latest-blogs-section">
                    <h2>Latest Blogs</h2>
                    <div className="row">
                      {data &&
                        data.map((item) => {
                          return (
                            <div className="col-md-6 col-lg-3">
                              <div class="card">
                                <Link
                                  className="card-img-link"
                                  to={"/SingleBlogPage/" + item.slug}
                                >
                                  <img
                                    src={
                                      item.featuredImage &&
                                      `${baseUrl}/` + item.featuredImage[0].path
                                    }
                                    class="card-img-top"
                                    alt="blog-image"
                                  />
                                </Link>
                                <div class="card-body">
                                  <p class="card-text">{item.description}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      {/* { data && data.map((item)=>{
                        return(
                      <div className="col-md-3">
                        <div class="card">
                          <Link className="card-img-link" to = {"/SingleBlogPage/" + item.slug}>
                          <img
                            src={item.featuredImage && `${baseUrl}/`+item.featuredImage[0].path}
                            class="card-img-top"
                            alt="blog-image"
                          />
                          </Link>
                          <div class="card-body">
                          <p class="card-text">
                          <ReadMoreReact
                                text={item.description}
                                min={100}
                                ideal={100}
                                max={100}
                                readMoreText={"...Read More"}
                              />                              
                            </p>
                          </div>
                        </div>
                      </div>
                      )
                      })} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Baseline/>
      <Footer />
    </>
  );
}

export default Blogs;
