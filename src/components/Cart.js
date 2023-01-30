import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header1 from "./Header1";
import { Link } from "react-router-dom";
import StarsRating from "stars-rating";
import Baseline from "./Baseline";
import "../components/Header1.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import * as ACTIONS from '../CommonService/AddToCart/action'
import confirm, { Button, alert } from "react-alert-confirm";
import { message, Popconfirm } from 'antd';
import "../views/landing/homepage.css";

import { baseUrl } from "../utils/services";
import AllProducts from "./AllProducts";
var Userdata = "";

const Cart = () => {
  const [newquantities, setNewqantities] = useState();
  const [cart, setCart] = useState([]);
  const [_id, Set_id] = useState();
  const [subtotal, setSubtotal] = useState(0);
  const [cartItems, setCartItems] = useState();

  var total = 0;
  var actualtotal = 0;
  var total1 = 0;

  let dispatch = useDispatch()

  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    CartById();
    window.scroll(0, 0);
  }, []);
  // const Subtotal=()=>{
  //    subtotal=subtotal+
  // }

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
          setCart(data.data[0].order);
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
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        
      })
      .then((err) => console.log(err));
  };

  const Minusquantity = async (quantity, price, index) => {
    if (quantity > 1) {
      //  isquantity = true
      cart[index].quantity = quantity - 1;
      //  newquantity = quantity

      //  totalamount = totalamount - price
      await UpdateCart();
      await CartById();
    }
  };
  const Plusquantity = async (quantity, price, index) => {
    if (quantity >= 1) {
      //  isquantity = true
      cart[index].quantity = quantity + 1;
      //  newquantity = quantity

      //  totalamount = totalamount - price
      await UpdateCart();
      await CartById();
    }
  };

  const Sliceorder = async (index, e) => {
    e.preventDefault();
    const array = await cart.filter((e, i) => i !== index);
    await UpdateCart(array);
    await CartById();
    toast.success("Item deleted successfull", {
      position: "bottom-right",
      autoClose: 2000,
    })
  };


  return (
    <>
      <Header1 CartItems={cart} />
      <div className="first-nav container-fluid">
        <span>
          <Link to="/">Home</Link>/ Cart
        </span>
      </div>
      <section className="cart-area ptb-70 pc-cart">
        <div className="container m-auto">
          <form>
            <div className="cart-buttons">
              <div className="row align-items-center">
                {/* <div className="col-lg-7 col-sm-7 col-md-7">
                           <div className="shopping-coupon-code"><input type="text" className="form-control" placeholder="Coupon code" name="coupon-code" id="coupon-code" /><button type="submit">Apply Coupon</button></div>
                        </div> */}
              </div>
            </div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-8">
                  {cart.length > 0 ? (
                    <div className="cart-table">
                      <table className="table" cellsacing="10px" cellPadding="10px">
                        <thead className="text-center">
                          <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col">PRICE</th>
                            <th scope="col">QUANTITY</th>
                            <th scope="col">Total</th>
                            <th scope="col">ACTION</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart.map((el, ind1) => {
                            
                            // total = total + (el.singleprice * el.quantity) ;
                            // (el.mrp - (el.mrp * el.discountprice) / 100) *
                            // el.quantity;
                            total = el.singleprice * el.quantity;
                            total1 = total1 + (el.singleprice * el.quantity);
                            localStorage.setItem("Subtotal", total1);
                            actualtotal += el.mrp * el.quantity;
                            localStorage.setItem("ActualSubtotal", total1);

                            return (
                              //  <Link to={"/SingleProduct/" + el.productid} >
                              <tr key={ind1} className="cart-data mt-2">
                                <td className="product-thumbnail">
                                  <Link to={"/SingleProduct/" + el.productid}>
                                    <img
                                      src={
                                        `${baseUrl}/` + el.image
                                      }
                                      alt="item"
                                    />
                                  </Link>
                                </td>
                                <td className="product-name text-left">
                                  <Link to={"/SingleProduct/" + el.productid}>
                                    <div className="text-left">
                                      {/* <StarsRating
                                        count={5}
                                        // onChange={ratingChanged}
                                        size={17}
                                        color2={"#ffd700"}
                                        value={3.5}
                                      /> */}
                                      {el.name}
                                    </div>
                                  </Link>
                                </td>
                                <td className="product-price">
                                  <div className="amount">
                                    
                                  <span className="new-price ml-1 fa fa-inr">
                                    <del>{el.mrp}</del>
                                    </span>
                                    <span className="unit-amount">
                                      {
                                        el.singleprice
                                        //   isNaN(
                                        //     el.mrp -
                                        //       (el.mrp * el.discountprice) / 100
                                        //   )
                                        //     ? 0
                                        //     : el.mrp -
                                        //       (el.mrp * el.discountprice) / 100
                                      }
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
                                          Plusquantity(
                                            el.quantity,
                                            el.mrp,
                                            ind1
                                          );
                                        }}
                                      >
                                        <i className="bx bx-plus  minus"></i>
                                      </span>
                                    </div>
                                  </div>
                                </td>
                                {/* <td className="product-subtotal">
                                  <div className="amount">
                                    <span className="subtotal-amount mt-4">
                                        {(el.mrp-el.singleprice)*el.quantity}
                                    </span>
                                  </div>
                                </td> */}
                                <td className="product-subtotal">
                                  <div className="amount">
                                   <span className="subtotal-amount mt-4 fa fa-inr">
                                         {
                                          el.singleprice*el.quantity
                                         }
                                    </span>
                                  </div>
                                </td>
                                <td>
                                  <Popconfirm className="bx bx-trash btn-danger btn-sm"
                                    title="Delete the Product"
                                    description="Are you sure to delete this Product?"
                                    style={{ margin: "0" }}
                                    onConfirm={(e)=>Sliceorder(ind1, e)}
                                  >
                                  </Popconfirm>
                                  {/* <Button onClick={handleClickBasic}>Basic</Button> */}
                                </td>
                              </tr>
                              //     </Link>
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

                <div className="col-sm-4  mb-5">
                  <div className="cart-totals">
                    <h3>Cart Totals</h3>
                    <ul>
                      <li>
                        Subtotal <span>₹{actualtotal}</span>
                      </li>
                      <li>
                        Discount <span>-₹{actualtotal - total1}</span>
                      </li>

                      {/* <li>Shipping <span>$30.00</span></li> */}
                      <li>
                        Total Amount <span>₹{total1}</span>
                      </li>
                    </ul>
                    <Link
                      className="default-btn1"
                      to={Userdata ? "/UserDetails/"+ _id : "/register"}
                    >
                      <i className="flaticon-trolley"></i> Proceed to Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* mobile responsive cart */}

      <div className="small-container cart-page cart-table mt-3">
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
                          //   isNaN(
                          //     el.mrp -
                          //       (el.mrp * el.discountprice) / 100
                          //   )
                          //     ? 0
                          //     : el.mrp -
                          //       (el.mrp * el.discountprice) / 100
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
              </td>
            </tr>
          </table>
        </div>
      </div>
      <ToastContainer />
      {/*  End mobile responsive cart */}
      <Baseline />
      <Footer />
    </>
  );
};
export default Cart;
