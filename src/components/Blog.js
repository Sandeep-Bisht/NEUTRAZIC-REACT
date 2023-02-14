import React,{useState,useEffect} from "react";
import "../components/Blog.css";
import BlogImage from "../Images/blog-img.jpg";
import Footer from "./Footer";
import Header1 from "./Header1";
import { baseUrl } from "../utils/services";
import { Link } from "react-router-dom";
import ReadMoreReact from "read-more-react/dist/components/ReadMoreReact";

function Blogs() {

  const [data, setData] = useState([]);
  useEffect(() => {
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
        <div className="container m-auto">
          <div className="row">
            <div className="col-md-12">
              <div className="blog-box-wrapper">
                <div className="row">
                  <div className="col-md-7">
                    <div className="left-blog-image-wrap">
                      <img src={BlogImage} alt="" className="" />
                      <div className="top-heading-box-1">
                        <button>Food</button>
                        <p>Lorem, ipsum dolor sit amet consectetur.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5 ps-0">
                    <div className="right-blog-image-wrapper">
                      <div className="right-blog-image-wrap">
                        <img src={BlogImage} alt="" className="" />
                        <div className="top-heading-box-2">
                          <button>Food</button>
                          <p>Lorem, ipsum dolor sit amet consectetur.</p>
                        </div>
                      </div>
                      <div className="right-blog-image-wrap mb-0">
                        <img src={BlogImage} alt="" className="" />
                        <div className="top-heading-box-3">
                          <button>Food</button>
                          <p>Lorem, ipsum dolor sit amet consectetur.</p>
                        </div>
                      </div>
                    </div>
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
                      { data && data.map((item)=>{
                        return(
                      <div className="col-md-3">
                        <div class="card">
                          <Link to = {"/SingleBlogPage/" + item.slug}>
                          
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
                      })}
                      {/* <div className="col-md-3">
                        <div class="card">
                          <img
                            src={BlogImage}
                            class="card-img-top"
                            alt="blog-image"
                          />
                          <div class="card-body">
                            <p class="card-text">
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div class="card">
                          <img
                            src={BlogImage}
                            class="card-img-top"
                            alt="blog-image"
                          />
                          <div class="card-body">
                            <p class="card-text">
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div class="card">
                          <img
                            src={BlogImage}
                            class="card-img-top"
                            alt="blog-image"
                          />
                          <div class="card-body">
                            <p class="card-text">
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </p>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Blogs;
