import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from ".././components/Footer";
import ".././views/landing/homepage.css";
import "../components/Subcategories.css";
import Baseline from ".././components/Baseline";
import Header1 from ".././components/Header1";
import { useHistory, NavLink } from "react-router-dom";
import ReadMoreReact from "read-more-react";
import { useDispatch, useSelector } from "react-redux";
import * as ACTIONS from "../CommonService/AddToCart/action";
import * as ACTIONS1 from "../CommonService/WishlistItem/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import $ from "jquery";
import { baseUrl } from "../utils/services";
import { useContext } from "react";
import CurrencyContext from "../routes/ContextApi/CurrencyContext";
import Loader from "react-spinner-loader";

var Userdata = "";
let tranding = 0;
const Subcategories = (props) => {
  const [data, setData] = useState([]);
  const [heading, setHeading] = useState([]);
  const [categories, setCategories] = useState([]);
  const [Manufactureres, setManufactureres] = useState([]);
  const [AllProduct, setAllProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ProductCategory, setProductCategory] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [userCart, setUserCart] = useState([]);
  const [order, Setorder] = useState([]);
  const [Categorydetails, setCategoryDetails] = useState({});
  const [categoryname, Setcategoryname] = useState();
  const [getSubCategories, setGetSubCategories] = useState([]);
  const [filterData, setfilterData] = useState();
  const [wishlistData, Setwishlist] = useState([]);
  const [cartItems, setCartItems] = useState(undefined);
  const [SubcategoryId, setsubcategoryId] = useState("All Products");
  let { resetForm, setResetForm } = useContext(CurrencyContext);
  const { loginState, setLoginState } = useContext(CurrencyContext);
  const history = useHistory();
  const dispatch = useDispatch();
  const state1 = useContext(CurrencyContext);

  const [currancy, setCurrency] = useState("INR");

  useEffect(() => {
    if (state1 == "1") {
      setCurrency("Dollar");
    }
  }, [currancy]);

  const handleResetForm = () => {
    if (resetForm === 0) {
      setResetForm(1);
    } else {
      setResetForm(0);
    }
  };

  var CartDataWoLogin = [];
  const state = useSelector((state) => state.GetCategoriesReducer);
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
      $(".frontimage").mouseenter(function() {
        $(".backimage").hide();
      });
      const WishlistHeart = () => {
        $(".icon-wishlist").on("click", function() {
          $(this).toggleClass("in-wishlist");
        });
      };
    });
  }, [loginState]);

  useEffect(() => {
    const allSubCateory = document.getElementById("allsub");
    setfilterData(state.array);
    setsubcategoryId(state.allProduct);
    allSubCateory.classList.add("newActive");
  }, [state, loginState]);

  const GetData = async () => {
    Userdata = await JSON.parse(localStorage.getItem("Userdata"));
    await fetch(`${baseUrl}/api/product/all_product`)
      .then((res) => res.json())
      .then(async (data) => {
        setData(data.data);
        setfilterData("");
        setsubcategoryId("All Products");
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
        setLoading(false);
      })
      .catch((err) => {
        console.log(err, "error");
      });
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
        dollerDiscount: dollerDiscount,
        dollerMrp: dollerMrp,
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
        // CartById();
        await UpdateCart();
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
        if (data.data !== undefined) {
          Setwishlist(data.data);
          const wishlisted = data.data.length;
          dispatch(ACTIONS1.getwishlistitem(wishlisted));
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
            toast.error("Already in wishlist !", {
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
  var activeItem = document.getElementById("List");
  const GetSingleSubCategory = (id, name) => {
    window.scroll(0, 0);
    let filteredData = [];
    for (let item of data) {
      if (item.subcategory._id === id) filteredData.push(item);
      // activeItem.classList.add("newActive");
    }
    setfilterData(filteredData);
    setsubcategoryId(name);
  };

  const allSubCateory = document.getElementById("allsub");
  const GetallData = (Products) => {
    allSubCateory.classList.add("newActive");
    setfilterData("");
    setData(Products);
    setsubcategoryId("All Products");
  };

  const checkWishlistItem = (productId) => {
    for (let item of wishlistData) {
      if (item.productId == productId) {
        return "wishlisted";
      }
    }
  };

  const activeLinkSubCategory = (name) => {
    for (let newItem of filterData) {
      if (name === newItem.subcategory.name) {
        allSubCateory.classList.remove("newActive");
        activeItem.classList.remove("newActive");
        return "newActive";
      }
    }
  };

  return (
    <>
      <Header1 />

      <div id="__next">
        {/* trending section  */}
        <section className="browser-category-section">
          <div className="container-fluid subcategory-section">
            <div className="row mt-0">
              <div className="col-lg-2 col-md-3 col-sm-3 col-4 px-0">
                <div className="back-ground-subcategory-sidebar">
                  <div id="wrapper">
                    <div id="sidebar-wrapper">
                      <ul className="sidebar-nav">
                        <li>
                          {categories.map((item, ind) => {
                            if (item._id === props.match.params._id) {
                              return (
                                <h1
                                  className="browse-categories-header"
                                  key={ind}
                                >
                                  {item.name}
                                </h1>
                              );
                            }
                          })}
                        </li>
                        <li
                          className="box"
                          onClick={() => GetallData(data)}
                          style={{ cursor: "pointer" }}
                        >
                          <p
                            className="List-item newActive"
                            id="allsub"
                            style={{ cursor: "pointer" }}
                          >
                            All SubCategories
                          </p>
                        </li>
                        {loading ? (
                          <Loader show={loading} stack="vertical" />
                        ) : (
                          getSubCategories.map((item, ind) => {
                            if (item.category == props.match.params._id) {
                              return (
                                <>
                                  <li className="box" key={ind}>
                                    <p
                                      className={`List-item ${activeLinkSubCategory(
                                        item.name
                                      )}`}
                                      id="List"
                                      onClick={() => {
                                        GetSingleSubCategory(
                                          item._id,
                                          item.name
                                        );
                                      }}
                                      style={{ cursor: "pointer" }}
                                    >
                                      {item.name}
                                    </p>
                                  </li>
                                </>
                              );
                            }
                          })
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-10 col-md-9 col-sm-9 col-8 subcategory-container">
                <div className="subcategory-main-div">
                <div className="browse-categories-sub-heading">
                  {categories.map((item, ind) => {
                    if (item._id === props.match.params._id) {
                      return (
                        <>
                          <h2 key={ind}>{item.name} Products</h2>
                        </>
                      );
                    }
                  })}
                </div>
                </div>
                <section className="pb-40">
                  <div className="container">
                    {loading ? (
                      <Loader show={loading} stack="vertical" />
                    ) : (
                      <div className="row">
                        <div
                          id="columns"
                          className="columns_5 subcategory-columns"
                        >
                          {filterData && filterData.length > 0 ? (
                            filterData.map((item, ind) => {
                              return (
                                <figure
                                  className="figure subcategory-figure"
                                  key={ind}
                                >
                                  <Link
                                    to={"/SingleProduct/" + item._id}
                                    className="product-image-link"
                                  >
                                    <div>
                                      <img
                                        src={`${baseUrl}/` + item.image[0].path}
                                        alt=""
                                      />
                                    </div>

                                    <figcaption>{item.name}</figcaption>
                                  </Link>

                                  <div className="contanier subcategory-price-div">
                                    <div className="row">
                                      <div className="col-lg-6 col-md-6 col-sm-6 col-12 text-start subcategory-text-start">
                                        <span className="price">
                                          {" "}
                                          {state1.state1 == "1" ? (
                                            <i class="fa fa-dollar-sign"></i>
                                          ) : (
                                            <i className="fa fa-inr"></i>
                                          )}
                                          {state1.state1 == "1"
                                            ? item.dollerDiscount
                                            : item.inrDiscount}
                                        </span>
                                      </div>
                                      <div className="col-6 text-end ">
                                        <p className={`text-nowrap wishlist`}>
                                          {Userdata ? (
                                            <i
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
                                              className={`bx bxs-heart ${checkWishlistItem(
                                                item._id
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
                                          item._id,
                                          item.name,
                                          quantity,
                                          item.inrMrp,
                                          item.inrDiscount,
                                          item.dollerDiscount,
                                          item.dollerMrp,
                                          item.discount,
                                          item.description,
                                          item.category,
                                          item.manufacturer.name,
                                          item.image[0].path
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
                                </figure>
                              );
                            })
                          ) : (
                            <>
                              {data && data.length > 0 ? (
                                data.map((item, ind) => {
                                  if (
                                    item.category._id == props.match.params._id
                                  ) {
                                    return (
                                      <figure
                                        className="figure subcategory-figure"
                                        key={ind}
                                      >
                                        <Link
                                          to={"/SingleProduct/" + item._id}
                                          className="product-image-link"
                                        >
                                          <div>
                                            <img
                                              src={
                                                `${baseUrl}/` +
                                                item.image[0].path
                                              }
                                              alt=""
                                            />
                                          </div>

                                          <figcaption>{item.name}</figcaption>
                                        </Link>

                                        <div className="contanier subcategory-price-div">
                                          <div className="row">
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12 text-start subcategory-text-start">
                                              <span className="price">
                                                {" "}
                                                {state1.state1 == "1" ? (
                                                  <i className="fa fa-dollar-sign"></i>
                                                ) : (
                                                  <i className="fa fa-inr"></i>
                                                )}
                                                {state1.state1 == "1"
                                                  ? item.dollerDiscount
                                                  : item.inrDiscount}
                                              </span>
                                            </div>
                                            <div className="col-6 text-end ">
                                              <p
                                                className={`text-nowrap wishlist`}
                                              >
                                                {Userdata ? (
                                                  <i
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
                                                    className={`bx bxs-heart ${checkWishlistItem(
                                                      item._id
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
                                                    onClick={() =>
                                                      handleResetForm()
                                                    }
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
                                                item._id,
                                                item.name,
                                                quantity,
                                                item.inrMrp,
                                                item.inrDiscount,
                                                item.dollerDiscount,
                                                item.dollerMrp,
                                                item.discount,
                                                item.description,
                                                item.category,
                                                item.manufacturer.name,
                                                item.image[0].path
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
                                      </figure>
                                    );
                                  }
                                })
                              ) : (
                                <>
                                  <div>
                                    <lottie-player
                                      src="https://assets10.lottiefiles.com/packages/lf20_yRyM3f.json"
                                      background="transparent"
                                      speed="1"
                                      style={{
                                        width: "300px",
                                        height: "300px",
                                        margin: "auto",
                                      }}
                                      loop
                                      autoplay
                                    ></lottie-player>
                                  </div>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    )}
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
