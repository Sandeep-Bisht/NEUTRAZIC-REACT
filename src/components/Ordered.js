import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header1 from "./Header1";
import Baseline from "./Baseline";
import { baseUrl } from "../utils/services";
var Userdata = "";
const Ordered = () => {
  window.scroll(0, 0);
  const [orderes, setOrderes] = useState([]);
  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));

    ordersDetails();
  }, []);

  const ordersDetails = async () => {
    if (!Userdata == []) {
      await fetch(`${baseUrl}/api/order/order_by_id`, {
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
          if (data.data[0] != undefined) {
            setOrderes(data.data);
          }

          console.log(data.data, "rrrr");
        })
        .catch((err) => {
          console.log(err, "error");
        });
    }
    //  else
    //   {

    //  }
  };

  const UpdateOrderStatus = async (productId, status) => {
    await fetch(`${baseUrl}/api/order/update_order`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: productId,
        status: status,
        justification: "",
        delivery_time: "",
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        alert("canceled");
        ordersDetails();
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
          <Link to="/">Home</Link>/Orders
        </span>
      </div>

      <br />
      <div className="container">
        {orderes.length > 0 ? (
          <div className="cart-table table-responsive nav1">
            <br />
            <table className="table">
              <thead>
                <tr>
                  <th className="col-1">Product</th>
                  <th className="col-1">Name</th>
                  <th className="col-1">Unit Price</th>
                  <th className="col-1">Quantity</th>
                  <th className="col-1">Total</th>
                  <th className="col-1">Order Date</th>
                  <th className="col-1">Status</th>
                  <th className="col-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {orderes.map((el, ind1) =>
                  JSON.parse(el.order).map((item, index) => {
                    return (
                      <tr>
                        <td className="product-thumbnail">
                          <a href="#">
                            <img
                              src={`${baseUrl}/` + item.image}
                              alt="item"
                            />
                          </a>
                        </td>
                        <td className="product-name">
                          <span className="subtotal-amount">{item.name}</span>
                        </td>
                        <td className="product-price">
                          {/* <span className="unit-amount">
                            $
                            {isNaN(
                              item.mrp - (item.mrp * item.discountprice) / 100
                            )
                              ? 0
                              : item.mrp -
                                (item.mrp * item.discountprice) / 100}
                          </span> */}
                          {item.mrp}
                        </td>
                        <td className="product-quantity">
                          <span>{item.quantity}</span>
                        </td>
                        <td className="product-subtotal">
                          <span className="subtotal-amount">
                            {/* {(item.mrp -
                              (item.mrp * item.discountprice) / 100) *
                              item.quantity} */}
                            {item.quantity * item.singleprice}
                          </span>
                        </td>
                        <td className="product-subtotal">
                          <span className="subtotal-amount">22/08/2021</span>
                        </td>
                        <td className="product-subtotal">
                          <span className="subtotal-amount">{el.status}</span>
                        </td>
                        <td
                          className="product-subtotal"
                          onClick={() => UpdateOrderStatus(el._id, "Cancel")}
                        >
                          Cancel order
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <lottie-player
            src="https://assets10.lottiefiles.com/packages/lf20_yRyM3f.json"
            background="transparent"
            speed="1"
            style={{ width: "300px", height: "300px", margin: "auto" }}
            loop
            autoplay
          ></lottie-player>
        )}
      </div>
      <br />

      <Baseline />
      <Footer />
    </>
  );
};
export default Ordered;
