import { get, map } from 'jquery';
import React,{useState,useEffect} from 'react'
import StarsRating from 'stars-rating'
import Baseline from './Baseline';
import Footer from './Footer';
import Header1 from './Header1';
import ReadMoreReact from 'read-more-react';
import { Link } from 'react-router-dom';

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
      // await fetch("http://144.91.110.221:3033/api/wishlist/wishlist_by_id", {
         await fetch("http://localhost:3033/api/wishlist/wishlist_by_id", {
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
   // await fetch("http://144.91.110.221:3033/api/wishlist/delete_wishlist_by_id", {
      await fetch("http://localhost:3033/api/wishlist/delete_wishlist_by_id", {
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
       
         GetWishlist()

      })
      .catch((err) => {
         console.log(err, "error");
      });
   };




    return(<>
    <Header1 />
    <div className="first-nav container-fluid"><span><Link to="/">Home</Link>/ Wishlist</span></div>

      <div className="wishlist-container">
         <div className="row">
         {wishlistData.length >0 ? 
            wishlistData.map((item,ind)=>(
               <div className="col-5 ms-3 p-1 wishlistDiv">
               <div className="row">
                  
                  <div className="col-4">
                  {/* <img src={"http://144.91.110.221:3033/"+item.image[0].path} /> */}
                  <img src={"http://localhost:3033/"+item.image[0].path} />
                  </div>
                  <div className="col-7">
                     <h6>{item.name}</h6>
                     {/* <StarsRating
                  count={5}
                    size={30}
              color2={'#ffd700'}
              value={4} /> */}
                     <p><ReadMoreReact text={item.description}
            min={100}
            ideal={100}
            max={110}
            readMoreText={"read more..."}/></p>
                  </div>
                  <div className="col-1">
                     <span onClick={()=>DeleteWishlist(item._id) } style={{cursor:'pointer'}}><i className='bx bx-x'></i></span>
                  </div>
               </div>
               </div> 
            )) 
            :
            <div className="col-12 text-center EMPTYWISHLIST-DIV">
            <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_yRyM3f.json"  background="transparent"  speed="1"  style={{width: "300px", height: "300px",margin:"auto"}}  loop  autoplay></lottie-player>
 
            </div>
            }       
         </div>
      </div>
      <Baseline />
      <Footer />
    </>);
}

export default WishList;