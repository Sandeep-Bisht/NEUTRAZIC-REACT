import React, { useEffect, useState } from "react";
import "../../components/Admin/Dashboard.css";
import Header1 from "../../components/Header1";
import Baseline from "../../components/Baseline";
import Footer from "../../components/Footer";
import { baseUrl } from "../../utils/services";
var Userdata = "";
var Usercartdata = "";
var Subtotal1 = "";
var ActualSubtotal1 = "";
const UserDetails = (props) => {
  const [cart, setCart] = useState([]);
  const [_id, Set_id] = useState();
  const [Subtotal, setSubTotal] = useState();
  const [Discount, setDiscount] = useState();

  var total = "";
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1;
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  var newdate = day + "/" + month + "/" + year;

  useEffect(() => {
    window.scroll(0, 0);
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    Usercartdata = JSON.parse(localStorage.getItem("Usercartdata"));
    Subtotal1 = localStorage.getItem("Subtotal");
    ActualSubtotal1 = localStorage.getItem("ActualSubtotal");
    CartById();
    cartTotal();
  }, []);
  const [data, Setdata] = useState({
    country: "",
    address: "",
    pincode: "",
    mobile: "",
    othermobile: "",
    email: "",
    orderfor: "",
    order: [],
    userid: "",
    status: "Pending",
    justification: "kh",
    delivery_time: "jgj",
    order_no: "",
    totalamount: "",
    actualamount: "",
    instruction: "",
    addresstype: "",
    deliverytype: "",
    username: "",
  });

  const submitData = async (e) => {
    e.preventDefault();
    let { address } = data;
    const formData = new FormData();
    await formData.append("country", data.country);
    await formData.append("address", address);
    await formData.append("pincode", data.pincode);
    await formData.append("mobile", data.mobile);
    await formData.append("othermobile", data.othermobile);
    await formData.append("email", data.email);
    await formData.append("orderfor", data.orderfor);
    await formData.append("order", data.order);
    await formData.append("userid", Userdata._id);
    await formData.append("status", data.status);
    await formData.append("justification", data.justification);
    await formData.append("delivery_time", data.delivery_time);
    await formData.append("order_no", Math.floor(Math.random() * 1000000));
    await formData.append("totalamount", Subtotal1);
    await formData.append("actualamount", ActualSubtotal1);
    await formData.append("instruction", data.instruction);
    await formData.append("addresstype", data.addresstype);
    await formData.append("deliverytype", data.deliverytype);
    await formData.append("username", Userdata.username);
    // const url=`${baseUrl}/api/order/add_order`
    const url = `${baseUrl}/api/order/create-checkout-session`;
    await fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        window.location.href = res.url;
        // alert("cart Deleted")
        //DeleteCart()
      })
      .catch((err) => console.log(err));
  };
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
          // setCartItems(data.data[0].order.length);
          // let cartItems = data.data[0].order.length;
          // dispatch(ACTIONS.getCartItem(cartItems));
          Set_id(data.data[0]._id);
        })
        .catch((err) => {
          console.log(err, "error");
        });
    }
  };

  const DeleteCart = async () => {
    await fetch(`${baseUrl}/api/cart/delete_cart_by_id`, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: props.match.params._id,
      }),
    })
      .then((res) => res.json())
      .then(async (res) => {})
      .catch((err) => {});
  };

  useEffect(() => {
    if (cart) {
      cartTotal();
    }
  }, [cart]);

  const cartTotal = () => {
    let total = 0;
    let discount = 0;
    for (let item of cart) {
      total = total + item.mrp * item.quantity;
      discount = discount + item.singleprice * item.quantity;
    }
    setSubTotal(total);
    setDiscount(discount);
  };

  return (
    <>
      <Header1 />
      <div id="__next">
        <section>
          <div className="container m-auto">
            <div className="row">
              <div className="col-8">
                <form>
                  <div className="col-12">
                    <div className="card p-4 mt-4">
                      <h5>Billing Details</h5>
                      <div className="row">
                        <div className="col-6 p-1">
                          <select
                            className="form-control Dashborad-search"
                            placeholder="Country "
                            onChange={(e) => {
                              Setdata({ ...data, country: e.target.value });
                            }}
                          >
                            <option>Select Country</option>
                            <option value="India">India</option>
                            <option value="America">America</option>
                            <option value="Pakistan">Britain</option>
                          </select>
                        </div>

                        <div className="col-6 p-1 form-floating">
                          <textarea
                            type="text"
                            id="formfloating"
                            className="form-control Dashborad-search"
                            placeholder="Address "
                            onChange={(e) => {
                              Setdata({ ...data, address: e.target.value });
                            }}
                          ></textarea>
                          <label for="formfloating ">Address</label>
                        </div>
                        <div className="col-6 p-1 form-floating">
                          <input
                            type="number"
                            id="formfloating"
                            className="form-control Dashborad-search"
                            placeholder="Pincode "
                            onChange={(e) => {
                              Setdata({ ...data, pincode: e.target.value });
                            }}
                          />
                          <label for="formfloating ">Pincode</label>
                        </div>
                        <div className="col-6 p-1 form-floating">
                          <input
                            type="number"
                            id="formfloating"
                            className="form-control Dashborad-search"
                            placeholder="Mobile Number"
                            rows="3"
                            onChange={(e) => {
                              Setdata({ ...data, mobile: e.target.value });
                            }}
                          />
                          <label for="formfloating">Mobile Number</label>
                        </div>
                        <div className="col-6 p-1 form-floating">
                          <input
                            type="text"
                            id="formfloating"
                            className="form-control Dashborad-search"
                            placeholder="Additional Mobile Number"
                            rows="3"
                            onChange={(e) => {
                              Setdata({ ...data, othermobile: e.target.value });
                            }}
                          />
                          <label for="formfloating">
                            Additional Mobile Number
                          </label>
                        </div>
                        <div className="col-6 p-1 form-floating">
                          <input
                            type="email"
                            id="formfloating"
                            className="form-control Dashborad-search"
                            placeholder="Email"
                            rows="3"
                            onChange={(e) => {
                              Setdata({ ...data, email: e.target.value });
                            }}
                          />
                          <label for="formfloating">Email</label>
                        </div>
                      </div>
                      <div>
                        <br />
                        <h4>Payment Method</h4>
                        <input
                          className="mr-2"
                          type="radio"
                          id="html"
                          name="fav_language"
                          value="For Me"
                          onChange={(e) => {
                            Setdata({ ...data, orderfor: e.target.value });
                          }}
                        />
                        <label for="html" className="pr-3">
                        Debit Card
                        </label>
                        &nbsp;
                        {/* <input className='mr-2' type="radio" id="html" name="fav_language" value="For Me" onChange={(e)=>{Setdata({...data,orderfor:e.target.value})}} />
                                    <label for="html">For Other</label> */}
                      </div>
                      {/* {
                           cart.map((el,ind1)=>(
                             total+=( el.mrp - (el.mrp * el.discountprice / 100) )* el.quantity,
                            
                                <>
                                    <span onChange={(e)=>{Setdata({...data,totalamount:e.target.value})}}>{total}</span>
                                </>
                            
                           ))} */}

                      <div className="col-12 p-1">
                        <button
                          className="btn btn-primary"
                          onClick={(e) => {
                            submitData(e);
                          }}
                        >
                          Pay now
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="col-4">
                <div className="cart-totals">
                  <h3>Cart Totals</h3>
                  <ul>
                    <li>
                      Subtotal <span>₹{Subtotal}</span>
                    </li>
                    <li>
                      Discount <span>-₹{Subtotal - Discount}</span>
                    </li>

                    {/* <li>Shipping <span>$30.00</span></li> */}
                    <li>
                      Payable Amount <span>₹{Discount}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Baseline />
      <Footer />
    </>
  );
};

export default UserDetails;
