import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Header1 from "./Header1";
import Footer from "./Footer";
import Baseline from "./Baseline";
import { baseUrl } from "../utils/services";

const SingleBlog = (props)=>{
   const blogSlug = props.match.params.slug;
    const [blog,setSingleBlog] = useState();
    

    useEffect(()=>{
        window.scroll(0,0);
        getSingleBlog();

        

    },[])
    

    const getSingleBlog =async ()=>{
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
        
    return(
        <>
        <Header1/>
        
        <div className="container-fluid product-div mt-5">
        <div className="row ">
            <div className="col-md-10 ms-1">
                {
                    blog && blog.map((item)=>{
                        
                        return(

                    
                        <>
                        <div className="row">
                        <div className="col-md-6">
                        <div dangerouslySetInnerHTML={{ __html: item.content }} />
                        </div>
                        <div className="col-md-6">
                        <img src={item.featuredImage && `${baseUrl}/`+ item.featuredImage[0].path}></img>
                        </div>
                        </div>
                        </>
                    )})
                }
            </div>
        </div>
        </div>
            
        
        <Baseline/>
        <Footer/>
        </>
    )

}
export default SingleBlog;
