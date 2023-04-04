import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Footer from "./Footer";
import StarsRating from "stars-rating";
import Header1 from "./Header1";
import "../views/landing/homepage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../utils/services";
import * as ACTIONS from "../CommonService/AddToCart/action";
import * as ACTIONS1 from "../CommonService/WishlistItem/action";
import { useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { useContext } from "react";
import CurrencyContext from "../routes/ContextApi/CurrencyContext";
// import Cookies from "universal-cookie";

var Userdata;
const AllProducts = (props) => {
  const state1 = useContext(CurrencyContext);

  let dispatch = useDispatch();

  const [AllProduct, setAllProduct] = useState([]);
  const [productLength, serProductLength] = useState();
  const [Categorydetails, setCategoryDetails] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [userCart, setUserCart] = useState([]);
  const [order, Setorder] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [manufactureres, setManufactureres] = useState([]);
  const [wishlistData, Setwishlist] = useState([]);
  const [prev, SetPrev] = useState(0);
  //  const [next, SetNext] = useState(false);
  const [filter, setFilter] = useState("");
  const [mrp, setMrp] = useState();
  const [data, setData] = useState([]);
  const history = useHistory();
  const [currancy, setCurrency] = useState("INR");
  // const cookies = new Cookies();
  const { loginState, setLoginState } = useContext(CurrencyContext);
  const [isLogin, setIsLogin] = useState(loginState);

  useEffect(() => {
    setLoginState(loginState);
    setIsLogin(loginState);
  }, [loginState]);

  useEffect(() => {
    if (state1 == "1") {
      setCurrency("Dollar");
    }
  }, [currancy]);

  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    window.scrollTo(0, 0);
    ProductByCategory();
    categoryDetails();
    GetWishlist();
    CartById();
    GetCategory();
    GetSubCategory();
    GetManufacturer();
    // GetCategory();
  }, [loginState]);

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
        UpdateCart();
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
        //history.push("/Cart");
        toast.success("Added to cart", {
          position: "bottom-right",
          autoClose: 1000,
        });
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
          //history.push("/Cart");
        })
        .catch((err) => {
          console.log(err, "error");
        });
    }
    // else{
    //    history.push('/Register')
    // }
  };

  const FilterItems = (item) => {
    setFilter(item);
  };

  var page = 1;
  const ProductByCategory = async () => {
    await fetch(`${baseUrl}/api/product/all_product?_page=${page}&_limit=10`)
      .then((res) => res.json())
      .then(async (data) => {
        serProductLength(data.length);
        setAllProduct([...AllProduct, ...data.data]);
        page = page + 1;
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  const categoryDetails = async () => {
    await fetch(`${baseUrl}/api/category/category_by_id`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: props.match.params.name,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        await setCategoryDetails(data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
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
          const wishlisted = data.data.length;
          dispatch(ACTIONS1.getwishlistitem(wishlisted));
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const checkWishlistItem = (productId) => {
    for (let item of wishlistData) {
      if (item.productId == productId) {
        return "wishlisted";
      }
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
  // allcategory api //
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
  // End All Category API//

  // SubCategory API //
  const GetSubCategory = async () => {
    await fetch(`${baseUrl}/api/subcategory/all_subcategory`)
      .then((res) => res.json())
      .then(async (data) => {
        setSubCategories(data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  // End Subcategory //
  // Manufacturer API //
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
  const openNav = () => {
    document.getElementById("mySidenav").style.width = "300px";
  };
  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };
  // End Manufacturer API //

  return (
    <>
      <Header1 />
      {/* <div id="__next">
        <div className="search-overlay null">
          <div className="d-table">
            <div className="d-table-cell">
              <div className="search-overlay-layer"></div>
              <div className="search-overlay-layer"></div>
              <div className="search-overlay-layer"></div>
              <div className="search-overlay-close">
                <span className="search-overlay-close-line"></span>
                <span className="search-overlay-close-line"></span>
              </div>
              <div className="search-overlay-form">
                <form>
                  <input
                    type="text"
                    className="input-search"
                    placeholder="Search here..."
                    name="search"
                    value=""
                  />
                  <button type="submit">
                    <i className="bx bx-search-alt"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="container m-auto Category-div">
        <div className="row align-items-center">
          <div className="col-12">
            <div className="section-title my-4">
              <h2>All Products</h2>
            </div>
            <div>
              <div id="columns" className="columns_5">
                <InfiniteScroll
                  dataLength={AllProduct.length}
                  next={ProductByCategory}
                  hasMore={AllProduct.length < productLength}
                  loader={<h4>Loading...</h4>}
                >
                  {AllProduct.map((el, ind1) => {
                    return (
                      <figure className="figure allproduct-figure" key={ind1}>
                        <Link Link to={"/SingleProduct/" + el._id}>
                          <div>
                            {/* {Categorydetails.image!==undefined? */}
                            <img src={`${baseUrl}/` + el.image[0].path} />
                          </div>
                          <figcaption>{el.name}</figcaption>
                        </Link>
                        {/* :null} */}

                        <div className="contanier allproduct-price-div">
                          <div className="row">
                            <div className="col-6 text-start">
                              <span className="price">
                                {" "}
                                {state1.state1 == "1" ? (
                                  <i class="fa fa-dollar-sign"></i>
                                ) : (
                                  <i className="fa fa-inr"></i>
                                )}
                                {state1.state1 == "1"
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
                          data-bs-target={
                            Userdata == null ? "#exampleModal" : null
                          }
                        >
                          Add to Cart
                        </button>
                      </figure>
                    );
                  })}
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};
export default AllProducts;
