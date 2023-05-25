import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import "./homepage.css";
import "../../sass/whislist.css";
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
import * as ACTIONS from "../../CommonService/AddToCart/action";
import * as ACTIONS1 from "../../CommonService/WishlistItem/action";
import { useDispatch } from "react-redux";
import { baseUrl } from "../../utils/services";
import Carousel from "react-elastic-carousel";
import Cookies from "universal-cookie";
import { useContext } from "react";
import CurrencyContext from "../../routes/ContextApi/CurrencyContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Loader from "react-spinner-loader";

import $ from "jquery";

var Userdata = "";
let currentCurrencyType = "";
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
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 4 },
    { width: 1200, itemToShow: 6 },
  ];

  const [data, setData] = useState([]);
  const [singlecategory, setSingleCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [Manufactureres, setManufactureres] = useState([]);
  const [AllProduct, setAllProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [ProductCategory, setProductCategory] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [userCart, setUserCart] = useState([]);
  const [cartItems, setCartItems] = useState(undefined);
  const [order, Setorder] = useState([]);
  const [Categorydetails, setCategoryDetails] = useState({});
  const [categoryname, Setcategoryname] = useState();
  const [wishlistData, Setwishlist] = useState([]);
  const [blogs, setBlogs] = useState();
  const history = useHistory();
  const [currancy, setCurrency] = useState("INR");
  const cookies = new Cookies();
  const { state1, setState1 } = useContext(CurrencyContext);
  const { loginState, setLoginState } = useContext(CurrencyContext);
  let { resetForm, setResetForm } = useContext(CurrencyContext);
  const [isLogin, setIsLogin] = useState(loginState);
  const [sliderRef, setSliderRef] = useState(null);
  const [loading, setLoading] = useState(true);
  const { searchedtext, setSearchedText } = useContext(CurrencyContext);

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    speed: 5000,
    autoplay: true,
    // cssEase: "linear",
    pauseOnHover: true,
    fade: true,
    autoPlaySpeed: 4000,
  };
  var settings1 = {
    dots: true,
    infinite: true,
    slidesToShow:1,
    slidesToScroll: 1,
    arrows: false,
    speed: 4000,
    autoplay: true,
    autoPlaySpeed: 3000,
  };
  useEffect(() => {
    setLoginState(loginState);
    setIsLogin(loginState);
  }, [loginState, isLogin]);

  const getAllBlog = async () => {
    await fetch(`${baseUrl}/api/blogs/find_all_slug`)
      .then((res) => res.json())
      .then(async (data) => {
        setBlogs(data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const handleResetForm = () => {
    if (resetForm === 0) {
      setResetForm(1);
    } else {
      setResetForm(0);
    }
  };
  useEffect(() => {
    const currentCurrency = cookies.get("CurrencyType");
    if (currentCurrency === "Dollar") {
      setCurrency("Dollar");
      setState1("1");
    }
  }, [currancy]);
  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    GetData();
    getAllBlog();
    CartById();
    GetWishlist();
    GetCategory();
    GetManufacturer();
    $(document).ready(function() {
      $(".frontimage").mouseover(function() {
        alert("in");
      });
      $(".frontimage").mouseleave(function() {
        alert("in");
      });
    });
  }, [loginState]);

  let carouselRef = useRef(null);

  const onNextStart = (currentItem, nextItem) => {
    if (currentItem.index === nextItem.index) {
      carouselRef.current.goTo(0);
    }
  };

  const onPrevStart = (currentItem, nextItem) => {
    if (currentItem.index === nextItem.index) {
      carouselRef.current.goTo(data.otherImage);
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
        if (data.error && data.message === "Data Not Found") {
          dispatch(ACTIONS1.getwishlistitem(0));
        }
        if (data.data !== undefined) {
          Setwishlist(data.data);
          console.log(
            data.data.length,
            "length of wishlisted after call the wishtlisted"
          );
          const wishlisted = data.data.length;
          dispatch(ACTIONS1.getwishlistitem(wishlisted));
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const GetData = async () => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    await fetch(`${baseUrl}/api/product/all_product`)
      .then((res) => res.json())
      .then(async (data) => {
        setData(data.data);
        setLoading(false);
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
        setSingleCategory(data.data[0]);
        setLoading(false);
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
    dollerMrp,
    dollerDiscount,
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
        dollerMrp: dollerMrp,
        dollerDiscount: dollerDiscount,
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
        // CartById();
        await UpdateCart();
      }
      toast.success("Added to Cart", {
        position: "bottom-right",
        autoClose: 1000,
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
          CartById();
        })
        .catch((err) => {
          console.log(err, "error");
        });
    }
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
                toast.error("Added to wishlist", {
                  position: toast.POSITION.BOTTOM_RIGHT,
                  autoClose: 1000,
                });

                let wishList = document.getElementById(productid);
                wishList.classList.add("in-wishlist");
                wishList.classList.add("wishlisted");
                GetWishlist();
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
                  toast.error("Added to wishlist", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 1000,
                  });
                  let wishList = document.getElementById(productid);
                  wishList.classList.add("in-wishlist");
                  wishList.classList.add("wishlisted");
                  GetWishlist();
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
        return "wishlisted";
      }
    }
  };

  return (
    <>
      <Header1 />
      {/* <Carouselcomp /> */}
      <div id="">
        {/* trending section  */}
        <section className="home-banner">
          <div className="container m-auto">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="home-banner-left">
                  <p className="home-banner-heading">
                    Reliable on time home delivery
                  </p>
                  <p className="home-banner-content">
                    With the rise of e-commerce and online shopping, you can
                    expect your purchases to be delivered to your doorstep in a
                    timely and dependable manner. Reliable on-time home delivery
                    is a crucial factor for businesses to succeed in the
                    e-commerce industry.
                  </p>

                  <div className="login-div2 search-btn clearfix mb-5">
                    <input
                      type="text"
                      className="my-input-field"
                      placeholder="Search..."
                      onChange={(e) => setSearch(e.target.value.toLowerCase())}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && search.length) {
                          searchData(search);
                          setSearchedText(e.target.value);
                          history.push("/SearchResult/" + search);
                        }
                      }}
                    />
                    {/* <Link to={"/SearchResult/" + search}> */}
                    <button
                      className="search mr-1"
                      onClick={() => {
                        if (search.length) {
                          searchData(search);
                          // setSearchedText(e.target.value);
                          history.push("/SearchResult/" + search);
                        }
                      }}
                    >
                      <i className="bx bx-search-alt"></i>
                    </button>
                    {/* </Link> */}
                  </div>
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
              {loading ? (
                <Loader show={loading} stack="vertical" />
              ) : (
                <div id="column" className="columns_5">
                  {data
                    .filter((item) => item.type == "Trending Product")
                    .map((el, ind) => {
                      if (ind < 5) {
                        return (
                          <>
                            <figure
                              className="figure homepage-trending-figure"
                              key={ind}
                            >
                              <Link to={"/SingleProduct/" + el._id}>
                                <div
                                  className="image hover-switch-homepage"
                                  style={{ position: "relative" }}
                                >
                                  {/* <img
                                    className="hoverimage"
                                    src={
                                      el.otherImage &&
                                      el.otherImage.length > 0 &&
                                      `${baseUrl}/` + el.otherImage[0].path
                                    }
                                    alt=""
                                  /> */}
                                  <img
                                    className="main-Image"
                                    src={`${baseUrl}/` + el.image[0].path}
                                    alt=""
                                    // style={{
                                    //   position: "absolute",
                                    //   top: "0",
                                    //   left: "0",
                                    // }}
                                  />
                                </div>
                                <Link to={"/SingleProduct/" + el._id}>
                                  <figcaption className="Product-name-home">
                                    {el.name}
                                  </figcaption>
                                </Link>
                              </Link>

                              <div className="contanier homepage-product-price-div">
                                <div className="row mt-2">
                                  <div className="col-lg-6 col-sm-6 col-md-6 col-12 text-start">
                                    <span className="price">
                                      {" "}
                                      {state1 == "1" ? (
                                        <i className="fa fa-dollar-sign"></i>
                                      ) : (
                                        <i className="fa fa-inr"></i>
                                      )}
                                      {state1 == "1"
                                        ? el.dollerDiscount
                                        : el.inrDiscount}
                                    </span>
                                  </div>
                                  <div className="col-6 text-end">
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
                                            Userdata == null
                                              ? "#exampleModal"
                                              : null
                                          }
                                          onClick={() => handleResetForm()}
                                        ></i>
                                      )}
                                      Wishlist
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {Userdata ? (
                                <button
                                  className="button btn"
                                  onClick={() => {
                                    cartfunction(
                                      el._id,
                                      el.name,
                                      quantity,
                                      el.inrMrp,
                                      el.inrDiscount,
                                      el.dollerMrp,
                                      el.dollerDiscount,
                                      el.discount,
                                      el.description,
                                      el.category,
                                      el.manufacturer.name,
                                      el.image[0].path
                                    );
                                  }}
                                  data-bs-toggle={
                                    Userdata == null ? "modal" : null
                                  }
                                  data-bs-target={
                                    Userdata == null ? "#exampleModal" : null
                                  }
                                >
                                  Add to Cart
                                </button>
                              ) : (
                                <button
                                  className="button btn"
                                  data-bs-toggle="modal"
                                  data-bs-target={
                                    Userdata == null ? "#exampleModal" : null
                                  }
                                  onClick={() => handleResetForm()}
                                >
                                  Add to Cart
                                </button>
                              )}

                              {/* </Link> */}
                            </figure>
                          </>
                        );
                      }
                    })}
                </div>
              )}

              {/* hover Button */}
              <div className="wrapperbtn pt-0">
                <Link to="/TrendingProducts">
                  <button type="button" className="btn10">
                    Show More
                  </button>
                </Link>
              </div>
              {/* Hover Button End */}
            </div>
          </div>
        </section>

        <section className="categories-section">
          <h1 className="trendign-head">
            <span className="products-color">Featured Categories</span>
          </h1>
          <div className="container m-auto">
            {loading ? (
              <Loader show={loading} stack="vertical" />
            ) : (
              <div className="row mt-0 featured-products">
                <Slider ref={setSliderRef} {...settings}>
                  {categories &&
                    categories.length > 0 &&
                    categories.map((item, index) => {
                      if (item.featuredCategories == "Featured Categories") {
                        return (
                          <div className="col-12 py-5" key={index}>
                            <div className="Category-container">
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="category-left-side">
                                    <div>
                                      <div className="category-heading">
                                        <h4>{item.name}</h4>
                                      </div>
                                      <div className="category-text">
                                        <p>{item.description}</p>
                                      </div>
                                      <Link to={"/Subcategories/" + item._id}>
                                        <button className="btn btn cosmetic-shop-now category-Button">
                                          Shop Now
                                        </button>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <Link to={"/Subcategories/" + item._id}>
                                    <div className="Image-Container">
                                      <img
                                        src={
                                          item.image &&
                                          `${baseUrl}/` + item.image[0].path
                                        }
                                        alt=""
                                        className="cat-left-side-image img-fluid"
                                      />
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  {/* </Carousel> */}
                </Slider>
                {/* <div className="controls controls-left">
                  <button onClick={sliderRef?.slickPrev}>
                    <FaChevronLeft />
                  </button>
                </div> */}
                {/* <div className="controls controls-right">
                  <button onClick={sliderRef?.slickNext}>
                    <FaChevronRight />
                  </button>
                </div> */}
              </div>
            )}
          </div>
        </section>

        <section className="products-area ">
          <h1 className="trendign-head Product-div-homepage">
            <span className="products-color">All Products</span>
          </h1>
          <div className="container m-auto py-4">
            {loading ? (
              <Loader show={loading} stack="vertical" />
            ) : (
              <div className="row ">
                <div id="column" className="columns_5">
                  {data
                    .filter((item) => item.type == "")
                    .map((el, ind) => {
                      if (ind < 5) {
                        return (
                          <figure
                            className="figure homepage-trending-figure"
                            key={ind}
                          >
                            <Link to={"/SingleProduct/" + el._id}>
                              <div
                                className="image hover-switch-homepage"
                                style={{ position: "relative" }}
                              >
                                <img
                                  className="main-Image"
                                  src={`${baseUrl}/` + el.image[0].path}
                                  alt=""
                                />
                              </div>
                              <Link to={"/SingleProduct/" + el._id}>
                                <figcaption className="Product-name-home">
                                  {el.name}
                                </figcaption>
                              </Link>
                            </Link>
                            <div className="contanier homepage-product-price-div">
                              <div className="row mt-2">
                                <div className="col-lg-6 col-sm-6 col-md-6 col-12 text-start">
                                  <span className="price">
                                    {" "}
                                    {state1 == "1" ? (
                                      <i className="fa fa-dollar-sign"></i>
                                    ) : (
                                      <i className="fa fa-inr"></i>
                                    )}
                                    {state1 == "1"
                                      ? el.dollerDiscount
                                      : el.inrDiscount}
                                  </span>
                                </div>
                                <div className="col-6 text-end">
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
                                          Userdata == null
                                            ? "#exampleModal"
                                            : null
                                        }
                                        onClick={() => handleResetForm()}
                                      ></i>
                                    )}
                                    Wishlist
                                  </p>
                                </div>
                                <div>
                                  {Userdata ? (
                                    <button
                                      className="button btn"
                                      onClick={() => {
                                        cartfunction(
                                          el._id,
                                          el.name,
                                          quantity,
                                          el.inrMrp,
                                          el.inrDiscount,
                                          el.dollerMrp,
                                          el.dollerDiscount,
                                          el.discount,
                                          el.description,
                                          el.category,
                                          el.manufacturer.name,
                                          el.image[0].path
                                        );
                                      }}
                                      data-bs-toggle={
                                        Userdata == null ? "modal" : null
                                      }
                                      data-bs-target={
                                        Userdata == null
                                          ? "#exampleModal"
                                          : null
                                      }
                                    >
                                      Add to Cart
                                    </button>
                                  ) : (
                                    <button
                                      className="button btn"
                                      data-bs-toggle="modal"
                                      data-bs-target={
                                        Userdata == null
                                          ? "#exampleModal"
                                          : null
                                      }
                                      onClick={() => handleResetForm()}
                                    >
                                      Add to Cart
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* </Link> */}
                          </figure>
                        );
                      }
                    })}
                </div>
                {/* hover Button */}

                <div className="wrapperbtn pt-3 pb-4">
                  <Link to="/AllProducts">
                    <button type="button" className="btn10">
                      Show More
                    </button>
                  </Link>
                </div>
                {/* Hover Button End */}
              </div>
            )}
          </div>
        </section>
        <section className="products-area">
          <h1 className="trendign-head">
            <span className="products-color">{singlecategory.name}</span>
          </h1>
          <div className="container m-auto">
            {loading ? (
              <Loader show={loading} stack="vertical" />
            ) : (
              <div className="row">
                <div id="column" className="columns_5">
                  {data
                    .filter((item) => item.category.name == singlecategory.name)
                    .map((el, ind) => {
                      if (ind < 5) {
                        return (
                          <figure
                            className="figure homepage-trending-figure"
                            key={ind}
                          >
                            <Link to={"/SingleProduct/" + el._id}>
                              <div
                                className="image hover-switch-homepage"
                                style={{ position: "relative" }}
                              >
                                {/* <img
                                  className="hoverimage"
                                  src={
                                    el.otherImage &&
                                    el.otherImage.length > 0 &&
                                    `${baseUrl}/` + el.otherImage[0].path
                                  }
                                  alt=""
                                /> */}
                                <img
                                  className="main-Image"
                                  src={`${baseUrl}/` + el.image[0].path}
                                  alt=""
                                  // style={{
                                  //   position: "absolute",
                                  //   top: "0",
                                  //   left: "0",
                                  // }}
                                />
                              </div>
                              <Link to={"/SingleProduct/" + el._id}>
                                <figcaption className="Product-name-home">
                                  {el.name}
                                </figcaption>
                              </Link>
                            </Link>
                            <div className="contanier homepage-product-price-div">
                              <div className="row mt-2">
                                <div className="col-lg-6 col-sm-6 col-md-6 col-12 text-start">
                                  <span className="price">
                                    {" "}
                                    {state1 == "1" ? (
                                      <i className="fa fa-dollar-sign"></i>
                                    ) : (
                                      <i className="fa fa-inr"></i>
                                    )}
                                    {state1 == "1"
                                      ? el.dollerDiscount
                                      : el.inrDiscount}
                                  </span>
                                </div>
                                <div className="col-6 text-end">
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
                                          Userdata == null
                                            ? "#exampleModal"
                                            : null
                                        }
                                        onClick={() => handleResetForm()}
                                      ></i>
                                    )}
                                    Wishlist
                                  </p>
                                </div>

                                <div>
                                  {Userdata ? (
                                    <button
                                      className="button btn"
                                      onClick={() => {
                                        cartfunction(
                                          el._id,
                                          el.name,
                                          quantity,
                                          el.inrMrp,
                                          el.inrDiscount,
                                          el.dollerMrp,
                                          el.dollerDiscount,
                                          el.discount,
                                          el.description,
                                          el.category,
                                          el.manufacturer.name,
                                          el.image[0].path
                                        );
                                      }}
                                      data-bs-toggle={
                                        Userdata == null ? "modal" : null
                                      }
                                      data-bs-target={
                                        Userdata == null
                                          ? "#exampleModal"
                                          : null
                                      }
                                    >
                                      Add to Cart
                                    </button>
                                  ) : (
                                    <button
                                      className="button btn"
                                      data-bs-toggle="modal"
                                      data-bs-target={
                                        Userdata == null
                                          ? "#exampleModal"
                                          : null
                                      }
                                      onClick={() => handleResetForm()}
                                    >
                                      Add to Cart
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </figure>
                        );
                      }
                    })}
                </div>
                {/* hover Button */}
                <div className="wrapperbtn pt-3 pb-4">
                  {data
                    .filter((item) => item.category.name == singlecategory.name)
                    .map((el, index) => {
                      if (index < 1) {
                        return (
                          <Link
                            to={"/SubCategories/" + el.category._id}
                            key={index}
                          >
                            <button key={index} type="button" className="btn10">
                              Show More
                            </button>
                          </Link>
                        );
                      }
                    })}
                </div>
                {/* Hover Button End */}
              </div>
            )}
          </div>
        </section>
        <div className="brands-area">
          <div className="container m-auto">
            <div className="trendign-head">
              <span className="products-color">Selling Brands</span>
            </div>
            <div className="row image-group">
              <Slider ref={setSliderRef} {...settings1}>
                {Manufactureres &&
                  Manufactureres.length > 0 &&
                  Manufactureres.map((el, index) => (
                    <>
                      <div className="col" key={index}>
                        <img
                          className="img-slides"
                          src={
                            el.image && el.image.length > 0
                              ? `${baseUrl}/` + el.image[0].path
                              : ""
                          }
                        />
                      </div>
                    </>
                  ))}
              </Slider>
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
                        Our nutraceutical app is designed to help you live a
                        healthier life. Downloading our app is quick and easy.
                        you'll have access to a wealth of information and tools
                        that will help you take control of your health and
                        wellness.
                      </p>
                    </div>
                  </div>
                  <div className="btn-div">
                    <Link className="mobile-app-link" to="/mobileapp">
                      <button type="button" className="btn" id="btn-1">
                        <div className="d-flex align-items-center">
                          <div>
                            <AiFillApple />
                          </div>

                          <div>App Store</div>
                        </div>
                      </button>
                    </Link>
                    <Link className="mobile-app-link" to="/mobileapp">
                      <button type="button" className="btn ms-3" id="btn-2">
                        <div className="d-flex align-items-center">
                          <div>
                            <IoLogoGooglePlaystore />
                          </div>
                          <div>Google Play</div>
                        </div>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-12">
                <div className="img-div d-flex justify-content-center">
                  <img id="img" src={Mobile} alt="image" />
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </section>
        <div className="blog-section">
          <div className="container m-auto">
            <div className="row">
              <div className="col-md-12">
                <h1 className="trendign-head">
                  <span className="products-color">Our Blogs</span>
                </h1>
              </div>
              <div className="blog-page-section-2">
                <div className="row">
                  <div className="col-md-12">
                    <div className="latest-blogs-section homepage-blog-box">
                      <div className="row">
                        {blogs &&
                          blogs.map((item, ind) => {
                            if (ind < 4)
                              return (
                                <div className="col-lg-3 col-md-6" key={ind}>
                                  <Link to={"/SingleBlogPage/" + item.slug}>
                                    <div className="card hover-effect">
                                      <img
                                        src={
                                          item.featuredImage &&
                                          `${baseUrl}/` +
                                            item.featuredImage[0].path
                                        }
                                        className="card-img-homepage"
                                        alt="blog-image"
                                      />
                                      <div className="card-body homepage-Blog-card">
                                        <h6 className="blog-title-text">
                                          {item.title}
                                        </h6>
                                        <p className="card-text">
                                          {item.description.slice(0, 110)}
                                        </p>
                                        <span className="Read-more-singleblog">
                                          Read More
                                        </span>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Baseline />
        <Footer />
      </div>
    </>
  );
};
export default HomePage;
