import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import Header1 from "./Header1";
import { baseUrl } from "../utils/services";
var Userdata = "";
var Subtotal1 = "";
const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [_id, Set_id] = useState();
  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    Subtotal1 = localStorage.getItem("Subtotal");
    CartById();
  }, []);

  const CartById = async () => {
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
        setCart(data.data[0].order);
        Set_id(data.data[0]._id);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  return (
    <>
      <Header1 />
      <div className="first-nav container-fluid">
        <span>
          <Link to="/">Home</Link>/CheckOut
        </span>
      </div>
      <section className="checkout-area ptb-70">
        <div className="container">
          <form>
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="order-details">
                  <h3 className="title">Your Order</h3>
                  <div className="order-table table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((el, ind1) => (
                          <tr key={ind1}>
                            <th scope="col">{el.name}</th>
                            <th scope="col">{el.quantity}</th>
                            {/* <th scope="col">{(el.mrp - el.mrp * el.discountprice / 100) * el.quantity}</th> */}
                            <th scope="col">{el.quantity * el.singleprice}</th>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <br />
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td className="order-subtotal">
                            <span>Cart Subtotal</span>
                          </td>
                          <td className="order-subtotal-price">
                            <span className="order-subtotal-amount">
                              {Subtotal1}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="total-price">
                            <span>Order Total</span>
                          </td>
                          <td className="product-subtotal">
                            <span className="subtotal-amount">{Subtotal1}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="payment-box">
                    <Link className="default-btn" to={"/UserDetails/" + _id}>
                      <i className="flaticon-tick"></i>Place Your Order{" "}
                      <span></span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default Checkout;
