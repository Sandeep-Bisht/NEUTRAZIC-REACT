import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header1 from "./Header1";
import { Link, useHistory } from "react-router-dom";
import Baseline from "./Baseline";
import "../components/Cart.css";
import "../components/Header1.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import * as ACTIONS from "../CommonService/AddToCart/action";
import { message, Popconfirm } from "antd";
import "../views/landing/homepage.css";
import { loadStripe } from "@stripe/stripe-js";
import { baseUrl } from "../utils/services";
import { useContext } from "react";
import CurrencyContext from "../routes/ContextApi/CurrencyContext";
import Loader from "react-spinner-loader";

const stripePromise = loadStripe(
  "pk_test_51MSERVSIpuAtmPLpPWErXWB5nxXPzA8YPHzMdWbL537Dgav6yW8qDYnDtDVIEn5e2pmNmFkrxDOOMiQPn3TCF5Sb00a79isfLk"
);
var Userdata = "";
var CartItems="";

const Cart = () => {
  const history = useHistory();
  const [newquantities, setNewqantities] = useState();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [_id, Set_id] = useState();
  const [subtotal, setSubtotal] = useState(0);
  const [cartStatus, setCartStatus] = useState();
  const [cartItems, setCartItems] = useState(undefined);

  const [currancy, setCurrency] = useState("INR");
  const state1 = useContext(CurrencyContext);

  useEffect(() => {
    if (state1 == "1") {
      setCurrency("Dollar");
    }
  }, [currancy]);

  var total = 0;
  var actualtotal = 0;
  var total1 = 0;

  let dispatch = useDispatch();
  const [data, Setdata] = useState({
    mobile: "",
    email: "",
    orderfor: "",
    order: [],
    userid: "",
    justification: "",
    delivery_time: "",
    order_no: "",
    status: "",
    totalamount: "",
    actualamount: "",
    instruction: "",
    addresstype: "shipping",
    deliverytype: "",
    username: "",
  });

  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    CartById();
    window.scroll(0, 0);
  }, []);

  const CartById = async () => {
    if (Userdata) {
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
          await localStorage.setItem("Usercartdata", JSON.stringify(data));

          setCartStatus(data.data[0].cartStatus);
          setCart(data.data[0].order);
          setLoading(false);
          Setdata({ ...data, order: JSON.stringify(data.data[0].order) });
          setCartItems(data.data[0].order.length);
          let cartItems = data.data[0].order.length;
          dispatch(ACTIONS.getCartItem(cartItems));
          Set_id(data.data[0]._id);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err, "error");
        });
    }
  };
  const UpdateCart = async (array) => {
    const url = `${baseUrl}/api/cart/update_cart_by_id`;
    await fetch(url, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: _id,
        userid: Userdata._id,
        order: array ? array : cart,
        cartStatus,
      }),
    })
      .then((res) => res.json())
      .then((res) => {})
      .then((err) => console.log(err));
  };

  const Minusquantity = async (quantity, price, index) => {
    if (quantity > 1) {
      cart[index].quantity = quantity - 1;
      await UpdateCart();
      await CartById();
    }
  };
  const Plusquantity = async (quantity, price, index,maximumOrder) => {
    console.log(quantity,"inse plus quantity");
    if (quantity >= 1 && quantity<maximumOrder) {
      cart[index].quantity = quantity + 1;
      await UpdateCart();
      await CartById();
    }
  };

  const Sliceorder = async (index, e) => {
    e.preventDefault();
    const array = await cart.filter((e, i) => i !== index);
    await UpdateCart(array);
    await CartById();
    toast.success("Product removed successfully", {
      position: "bottom-right",
      autoClose: 1000,
    });
  };

  const submitData = async (e) => {
    e.preventDefault();
    const stripe = await stripePromise;
    let { order } = data;
    let neworder = JSON.parse(order);
    neworder.forEach(function(item) {
      delete item.category;
      delete item.description;
      delete item.delivery_time;
      delete item.justification;
      delete item.manufacturer;
      delete item.mrp;
    });
    const formData = new FormData();
    await formData.append("mobile", Userdata.phonenumber);
    await formData.append("email", Userdata.email);
    await formData.append("order", JSON.stringify(neworder));
    await formData.append("userid", Userdata._id);
    await formData.append("status", data.status);
    await formData.append("order_no", Math.floor(Math.random() * 1000000));
    await formData.append("totalamount", total1);
    await formData.append("actualamount", actualtotal);
    await formData.append("instruction", data.instruction);
    await formData.append("addresstype", data.addresstype);
    await formData.append("username", Userdata.username);

    const url = `${baseUrl}/api/order/create-checkout-session`;
    await fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        window.location.href = res.url;
      })
      .catch((err) => console.log(err));
  };

  const DeleteCart = async (url) => {
    await fetch(`${baseUrl}/api/cart/delete_cart_by_id`, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: Userdata._id,
      }),
    })
      .then((res) => {
        res.json();
        localStorage.removeItem("Usercartdata");
        window.location.href = url;
      })
      .then(async (res) => {})
      .catch((err) => {});
  };
  return (
    <>
      <Header1 CartItems={cart} />
      <div className="first-nav container-fluid">
        <span>
          <Link to="/">Home</Link>/ Cart
        </span>
      </div>
      <section className="cart-area pc-cart">
        <div className="container m-auto">
          <form>
            <div className="cart-buttons">
              <h1 className="cart-header">
                {cart && cart.length > 0 ? "Your Cart" : ""}
              </h1>
            </div>
            <div className="row">
              <div className="col-lg-8 col-md-12">
                {loading ? (
                  <Loader show={loading} stack="vertical" />
                ) : (
                  <>
                    {cart && cart.length > 0 ? (
                      cart.map((el, ind1) => {
                        if (state1.state1 == "1") {
                          total = el.dollerDiscount * el.quantity;
                          total1 = total1 + el.dollerDiscount * el.quantity;
                          localStorage.setItem("ActualSubtotal", total1);
                          actualtotal += el.dollerMrp * el.quantity;
                          localStorage.setItem("Subtotal", actualtotal);
                        } else {
                          total = el.singleprice * el.quantity;
                          total1 = total1 + el.singleprice * el.quantity;
                          localStorage.setItem("ActualSubtotal", total1);
                          actualtotal += el.mrp * el.quantity;
                          localStorage.setItem("Subtotal", actualtotal);
                        }
                        return (
                          <>
                            <div className="card card-for-cart m-2">
                              <div className="card-body cart-box row">
                                <div className="col-lg-3 col-md-3 col-2">
                                  <div>
                                    <div className="d-flex justify-content-center">
                                      <Link
                                        to={"/SingleProduct/" + el.productid}
                                      >
                                        <img
                                          className="cart-image"
                                          src={
                                            `${baseUrl}/` + el.image ||
                                            el.manufacturer.image[0].path
                                          }
                                          alt="item"
                                        />
                                      </Link>
                                    </div>
                                    <div className="amount mt-1">
                                      {" "}
                                      <div className="input-counter">
                                        <span
                                          className="plus-minus-btn"
                                          onClick={() => {
                                            Minusquantity(
                                              el.quantity,
                                              el.mrp,
                                              ind1,
                                            );
                                          }}
                                        >
                                          <i className="bx bx-minus minus"></i>
                                        </span>
                                        <span className="m-2 quantity-div">
                                          {el.quantity}
                                        </span>
                                        <span
                                          className="plus-minus-btn"
                                          onClick={() => {
                                            Plusquantity(
                                              el.quantity,
                                              el.mrp,
                                              ind1,
                                              el.maximumOrder
                                            );
                                          }}
                                        >
                                          <i className="bx bx-plus  plus"></i>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-middle-part col-lg-6 col-md-6 col-6">
                                  <div>
                                    <Link to={"/SingleProduct/" + el.productid}>
                                      <div className="cart-text">{el.name}</div>
                                    </Link>
                                    <div
                                      className="mt-2 description-link"
                                      onClick={() =>
                                        history.push(
                                          "/SingleProduct/" + el.productid
                                        )
                                      }
                                    >
                                      <p className="card-description">
                                        {el.description.slice(0, 99)}...
                                      </p>
                                    </div>
                                    <div className="mt-2 sold-by-div">
                                      <span className="sold-by">
                                        Sold by :
                                        <p className="manufacturer-name">
                                          {el.manufacturer}
                                        </p>
                                      </span>
                                    </div>
                                    <div className="amount mt-1">
                                      <span className="unit-amount">
                                        {state1.state1 == "1" ? (
                                          <i class="fa fa-dollar-sign currency-sign"></i>
                                        ) : (
                                          <i className="fa fa-inr currency-sign"></i>
                                        )}
                                        <del>
                                          {state1.state1 == "1"
                                            ? el.dollerMrp
                                            : el.mrp}
                                        </del>
                                      </span>
                                      <span className="ms-2 unit-amount">
                                        {state1.state1 == "1"
                                          ? el.dollerDiscount
                                          : el.singleprice}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-2 col-md-2 col-3">
                                  <div className="total-price-div">
                                    <div>
                                      <span className="card-text">
                                        Total Price
                                      </span>
                                    </div>
                                    <div className="amount mt-2">
                                      <span className="subtotal-amount mt-4">
                                        {state1.state1 == "1" ? (
                                          <i class="fa fa-dollar-sign currency-subtotal-sign"></i>
                                        ) : (
                                          <i className="fa fa-inr currency-subtotal-sign"></i>
                                        )}
                                        {(state1.state1 == "1"
                                          ? el.dollerDiscount
                                          : el.singleprice) * el.quantity}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-1 delete-icon">
                                  <Popconfirm
                                    className="bx bx-trash cart-delete-icon"
                                    title="Delete the Product"
                                    description="Are you sure to delete this Product?"
                                    style={{ margin: "0" }}
                                    onConfirm={(e) => Sliceorder(ind1, e)}
                                  ></Popconfirm>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })
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

              <div className="col-lg-4 col-md-12">
                <div className="cart-totals mt-2">
                  <h3>Order Summary</h3>
                  <ul>
                    <li>
                      Sub Total{" "}
                      <span>
                        {state1.state1 == "1" ? (
                          <i className="fa fa-dollar-sign"></i>
                        ) : (
                          <i className="fa fa-inr"></i>
                        )}
                        {actualtotal}
                      </span>
                    </li>
                    <li>
                      Discount{" "}
                      <span>
                        -
                        {state1.state1 == "1" ? (
                          <i className="fa fa-dollar-sign"></i>
                        ) : (
                          <i className="fa fa-inr"></i>
                        )}
                        {actualtotal - total1}
                      </span>
                    </li>

                    <li>
                      Payable Amount{" "}
                      <span>
                        {state1.state1 == "1" ? (
                          <i className="fa fa-dollar-sign"></i>
                        ) : (
                          <i className="fa fa-inr"></i>
                        )}
                        {total1}
                      </span>
                    </li>
                  </ul>                
                </div>
                {cartItems ? (
                    <>
                    <button
                      className="default-btn1"
                      onClick={(e) => {
                        submitData(e);
                      }}
                    >
                      <i className="flaticon-trolley"></i> Proceed To Checkout
                    </button>
                    <button
                      className="default-btn1">
                     <Link to={"/AllProducts"} className="flaticon-trolley">
                   Continue Shopping
                </Link>
                </button>
                    
                     </>
                  ) : (
                    <button
                      className="default-btn1"
                      onClick={() => history.push("/AllProducts")}
                    >
                      <i className="flaticon-trolley"></i> Continue Shopping
                    </button>
                  )}
              </div>
            </div>
          </form>
        </div>
      </section>
      <Baseline />
      <Footer />
    </>
  );
};
export default Cart;
