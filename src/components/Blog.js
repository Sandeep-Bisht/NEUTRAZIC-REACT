import React from "react";
import '../components/Blog.css';
import BlogImage from '../Images/blog-img.jpg';
import Footer from "./Footer";
import Header1 from './Header1'

function Blog() {
  return (
    <>
    <Header1/>
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
                  <p>
                    Lorem, ipsum dolor sit amet consectetur.
                  </p>
                  </div>
                </div>
              </div>
              <div className="col-md-5 ps-0">
                <div className="right-blog-image-wrapper">
                    <div className="right-blog-image-wrap">
                    <img src={BlogImage} alt="" className="" />
                    <div className="top-heading-box-2">
                    <button>Food</button>
                    <p>
                    Lorem, ipsum dolor sit amet consectetur.
                    </p>
                    </div>
                    </div>
                    <div className="right-blog-image-wrap mb-0">
                    <img src={BlogImage} alt="" className="" />
                    <div className="top-heading-box-3">
                    <button>Food</button>
                    <p>
                    Lorem, ipsum dolor sit amet consectetur.
                    </p>
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
                <div className="col-md-3">
              <div class="card">
  <img src={BlogImage} class="card-img-top" alt="blog-image"/>
  <div class="card-body">
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
  </div>
  </div>
  <div className="col-md-3">
              <div class="card">
  <img src={BlogImage} class="card-img-top" alt="blog-image"/>
  <div class="card-body">
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
  </div>
  </div>
  <div className="col-md-3">
              <div class="card">
  <img src={BlogImage} class="card-img-top" alt="blog-image"/>
  <div class="card-body">
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
  </div>
  </div>
  <div className="col-md-3">
              <div class="card">
  <img src={BlogImage} class="card-img-top" alt="blog-image"/>
  <div class="card-body">
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
  </div>
  </div>
</div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
}

export default Blog;
