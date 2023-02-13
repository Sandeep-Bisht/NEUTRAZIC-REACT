import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header1 from "./Header1";
import Baseline from "./Baseline";
import { baseUrl } from "../utils/services";

const Blogs = () => {
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
      <div className="col-md-12">
        {data.map((el, ind) => {
          return (
            <>
              <h1>{el.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: el.content }} />
              <div>{el.description}</div>
              <figure>
                <img
                
                  src={el.featuredImage && `${baseUrl}/` + el.featuredImage[0].path}
                  alt=""
                  className="cat-left-side-image img-fluid"
                />
              </figure>
            </>
          );
        })}
      </div>
      <Baseline />
      <Footer />
    </>
  );
};
export default Blogs;
