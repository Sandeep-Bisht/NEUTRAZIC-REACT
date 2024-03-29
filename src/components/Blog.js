import React, { useState, useEffect } from "react";
import "../components/Blog.css";
import Footer from "./Footer";
import Header1 from "./Header1";
import { baseUrl } from "../utils/services";
import { Link } from "react-router-dom";
import Baseline from "./Baseline";
import Loader from "react-spinner-loader";

function Blogs() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scroll(0, 0);
    getAllBlog();
  }, []);

  const getAllBlog = async () => {
    await fetch(`${baseUrl}/api/blogs/find_all_slug`)
      .then((res) => res.json())
      .then(async (data) => {
        setData(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  return (
    <>
      <Header1 />
    
      <section className="blog-page">
        <div className="container m-auto">
          {loading ? (
            <Loader show={loading} stack="vertical" />
          ) : (
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
                                <div className="position-absolute blog-text-div "></div>
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
                                  <p>{item.description}...</p>
                                </div>
                              </div>
                            );
                        })}
                    </div>
                    <div className="col-md-5 ps-0">
                      {data &&
                        data.map((item, ind) => {
                          if (ind > 0 && ind < 3)
                            return (
                              <div
                                className="right-blog-image-wrapper"
                                key={ind}
                              >
                                <div className="right-blog-image-wrap">
                                  <div className="position-absolute blog-text-div "></div>

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
                                      <p>{item.description.slice(0, 90)}...</p>
                                      <button>Read More</button>
                                    </Link>
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
                    <div className="latest-blogs-section blod-page-main">
                      <h2>Latest Blogs</h2>
                      <div className="row">
                        {data &&
                          data.map((item, ind) => {
                            return (
                              <div className="col-md-6 col-lg-3" key={ind}>
                                <div className="card hover-effect">
                                  <div className="card-img-link">
                                    <Link to={"/SingleBlogPage/" + item.slug}>
                                      <img
                                        src={
                                          item.featuredImage &&
                                          `${baseUrl}/` +
                                            item.featuredImage[0].path
                                        }
                                        className="card-img-top"
                                        alt="blog-image"
                                      />
                                    </Link>
                                  </div>
                                  <Link to={"/SingleBlogPage/" + item.slug}>
                                    <div
                                      className="card-body cart-text-body"
                                      style={{ cursor: "pointer" }}
                                    >
                                      <h6 className="blog-title-text">
                                        {item.title}
                                      </h6>
                                      <p className="card-text">
                                        {item.description.slice(0, 110)}
                                      </p>
                                      <span className="Read-more-singleblog">
                                        Read More
                                      </span>
                                    </div>
                                  </Link>
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
          )}
        </div>
      </section>
      <Baseline />
      <Footer />
    </>
  );
}

export default Blogs;
