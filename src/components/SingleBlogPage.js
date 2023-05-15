import React from "react";
import { useEffect } from "react";
import { useHistory,useLocation } from "react-router-dom";
import { useState } from "react";
import Header1 from "./Header1";
import Footer from "./Footer";
import Baseline from "./Baseline";
import { baseUrl } from "../utils/services";
import "../components/SingleBlogPage.css";
import { BsArrowRight } from "react-icons/bs";
import Link from "antd/es/typography/Link";
import { SocialIcon } from 'react-social-icons';


const SingleBlog = (props) => {
  const blogSlug = props.match.params.slug;
  const [blog, setSingleBlog] = useState();
  const [otherblogs, setOtherBlogs] = useState();
  const [data, setData] = useState();
  const [titleforheader, setTitleforHeader] = useState();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    window.scroll(0, 0);
    getSingleBlog();
    otherBlog();
  }, []);

  const ChangeBlog = async (id, title, description) => {
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
        history.push(id, title, description);
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
      
          {/* <span className="nav-text p-3">
          <Link to="/" className="nav-text">
              Home
            </Link>
            {location.pathname}
          </span> */}
        <div className="row">
          <div className="col-md-12">
            {blog &&
              blog.map((item, ind) => {
                return (
                  <>
                    <div className="row" key={ind}>
                      <div className="single-blog-container">
                        <div className="col-md-12">
                          <div className="singleBlog-box">
                            <div className="row">
                              {/* <div className="col-md-1"></div> */}
                              <div className="col-md-6 px-0">
                                <div className="single-blog-image-box">
                                  <img
                                    className="single-blog-image1"
                                    src={
                                      item.featuredImage &&
                                      `${baseUrl}/` + item.featuredImage[0].path
                                    }
                                  ></img>
                                </div>
                              </div>
                              <div className="col-md-6 px-0">
                                <div className="blog-description-box p-4">
                                  <div>
                                    <div className="blog-title">
                                      <p> {item.title}</p>
                                    </div>
                                    <div className="blog-title-description">
                                      <p>{item.description}</p>
                                    </div>

                                    <div className="social-links-blog">
                                      <div className="social-link-box">
                                        <a
                                          href="https://www.facebook.com/Nutrazik"
                                          target="_blank"
                                        >
                                          <SocialIcon className="social-react-icons" network="facebook" bgColor="#4682B4"/>
                                        </a>
                                        <a
                                          href="https://www.instagram.com/nutrazik/"
                                          target="_blank"
                                        >
                                          <SocialIcon className="social-react-icons" network="instagram" bgColor="#DB7093"/>
                                          </a>
                                        <a
                                          href="https://twitter.com/nutrazik"
                                          target="_blank"
                                        >
                                          <SocialIcon className="social-react-icons" network="twitter" bgColor="#00BFFF"/>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div
                            className="single-blog-page-header"
                            dangerouslySetInnerHTML={{ __html: item.content }}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
        <div className="row">
          <div className="blog-page-section-2 ">
            <div className="row">
              <div className="col-md-12">
                <div className="latest-blogs-section single-blog-section">
                  <h2>Other Blogs</h2>
                  <div className="row">
                    {data &&
                      data
                        .filter((data) => data.slug !== props.match.params.slug)
                        .map((item, ind) => {
                          return (
                            <div className="col-md-6 col-lg-3" key={ind}>
                              <div
                                className="card"
                                onClick={() => ChangeBlog(item.slug)}
                              >
                                <img
                                  src={
                                    item.featuredImage &&
                                    `${baseUrl}/` + item.featuredImage[0].path
                                  }
                                  className="card-img-top singleblog-card-image"
                                  alt="blog-image"
                                />
                                <div
                                  className="card-body single-blog-page-text"
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
