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
import Cookies from "universal-cookie";


const stripePromise = loadStripe(
  "pk_test_51MSERVSIpuAtmPLpPWErXWB5nxXPzA8YPHzMdWbL537Dgav6yW8qDYnDtDVIEn5e2pmNmFkrxDOOMiQPn3TCF5Sb00a79isfLk"
);
var Userdata = "";

const Cart = () => {
  const history = useHistory();
  const [newquantities, setNewqantities] = useState();
  const [cart, setCart] = useState([]);
  const [_id, Set_id] = useState();
  const [subtotal, setSubtotal] = useState(0);
  const [cartStatus, setCartStatus] = useState();
  const [cartItems, setCartItems] = useState(undefined);

  const [currancy,setCurrency]=useState("INR");
  const cookies = new Cookies();

  useEffect(()=>{
    let currentCurrencyType = cookies.get("CurrencyType")
    if(currentCurrencyType == "Dollar"){
      setCurrency("Dollar")
    }
  },[currancy])

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
          Setdata({ ...data, order: JSON.stringify(data.data[0].order) });
          setCartItems(data.data[0].order.length);
          let cartItems = data.data[0].order.length;

          dispatch(ACTIONS.getCartItem(cartItems));
          Set_id(data.data[0]._id);
        })
        .catch((err) => {
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
  const Plusquantity = async (quantity, price, index) => {
    if (quantity >= 1) {
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
              <h1 className="cart-header">Your Cart</h1>
            </div>
            <div className="row">
              <div className="col-lg-8 col-md-12">
                {cart.length > 0 ? (
                  <div className="cart-table">
                    <table
                      className="w-100"
                      cellsacing="10px"
                      cellPadding="10px"
                    >
                      <thead className="text-center">
                        <tr>
                          <th scope="col">Product</th>
                          <th scope="col"></th>
                          <th scope="col">PRICE</th>
                          <th scope="col" className="text-center">
                            QUANTITY
                          </th>
                          <th scope="col" className="text-center">
                            Total
                          </th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((el, ind1) => {
                          total = el.singleprice * el.quantity;
                          total1 = total1 + el.singleprice * el.quantity;
                          localStorage.setItem("ActualSubtotal", total1);
                          actualtotal += el.mrp * el.quantity;
                          localStorage.setItem("Subtotal", actualtotal);

                          return (
                            <tr key={ind1} className="cart-data">
                              <td className="product-thumbnail">
                                <Link to={"/SingleProduct/" + el.productid}>
                                  <img
                                    src={
                                      `${baseUrl}/` + el.image ||
                                      el.manufacturer.image[0].path
                                    }
                                    alt="item"
                                  />
                                </Link>
                              </td>
                              <td className="product-name">
                                <Link to={"/SingleProduct/" + el.productid}>
                                  <div className="text-start cart-text">{el.name}</div>
                                </Link>
                              </td>
                              <td className="product-price">
                                <div className="amount">
                                  <span className="unit-amount fa fa-inr">
                                    <del>{el.mrp}</del>
                                  </span>
                                  <span className="unit-amount fa fa-inr">
                                    {el.singleprice}
                                  </span>
                                </div>
                              </td>
                              <td className="product-quantity">
                                <div className="amount">
                                  {" "}
                                  <div className="input-counter">
                                    <span
                                      className="minus-btn"
                                      onClick={() => {
                                        Minusquantity(
                                          el.quantity,
                                          el.mrp,
                                          ind1
                                        );
                                      }}
                                    >
                                      <i className="bx bx-minus minus"></i>
                                    </span>
                                    <input
                                      type="text"
                                      min="1"
                                      value={el.quantity}
                                    />
                                    <span
                                      className="plus-btn"
                                      onClick={() => {
                                        Plusquantity(el.quantity, el.mrp, ind1);
                                      }}
                                    >
                                      <i className="bx bx-plus  minus"></i>
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="product-subtotal">
                                <div className="amount">
                                  <span className="subtotal-amount mt-4 fa fa-inr">
                                    {el.singleprice * el.quantity}
                                  </span>
                                </div>
                              </td>
                              <td>
                                <Popconfirm
                                  className="bx bx-trash cart-delete-icon"
                                  title="Delete the Product"
                                  description="Are you sure to delete this Product?"
                                  style={{ margin: "0" }}
                                  onConfirm={(e) => Sliceorder(ind1, e)}
                                ></Popconfirm>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
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
                )}
              </div>

              <div className="col-lg-4 col-md-12">
                <div className="cart-totals">
                  <h3>Order Summary</h3>
                  <ul>
                    <li>
                      Sub Total <span>₹{actualtotal}</span>
                    </li>
                    <li>
                      Discount <span>-₹{actualtotal - total1}</span>
                    </li>

                    <li>
                      Payable Amount <span>₹{total1}</span>
                    </li>
                  </ul>
                  {cartItems ? (
                    <button
                      className="default-btn1"
                      onClick={(e) => {
                        submitData(e);
                      }}
                    >
                      <i className="flaticon-trolley"></i> Proceed To Checkout
                    </button>
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
            </div>
          </form>
        </div>
      </section>

      {/* mobile responsive cart */}

      {/* <div className="small-container cart-page cart-table mt-3">
        <table>
          <thead>
            <tr>
              <th className="text-center">Product</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Subtotal</th>
            </tr>
          </thead>
          {cart.map((el, ind1) => {
            return (
              <tr className="pt-2">
                <td>
                  <div className="cart-info">
                    <Link to={"/SingleProduct/" + el.productid}>
                      <img
                        src={`${baseUrl}/` + el.image}
                        alt="item"
                      />
                    </Link>
                    <div>
                      <Link to={"/SingleProduct/" + el.productid}>
                        <p>{el.name}</p>
                      </Link>
                      <small>
                        Price ₹{" "}
                        {
                          el.mrp
                        }
                      </small>
                      <br />
                      <span
                        onClick={(e) => {
                          Sliceorder(ind1, e);
                        }}
                      >
                        Remove
                      </span>
                    </div>
                  </div>
                </td>
                <td className="text-center">
                  <div className="amount">
                    {" "}
                    <div className="input-counter">
                      <span
                        className="minus-btn"
                        onClick={() => {
                          Minusquantity(el.quantity, el.mrp, ind1);
                        }}
                      >
                        <i className="bx bx-minus minus mr-2"></i>
                      </span>
                      <input
                        className="text-center"
                        type="number"
                        min="1"
                        value={el.quantity}
                      />
                      <span
                        className="plus-btn"
                        onClick={() => {
                          Plusquantity(el.quantity, el.mrp, ind1);
                        }}
                      >
                        <i className="bx bx-plus  minus ml-2"></i>
                      </span>
                    </div>
                  </div>
                </td>
                <td>{(el.mrp - el.discountprice) * el.quantity} </td>
              </tr>
            );
          })}
        </table>

        <div className="total-price mt-5">
          <table>
            <tr>
              <td className="footheading">Subtotal</td>
              <td>₹{actualtotal}</td>
            </tr>

            <tr>
              <td className="footheading">Total</td>
              <td>₹{actualtotal}</td>
            </tr>
            <tr className="text-center">
              <td colSpan="2">
                 <Link
                  className="default-btn1"
                  to={Userdata ? "/CheckOut" : "/register"}
                >
                  <button>Proccess to CheckOut</button>
                </Link>  
                {/* <Link
                className="default-btn1"
                to="/AllProducts"
              >
                <button>Continue Shopping</button>
              </Link> */}

      {/* </td>
            </tr>
          </table>
        </div>
      </div> */}
      {/* <ToastContainer /> */}
      {/*  End mobile responsive cart */}
      <Baseline />
      <Footer />
    </>
  );
};
export default Cart;
