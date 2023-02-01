import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import "./homepage.css";
import "../../sass/whislist.css";
import Carouselcomp from "../../components/Carouselcomp";
import Baseline from "../../components/Baseline";
import Header1 from "../../components/Header1";
import { useHistory } from "react-router-dom";
import Delivery from "../../Images/delivery.jpg";
import ReadMoreReact from "read-more-react";
import Mobile from "../../Images/Mobile.png";
import { AiFillApple } from "react-icons/ai";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as ACTIONS from '../../CommonService/AddToCart/action'
import { useSelector, useDispatch } from "react-redux";
import { baseUrl } from "../../utils/services";
import Carousel from "react-elastic-carousel";

import $ from "jquery";

var Userdata = "";
var CartDataWoLogin = [];
const HomePage = () => {

  let dispatch = useDispatch();
  const images = [
    "../../Images/categories/categories-img1.png",
    "../../Images/categories/categories-img2.png",
    "../../Images/categories/categories-img3.png",
    "../../Images/categories/categories-img4.png",
    "../../Images/categories/categories-img5.png",
    "../../Images/categories/categories-img6.png",
  ];

const breakPoints = [
{ width : 1, itemsToShow : 1},
{ width : 550, itemsToShow : 2},
{ width : 768, itemsToShow : 4},
{ width : 1200, itemToShow : 6},
];

  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [Manufactureres, setManufactureres] = useState([]);
  const [AllProduct, setAllProduct] = useState([]);
  const [search, setSearch] = useState("");

  const [ProductCategory, setProductCategory] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [userCart, setUserCart] = useState([]);
  const [cartItems, setCartItems] = useState(undefined)
  const [order, Setorder] = useState([]);
  const [Categorydetails, setCategoryDetails] = useState({});
  const [categoryname, Setcategoryname] = useState();
  const [wishlistData,Setwishlist]=useState([])

  const history = useHistory();

  // useEffect(() => {
    
  // },[])

  useEffect(() => {
    // Userdata = localStorage.getItem("Userdata");
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    GetData();
    CartById();
    GetWishlist();    
    GetCategory();
    GetManufacturer();
    $(document).ready(function() {
      //    $('.icon-wishlist').on('click', function(){
      //       $(this).toggleClass('in-wishlist');

      // })

      $(".frontimage").mouseover(function() {
        alert("in");
      });
      $(".frontimage").mouseleave(function() {
        alert("in");
      });
    });
  }, []);

  let carouselRef = useRef(null);

  const onNextStart = (currentItem, nextItem) => {
    if (currentItem.index === nextItem.index) {
    carouselRef.current.goTo(0);
    }
  }
  
    const onPrevStart = (currentItem, nextItem) => {
      if (currentItem.index === nextItem.index) {
      carouselRef.current.goTo(data.otherImage.length);
      }
      };

      const Loop = (currentItem) => {
        if (currentItem.index == data.otherImage.length - 1) {
        setTimeout(() => {
        carouselRef.current.goTo(0);
        }, 1000);
        }
        };

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

  const GetData = async () => {
    // Userdata = await (localStorage.getItem("Userdata"));
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    await fetch(`${baseUrl}/api/product/all_product`)
      .then((res) => res.json())
      .then(async (data) => {
        setData(data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  const GetManufacturer = async () => {
    await fetch(`${baseUrl}/api/manufacture/all_manufacture`)
      .then((res) => res.json())
      .then(async (data) => {
        setManufactureres(data.data);
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };
  const GetCategory = async () => {
    await fetch(`${baseUrl}/api/category/all_category`)
      .then((res) => res.json())
      .then(async (data) => {
        setCategories(data.data);
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
        // CartById();
        await UpdateCart();
        //   await AsyncStorage.setItem("order1", JSON.stringify(userCart.order));
        //   newamount = 0;
      }
      toast.success("Added to Cart", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
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
        //window.scroll(0, 0);
      })
      .then((err) => console.log(err));
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
          setCartItems(data.data[0].order.length);
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
          CartById();
          
          // setCartItems(data.data[0].order.length);
          // history.push("/Cart");
        })
        .catch((err) => {
          console.log(err, "error");
        });
    }
    // else{
    //   history.push('/Register')
    // }
  };
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
                toast.error("Added to wishlist", {
                  position: toast.POSITION.BOTTOM_RIGHT,
                  autoClose: 2000,
                });
                
                //add product to wishlist response is comming here
                let wishList = document.getElementById(productid);
                wishList.classList.add("in-wishlist");
                wishList.classList.add("wishlisted");
                 GetWishlist();
                // setWishlist(data.data[0]);
              })
              .catch((err) => {
                console.log(err, "error e");
              });
          }
        } 
        else {
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
                  toast.error("Added to wishlist", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000,
                  });
                  let wishList = document.getElementById(productid);
                  wishList.classList.add("in-wishlist");
                  wishList.classList.add("wishlisted");
                  GetWishlist();
                  // setWishlist(data.data[0]);
                })
                .catch((err) => {
                  console.log(err, "error e");
                });
                
            }
          } else {
            toast.error("Allready in wishlist !", {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 2000,
            });
          }
        }
      });
  };
  // const HeartColor = (el) => {
  //   $(document).ready(function() {
  //     $(".bxs-heart").click(function() {
  //       $(".bxs-heart").addClass("active-color");
  //     });
  //   });
  // };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const searchData = (e) => {
    // if (props.func) props.func(e);
  };

  const checkWishlistItem = (productId) => {
    for (let item of wishlistData) {
      if (item.productId == productId) {
        return "wishlisted"
      }
    }
    }
  

  return (
    <>
      <Header1/>
      {/* <Carouselcomp /> */}
      <div id="">
        {/* trending section  */}
        <section className="home-banner">
          <div className="container m-auto">
            <div className="row">
              <div className="col-md-6">
                <div className="home-banner-left">
                  <p className="home-banner-heading">
                    Reliable on time home delivery
                  </p>
                  <p className="home-banner-content">
                    We are excited to be part of the WordPress community and
                    looking to make contribution by releasing free WordPress
                    themes for everyone to use. Other themes can be found here.
                  </p>

                  <div className="login-div2 clearfix mb-5">
                    <input
                      type="text"
                      onChange={(e) => setSearch(e.target.value.toLowerCase())}
                      onKeyPress={(e) => {
                        if (e.key == "Enter") {
                          searchData(search);
                        }
                      }}
                    />
                    <Link to={"/SearchResult/" + search}>
                      <button
                        className="search mr-1"
                        onClick={() => searchData(search)}
                      >
                        <i className="bx bx-search-alt"></i>
                      </button>
                    </Link>
                  </div>

                  {/* <div className="home-banner-buttons pt-4">
                    <button className="btn common-gradient-btn">
                      Read More
                    </button>
                  </div> */}
                </div>
              </div>
              <div className="col-md-6">
                <div className="home-banner-right">
                  <img src={Delivery} className="img-fluid"></img>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="products-area">
          <h1 className="trendign-head">
            <span className="products-color">Trending Products</span>
          </h1>
          <div className="container m-auto">
            <div className="row">
              {data.map((el, ind) => {
                if(ind<6)
                {
                  return (
                    <>
                      <div className="col-lg-2 col-md-12 col-sm-12" key={ind}>
                        {/* <Link to={"/SingleProduct/" + el._id}> */}
                        <div className="single-products-box border">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="product-div">
                                <div className="product-image-div">
                                  <Link
                                    to={"/SingleProduct/" + el._id}
                                    className="product-image-link"
                                  >
                                    <div className="image hover-switch">
                                      <img
                                      src={ el.otherImage && 
                                        el.otherImage.length > 0 ? `${baseUrl}/` + el.otherImage[0].path :
                                        require("../../Images/products/Hintosulin (1).png")
                                      }
                                        // src={require("../../Images/products/Hintosulin (1).png")}
                                        alt=""
                                      />
                                      <img
                                        src={
                                          `${baseUrl}/` +
                                          el.image[0].path
                                        }
                                        alt=""
                                        style={{ position: "absolute", left:"0" }}
                                      />
                                    </div>
                                  </Link>
                                </div>
                                <div className="tranding product-image-content">
                                  <div className="content product-content">
                                    <Link to={"/SingleProduct/" + el._id}>
                                      <figcaption>{el.name}</figcaption>
                                    </Link>
                                    <div className="price-div">
                                      <span className="new-price">
                                        <i className="fa fa-inr"></i>{" "}
                                        {el.inrDiscount}
                                      </span>
                                      
                                      <del className="new-price ml-1">
                                      <i className="fa fa-inr"></i>
                                        {el.inrMrp}
                                      </del>
                                      {Userdata ? (
                                        <i
                                          className={`bx bxs-heart ml-3  ${checkWishlistItem(el._id)}`}
                                          id={el._id}
                                          onClick={() => {
                                            AddtoWishlist(
                                              el._id,
                                              el.name,
                                              quantity,
                                              el.inrMrp,
                                              el.inrDiscount,
                                              el.description,
                                              el.category,
                                              el.manufacturer.name,
                                              el.image
                                            );
                                          }}
                                          // onClick={() => {
                                          //   wishList(el)
                                          // }}
                                        ></i>
                                      ) : (
                                        <>
                                          <i
                                            className="bx bxs-heart ml-3 pc-heart"
                                            data-bs-toggle="modal"
                                            data-bs-target={
                                              Userdata == null
                                                ? "#exampleModal"
                                                : null
                                            }
                                          ></i>

                                          <Link to="/Register">
                                            <i className="bx bxs-heart ml-3 mobile-heart"></i>
                                          </Link>
                                        </>
                                      )}
                                      <div>
                                        {Userdata ? (
                                          <i
                                            className="bx bx-cart"
                                            onClick={() => {
                                              {
                                                Userdata !== null
                                                  ? cartfunction(
                                                      el._id,
                                                      el.name,
                                                      quantity,
                                                      el.inrMrp,
                                                      el.inrDiscount,
                                                      el.discount,
                                                      el.description,
                                                      el.category,
                                                      el.manufacturer.name,
                                                      el.image[0].path
                                                    )
                                                  : addToCartWithoutRegistration(
                                                      el._id,
                                                      el.name,
                                                      quantity,
                                                      el.inrMrp,
                                                      el.inrDiscount,
                                                      el.discount,
                                                      el.description,
                                                      el.category,
                                                      el.manufacturer.name,
                                                      el.image[0].path
                                                    );
                                              }
                                            }}
                                          ></i>
                                        ) : (
                                          <i
                                            className="bx bx-cart mr-1"
                                            data-bs-toggle="modal"
                                            data-bs-target={
                                              Userdata == null
                                                ? "#exampleModal"
                                                : null
                                            }
                                          >
                                            <Link to="/Register"></Link>
                                          </i>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* </Link> */}
                      </div>
                    </>
                  );
                }
              })}
            </div>
            {/* hover Button */}
            <div className="wrapperbtn pt-0">
              <Link to="/AllProducts" className="btn10">
                <span>Show More</span>
                <div className="transition"></div>
              </Link>
            </div>
            {/* Hover Button End */}
          </div>
        </section>

        <section className="categories-section">
        <h1 className="trendign-head">
            <span className="products-color">Featured Categories</span>
          </h1>
          <div className="container m-auto">
            <div className="row mt-0 featured-products">
              <Carousel // breakPoints={breakPoints} 
              enableAutoPlay
              autoPlaySpeed={3000} 
              itemsToShow={2}
              onPrevStart={onPrevStart}
              onNextStart={onNextStart}
              infiniteLoop={true}
              // onChange={Loop}
              ref={carouselRef}
              disableArrowsOnEnd={false}
              // itemPadding={[0, 4]}
              >       
              { categories && categories.map((item, index) => {                 
                if(item.featuredCategories == "Featured Categories"){
                return(  
              <div className="col-md-12" key={index}>
                <div className="cat-left-side">
                  <div className="row mt-0 align-items-center">
                  <h1 className="cat-heading">{item.name}</h1>
                    <div className="col-md-6">
                      <p className="cat-para">
                       {item.description}
                      </p>
                      <Link to={"/Subcategories/" + item._id}>
                      <button className="btn btn cosmetic-shop-now">
                        Shop Now
                      </button>
                      </Link>
                    </div>
                    <div className="col-md-6">
                      <Link to={"/Subcategories/" + item._id}>
                        <div className="category-div">
                          <figure>
                            
                            {/* <img
                              // src={require("../../Images/Nutraceutical-image 1.png")} cosmatic-healthcare.jpeg
                              src={require("../../Images/cosmatic-healthcare.jpeg")}
                              className="front-img img-fluid"
                            /> */}
                            <img
                                      src={
                                        item.image && 
                                        `${baseUrl}/` +
                                        item.image[0].path
                                      }
                                      alt=""
                                      className="cat-left-side-image"
                                    />
                
                          </figure>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
                )}

              })}   
              </Carousel>          
            </div>
          </div>
        </section>

        <section className="products-area ">
          <h1 className="trendign-head">
            <span className="products-color">Products</span>
          </h1>
          <div className="container m-auto py-4">
            <div className="row ">
              {data.map((el, index) => {
                if (index < 6) {
                  return (
                    <div className="col-lg-2 col-md-12 col-sm-12" key={index}>
                      {/* <Link to={"/SingleProduct/" + el._id}> */}
                      <div className="single-products-box border">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="product-div">
                              <div className="product-image-div">
                                <Link
                                  to={"/SingleProduct/" + el._id}
                                  className="product-image-link"
                                >
                                  <div className="image hover-switch">                                  
                                    <img
                                      src={el.otherImage &&
                                        el.otherImage.length > 0 ? `${baseUrl}/` + el.otherImage[0].path : require("../../Images/products/Hintosulin (1).png")}
                                      alt=""
                                    />
                                    <img
                                      src={
                                        `${baseUrl}/` +
                                        el.image[0].path
                                      }
                                      alt=""
                                      style={{ position: "absolute",left: "0" }}
                                    />
                                  </div>
                                </Link>
                              </div>
                              <div className="tranding product-image-content">
                                <div className="content product-content">
                                  <Link to={"/SingleProduct/" + el._id}>
                                  <figcaption>{el.name}</figcaption>
                                  </Link>
                                  <div className="price-div">
                                    <span className="new-price">
                                    <i className="fa fa-inr"></i>{el.inrDiscount}</span>
                                    
                                    <del className="new-price ml-1"><i className="fa fa-inr"></i>{el.inrMrp}</del>
                                    {Userdata ? (
                                        <i
                                          className={`bx bxs-heart ml-3  ${checkWishlistItem(el._id)}`}
                                          id={el._id}
                                          onClick={() => {
                                            AddtoWishlist(
                                              el._id,
                                              el.name,
                                              quantity,
                                              el.inrMrp,
                                              el.inrDiscount,
                                              el.description,
                                              el.category,
                                              el.manufacturer.name,
                                              el.image
                                            );
                                          }}
                                          // onClick={() => {
                                          //   wishList(el)
                                          // }}
                                        ></i>
                                      ) : (
                                      <>
                                        <i
                                          className="bx bxs-heart ml-3 pc-heart"
                                          data-bs-toggle="modal"
                                          data-bs-target={
                                            Userdata == null
                                              ? "#exampleModal"
                                              : null
                                          }
                                        ></i>
                                        <Link to="/Register">
                                          <i className="bx bxs-heart ml-3 mobile-heart"></i>
                                        </Link>
                                      </>
                                    )}
                                    <div>
                                      {Userdata ? (
                                        <i
                                          className="bx bx-cart"
                                          onClick={() => {
                                            {
                                              Userdata !== null
                                                ? cartfunction(
                                                    el._id,
                                                    el.name,
                                                    quantity,
                                                    el.inrMrp,
                                                    el.inrDiscount,
                                                    el.discount,
                                                    el.description,
                                                    el.category,
                                                    el.manufacturer.name,
                                                    el.image[0].path
                                                  )
                                                : addToCartWithoutRegistration(
                                                    el._id,
                                                    el.name,
                                                    quantity,
                                                    el.inrMrp,
                                                    el.inrDiscount,
                                                    el.discount,
                                                    el.description,
                                                    el.category,
                                                    el.manufacturer.name,
                                                    el.image[0].path
                                                  );
                                            }
                                          }}
                                        ></i>
                                      ) : (
                                        <i
                                          className="bx bx-cart mr-1"
                                          data-bs-toggle="modal"
                                          data-bs-target={
                                            Userdata == null
                                              ? "#exampleModal"
                                              : null
                                          }
                                        >
                                          <Link to="/Register"></Link>
                                        </i>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
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
            {/* hover Button */}

            <div className="wrapperbtn pt-3 pb-4">
              <Link to="/AllProducts" className="btn10">
                <span>Show More</span>
                <div className="transition"></div>
              </Link>
            </div>
            {/* Hover Button End */}
          </div>
        </section>
        <section className="products-area">
          <h1 className="trendign-head">
            <span className="products-color">Weight Management</span>
          </h1>
          <div className="container m-auto">
            <div className="row">
              {data.filter((item) => item.category.name == "Weight Management").map((el,index)=>{
                if(index < 6){
                  return(

                    <div className="col-lg-2 col-md-12 col-sm-12" key={index}>
                    {/* <Link to={"/SingleProduct/" + el._id}> */}
                    <div className="single-products-box border">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="product-div">
                            <div className="product-image-div">
                              <Link
                                to={"/SingleProduct/" + el._id}
                                className="product-image-link" 
                              >
                                
                                <div className="image hover-switch">
                                  <img
                                    src={el.otherImage &&
                                      el.otherImage.length > 0 ? `${baseUrl}/` + el.otherImage[0].path : require("../../Images/products/Hintosulin (1).png")}
                                    alt=""
                                  />
                                  <img
                                    src={
                                      `${baseUrl}/` +
                                      el.image[0].path
                                    }
                                    alt=""
                                    style={{ position: "absolute", left: "0" }}
                                  />
                                </div>
                              </Link>
                            </div>
                            <div className="tranding product-image-content">
                              <div className="content product-content">
                                <Link to={"/SingleProduct/" + el._id}>
                                <figcaption>{el.name}</figcaption>
                                </Link>
                                <div className="price-div">
                                  <i className="fa fa-inr"></i>
                                  <span className="new-price">{el.inrDiscount}</span>
                                 
                                  <del className="new-price ml-1"><i className="fa fa-inr"></i>{el.inrMrp}</del>
                                  {Userdata ? (
                                      <i
                                        className={`bx bxs-heart ml-3  ${checkWishlistItem(el._id)}`}
                                        id={el._id}
                                        onClick={() => {
                                          AddtoWishlist(
                                            el._id,
                                            el.name,
                                            quantity,
                                            el.inrMrp,
                                            el.inrDiscount,
                                            el.description,
                                            el.category,
                                            el.manufacturer.name,
                                            el.image
                                          );
                                        }}
                                        // onClick={() => {
                                        //   wishList(el)
                                        // }}
                                      ></i>
                                    ) : (
                                    <>
                                      <i
                                        className="bx bxs-heart ml-3 pc-heart"
                                        data-bs-toggle="modal"
                                        data-bs-target={
                                          Userdata == null
                                            ? "#exampleModal"
                                            : null
                                        }
                                      ></i>
                                      <Link to="/Register">
                                        <i className="bx bxs-heart ml-3 mobile-heart"></i>
                                      </Link>
                                    </>
                                  )}

                                  
                                  {Userdata ? (
                                    <i
                                      className="bx bx-cart"
                                      onClick={() => {
                                        {
                                          Userdata !== null
                                            ? cartfunction(
                                                el._id,
                                                el.name,
                                                quantity,
                                                el.inrMrp,
                                                el.inrDiscount,
                                                el.discount,
                                                el.description,
                                                el.category,
                                                el.manufacturer.name,
                                                el.image[0].path
                                              )
                                            : addToCartWithoutRegistration(
                                                el._id,
                                                el.name,
                                                quantity,
                                                el.inrMrp,
                                                el.inrDiscount,
                                                el.discount,
                                                el.description,
                                                el.category,
                                                el.manufacturer.name,
                                                el.image[0].path
                                              );
                                        }
                                      }}
                                    ></i>
                                  ) : (
                                    <i
                                      className="bx bx-cart mr-1"
                                      data-bs-toggle="modal"
                                      data-bs-target={
                                        Userdata == null
                                          ? "#exampleModal"
                                          : null
                                      }
                                    >
                                      <Link to="/Register"></Link>
                                    </i>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  )
                }
              })}
              
              
              {/* {data.map((el, i) => {
                if (i > 0 && el.category.name === "Weight Management" && weightManagement < 6) {
                  weightManagement = weightManagement + 1;
                  return (
                    <div className="col-lg-2 col-md-12 col-sm-12" key={i}>
                      <div className="single-products-box border">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="product-div">
                              <div className="product-image-div">
                                <Link
                                  to={"/SingleProduct/" + el._id}
                                  className="product-image-link"
                                >
                                  
                                  <div className="image hover-switch">
                                    <img
                                      src={el.otherImage &&
                                        el.otherImage.length > 0 ? `${baseUrl}/` + el.otherImage[0].path : require("../../Images/products/Hintosulin (1).png")}
                                      alt=""
                                    />
                                    <img
                                      src={
                                        `${baseUrl}/` +
                                        el.image[0].path
                                      }
                                      alt=""
                                      style={{ position: "absolute", left: "0" }}
                                    />
                                  </div>
                                </Link>
                              </div>
                              <div className="tranding product-image-content">
                                <div className="content product-content">
                                  <Link to={"/SingleProduct/" + el._id}>
                                    <ReadMoreReact text={el.name} />
                                  </Link>
                                  <div className="price-div">
                                    <i className="fa fa-inr"></i>
                                    <span className="new-price">{el.inrDiscount}</span>
                                    <del className="new-price ml-1">{el.inrMrp}</del>
                                    {Userdata ? (
                                        <i
                                          className={`bx bxs-heart ml-3  ${checkWishlistItem(el._id)}`}
                                          id={el._id}
                                          onClick={() => {
                                            AddtoWishlist(
                                              el._id,
                                              el.name,
                                              quantity,
                                              el.inrMrp,
                                              el.inrDiscount,
                                              el.description,
                                              el.category,
                                              el.manufacturer.name,
                                              el.image
                                            );
                                          }}
                                        ></i>
                                      ) : (
                                      <>
                                        <i
                                          className="bx bxs-heart ml-3 pc-heart"
                                          data-bs-toggle="modal"
                                          data-bs-target={
                                            Userdata == null
                                              ? "#exampleModal"
                                              : null
                                          }
                                        ></i>
                                        <Link to="/Register">
                                          <i className="bx bxs-heart ml-3 mobile-heart"></i>
                                        </Link>
                                      </>
                                    )}

                                    
                                    {Userdata ? (
                                      <i
                                        className="bx bx-cart"
                                        onClick={() => {
                                          {
                                            Userdata !== null
                                              ? cartfunction(
                                                  el._id,
                                                  el.name,
                                                  quantity,
                                                  el.inrMrp,
                                                  el.inrDiscount,
                                                  el.discount,
                                                  el.description,
                                                  el.category,
                                                  el.manufacturer.name,
                                                  el.image[0].path
                                                )
                                              : addToCartWithoutRegistration(
                                                  el._id,
                                                  el.name,
                                                  quantity,
                                                  el.inrMrp,
                                                  el.inrDiscount,
                                                  el.discount,
                                                  el.description,
                                                  el.category,
                                                  el.manufacturer.name,
                                                  el.image[0].path
                                                );
                                          }
                                        }}
                                      ></i>
                                    ) : (
                                      <i
                                        className="bx bx-cart mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target={
                                          Userdata == null
                                            ? "#exampleModal"
                                            : null
                                        }
                                      >
                                        <Link to="/Register"></Link>
                                      </i>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  );
                }
              })} */}
            </div>
            {/* hover Button */}
            <div className="wrapperbtn pt-3 pb-4">
              <Link to="/Subcategory" className="btn10">
                <span>Show More</span>
                <div className="transition"></div>
              </Link>
            </div>
            {/* Hover Button End */}
          </div>
        </section>

        <div className="brands-area">
          <div className="container m-auto">
            <div className="trendign-head">
              <span className="products-color">Selling Brands</span>
            </div>
            <div className="row image-group">
              <Carousel
               // breakPoints={breakPoints} 
              disableAutoPlay
              autoPlaySpeed={1500} 
              itemsToShow={5}
              onPrevStart={onPrevStart}
              onNextStart={onNextStart}
              // onChange={Loop}
              ref={carouselRef}
              disableArrowsOnEnd={false}
              // itemPadding={[0, 4]}
               >
            
              {Manufactureres &&
                Manufactureres.length > 0 &&
                Manufactureres.map((el, index) => (
                  <>
                  <div className="col" key={index}>
                          <img className="img-slides"
                            src={
                              el.image && el.image.length > 0
                                ? 
                                `${baseUrl}/` + el.image[0].path
                                : ""
                            }
                          />
                  </div>
                  </>
                ))}
                  </Carousel>
                  </div>
          </div>
        </div>
        <section className="mobile-app">
          <div className="container m-auto">
            <div className="row">
              <div className="col-lg-6">
                <div className="mobile-main">
                  <div>
                    <h3 className="cat-heading">
                      Download the{" "}
                      <span className="nutrazik-color">Nutrazik</span> <br />{" "}
                      mobile app
                    </h3>
                    <div>
                      <p id="para" className="text-justify">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in
                      </p>
                    </div>
                  </div>
                  <div className="btn-div">
                    <button type="button" className="btn" id="btn-1">
                      <div className="d-flex align-items-center">
                        <div>
                          <AiFillApple />
                        </div>
                        <div>App Store</div>
                      </div>
                    </button>
                    <button type="button" className="btn ms-3" id="btn-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <IoLogoGooglePlaystore />
                        </div>
                        <div>Google Play</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="img-div d-flex justify-content-center">
                  <img id="img" src={Mobile} alt="image" />
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </section>
        <Baseline />
      <Footer />
      </div>
      
    </>
  );
};
export default HomePage;