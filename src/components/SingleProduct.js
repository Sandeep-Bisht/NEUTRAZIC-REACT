import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header1 from "./Header1";
import "../components/singleproduct.css";
import { useHistory } from "react-router-dom";
import StarsRating from "stars-rating";
import ReactImageZoom from "react-image-zoom";
import Baseline from "./Baseline";
import ReadMoreReact from "read-more-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from "jquery";
import { baseUrl } from "../utils/services";
import defaultImage from "../Images/products/Hintosulin (1).png"
import * as ACTIONS from "../CommonService/AddToCart/action"
import { useDispatch } from "react-redux";


var Userdata = "";
var CartDataWoLogin = [];
const SingleProduct = (props) => {

  let dispatch = useDispatch();
  let prodId = props.match.params.id;
  let related = 0;
  const [AllProduct, setAllProduct] = useState([]);
  const [data, setData] = useState([]);
  const [ProductCategory, setProductCategory] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [userCart, setUserCart] = useState([]);
  const [order, Setorder] = useState([]);
  const [Categorydetails, setCategoryDetails] = useState({});
  const [categoryname, Setcategoryname] = useState();
  const [wishlist, setWishlist] = useState();
  const [MainImage,SetMainImage] = useState();
  const history = useHistory();
  // let Wishlist = [];
  //let ImageData ;
  useEffect(() => {
    related = 0;
    Userdata = JSON.parse(localStorage.getItem("Userdata"));

    window.scrollTo(0, 0)
    Getsingledata();
    getWishlist();
    CartById();
    ProductByCategory();
    

    $(document).ready(function() {
      $("#comments-button-div").css("visibility", "hidden");
      $("#submit-review-div").hide();
      $("#Reviewdiv").hide();
      $("#Technicaldiv").hide();
      $("#Description").css("background", "none");
      $("#Review").click(function() {
        $("#Reviewdiv").show();
        $("#Descriptiondiv").hide();
        $("#Technicaldiv").hide();
        $("#Review").css({
          background: "white",
          "transition-delay": "0s",
          "transition-duration": "0.8s",
        });
        $("#Description").css({
          background: "#00D872",
          color: "black",
          "transition-delay": "0s",
          "transition-duration": "1s",
        });

        $("#Review").css("color", "white");
        $("#Technical").css({
          background: "#00D872",
          color: "black",
          "transition-delay": "0s",
          "transition-duration": "1s",
        });
        $("#Review > .button1").css("color", "#00B560");
        $("#Description > .button2").css("color", "white");
        $("#Technical > .button1").css("color", "white");
      });
      $("#Description").click(function() {
        $("#Reviewdiv").hide();
        $("#Descriptiondiv").show();
        $("#Technicaldiv").hide();
        $("#Description").css({
          background: "white",
          "transition-delay": "0s",
          "transition-duration": "0.8s",
        });
        $("#Review").css({
          background: "#00D872",
          "transition-delay": "0s",
          "transition-duration": "1s",
        });
        $("#Technical").css({
          background: "#00D872",
          "transition-delay": "0s",
          "transition-duration": "1s",
        });
        $("#Review > .button1").css("color", "white");
        $("#Description > .button2").css("color", "#00B560");
        $("#Technical > .button1").css("color", "white");
      });
      $("#Technical").click(function() {
        $("#Technicaldiv").show();
        $("#Descriptiondiv").hide();
        $("#Reviewdiv").hide();
        $("#Technical").css({
          background: "white",
          "transition-delay": "0s",
          "transition-duration": "0.8s",
        });
        $("#Review").css({
          background: "#00D872",
          "transition-delay": "0s",
          "transition-duration": "1s",
        });
        $("#Description").css({
          background: "#00D872",
          "transition-delay": "0s",
          "transition-duration": "1s",
        });
        $("#Review > .button1").css("color", "white");
        $("#Description > .button2").css("color", "white");
        $("#Technical > .button1").css("color", "#00B560");
      });
      $("#Comments").click(function() {
        $("#submit-review-div").hide();
        $("#commtent-div").show();
        $("#comments-button-div").css("visibility", "hidden");
        $("#SubmitComments-button-div").css("visibility", "visible");
      });
      $("#SubmitComments").click(function() {
        $("#commtent-div").hide();
        $("#submit-review-div").show();
        $("#comments-button-div").css("visibility", "inherit");
        $("#SubmitComments-button-div").css("visibility", "hidden");
      });
    });

    //  $(function() {
    //   $(".heart").on("click", function() {
    //     $(this).toggleClass("is-active");
    //   });
    // });
  }, []);
  // const AddtoWishlist=async (_id,name,quantity,mrp,discount,description,category,image)=>{
  //    Wishlist.push({_id,name,quantity,mrp,discount,description,category,image});
  //     localStorage.setItem("Wishlist", JSON.stringify(Wishlist));
  //   }

  const ProductByCategory = async () => {
    await fetch(`${baseUrl}/api/product/all_product`)
      .then((res) => res.json())
      .then(async (data) => {
        setAllProduct(data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const Getsingledata = async () => {
    await fetch(`${baseUrl}/api/product/product_by_id`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: props.match.params.id,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        setData(data.data[0]);
        SetMainImage(data.data[0].image[0].path)

        //  ImageData= {width: 400, height: 250, zoomWidth: 500, img:data.data[0].image}
        setProductCategory(data.data[0].category.name);
        categoryDetails(data.data[0].category);
      })
      .catch((err) => {
        console.log(err, "error");
      });
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
          console.log("inside cart by id")
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
          history.push("/Cart");
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
 
  // ImageHandler

  const ImageHandler = (m,i)=>{
    let Imagestore = m.path;
    SetMainImage(Imagestore);
  }


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
        //   toast.success("Add to cart",{
        //   position:"bottom-right",
        //   autoClose:5000,
        // });
      })
      .then((err) => console.log(err, "inside update cart"));
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
        toast.success("Add to cart",{
        position:"bottom-right",
        autoClose:1000,
      });
    }
    window.scroll(0,0);
  };

  const categoryDetails = async (id) => {
    await fetch(`${baseUrl}/api/category/category_by_id`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        Setcategoryname(data.data[0].name);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  const addToCartWithoutRegistration = (
    productid,
    name,
    quantity,
    mrp,
    discount,
    description,
    category,
    manufacturer,
    image
  ) => {
    var newItemObj = {
      productid: productid,
      name: name,
      image: image,
      quantity: quantity,
      mrp: parseInt(mrp),
      singleprice: parseInt(mrp),
      discountprice: discount,
      description: description,
      category: category,
      manufacturer: manufacturer,
      description: description,
      status: "Pending",
      justification: "Enjoy",
      delivery_time: "No Status",
    };
    if (
      !JSON.stringify(CartDataWoLogin).includes(name) &&
      !JSON.stringify(localStorage.getItem("CartDataWoLogin")).includes(name)
    ) {
      if (JSON.parse(localStorage.getItem("CartDataWoLogin"))) {
        CartDataWoLogin = JSON.parse(localStorage.getItem("CartDataWoLogin"));
      }
      CartDataWoLogin.push(newItemObj);
      localStorage.setItem("CartDataWoLogin", JSON.stringify(CartDataWoLogin));
    }
  };

//==============================Get Wishlist =========================================

const getWishlist = async () => {
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
      let prodId =  props.match.params.id;
      setWishlist(data.data)
      let response = data.data;
      for(let item of response){
        if(props.match.params.id == item.productId){
          let alreadyWishlist = document.getElementById(prodId);
          alreadyWishlist.classList.add("wishlisted")
        }
      }
     }
  })    
  .catch((err) => {
    console.log(err, "error");
  });
 
};

// ======================================= Add to Wishlist =========================

  const AddtoWishlist = async (
    productid,
    name,
    quantity,
    mrp,
    discount,
    description,
    category,
    manufacturer,
    image
  ) => {
    await fetch(`${baseUrl}/api/wishlist/wishlist_by_id`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: Userdata._id,
      }),
    })
      .then((data) => data.json())
      .then(async (data) => {
        if (data.data == undefined) {
          if (!Userdata == []) {
            await fetch(
              `${baseUrl}/api/wishlist/add_to_wishlist`,
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  userid: Userdata._id,
                  image: image,
                  name: name,
                  productId: productid,
                  rating: "5",
                  category: category,
                  manufacturer: manufacturer,
                  description: description,
                }),
              }
            )
              .then((res) => res.json())
              .then(async (data) => {
                // setWishlist(data.data[0]);
                let wishlist = document.getElementById(productid)
                wishlist.classList.add("wishlisted");
                toast.success('Added to wishlist !', {
                  position: toast.POSITION.BOTTOM_RIGHT
              });
              })
              .catch((err) => {
                console.log(err, "error e");
              });
          }
        } else {
          if (!JSON.stringify(data.data).includes(productid) && data.data) {
            if (!Userdata == []) {
              await fetch(
                `${baseUrl}/api/wishlist/add_to_wishlist`,
                {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    userid: Userdata._id,
                    image: image,
                    name: name,
                    productId: productid,
                    rating: "5",
                    category: category,
                    manufacturer: manufacturer,
                    description: description,
                  }),
                }
              )
                .then((res) => res.json())
                .then(async (data) => {
                  // setWishlist(data.data[0]);
                 
                })
                .catch((err) => {
                  console.log(err, "error e");
                });
            }
          } else {
            toast.error('Allready in wishlist !', {
              position: toast.POSITION.BOTTOM_RIGHT
          });
            
          }
        }
      });
  };
  return (
    <>
      <Header1 />
      <div className="first-nav container-fluid">
        <span>
          <Link to="/">Home</Link>/
          <Link to={"/Allcategory/" + data.category}>{categoryname}</Link>/
          {data.name}
        </span>
      </div>
      <div className="container-fluid product-div mt-5">
        <div className="row ">

          <div className="col-sm-6 pd-0 picture-div justify-content-center align-items-center ">
            
            <div className="single-img-div justify-content-center align-items-center d-flex">
              {" "}
              {data.image && data.image.length > 0 ? 
              (
                <img src={
                  `${baseUrl}/` + MainImage
                } />
              ) :  <img src={require("../../src/Images/products/facewash1.png")} /> }
            </div>
            
            {/* <ReactImageZoom {...ImageData} /> */}
            <div className="row image-group pt-2">
            {data.otherImage && data.otherImage.length > 0 ?            
            data.otherImage.map((item,ind)=>(
              <div className="col-3 " key={ind}>              
                <img
                className="img-slide"
                  src={`${baseUrl}/` + item.path}
                  onClick = {()=> ImageHandler(item,ind)}
                />
              
            </div>
            
              )) : <img src={require("../../src/Images/products/facewash1.png")} /> 
            }
            </div>
            
              
          
            

            {/* phone single page caresouel */}
            <div
              id="carouselExampleIndicators"
              className="carousel slide single-page-caresouel"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src={require("../../src/Images/products/facewash1.png")}
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={require("../../src/Images/products/facewash1.png")}
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={require("../../src/Images/products/facewash1.png")}
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            {/* end phone single page careousel */}
          </div>
          <div className="col-sm-6 content-div">
            <div className="row ml-2">
              <div className="details pt-2">
                <span>{data.name}</span>
              </div>
              <div className="pt-2 pb-2">
                {/* <StarsRating
                  count={5}
                  // onChange={ratingChanged}
                  size={35}
                  color2={"#ffd700"}
                  value={4}
                /> */}
              </div>
              <div className="MRP-Taxes-div">
                <span>MRP (incl. of all taxes)</span>
              </div>

              <div className="price pt-2">
                <span className="price-detail">
                  {data.inrDiscount} <del>{data.inrMrp}</del> <span>10% OFF</span>
                </span>
              </div>

              <div className="List pt-1">
                <div>
                  <p>{data.description}</p>
                </div>
              </div>
            </div>
            <div className="row pt-2 pb-3 add">
              {/* wishlist animation */}
              {/* <div className="stage">
                 <div className="heart"></div>
                  </div> */}

              {/* end Wishlist animation */}
              <div className="wishlist">
                <i className="search-btn"></i>
                <span className="">
                  Category: <span> Skin Care</span>
                </span>
                &nbsp; <span className="pl-2">Share:</span>
                <a href="https://www.facebook.com/Nutrazik" target="_blank">
                  <i className="search-btn bx bxl-facebook "></i>
                </a>
                <a href="https://www.instagram.com/soulnutra/" target="_blank">
                  <i className="search-btn bx bxl-instagram "></i>
                </a>
                <a href="https://twitter.com/nutrazik" target="_blank">
                  <i className="search-btn bx bxl-twitter "></i>
                </a>
                <a
                  href="https://www.linkedin.com/company/70941207/admin/"
                  target="_blank"
                >
                  <i className="search-btn bx bxl-linkedin "></i>
                </a>
              </div>
            </div>
            <div className="mt-3 add-cart-buttons ml-3">
              <div className="quantity1 mt-1 justify-content-center align-items-center d-flex">
                <i
                  className="bx bx-minus minus-single mr-2"
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}
                ></i>
                <input
                  type="number"
                  //value="1"
                  min="1"
                  max="9"
                  step="1"
                  value={quantity}
                  onChange={(e) => cartfunction(e.target.value)}
                />
                <i
                  className="bx bx-plus minus-single ml-2"
                  onClick={() => setQuantity(quantity + 1)}
                ></i>
              </div>
              <div className="add-to-cart mt-1">
                {
                  Userdata ? 
                  <button
                  onClick={() => {
                    {
                      Userdata != null
                        ? cartfunction(
                            data._id,
                            data.name,
                            quantity,
                            data.inrMrp,
                            data.inrDiscount,
                            data.discount,
                            data.description,
                            data.category,
                            data.manufacturer.name,
                            data.image[0].path
                          )
                        : addToCartWithoutRegistration(
                            data._id,
                            data.name,
                            quantity,
                            data.inrMrp,
                            data.inrDiscount,
                            data.discount,
                            data.description,
                            data.category,
                            data.manufacturer.name,
                            data.image[0].path
                          );
                    }
                  }}
                 
                   
                >
                  Add to Cart
                </button> :
                     <button
                     data-bs-toggle="modal"
                     data-bs-target={Userdata == null ? "#exampleModal" : null}>
                     <Link to="/Register">                  
                     </Link>
                     Add to Cart
                     </button>
                     
                }
                
              </div>
              
              <div className="quantity2 mt-1 ml-2 justify-content-center align-items-center d-flex">
                {Userdata ? (
                  <i
                    id={prodId}
                    className="bx bxs-heart"
                    onClick={() => {
                      AddtoWishlist(
                        data._id,
                        data.name,
                        quantity,
                        data.mrp,
                        data.discount,
                        data.description,
                        data.category,
                        data.manufacturer.name,
                        data.image
                      );
                    }}
                  ></i>
                ) : (
                  <>
                    <i
                      className="bx bxs-heart ml-3 pc-heart"
                      data-bs-toggle="modal"
                      data-bs-target={Userdata == null ? "#exampleModal" : null}
                    ></i>
                    <Link to="/Register">
                      <i className="bx bxs-heart ml-3 mobile-heart"></i>
                    </Link>
                  </>
                )}
                
                 <ToastContainer />
  
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid description">
        <div className="row main-div p-4">
          <div>
            <div className="row heading mt-4 jutify-content-center align-items-center">
              {/* <div className="col-sm-1"></div> */}
              <div className="col-sm-2 title" id="Description">
                <button className="button2">Description</button>
              </div>
              {/* <div className="col-sm-2 text-center title " id="Review">
                <button className="button1">Review</button>
              </div>
              <div className="col-sm-2 text-center title" id="Technical">
                <button className="button1">Add a Review</button>
              </div> */}
              {/* <div className="col-sm-3"></div> */}
            </div>
            <div className="row content1">
              <div className="text" id="Descriptiondiv">
                <span>{data.description}</span>
              </div>
              <div className="container p-5  text " id="Reviewdiv">
                <div className="row ">
                  <div className="col-4">
                    <div className="start-div">
                      <div className="row">
                        <div className="col-6">
                          {/* <StarsRating
                            count={5}
                            // onChange={ratingChanged}
                            size={25}
                            color2={"#ffd700"}
                            value={4}
                          /> */}
                        </div>
                        <div className="col-6 text-right">
                          <span className="date">22/07/2021</span>
                        </div>
                        {/* </div> */}
                        <div className="col-12 ">
                          <span className="content-text">
                            Loved this toner! I've been searching for
                            non-alcohol options and this one is my match!
                            Alcohol Free Matcha Toner To Tighten Pores And
                            Balance pH & Oil Levels
                          </span>
                        </div>
                        <div className="col-12 varified-div">
                          <span>
                            Prerna J. <span>Varified Buyer</span>
                          </span>
                        </div>
                        <div className="col-12 location-div ml-2">
                          <span>INDIA</span>
                        </div>
                        <div className="col-12 help-div ml-2 pd-0">
                          <span>Was this helpful?</span>
                          <i className="bx bx-like pl-2"></i>
                          <span>1</span>
                          <i className="bx bx-dislike pl-2"></i>
                          <span>1</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-4 ">
                    <div className="start-div">
                      <div className="row">
                        <div className="col-6">
                          {/* <StarsRating
                            count={5}
                            // onChange={ratingChanged}
                            size={25}
                            color2={"#ffd700"}
                            value={4}
                          /> */}
                        </div>
                        <div className="col-6 text-right">
                          <span className="date">22/07/2021</span>
                        </div>
                        {/* </div> */}
                        <div className="col-12">
                          <span className="content-text">
                            Loved this toner! I've been searching for
                            non-alcohol options and this one is my match!
                            Alcohol Free Matcha Toner To Tighten Pores And
                            Balance pH & Oil Levels   
                          </span>
                        </div>
                        <div className="col-12 varified-div">
                          <span>
                            Prerna J. <span>Varified Buyer</span>
                          </span>
                        </div>
                        <div className="col-12 location-div ml-2">
                          <span>INDIA</span>
                        </div>
                        <div className="col-12 help-div ml-2 pd-0">
                          <span>Was this helpful?</span>
                          <i className="bx bx-like pl-2"></i>
                          <span>1</span>
                          <i className="bx bx-dislike pl-2"></i>
                          <span>1</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container p-5  text" id="Technicaldiv">
                <div className="row">
                  <div className="col-4 "></div>
                  <div className="col-5 add-review-div">
                    <div className="form-group">
                      <label>Email</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Order ID</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Write a Review</label>
                      <textarea
                        type="text"
                        className="form-control"
                        rows="5"
                        placeholder="Type here.."
                      ></textarea>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        {/* <StarsRating
                          count={5}
                          // onChange={ratingChanged}
                          size={30}
                          color2={"#ffd700"}
                          value={0}
                        /> */}
                      </div>

                      <div className="col-6">
                        <button>Submit</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-3 "></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid p-4 products relate-products text-center">
      <div className="row relate-product">
          <div className="col-3 line">
            <hr className="hr"></hr>
          </div>
          <div className="col-6">
            <div className="row related">
              <span>Related Products</span>
            </div>
          </div>
          <div className="col-3 line">
            <hr className="hr"></hr>
          </div>
        </div>
        {/* Related product heading for phone view */}
        <div className="row relate-product1">
          <div className="col-12">
            <div className="row related">
              <span>Related Products</span>
            </div>
          </div>
        </div>
        {/* End Related product heading for phone view */}
        <div className="row products-row p-4 ">
          {AllProduct.map((item, index) => {
            if (related < 4 && ProductCategory == item.category.name) {
              related = related + 1;
              return (
                <div className="col-lg-2 col-md-12 col-sm-12 ">
                  {/* <Link to={"/SingleProduct/" + el._id}> */}
                  <div className="single-products-box border">
                    <div className="row  align-items-center product-div">
                      <div className="product-image-div">
                        <Link
                          to={"/SingleProduct/" + item._id}
                          className="product-image-link"
                        >
                          <div className="image hover-switch">
                            <img
                           src={defaultImage}
                           alt="" 
                            />
                            <img
                              src={ 
                                `${baseUrl}/` + item.image[0].path
                              }
                              alt=""
                              style={{ position: "absolute", left:"0" }}
                            />
                          </div>
                        </Link>
                      </div>
                      <div className="pd-0 tranding product-image-content">
                        <div className="content product-content">
                          <Link to={"/SingleProduct/" + item._id}>
                            <h3 className="">
                              <ReadMoreReact
                                text={item.name}
                                min={7}
                                ideal={7}
                                max={7}
                                readMoreText={"..."}
                              />
                            </h3>
                          </Link>
                          {/* <div className="d-flex pb-2 pl-4"> */}
                            {/* <i className="bx bxs-star"></i>
                            <i className="bx bxs-star"></i>
                            <i className="bx bxs-star"></i>
                            <i className="bx bxs-star"></i>
                            <i className="bx bxs-star"></i> */}
                          {/* </div> */}
                          {/* <div className=" justify-content-center align-items-center d-flex pt-3 mr-5">
                            <div className="discount-price-div">
                              <span>{item.inrDiscount}%</span>
                            </div>
                            <div className="discount-price-div2">
                              <span>off</span>
                            </div>
                          </div> */}
                          <div className="price-div">
                            <span className="new-price">
                              {/* ${" "}
                              {isNaN(
                                item.inrMrp -
                                  (item.inrMrp * item.inrDiscount) / 100
                              )
                                ? 0
                                : item.inrMrp -
                                  (item.inrMrp * item.inrDiscount) / 100} */}
                                  <i className="fa fa-inr"></i>{item.inrDiscount}
                            </span>
                            <del className="new-price ml-1">{item.inrMrp}</del>
                            {Userdata ? (
                              <i
                                className="bx bxs-heart ml-3"
                                onClick={() => {
                                  AddtoWishlist(
                                    item._id,
                                    item.name,
                                    quantity,
                                    item.inrMrp,
                                    item.inrDiscount,
                                    item.description,
                                    item.category,
                                    item.manufacturer.name,
                                    item.image
                                  );
                                }}
                              ></i>
                            ) : (
                              <>
                                <i
                                  className="bx bxs-heart ml-3 pc-heart"
                                  data-bs-toggle="modal"
                                  data-bs-target={
                                    Userdata == null ? "#exampleModal" : null
                                  }
                                ></i>
                                <Link to="/Register">
                                  <i className="bx bxs-heart ml-3 mobile-heart"></i>
                                </Link>
                              </>
                            )}

                            <i className="bx bx-cart ml-3"></i>
                          </div>
                          {/* <div className="price mt-1">
                              <div>
                                 <span className="new-price">
                                 $
                                 {isNaN(el.inrMrp - (el.inrMrp * el.inrDiscount) / 100)
                                 ? 0
                                 : el.inrMrp - (el.inrMrp * el.inrDiscount) / 100}
                                 </span>
                              </div>
                           </div> */}
                          {/* <div className="mt-2 mb-2">
                              <button className="add-to-cart-button1 text-nowrap"  onClick={()=>{cartfunction(el._id,el.name,quantity,el.inrMrp,el.inrDiscount,el.description,el.category,el.manufacturer.name,el.image[0].path)}} data-bs-toggle={Userdata==null?"modal":null} data-bs-target= {Userdata==null?"#exampleModal":null}>Add to Cart</button>
                           </div> */}
                          {/* <div className="row">
                              
                              <div className="col-12">
                                 <p className="bottom-icon text-nowrap" onClick={()=>{AddtoWishlist(el._id,el.name,quantity,el.inrMrp,el.inrDiscount,el.description,el.category,el.manufacturer.name,el.image)}}  data-bs-toggle={Userdata==null?"modal":null} data-bs-target= {Userdata==null?"#exampleModal":null}><i className='bx bx-heart' ></i>Wishlist</p>
                              <div className="icon-wishlist"></div>
                              </div>
                           </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* </Link> */}
                </div>
              );
            }
          })}
        </div>
      </div>

      {/* Review Section for mobile */}
      <div className="review-sec">
        <div className="cmt-button-sec">
          <div
            className="col-sm-6  align-items-center d-flex"
            id="comments-button-div"
          >
            <span>Review Form</span>
            <button style={{ float: "right" }} id="Comments" className="ml-5">
              Comments
            </button>
          </div>
          <div
            className="col-sm-6  align-items-center d-flex"
            id="SubmitComments-button-div"
          >
            <span>Rating & Review</span>
            <button style={{ float: "right" }} id="SubmitComments">
              Submit Comment
            </button>
          </div>
        </div>
        <hr />

        <div className="review-sec-mobile" id="commtent-div">
          <section id="testimonials">
            <div className="testimonial-heading">
              <span>Comments</span>
            </div>

            <div className="testimonial-box-container">
              <div className="testimonial-box">
                <div className="box-top">
                  <div className="profile">
                    <div className="profile-img">
                      <img src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png" />
                    </div>

                    <div className="name-user">
                      <strong>Barry Allen</strong>
                      <div className="reviews">
                        <span>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="far fa-star"></i>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="date">
                    <span>22/09/2021</span>
                  </div>
                </div>

                <div className="client-comment">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Exercitationem, quaerat quis? Provident temporibus
                    architecto asperiores nobis maiores nisi a. Quae doloribus
                    ipsum aliquam tenetur voluptates incidunt blanditiis sed
                    atque cumque.
                  </p>
                </div>
              </div>
            </div>
            <div className="testimonial-box-container">
              <div className="testimonial-box">
                <div className="box-top">
                  <div className="profile">
                    <div className="profile-img">
                      <img src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png" />
                    </div>

                    <div className="name-user">
                      <strong>Barry Allen</strong>
                      <div className="reviews">
                        <span>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="far fa-star"></i>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="date">
                    <span>22/09/2021</span>
                  </div>
                </div>

                <div className="client-comment">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Exercitationem, quaerat quis? Provident temporibus
                    architecto asperiores nobis maiores nisi a. Quae doloribus
                    ipsum aliquam tenetur voluptates incidunt blanditiis sed
                    atque cumque.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* submit review div */}
        <div id="submit-review-div">
          <h2 id="fh2">WE APPRECIATE YOUR REVIEW!</h2>

          <form id="feedback" action="">
            <div className="pinfo">Your Email</div>

            <div className="form-group">
              <div className="col-md-4 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="fa fa-envelope"></i>
                  </span>
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="john.doe@yahoo.com"
                  />
                </div>
              </div>
            </div>
            <div className="pinfo">Your Order id.</div>
            <div className="form-group">
              <div className="col-md-4 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="fa fa-globe"></i>
                  </span>
                  <input
                    name="URL"
                    placeholder="Order id"
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            <div className="pinfo">Rate our overall services.</div>

            <div className="form-group">
              {/* <StarsRating
                count={5}
                // onChange={ratingChanged}
                size={25}
                color2={"#ffd700"}
                value={4}
              /> */}
            </div>

            <div className="pinfo">Write your feedback.</div>

            <div className="form-group">
              <div className="col-md-4 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="fa fa-edit"></i>
                  </span>
                  <textarea
                    className="form-control"
                    id="review"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
      {/* end submit review div */}
      {/* End Review section for mobile */}
      <Baseline />
      <Footer />
      </>
  );
};
export default SingleProduct;
