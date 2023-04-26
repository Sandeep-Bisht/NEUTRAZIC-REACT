import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header1 from "./Header1";
import "../components/singleproduct.css";

import { useHistory } from "react-router-dom";
import Baseline from "./Baseline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import $ from "jquery";
import { baseUrl } from "../utils/services";
import * as ACTIONS from "../CommonService/AddToCart/action";
import * as ACTIONS1 from "../CommonService/WishlistItem/action";
import { useDispatch } from "react-redux";
import Carousel from "react-elastic-carousel";
import "../components/Header1.css";
import Cookies from "universal-cookie";
import CurrencyContext from "../routes/ContextApi/CurrencyContext";
import { useContext } from "react";

var Userdata = "";
var CartDataWoLogin = [];

const SingleProduct = (props) => {
  let dispatch = useDispatch();
  const state1 = useContext(CurrencyContext);
  let prodId = props.match.params.id;
  let related = 0;
  let careouselImage = 0;
  const [AllProduct, setAllProduct] = useState([]);
  const [data, setData] = useState([]);
  const [ProductCategory, setProductCategory] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [userCart, setUserCart] = useState([]);
  const [order, Setorder] = useState([]);
  const [Categorydetails, setCategoryDetails] = useState({});
  const [categoryname, Setcategoryname] = useState();
  const [wishlist, setWishlist] = useState([]);
  const [MainImage, SetMainImage] = useState();
  const [categoryid, setcategoryId] = useState();
  const history = useHistory();

  const [currancy,setCurrency]=useState("INR");
  const cookies = new Cookies();

  useEffect(()=>{
    if(state1 == "1"){
      setCurrency("Dollar")
    }
  },[currancy])
 
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 4 },
    { width: 1200, itemToShow: 4 },
  ];


  let carouselRef = useRef(null);

  const onNextStart = (currentItem, nextItem) => {
    if (currentItem.index === nextItem.index) {
      carouselRef.current.goTo(0);
    }
  };

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

  useEffect(() => {
    related = 0;
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    window.scrollTo(0, 0);
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
  }, []);
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
        SetMainImage(data.data[0].image[0].path);
        setProductCategory(data.data[0].category.name);
        categoryDetails(data.data[0].category);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const relatedImageHandler = async (id) => {
    await fetch(`${baseUrl}/api/product/product_by_id`, {
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
        await getWishlist();
        setData(data.data[0]);
        SetMainImage(data.data[0].image[0].path);
        setProductCategory(data.data[0].category.name);
        categoryDetails(data.data[0].category);
      })
      .catch((err) => {
        console.log(err, "error");
      });
    window.scroll(0, 0);
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
          dispatch(ACTIONS.getCartItem(cartItems));
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
         
        })
        .catch((err) => {
          console.log(err, "error");
        });
    }
  };


  const ImageHandler = (m, i) => {
    let Imagestore = m.path;
    SetMainImage(Imagestore);
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
        toast.success("Added to cart", {
          position: "bottom-right",
          autoClose: 1000,
        });
      })
      .then((err) => console.log(err, "inside update cart"));
  };
  const cartfunction = async (
    productid,
    name,
    quantity,
    mrp,
    singleprice,
    dollerDiscount,
    dollerMrp,
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
        dollerDiscount:dollerDiscount,
        dollerMrp:dollerMrp,
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
      }
    }
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
        setcategoryId(data.data[0]._id);
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
    if (Userdata) {
      id = Userdata._id;
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
        if (data.data[0] !== undefined) {
          let prodId = props.match.params.id;
          setWishlist(data.data);
          const wishlisted = data.data.length;
          dispatch(ACTIONS1.getwishlistitem(wishlisted));
          let response = data.data;
          for (let item of response) {
            if (props.match.params.id === item.productId) {
              let alreadyWishlist = document.getElementById(prodId);
              alreadyWishlist.classList.add("wishlisted");
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
            await fetch(`${baseUrl}/api/wishlist/add_to_wishlist`, {
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
            })
              .then((res) => res.json())
              .then(async (data) => {
                let wishlist = document.getElementById(productid);
                wishlist.classList.add("wishlisted");
                getWishlist();
                toast.success("Added to wishlist", {
                  position: toast.POSITION.BOTTOM_RIGHT,
                  autoClose: 1000,
                });
              })
              .catch((err) => {
                console.log(err, "error e");
              });
          }
        } else {
          if (!JSON.stringify(data.data).includes(productid) && data.data) {
            if (!Userdata == []) {
              await fetch(`${baseUrl}/api/wishlist/add_to_wishlist`, {
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
              })
                .then((res) => res.json())
                .then(async (data) => {
                  let wishlist = document.getElementById(productid);
                  wishlist.classList.add("wishlisted");
                  getWishlist();
                  toast.success("Added to wishlist", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 1000,
                  });
                })
                .catch((err) => {
                  console.log(err, "error e");
                });
            }
          } else {
            toast.error("Already in wishlist !", {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 1000,
            });
          }
        }
      });
  };

  const checkWishlistItem = (productId) => {
    for (let item of wishlist) {
      if (item.productId == productId) {
        return "wishlisted";
      }
    }
  };

  return (
    <>
      <Header1 />
      <div className="first-nav container-fluid">
        <span>
          <Link to="/">Home</Link>/
          <Link to={"/SubCategories/" + categoryid}>{categoryname}</Link>/
          {data.name}
        </span>
      </div>
      <div className="container">
      <div className=" product-div single-page mt-5">
        <div className="row ">
          <div className="col-sm-12 col-md-12 col-lg-6 pd-0 picture-div justify-content-center align-items-center ">
            <div className="single-img-div justify-content-center align-items-center d-flex">
              {" "}
              {data.image && data.image.length > 0 &&
                <img src={`${baseUrl}/` + MainImage} />
               }
            </div>

            <div className="row image-group pt-2">
              <Carousel
                // breakPoints={breakPoints}
                enableAutoPlay
                autoPlaySpeed={1500}
                itemsToShow={4}
                onPrevStart={onPrevStart}
                onNextStart={onNextStart}
                // onChange={Loop}
                ref={carouselRef}
                disableArrowsOnEnd={false}
                // itemPadding={[0, 4]}
              >
                {data.otherImage && data.otherImage.length > 0 &&
                  data.otherImage.map((item, ind) => (
                    <div className="col" key={ind}>
                      <img
                        className="img-slide"
                        src={`${baseUrl}/` + item.path}
                        onMouseOver={() => ImageHandler(item, ind)}
                      />
                    </div>
                  ))
                
                }
              </Carousel>
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
                    src={
                      data && data.image && `${baseUrl}/` + data.image[0].path
                    }
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={
                      data &&
                      data.otherImage &&
                      `${baseUrl}/` + data.otherImage[0].path
                    }
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={
                      data &&
                      data.otherImage &&
                      `${baseUrl}/` + data.otherImage[1].path
                    }
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
          <div className="col-12 col-sm-12 col-lg-6 col-md-12 content-div">
            <div className="row ml-2">
              <div className="details pt-2">
                <span>{data.name}</span>
              </div>
              <div className="pt-2 pb-2">
              </div>
              <div className="MRP-Taxes-div">
                <span>MRP (incl. of all taxes)</span>
              </div>

              <div className="price pt-2">
                <span className="price-detail">
                {" "}
                                  {state1.state1 == "1" ? <i class="fa fa-dollar-sign"></i> : <i className="fa fa-inr"></i>}
                                  
                                  {state1.state1 == "1" ? data.dollerDiscount : data.inrDiscount}
                  <del>
                  {state1.state1 == "1" ? <i class="fa fa-dollar-sign"></i> : <i className="fa fa-inr"></i>}
                                  
                                  {state1.state1 == "1" ? data.dollerMrp : data.inrMrp}
                  </del>{" "}
                  <span>
                    {Math.ceil(
                      state1.state1 == "1" ? ((data.dollerMrp - data.dollerDiscount) / data.dollerMrp) * 100:((data.inrMrp - data.inrDiscount) / data.inrMrp) * 100
                    )}
                    % OFF
                  </span>
                </span>
              </div>

              <div className="List pt-1">
                <div>
                  <p>{data.description}</p>
                </div>
              </div>
            </div>
            <div className="row pt-2 pb-3 add">
              <div className="wishlist">
                <i className="social-links"></i>
                <span className="">
                  Category:{" "}
                  <Link to={"/Subcategories/" + categoryid}>
                    <span> {categoryname}</span>
                  </Link>
                </span>
                &nbsp; <span className="pl-2">Share:</span>
                <a href="https://www.facebook.com/Nutrazik" target="_blank">
                  <i className="social-links bx bxl-facebook "></i>
                </a>
                <a href="https://www.instagram.com/nutrazik/" target="_blank">
                  <i className="social-links bx bxl-instagram "></i>
                </a>
                <a href="https://twitter.com/nutrazik" target="_blank">
                  <i className="social-links bx bxl-twitter "></i>
                </a>
                <a
                  href="https://www.linkedin.com/company/70941207/admin/"
                  target="_blank"
                >
                  <i className="social-links bx bxl-linkedin "></i>
                </a>
              </div>
            </div>
            <div className="mt-3 add-cart-buttons ml-3">
              <div className="quantity1 mt-1 ">
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
                {Userdata ? (
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
                              data.dollerDiscount,
                              data.dollerMrp,
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
                  </button>
                ) : (
                  <button
                    data-bs-toggle="modal"
                    data-bs-target={Userdata == null ? "#exampleModal" : null}
                  >
                    <Link to="/Register"></Link>
                    Add to Cart
                  </button>
                )}
              </div>

              <div className="quantity2 mt-1 ml-2 justify-content-center align-items-center d-flex">
                {Userdata ? (
                  <i
                    id={prodId}
                    // className="bx bxs-heart"
                    className={`bx bxs-heart ${checkWishlistItem(
                      prodId
                    )}`}
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
                      className="bx bxs-heart"
                      data-bs-toggle="modal"
                      data-bs-target={Userdata == null ? "#exampleModal" : null}
                    ></i>
                  </>
                )}

                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="container-fluid description">
        <div className="row main-div p-4">
          <div>
            <div className="row heading mt-4 jutify-content-center">
              <div className="col-sm-2 title" id="Description">
                <button className="button2">Description</button>
              </div>
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
                        
                        </div>
                        <div className="col-6 text-right">
                          <span className="date">22/07/2021</span>
                        </div>
                       
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
                        
                        </div>
                        <div className="col-6 text-right">
                          <span className="date">22/07/2021</span>
                        </div>
                      
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

      <div className="container-fluid m-auto p-4 products relate-products text-center">
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
        <div className="row relate-product1">
          <div className="col-12">
            <div className="row related">
              <span>Related Products</span>
            </div>
          </div>
        </div>
        <div id="columns" className="columns_5 d-flex justify-content-between related-Prod-single-product">
          {AllProduct.map((el, ind1) => {
            if (ind1 < 5) {
              return (
                
                  <figure className="figure1 single-product-figure">
                    <Link Link to={"/SingleProduct/" + el._id}>
                      <div>
                        <img
                          src={`${baseUrl}/` + el.image[0].path}
                          onClick={() => relatedImageHandler(el._id)}
                          alt=""
                        />
                        <figcaption onClick={() => relatedImageHandler(el._id)}>
                          {el.name} 
                        </figcaption>
                      </div>
                    </Link>

                    <div className="allproduct-price-div">
                    
                      <div className="row">
                       
                        <div className="col-lg-6 col-md-12 text-start">
                          <span className="price">
                            {" "}
                            {state1.state1 == "1" ? <i class="fa fa-dollar-sign"></i> : <i className="fa fa-inr"></i>}
                                  
                                  {state1.state1 == "1" ? el.dollerDiscount : el.inrDiscount}
                        
                          </span>
                        </div>
                        <div className="col-lg-6 col-md-12  text-end">
                          <p className={`text-nowrap wishlist`}>
                            {Userdata ? (
                              <i
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
                                className={`bx bxs-heart ${checkWishlistItem(
                                  el._id
                                )}`}
                              ></i>
                            ) : (
                              <i
                                className="bx bxs-heart "
                                data-bs-toggle="modal"
                                data-bs-target={
                                  Userdata == null ? "#exampleModal" : null
                                }
                              ></i>
                            )}
                            Wishlist
                          </p>
                         
                        </div>
                      </div>
                    </div>
                    <button
                      className="button btn"
                      onClick={() => {
                        cartfunction(
                          el._id,
                          el.name,
                          quantity,
                          el.inrMrp,
                          el.inrDiscount,
                          el.dollerDiscount,
                          el.dollerMrp,
                          el.discount,
                          el.description,
                          el.category,
                          el.manufacturer.name,
                          el.image[0].path
                        );
                      }}
                      data-bs-toggle={Userdata == null ? "modal" : null}
                      data-bs-target={Userdata == null ? "#exampleModal" : null}
                    >
                      Add to Cart
                    </button>
                  </figure>
               
              );
            }
          })}
        </div>
      </div>
      <Baseline />
      <Footer />
    </>
  );
};
export default SingleProduct;
