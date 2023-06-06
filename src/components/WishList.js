import { get, map } from "jquery";
import "../components/WishList.css";
import React, { useState, useEffect } from "react";
import Baseline from "./Baseline";
import Footer from "./Footer";
import Header1 from "./Header1";
import { Link, useHistory } from "react-router-dom";
import { baseUrl } from "../utils/services";
import { IoClose } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import * as ACTIONS from "../CommonService/AddToCart/action";
import * as ACTIONS1 from "../CommonService/WishlistItem/action";
import { useDispatch } from "react-redux";
import Loader from "react-spinner-loader";

var Userdata = "";
const WishList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [wishlistData, Setwishlist] = useState([]);
  const [order, Setorder] = useState([]);
  const [userCart, setUserCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    GetWishlist();
    CartById();
    window.scroll(0, 0);
  }, []);

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
        if (data.data[0] !== undefined) {
          Setwishlist(data.data);
          setLoading(false);
          const wishlisted = data.data.length;
          dispatch(ACTIONS1.getwishlistitem(wishlisted));
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  useEffect(() => {
    setTimeout(() => {
      if (wishlistData.length === 0) {
        setLoading(false);
      }
    }, 3000);
  }, []);

  const DeleteWishlist = async (productId) => {
    await fetch(`${baseUrl}/api/wishlist/delete_wishlist_by_id`, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: productId,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        setLoading(true);
        Setwishlist("");
        setLoading(true);
        toast.error("Product removed successfully", {
          position: "bottom-right",
          autoClose: 1000,
        });
        await setTimeout(() => {
          if (data) {
            setLoading(false);
          }
        }, 2000);
        GetWishlist();
      })

      .catch((err) => {
        console.log(err, "error");
      });
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
        history.push("/Cart");
        toast.success("Added to cart", {
          position: "bottom-right",
          autoClose: 1000,
        });
      })
      .then((err) => console.log(err, "inside update cart"));
  };

  const cartfunction = async (data) => {
    if (quantity > 0) {
      var merged = false;
      var newItemObj = {
        productid: data._id,
        name: data.name,
        image: data.image[0].path,
        quantity: quantity,
        mrp: parseInt(data.inrMrp),
        singleprice: parseInt(data.inrDiscount),
        dollerDiscount: data.dollerDiscount,
        dollerMrp: data.dollerMrp,
        discountprice: data.discount,
        description: data.description,
        category: data.category,
        manufacturer: data.manufacturer,
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

  const Getsingledata = async (productId) => {
    await fetch(`${baseUrl}/api/product/product_by_id`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: productId,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        cartfunction(data.data[0]);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const handleBuyNow = (productId) => {
    Getsingledata(productId);
  };

  return (
    <>
      <Header1 />
      <div className="first-nav container-fluid">
        <span>
          <Link to="/">Home</Link>/ Wishlist
        </span>
      </div>

      <section className="wishlist-page m-auto" style={{ overflow: "hidden" }}>
        <div className="container m-auto">
          <div className="row mt-0">
            <div className="col-md-12">
              <h1 className="wishlist-header">
                {" "}
                {wishlistData && wishlistData.length > 0 ? "Your Wishlist" : ""}
              </h1>
            </div>
          </div>
          <div className="row mt-0">
            {loading ? (
              <Loader show={loading} stack="vertical" />
            ) : (
              <>
                {wishlistData && wishlistData.length > 0 ? (
                  wishlistData.map((item, ind) => (
                    <div className="col-xl-4 col-lg-6 col-md-6 col-12" key={ind}>
                      <div className="wishlistDiv wishlist-div-image">
                        <div className="row wishlist-starting-row">
                          <div className="col-4">
                            <Link to={"/SingleProduct/" + item.productId}>
                              <img src={`${baseUrl}/` + item.image[0].path} className="img-fluid" />
                            </Link>
                          </div>
                          <div className="col-8 py-0">
                            <h6 className="wishlist-heading2">{item.name}</h6>
                            <p className="word-wrapping">{item.description}</p>
                            <div className="buynow-details-btn-wrap">
                              <button
                                onClick={() => handleBuyNow(item.productId)}
                                className="wishlist-btn"
                              >
                                Add to cart
                              </button>
                              <Link to={"/SingleProduct/" + item.productId}>
                                <button className=" wishlist-btn">
                                  See Details
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div
                          className="wishlist-close-icon"
                          onClick={() => DeleteWishlist(item._id)}
                          style={{ cursor: "pointer" }}
                        >
                          <IoClose />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center EMPTYWISHLIST-DIV">
                    <div>
                      <h1>No Product Found</h1>
                    </div>
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
                )}
              </>
            )}
          </div>
          <ToastContainer />
        </div>
      </section>
      <Baseline />
      <Footer />
    </>
  );
};

export default WishList;
