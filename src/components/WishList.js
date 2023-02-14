import { get, map } from 'jquery';
import React,{useState,useEffect} from 'react'
import StarsRating from 'stars-rating'
import Baseline from './Baseline';
import Footer from './Footer';
import Header1 from './Header1';
import ReadMoreReact from 'read-more-react';
import { Link, useHistory } from 'react-router-dom';
import { baseUrl } from '../utils/services';
import {IoClose} from 'react-icons/io5';
import SingleProduct from './SingleProduct';
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import * as ACTIONS from '../CommonService/AddToCart/action'


var Userdata='';
const WishList = ()=>{
   const history = useHistory();
   const dispatch = useDispatch()
   const [wishlistData,Setwishlist]=useState([])
   const [userCart, setUserCart] = useState([]);
   const [order, Setorder] = useState([]);
   const [quantity, setQuantity] = useState(1);
   const [data,setData] = useState([]);



   useEffect(() => {
      Userdata =  JSON.parse(localStorage.getItem("Userdata"))
     
       
      GetWishlist();
      
      GetData();
      console.log(data,"This is data");
     },[]);
     console.log(data);
     const GetData = async () => {
      
      await fetch(`${baseUrl}/api/product/all_product`)
        .then((res) => res.json())
        .then(async (data) => {
          setData(data.data);
        })
        .catch((err) => {
          console.log(err, "error");
        });
    };

     const UpdateCart = () => {
      const url = `${baseUrl}/api/cart/update_cart_by_id`;
      fetch(url, {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: userCart._id,
          userid: Userdata._id,
          order: userCart.order,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          CartById();
          //history.push("/Cart");
            toast.success("Add to cart",{
            position:"bottom-right",
            autoClose:5000,
          });
        })
        .then((err) => console.log(err, "inside update cart"));
    };

     const CartById = async () => {
      if (!Userdata == []) {
        await fetch(`${baseUrl}/api/cart/cart_by_id`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userid: Userdata._id,
          }),
        })
          .then((res) => res.json())
          .then(async (data) => {
            setUserCart(data.data[0]);
            let cartItems = data.data[0].order.length;
            dispatch(ACTIONS.getCartItem(cartItems))
  
          })
          .catch((err) => {
            console.log(err, "error");
          });
      }
    };
  
    const AddtoCart = async () => {
      if (!Userdata == []) {
        //  this block is not working
        await fetch(`${baseUrl}/api/cart/add_to_cart`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userid: Userdata._id,
            order: order,
          }),
        })
          .then((res) => res.json())
          .then(async (data) => {
            setUserCart(data.data);
            // history.push("/Cart");
            // toast.success("Add to cart",{
            //   position:"bottom-right",
            //   autoClose:5000,
            // });
          })
          .catch((err) => {
            console.log(err, "error");
          });
  
      }
      // else{
      //   history.push('/Register')
      // }
    };

     const cartfunction = async (
      productid,
      name,
      quantity,
      mrp,
      singleprice,
      discount,
      description,
      category,
      manufacturer,
      image
    ) => {
      if (quantity > 0) {
        var merged = false;
        var newItemObj = {
          productid: productid,
          name: name,
          image: image,
          quantity: quantity,
          mrp: parseInt(mrp),
          singleprice: parseInt(singleprice),
          discountprice: discount,
          description: description,
          category: category,
          manufacturer: manufacturer,
          description: description,
          status: "Pending",
          justification: "Enjoy",
          delivery_time: "No Status",
        };
        if (userCart.order == null || userCart.order == []) {
          for (var i = 0; i < order.length; i++) {
            if (order[i].productid == newItemObj.productid) {
              order[i].quantity += newItemObj.quantity;
              // order[i].mrp += newItemObj.mrp;
              // order[i].actualprice+=newItemObj.actualprice
              merged = true;
              setQuantity(1);
            }
          }
          if (!merged) {
            order.push(newItemObj);
            setQuantity(1);
            await AddtoCart();
            await CartById();
          }
        } else {
          for (var i = 0; i < userCart.order.length; i++) {
            if (userCart.order[i].productid == newItemObj.productid) {
              userCart.order[i].quantity += newItemObj.quantity;
              merged = true;
            }
            setQuantity(1);
          }
          if (!merged) {
            userCart.order.push(newItemObj);
          }
          setQuantity(1);
  
          await UpdateCart();
          //   await AsyncStorage.setItem("order1", JSON.stringify(userCart.order));
          //   newamount = 0;
        }
        
      }
  
    };

    const filterHandler = ()=>{

    }

     const handleBuyNow = (id) =>{
      history.push("/cart");
     }
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
               <button onClick={()=>handleBuyNow(item.productId)} className=' wishlist-btn'>Buy Now</button>
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