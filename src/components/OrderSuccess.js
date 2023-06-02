import React, { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import "../components/OderSuccess.css";
import { Link, useLocation, useHistory } from "react-router-dom";
import * as ACTIONS from "../CommonService/AddToCart/action";
import Footer from "./Footer";
import Header1 from "./Header1";
import { baseUrl } from "../utils/services";
import { useDispatch } from "react-redux";
var Userdata;
var ActualSubtotal;
var Usercartdata;
var Subtotal;

function OrderSuccess() {

  const [cartItems, setCartItems] = useState("");
  let [userCart, setUserCart] = useState([]);
  let dispatch = useDispatch()
  let location=useLocation();
  let history=useHistory();

  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    ActualSubtotal = JSON.parse(localStorage.getItem("ActualSubtotal"));
    Usercartdata = JSON.parse(localStorage.getItem("Usercartdata"));
    Subtotal = JSON.parse(localStorage.getItem("Subtotal"));  
  }, []);

  useEffect(()=> {
    CartById();
  },[])

  useEffect(()=>{
    setTimeout(()=>{
      if(location.pathname="/orderSuccess"){
        history.push("/");
      }
    },[5000]); 
  },[])

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
          if (localStorage.getItem("ActualSubtotal")) {
            localStorage.removeItem("ActualSubtotal");
          }
          if (localStorage.getItem("Usercartdata")) {
            localStorage.removeItem("Usercartdata");
          }
          if (localStorage.getItem("Subtotal")) {
            localStorage.removeItem("Subtotal");
          }          
          dispatch(ACTIONS.getCartItem(data.data[0].order.length));
        })

        .catch((err) => {
          console.log(err, "error");
        });
    }
  };

  return (
    <>
      <Header1 />
      <div className="order-success-page mb-5">
        <div className="container m-auto">
          <div className="row mt-0">
            <div className="col-lg-8 col-md-10 col-sm-10 col-12 mx-auto order-success-div">
              <div className="order-success-card">
                <div className="success-heading">
                  <h1>Your order has been placed successfully</h1>
                </div>
                <div className="success-svg">
                  <TiTick />
                </div>
                <div className="success-thank-you">
                  <h2>Thank you for your purchase !</h2>
                </div>
                <div className="success-email-confirm-msg">
                  <p>
                    You will receive an order confirmation email with details of
                    your order.
                  </p>
                </div>
                <button className="success-home-btn" type="button">
                  <Link to="/">Continue Shopping</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default OrderSuccess;
