import { get, map } from 'jquery';
import React,{useState,useEffect} from 'react'
import StarsRating from 'stars-rating'
import Baseline from './Baseline';
import Footer from './Footer';
import Header1 from './Header1';
import ReadMoreReact from 'read-more-react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../utils/services';
import {IoClose} from 'react-icons/io5';
import SingleProduct from './SingleProduct';
import { ToastContainer, toast } from "react-toastify";


var Userdata='';
const WishList = ()=>{
   const [wishlistData,Setwishlist]=useState([])
   useEffect(() => {
      Userdata =  JSON.parse(localStorage.getItem("Userdata"))
     
       
      GetWishlist();
      
      
     },[]);

     const GetWishlist = async () => {
        let id;
        if(Userdata){
         id=Userdata._id
        }
         await fetch(`${baseUrl}/api/wishlist/wishlist_by_id`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
           
          userid: id,
        }),
      })
        .then((res) => res.json())
        .then(async (data) => {
           if(data.data[0] !== undefined){
         
            Setwishlist(data.data)
           }
        })
        
        .catch((err) => {
          console.log(err, "error");
        });
       
    };
   const DeleteWishlist = async (productId) => {
      await fetch(`${baseUrl}/api/wishlist/delete_wishlist_by_id`, {
      method: "delete",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         _id:productId,
      }),
   })
      .then((res) => res.json())
      .then(async (data) => {
         Setwishlist("");
        toast.error("Product removed successfully",{
         position:"bottom-right",
         autoClose:2000,
        })
         GetWishlist()

      })
      .catch((err) => {
         console.log(err, "error");
      });
   };


    return(<>
    <Header1/>
    <div className="first-nav container-fluid"><span><Link to="/">Home</Link>/ Wishlist</span></div>

<section className='wishlist-page'>
      <div className="container m-auto">
         <div className='row mt-0'>
            <div className='col-md-12'>
               <h1 className='wishlist-header'>Your Wishlist</h1>
            </div>
         </div>
         <div className="row mt-0">
         {wishlistData.length >0 ? 
            wishlistData.map((item,ind)=>(
               <div className="col-6">
               <div className='wishlistDiv'>
                  <div className='row'>
               <div className='col-4'>
               <Link to={"/SingleProduct/" + item.productId}>
               <img src={`${baseUrl}/`+item.image[0].path} />
               </Link>
               </div>
               <div className='col-8 py-0'>
               <h6 className='wishlist-heading2'>{item.name}</h6>
               <p className='word-wrapping'>{item.description}</p>
               <div className='buynow-details-btn-wrap'>
               <Link to={"/UserDetails/" + item.productId}>
               <button className=' wishlist-btn'>Buy Now</button>
               </Link>
               <Link to={"/SingleProduct/" + item.productId}>
               <button className=' wishlist-btn'>See Details</button>
               </Link>
               </div>
            </div>
            </div>
            <div className='wishlist-close-icon' onClick={()=>DeleteWishlist(item._id) } style={{cursor:'pointer'}}><IoClose/></div>
               </div>
               </div> 
            )) 
            :
            <div className="col-12 text-center EMPTYWISHLIST-DIV">
            <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_yRyM3f.json"  background="transparent"  speed="1"  style={{width: "300px", height: "300px",margin:"auto"}}  loop  autoplay></lottie-player>
 
            </div>
            }       
         </div>
         <ToastContainer/>
      </div>
      </section>
      <Baseline />
      <Footer />
    </>);
}

export default WishList;