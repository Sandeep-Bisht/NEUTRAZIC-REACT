import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from ".././components/Footer";
import ".././views/landing/homepage.css";
// import "../../sass/whislist.css";
// import Carouselcomp from "../../components/Carouselcomp";
import Baseline from ".././components/Baseline";
import Header1 from ".././components/Header1";
import { useHistory } from "react-router-dom";
import ReadMoreReact from "read-more-react";
import { useDispatch } from "react-redux";
import * as ACTIONS from "../CommonService/AddToCart/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import $ from "jquery";
import { baseUrl } from "../utils/services";
import { BsWindowSidebar } from "react-icons/bs";
import { set } from "dotenv-save";
var Userdata = "";
let tranding = 0;
const Subcategories = (props) => {
  const [data, setData] = useState([]);
  const [heading, setHeading] = useState([]);
  const [categories, setCategories] = useState([]);
  const [Manufactureres, setManufactureres] = useState([]);
  const [AllProduct, setAllProduct] = useState([]);

  const [ProductCategory, setProductCategory] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [userCart, setUserCart] = useState([]);
  const [order, Setorder] = useState([]);
  const [Categorydetails, setCategoryDetails] = useState({});
  const [categoryname, Setcategoryname] = useState();
  const [getSubCategories, setGetSubCategories] = useState([]);
  const [filterData, setfilterData] = useState([]);
  const [wishlistData, Setwishlist] = useState([]);
  const [cartItems, setCartItems] = useState(undefined);
 const [SubcategoryId , setsubcategoryId] = useState("All Categories");
  const history = useHistory();

  const dispatch = useDispatch();
  var CartDataWoLogin = [];

  useEffect(() => {
    window.scroll(0, 0);
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    ProductsByCategory();
    setfilterData("");
    GetData();
    CartById();
    GetCategory();
    GetWishlist();
    GetManufacturer();
    GetSubCategory();
    $(document).ready(function() {
      $(".frontimage").hide();
      $(".backimage").hide();
      //    $('.icon-wishlist').on('click', function(){
      //       $(this).toggleClass('in-wishlist');

      // })
      $(".frontimage").mouseenter(function() {
        $(".backimage").hide();
      });
      const WishlistHeart = () => {
        $(".icon-wishlist").on("click", function() {
          $(this).toggleClass("in-wishlist");
        });
      };
    });
  }, []);

  const GetData = async () => {
    Userdata = await JSON.parse(localStorage.getItem("Userdata"));

    await fetch(`${baseUrl}/api/product/all_product`)
      .then((res) => res.json())
      .then(async (data) => {
        setData(data.data);
        setfilterData("");
        setsubcategoryId("All Categories");
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
  const GetSubCategory = async () => {
    await fetch(`${baseUrl}/api/subcategory/all_subcategory`)
      .then((res) => res.json())
      .then(async (data) => {
        data.data.map((item, index) => {
          if (props.match.params._id == item._id) {
            setHeading(item.name);
          }
        });
        setGetSubCategories(data.data);
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
    discount,
    description,
    category,
    manufacturer,
    image
  ) => {
    if (quantity !== 0) {
      var merged = false;
      var newItemObj = {
        productid: productid,
        name: name,
        image: image,
        quantity: quantity,
        mrp: parseInt(mrp),
        singleprice: parseInt(mrp),
        discountprice: discount,

        category: category,
        manufacturer: manufacturer,
        description: description,
      };
      if (userCart.order == null || userCart.order == []) {
        for (var i = 0; i < order.length; i++) {
          if (order[i].productid == newItemObj.productid) {
            order[i].quantity += newItemObj.quantity;
            order[i].mrp += newItemObj.mrp;
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
            userCart.order[i].mrp += newItemObj.mrp;
            merged = true;
          } else {
            merged = false;
          }
          setQuantity(1);
        }
        if (!merged) {
          userCart.order.push(newItemObj);
        }
        setQuantity(1);
        CartById();
        UpdateCart();
        toast.success("Added to Cart", {
          position: "bottom-right",
          autoClose: 2000,
        });
        //   await AsyncStorage.setItem("order1", JSON.stringify(userCart.order));
        //   newamount = 0;
      }
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
        // history.push("/Cart");
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
        if (data.data[0] !== undefined) {
          Setwishlist(data.data);
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });
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
                  autoClose: 2000,
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
                    autoClose: 2000,
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
            toast.error("Allready in wishlist !", {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 2000,
            });
          }
        }
      });
  };
  const ProductsByCategory = () => {
    let Product = props.match.params._id;
    let filteronload = data.filter((value) => {
      return value.category._id === Product;
    });

    setData(filteronload);
  };

  const GetSingleSubCategory = (id,name) => {
    const filteredData = data.filter((value) => {
      return value.subcategory._id === id;
    });
    setfilterData(filteredData);
    setsubcategoryId(name); 
    const ele = document.querySelectorAll(id);
    ele.add.classList("active");
    
  };
  
  const GetallData = (Products) => {
    setfilterData("");
    setData(Products);
    setsubcategoryId("All Categories");
  };
  // const Addclassactive = ()=>{
  //   let item = document.getElementById("List-item");
  //   for(let i = 0 ; i<=item.length; i++){
  //     item[i].
  //   }
  // }

  const checkWishlistItem = (productId) => {
    for (let item of wishlistData) {
      if (item.productId == productId) {
        return "wishlisted";
      }
    }
  };
  

  const activeParagraph = () => {
    // const newActive=document.querySelectorAll(".paragraph");
    //  newActive
  };
  return (
    <>
    <div onClick={GetData}>
      <Header1 />
      </div>

      <div id="__next">
        {/* trending section  */}

        <section className="browser-category-section">
          <div className="container-fluid">
            <div className="row mt-0">
              <div className="col-md-2 px-0">
                <div className="back-ground-subcategory-sidebar">
                  <div id="wrapper">
                    <div id="sidebar-wrapper">
                      <ul className="sidebar-nav">
                        <li>
                          <h1 className="browse-categories-header">
                            Subcategories
                          </h1>
                        </li>
                        <li
                          className="box"
                          onClick={() => GetallData(data)}
                          style={{ cursor: "pointer" }}
                        >
                          <p
                            className="active"
                            id="List-item"
                            style={{ cursor: "pointer" }}
                          >
                            All SubCategories
                          </p>
                        </li>
                        {getSubCategories.map((item) => {
                          if (item.category == props.match.params._id) {
                            return (
                              <>
                                <li className="box">
                                  <p
                                    id="List-item"
                                    onClick={() => {
                                      GetSingleSubCategory(item._id,item.name);
                                    }}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {item.name}
                                  </p>
                                </li>
                              </>
                            );
                          }
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-10">
                <div className="browse-categories-sub-heading">
                  {getSubCategories.map((item,ind)=>{
                    if(ind < 1)
                    {
                      return(
                  <h2>{SubcategoryId}</h2>
                  )
                }
                })
                }
                </div>
                <section className="products-area pb-40">
                  <div className="container-fluid">
                    <div className="row">
                      {filterData && filterData.length > 0 ? (
                        filterData.map((item, ind) => {
                          
                          return (
                            <div className="col-lg-2 col-md-12 col-sm-12 ">
                              <div className="single-products-box border">
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="product-div">
                                      <div className="product-image-div">
                                        <Link
                                          to={"/SingleProduct/" + item._id}
                                          className="product-image-link"
                                        >
                                          <div className="image hover-switch">
                                            <img
                                              src={
                                                item.otherImage &&
                                                item.otherImage.length > 0
                                                  ? `${baseUrl}/` +
                                                    item.otherImage[0].path
                                                  : ""
                                              }
                                              // src={require("../../Images/products/Hintosulin (1).png")}
                                              alt=""
                                            />
                                            <img
                                              src={
                                                `${baseUrl}/` +
                                                item.image[0].path
                                              }
                                              alt=""
                                              style={{
                                                position: "absolute",
                                                left: "0",
                                              }}
                                            />
                                          </div>
                                        </Link>
                                      </div>
                                      <div className="tranding product-image-content">
                                        <div className="content product-content">
                                          {/* <Link to={"/SingleProduct/" + item._id}> */}
                                          <Link
                                            to={"/SingleProduct/" + item._id}
                                          >
                                            <ReadMoreReact
                                           text={item.name}
                                            />
                                          </Link>
                                          {/* </Link> */}
                                          {/* <div className="d-flex pb-2 pl-4">
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                            </div> */}
                                          {/* <div className=" justify-content-center align-items-center d-flex pt-3 mr-5">
                              <div className="discount-price-div">
                                <span>{item.inrDiscount}%</span>
                              </div>
                              <div className="discount-price-div2">
                                <span>off</span>
                              </div>
                            </div> */}

                                          {/* <div className="hr-div">
                              <hr />
                            </div> */}
                                          <div className="price-div">
                                            <span className="new-price ">
                                              <i className="fa fa-inr"></i>{" "}
                                              {item.inrDiscount}
                                            </span>

                                            <del className="new-price ml-1">
                                              {item.inrMrp}
                                            </del>
                                            {Userdata ? (
                                              <i
                                                className={`bx bxs-heart ml-3  ${checkWishlistItem(
                                                  item._id
                                                )}`}
                                                id={item._id}
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
                                                            item._id,
                                                            item.name,
                                                            quantity,
                                                            item.inrMrp,
                                                            item.inrDiscount,
                                                            item.discount,
                                                            item.description,
                                                            item.category,
                                                            item.manufacturer
                                                              .name,
                                                            item.image[0].path
                                                          )
                                                        : addToCartWithoutRegistration(
                                                            item._id,
                                                            item.name,
                                                            quantity,
                                                            item.inrMrp,
                                                            item.inrDiscount,
                                                            item.discount,
                                                            item.description,
                                                            item.category,
                                                            item.manufacturer
                                                              .name,
                                                            item.image[0].path
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
                          
                        })
                      ) : (
                        <>
                          {data.map((item, ind) => {
                            if (item.category._id == props.match.params._id) {
                              return (
                                <div className="col-lg-2 col-md-12 col-sm-12 ">
                                  <div className="single-products-box border">
                                    <div className="row">
                                      <div className="col-md-12">
                                        <div className="product-div">
                                          <div className="product-image-div">
                                            <Link
                                              to={"/SingleProduct/" + item._id}
                                              className="product-image-link"
                                            >
                                              <div className="image hover-switch">
                                                <img
                                                  src={
                                                    item.otherImage &&
                                                    `${baseUrl}/` +
                                                      item.otherImage[0].path
                                                  }
                                                  alt=""
                                                />
                                                <img
                                                  src={
                                                    `${baseUrl}/` +
                                                    item.image[0].path
                                                  }
                                                  alt=""
                                                  style={{
                                                    position: "absolute",
                                                    left: "0",
                                                    top: "0",
                                                  }}
                                                />
                                              </div>
                                            </Link>
                                          </div>
                                          <div className="tranding product-image-content">
                                            <div className="content product-content">
                                              {/* <Link to={"/SingleProduct/" + item._id}> */}
                                              <Link
                                                to={
                                                  "/SingleProduct/" + item._id
                                                }
                                              >
                                                <ReadMoreReact
                                                  text={item.name}
                                                />
                                              </Link>
                                              {/* </Link> */}
                                              {/* <div className="d-flex pb-2 pl-4">
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                            </div> */}
                                              {/* <div className=" justify-content-center align-items-center d-flex pt-3 mr-5">
                              <div className="discount-price-div">
                                <span>{item.inrDiscount}%</span>
                              </div>
                              <div className="discount-price-div2">
                                <span>off</span>
                              </div>
                            </div> */}

                                              {/* <div className="hr-div">
                              <hr />
                            </div> */}
                                              <div className="price-div">
                                                <span className="new-price ">
                                                  <i className="fa fa-inr"></i>{" "}
                                                  {item.inrDiscount}
                                                </span>

                                                <del className="new-price ml-1">
                                                  {item.inrMrp}
                                                </del>
                                                {Userdata ? (
                                                  <i
                                                    className={`bx bxs-heart ml-3  ${checkWishlistItem(
                                                      item._id
                                                    )}`}
                                                    id={item._id}
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
                                                                item._id,
                                                                item.name,
                                                                quantity,
                                                                item.inrMrp,
                                                                item.inrDiscount,
                                                                item.discount,
                                                                item.description,
                                                                item.category,
                                                                item
                                                                  .manufacturer
                                                                  .name,
                                                                item.image[0]
                                                                  .path
                                                              )
                                                            : addToCartWithoutRegistration(
                                                                item._id,
                                                                item.name,
                                                                quantity,
                                                                item.inrMrp,
                                                                item.inrDiscount,
                                                                item.discount,
                                                                item.description,
                                                                item.category,
                                                                item
                                                                  .manufacturer
                                                                  .name,
                                                                item.image[0]
                                                                  .path
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
                        </>
                      )}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
        <ToastContainer />
      </div>
      <Baseline />
      <Footer />
    </>
  );
};
export default Subcategories;
