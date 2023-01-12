import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../state";
import { logout } from "../state/auth/actions";
import "../views/landing/homepage.css";
import "../components/Header1.css";
import "../components/Carouselcomp";
import $ from "jquery";
import CategoryCreation from "./Admin/CategoryCreation";
import Carouselcomp from "../components/Carouselcomp";
import Cart from "./Cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
//import Button from './button';

let changeNavValue = 0;
var header;
var sticky;
var Userdata = "";


// var userCart=[]
const Header1 = (props) => {
  // let history=useHistory();
  const history = useHistory();
  const [search, setSearch] = useState("");
  // const [email, setemail] = useState("");
  const [subcategories, setSubCategories] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [repassword, setRePassword] = useState("");
  let [userCart, setUserCart] = useState([]);
  const [order, Setorder] = useState([]);
  const [msg, setMsg] = useState("");
  const [regmsg, setRegMsg] = useState("");
  const [categories, setCategories] = useState([]);
  const [registerModal, setRegisterModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues:{
    username:"",
    email:"",
    password:"",
    repassword:"",
    }
  });

  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    GetCategory();
    GetSubCategory();
    $(document).ready(function() {
      header = document.getElementById("myHeader");
      sticky = header.offsetTop;
      window.onscroll = function() {
        headerFunction();
      };
      // $('.collapse-btn').click(function(){
      //     $('.insideNav').toggleClass('inactive');
      //     if(changeNavValue==0){
      //                 changeNavValue=1
      //                 $('.insideNav').slideUp(500);
      //                 $('.content').removeClass('col-sm-10');
      //                 $('.content').addClass('col-12');
      //               }else{
      //                 changeNavValue=0
      //                 $('.insideNav').slideDown(500);
      //                 $('.content').removeClass('col-12');
      //                 $('.content').addClass('col-sm-10');
      //               }
      //   });
      $(".arrow").click(function() {
        $(".sublist").slideUp();
      });
    });
  }, []);
  const logout = () => {
    localStorage.setItem("Userdata", null);
    toast.success("Logout successfull", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
    });
    window.location.replace("/");
    
  };

  const RegisterUser = (data) => {
    console.log(data,"mkkkkkkkkkkkkkkk");
    // setUsername(data.username);
    // setemail(data.email);
    // setPassword(data.password);
    // setRePassword(data.repassword);
    if (
      data.email &&
      data.password &&
      data.repassword &&
      data.username&&
      data.password == data.repassword
    ) {
      console.log(data,"After if con")
      //fetch("http://144.91.110.221:3033/api/auth/register", {
      fetch("http://localhost:3033/api/auth/register", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
          email: data.email,
          role: "user",
        }),
      })
        .then((res) => res.json())
        .then(() => {
          
          window.location.reload();
        });
        
    } else {
      setRegMsg("Please Enter Right Data");
    }
   
  };
  const LoginUser = (e) => {
    e.preventDefault();
    if (username && password) {
      //fetch("http://144.91.110.221:3033/api/auth/login", {
      fetch("http://localhost:3033/api/auth/login", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then(async (res) => {
          if (res.role === "user") {
            Userdata = res;
            localStorage.setItem("Userdata", JSON.stringify(res));
            await CartById();
            history.push("/");
            window.location.reload();
            toast.success("Login successfull",{
              position:toast.POSITION.BOTTOM_RIGHT,
              autoClose: 5000,
            })
            
          } else if (
            res.role == "superAdmin" ||
            res.role == "Vendor" ||
            res.role == "Manager"
          ) {
            toast.success("Login successfull",{
              position:toast.POSITION.BOTTOM_RIGHT,
              autoClose: 5000,
            })
            await localStorage.setItem("Userdata", JSON.stringify(res));
            await localStorage.setItem("Userdata1", JSON.stringify(res.role));
            
            history.push("/Dashboard");
             
            window.location.reload();
           
          } else if (Userdata == undefined) {
            setMsg("User Name Or PassWord is not Valid");
          }
        })
        .then(async () => {
          if (JSON.parse(localStorage.getItem("CartDataWoLogin"))) {
            await JSON.parse(localStorage.getItem("CartDataWoLogin")).map(
              async (item, index) => {
                await cartfunction(item);
                
              }
            );
          }
        });
       
    } else {
      console.log("not getting role");
      setMsg("Please Enter a Valid Data");
    }
  };
  const headerFunction = async () => {
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  };
  const GetCategory = async () => {
    //await fetch("http://144.91.110.221:3033/api/category/all_category")
    await fetch("localhost:3033/api/category/all_category")
      .then((res) => res.json())
      .then(async (data) => {
        setCategories(data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  const GetSubCategory = async () => {
    //await fetch("http://144.91.110.221:3033/api/subcategory/all_subcategory")
    await fetch("http://localhost:3033/api/subcategory/all_subcategory")
      .then((res) => res.json())
      .then(async (data) => {
        setSubCategories(data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  const searchData = (e) => {
    if (props.func) props.func(e);
  };
  const cartfunction = async (newItemObj) => {
    var merged = false;
    if (userCart) {
      if (userCart.order == null || userCart.order == []) {
        for (var i = 0; i < order.length; i++) {
          if (order[i].productid == newItemObj.productid) {
            order[i].quantity += newItemObj.quantity;
            // order[i].mrp += newItemObj.mrp;
            // order[i].actualprice+=newItemObj.actualprice
            merged = true;
          }
        }
        if (!merged) {
          order.push(newItemObj);
          await AddtoCart();
          await CartById();
        }
      } else {
        for (var i = 0; i < userCart.order.length; i++) {
          if (userCart.order[i].productid == newItemObj.productid) {
            userCart.order[i].quantity += newItemObj.quantity;
            userCart.order[i].mrp += newItemObj.mrp;
            merged = true;
            console.log("true");
          }
          if (!merged) {
            userCart.order.push(newItemObj);
          }
        }
        //  await CartById();
        await UpdateCart();
        //   await AsyncStorage.setItem("order1", JSON.stringify(userCart.order));
        //   newamount = 0;
      }
    }
  };

  const CartById = async () => {
    if (!Userdata == []) {
      // await fetch("http://144.91.110.221:3033/api/cart/cart_by_id", {
      await fetch("http://localhost:3033/api/cart/cart_by_id", {
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
        })

        .catch((err) => {
          console.log(err, "error");
        });
    }
  };
  const AddtoCart = async () => {
    //  debugger
    if (!Userdata == []) {
      //await fetch("http://144.91.110.221:3033/api/cart/add_to_cart", {
      await fetch("http://localhost:3033/api/cart/add_to_cart", {
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
          history.push("/Cart");
        })
        .catch((err) => {
          console.log(err, "error");
        });
    }
    // else{
    //   history.push('/Register')
    // }
  };
  const UpdateCart = () => {
    //const url = "http://144.91.110.221:3033/api/cart/update_cart_by_id";
    const url = "http://localhost:3033/api/cart/update_cart_by_id";
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
        history.push("/Cart");
      })
      .then((err) => console.log(err));
  };
  return (
    <>
      {/* sidebar Modal */}
      {/* <!-- Modal --> */}
      <div
        className="modal left fade"
        id="myModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel">
                Categories
              </h4>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div
                className="accordion accordion-flush"
                id="accordionFlushExample"
              >
                {subcategories &&
                  subcategories.length > 0 &&
                  subcategories.map((el, ind) => (
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="flush-headingOne">
                        <Link to={"/Subcategories/" + el._id}>
                          <div
                            className="d-flex align-items-center"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            {/* <img
                              className="icons1"
                              src={
                                //"http://144.91.110.221:3033/" + el.image[0].path
                                "http://localhost:3033/" + el.image[0].path
                              }
                            /> */}
                            <button
                              className="accordion-button collapsed button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseOne"
                              aria-expanded="false"
                              aria-controls="flush-collapseOne"
                            >
                              {el.name}
                            </button>
                            <img
                              className="icons1"
                              src={
                                //"http://144.91.110.221:3033/" + el.image[0].path
                                "http://localhost:3033/" + el.image[0].path
                              }
                            />
                          </div>
                        </Link>
                      </h2>
                      {/* <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                     <div className="accordion-body">
                        <ul>
                           <li>1</li>
                           <li>2</li>
                           <li>3</li>
                           <li>4</li>
                        </ul>
                     </div>
                  </div> */}
                    </div>
                  ))}
                {/* <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingTwo">
                     <div className="d-flex align-items-center">
                        <img className="icons1" src={require('../Images/Icons/liver-1.png')}/>
                        <button className="accordion-button collapsed button" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                        Liver
                        </button>
                     </div>
                  </h2>
                  <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                     <div className="accordion-body">
                        <ul>
                           <li>1</li>
                           <li>2</li>
                           <li>3</li>
                           <li>4</li>
                        </ul>
                     </div>
                  </div>
               </div>
               <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingThree">
                     <div className="d-flex align-items-center">
                        <img className="icons1" src={require('../Images/Icons/infection-1.png')}/>
                        <button className="accordion-button collapsed button" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                        Viral Infection
                        </button>
                     </div>
                  </h2>
                  <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                     <div className="accordion-body">
                        <ul>
                           <li>1</li>
                           <li>2</li>
                           <li>3</li>
                           <li>4</li>
                        </ul>
                     </div>
                  </div>
               </div>
               <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingFour">
                     <div className="d-flex align-items-center">
                        <img className="icons1" src={require('../Images/Icons/immune-1.png')}/>
                        <button className="accordion-button collapsed button" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                        Immunity   
                        </button>
                     </div>
                  </h2>
                  <div id="flush-collapseFour" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                     <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
                  </div>
               </div>
               <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingFive">
                     <div className="d-flex align-items-center">
                        <img className="icons1" src={require('../Images/Icons/heartbeat-1.png')}/>
                        <button className="accordion-button collapsed button" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                        Health    </button>
                     </div>
                  </h2>
                  <div id="flush-collapseFive" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                     <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
                  </div>
               </div>
               <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingSix">
                     <div className="d-flex align-items-center">
                        <img className="icons1" src={require('../Images/Icons/categories-1.png')}/>
                        <button className="accordion-button collapsed button" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
                        Other Products
                        </button>
                     </div>
                  </h2>
                  <div id="flush-collapseSix" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                     <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
                  </div>
               </div>
               */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end side bar Modal */}
      <div className="container-fluid top-nav">
        {/* login Register Modal  */}
        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <div className="row pt-4 ">
                  <div className="col-6 logiRegisterHeader1 pr-0">
                    <h3
                      onClick={() => {
                        setRegisterModal(false);
                      }}
                      className={!registerModal ? "text-success" : null}
                    >
                      Login
                    </h3>
                  </div>
                  <div className="col-6 logiRegisterHeader2 pl-0">
                    <h3
                      onClick={() => {
                        setRegisterModal(true);
                      }}
                      className={registerModal ? "text-success" : null}
                    >
                      Register
                    </h3>
                  </div>
                  {registerModal ? (
                    <div className="col-lg-12 logiRegisterContentDiv">
                      <div className="form-row">
                        <form className="form-group col-lg-12" onSubmit={handleSubmit(RegisterUser)}>
                          <div className="form-group">
                            <label>
                              Username<span>*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              
                              {...register("username", {
                                required: true,
                               
                              })}
                            />
                            {errors?.username?.type === "required" && <p className="text-danger">Name is Required</p>}
                            {/* <input
                            type="text"
                            className="form-control "
                            
                            onChange={(e) => {
                              setUsername(e.target.value);
                            }}
                          /> */}
                          </div>
                          <div className="form-group ">
                            <label>
                              Email<span>*</span>
                            </label>
                            <input
                              type="email"
                              className="form-control "
                              
                              {...register("email", {
                                required: true,
                                
                              })}
                            />
                            {errors?.email?.type === "required" && <p className="text-danger">Email is Required</p>}
                            {/* <h5 className="Login-fail-msg">{regmsg}</h5> */}
                          </div>
                          <div className="form-group">
                            <label>
                              Password<span>*</span>
                            </label>
                            <input
                              type="password"
                              className="form-control "
                              
                              {...register("password", {
                                required: true,
                                
                              })}
                            />
                            {errors?.password?.type === "required" && <p className="text-danger">Password is Required</p>}
                          </div>
                          <div className="form-group ">
                            <label>
                              Confirm Password<span>*</span>
                            </label>
                            <input
                              type="password"
                              className="form-control "
                            
                              {...register("repassword", {
                                required: true,
                                
                              })}
                            />
                            {errors?.repassword?.type === "required" && <p className="text-danger">Re-Password is Required</p>}
                          </div>
                          {/* <h5 className="Login-fail-msg">{}</h5> */}
                          {/* <div className="form-group col-lg-12">
                           <span>Register Sucessfully</span>
                        </div> */}
                          <div className="form-group ">
                            <button
                              className="btn btn-success btn-lg"
                              type="submit"
                            >
                              Register
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  ) : (
                    <div className="col-lg-12 logiRegisterContentDiv">
                      <div className="form-row">
                        <div className="form-group col-lg-12">
                          <label>
                            Username<span>*</span>
                          </label>
                          <input
                            className="form-control "
                            onChange={(e) => {
                              setUsername(e.target.value);
                            }}
                            required
                          />
                        </div>
                        <div className="form-group col-lg-12">
                          <label>
                            Password<span>*</span>
                          </label>
                          <input
                            type="password"
                            className="form-control "
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                            required
                          />
                        </div>
                        <h5 className="Login-fail-msg">{msg}</h5>
                        <div className="form-group col-lg-12 justify-content-center">
                          <button
                            className="btn btn-success btn-lg"
                            onClick={(e) => {
                              LoginUser(e);
                            }}
                          >
                            Login
                          </button>
                          <ToastContainer />
                          <Link>
                            <p className="mt-2">Forget Password...</p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End login register Modal  */}
        {/* Logo div */}
        <div className="row top-header-padding">
          <div className="col-sm-3">
            <Link className="navbar-brand" to="/">
              <img
                src={require("../Images/new-logo.png")}
                alt="logo"
                className="logo2"
              />
            </Link>
          </div>
          {/* End Logo Div */}

          {/* Start Login/Register div */}
          <div className="col-sm-1">
            <div className="row login-div mt-4">
              <div className="col-sm-1">
                <div className="option-item">
                  <div className="cart-btn">
                    <Link to="/Ordered">
                      <i className="bx bx-user"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-sm-8 user-login">
                {Userdata == null ? (
                  <>
                    <span
                      className="sp"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      style={{ cursor: "pointer" }}
                    >
                      Account
                    </span>
                    <br />
                    <span
                      className="Sp1 mt-5"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      style={{ cursor: "pointer" }}
                    >
                      Login/Register
                    </span>
                  </>
                ) : (
                  <>
                    <span className="sp" style={{ cursor: "pointer" }}>
                      Account
                    </span>
                    <br />
                    <div className="dropdown">
                      <button
                        className="btn btn-white btn-sm dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {Userdata && Userdata.username}
                      </button>

                      <ul
                        className="dropdown-menu Logout-ul"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <Link to="/Ordered">
                          <div className="Logout-div d-flex align-items-center">
                            <i className="bx bx-file pl-2"></i>{" "}
                            <li
                              className="dropdown-item Logout-li"
                              style={{ cursor: "pointer" }}
                            >
                              <Link to="/Ordered">
                                <span className="pr-4">Orders</span>
                              </Link>
                            </li>
                          </div>
                        </Link>
                        <Link to="/Cart">
                          <div className="Logout-div d-flex align-items-center">
                            <i className="bx bx-cart pl-2"></i>{" "}
                            <li
                              className="dropdown-item Logout-li"
                              style={{ cursor: "pointer" }}
                            >
                              <span className="pr-4">Cart</span>
                            </li>
                          </div>
                        </Link>
                        <Link to="/Wishlist">
                          <div className="Logout-div d-flex align-items-center">
                            <i className="bx bx-heart pl-2"></i>{" "}
                            <li
                              className="dropdown-item Logout-li"
                              style={{ cursor: "pointer" }}
                            >
                              <span className="pr-4">Wishlist</span>
                            </li>
                          </div>
                        </Link>
                        <div className="Logout-div d-flex align-items-center">
                          <i className="bx bx-log-out pl-2"></i>{" "}
                          <li
                            className="dropdown-item Logout-li"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              logout();
                            }}
                          >
                            <span className="pr-4">Logout</span>
                          </li>
                        </div>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* End Login/Register div */}
          {/* Start Wishlidt div */}
          <div className="col-sm-2  wishlist-div">
            <Link to="/WishList">
              <div className="row login-div mt-4">
                <div className="col-sm-2">
                  <div className="option-item">
                    <div className="cart-btn">
                      {/* <Link to="/Ordered"> */}
                      <i className="bx bx-heart"></i>
                      {/* </Link> */}
                    </div>
                  </div>
                </div>
                <div className="col-sm-8 user-login">
                  <span className="sp">Wishlist</span>
                  <br />
                  <span className="Sp1">Edit your wishlist</span>
                </div>
              </div>
            </Link>
          </div>
          {/* End Wishlist div */}
          {/* Cart div Start */}
          <div className="col-sm-1 cart-div">
            <Link to="/cart">
              <div className="row login-div1 mt-4">
                <div className="col-sm-1">
                  <div className="option-item">
                    <div className="cart-btn">
                      <i className="bx bx-cart"></i>
                    </div>
                  </div>
                </div>

                <div className="col-sm-8 user-login">
                  {props && props.CartItems ? (
                    <h6 className="Total-Item">
                      {props.CartItems.length > 0 ? props.CartItems.length : ""}
                    </h6>
                  ) : (
                    ""
                  )}
                  <span className="sp">Cart</span>
                  <br />
                  <span className="Sp1">₹ 0.0</span>
                </div>
              </div>
            </Link>
          </div>
          {/* Cart div End */}
          {/* Search Box Code */}
          <div className="col-sm-4  " style={{ paddingLeft: "10px" }}>
            <div className="login-div2">
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
                // onKeyPress={(e) => {
                //   if (e.key == "Enter") {
                //     searchData(search);
                //   }
                // }}
              />
              <Link to={"/SearchResult/" + search}>
                <button
                  className="search mr-1"
                  onClick={() => searchData(search)}
                >
                  <i className="bx bx-search-alt"></i>
                </button>
              </Link>
            </div>
          </div>
          {/* End Of search Code */}
          {/* Currancy Change code */}
          <div className="col-sm-1 d-flex align-items-center currancy">
            <select>
              <option>INR</option>
              <i className="bx bx-chevron-down"></i>

              <option>Dollar</option>
            </select>
          </div>
          {/* End Of Currancy Change */}
        </div>
      </div>
      <div className="container-fluid main-nav">
        <div className="row mt-0" id="myHeader">
          <div className="col-2 drop-category pl-4 ">
            <div className="row">
              <div>
                <div className="category ">
                  <i
                    className="fa fa-bars collapse-btn pt-1"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                  ></i>
                </div>
                <div className="category">
                  <span className="category-head">Browse Categories</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-10">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid mb-1">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarTogglerDemo03"
                  aria-controls="navbarTogglerDemo03"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse Home-navbar"
                  id="navbarTogglerDemo03"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0  ml-5">
                    <li className="nav-item">
                      <Link
                        className="nav-link nav-heading"
                        aria-current="page"
                        to="/"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link nav-heading" to="/AllProducts">
                        Shop
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link nav-heading"
                        to="/ContactUs"
                        tabindex="-1"
                        aria-disabled="true"
                      >
                        Contact
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link nav-heading"
                        href="#"
                        tabindex="-1"
                        aria-disabled="true"
                      >
                        Blog
                      </a>
                    </li>
                  </ul>
                  <img
                    className="icons2"
                    src={require("../Images/Icons/akar-icons_phone.png")}
                  />{" "}
                  <span className="contact">+91-7055872014</span>
                  <img
                    src={require("../Images/Icons/carbon_email-new.png")}
                    className="icons2 ml-3"
                  />{" "}
                  <span className="contact  mr-5">info@nutrazik.com</span>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="container-fluid p-0">
        <div className="row side-nav">
          {/* 
      <div className="col-sm-2  pd-0 insideNav" >
         <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
               <h2 className="accordion-header" id="flush-headingOne">
                  <div className="d-flex align-items-center">
                     <img className="icons1" src={require('../Images/Icons/face-1.png')}/>  
                     <button className="accordion-button collapsed button" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                     Skin Care
                     </button>
                  </div>
               </h2>
               <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body">
                     <ul>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                     </ul>
                  </div>
               </div>
            </div>
            <div className="accordion-item">
               <h2 className="accordion-header" id="flush-headingTwo">
                  <div className="d-flex align-items-center">
                     <img className="icons1" src={require('../Images/Icons/liver-1.png')}/>
                     <button className="accordion-button collapsed button" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                     Liver
                     </button>
                  </div>
               </h2>
               <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body">
                     <ul>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                     </ul>
                  </div>
               </div>
            </div>
            <div className="accordion-item">
               <h2 className="accordion-header" id="flush-headingThree">
                  <div className="d-flex align-items-center">
                     <img className="icons1" src={require('../Images/Icons/infection-1.png')}/>
                     <button className="accordion-button collapsed button" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                     Viral Infection
                     </button>
                  </div>
               </h2>
               <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body">
                     <ul>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                     </ul>
                  </div>
               </div>
            </div>
            <div className="accordion-item">
               <h2 className="accordion-header" id="flush-headingFour">
                  <div className="d-flex align-items-center">
                     <img className="icons1" src={require('../Images/Icons/immune-1.png')}/>
                     <button className="accordion-button collapsed button" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                     Immunity   
                     </button>
                  </div>
               </h2>
               <div id="flush-collapseFour" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
               </div>
            </div>
            <div className="accordion-item">
               <h2 className="accordion-header" id="flush-headingFive">
                  <div className="d-flex align-items-center">
                     <img className="icons1" src={require('../Images/Icons/heartbeat-1.png')}/>
                     <button className="accordion-button collapsed button" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                     Health    </button>
                  </div>
               </h2>
               <div id="flush-collapseFive" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
               </div>
            </div>
            <div className="accordion-item">
               <h2 className="accordion-header" id="flush-headingSix">
                  <div className="d-flex align-items-center">
                     <img className="icons1" src={require('../Images/Icons/categories-1.png')}/>
                     <button className="accordion-button collapsed button" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
                     Other Products
                     </button>
                  </div>
               </h2>
               <div id="flush-collapseSix" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
               </div>
            </div>
         </div>
      </div>
      */}
          <div className=" col-sm-12 p-0 content">
            <React.Fragment>{props.children}</React.Fragment>
          </div>
        </div>
      </div>

      {/* phone resposive header */}
      {/* phone top-navbar */}
      <div className=" mobile-top-navbar">
        <div>
          <div className="col-sm-4  " style={{ paddingLeft: "10px" }}>
            <div className="login-div2">
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
                onKeyPress={(e) => {
                  if (e.key == "Enter") {
                    searchData(search);
                  }
                }}
              />
              <Link to={"/SearchResult/" + search}>
                <button
                  className="search mr-1"
                  onClick={() => searchData(search)}
                >
                  <i className="bx bx-search-alt"></i>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="mobile-icon-div ml-4">
          <Link to="/Cart">
            <i className="bx bx-cart"></i>
          </Link>
        </div>
        <div className="mobile-icon-div ml-2">
          <i className="bx bx-heart"></i>
        </div>
        <div className="mobile-icon-div ml-2">
          {Userdata == undefined ? (
            <Link to="/Register">
              <i className="bx bx-log-in"></i>
            </Link>
          ) : (
            <div className="dropdown">
              <button
                className="btn btn-white btn-sm dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {Userdata && Userdata.username}
              </button>

              <ul
                className="dropdown-menu Logout-ul"
                aria-labelledby="dropdownMenuButton1"
              >
                <Link to="/Ordered">
                  <div className="Logout-div d-flex align-items-center">
                    <i className="bx bx-file pl-2"></i>{" "}
                    <li
                      className="dropdown-item Logout-li"
                      style={{ cursor: "pointer" }}
                    >
                      <span className="pr-4">Orders</span>
                    </li>
                  </div>
                </Link>
                <Link to="/Cart">
                  <div className="Logout-div d-flex align-items-center">
                    <i className="bx bx-cart pl-2"></i>{" "}
                    <li
                      className="dropdown-item Logout-li"
                      style={{ cursor: "pointer" }}
                    >
                      <span className="pr-4">Cart</span>
                    </li>
                  </div>
                </Link>
                <Link to="/Wishlist">
                  <div className="Logout-div d-flex align-items-center">
                    <i className="bx bx-heart pl-2"></i>{" "}
                    <li
                      className="dropdown-item Logout-li"
                      style={{ cursor: "pointer" }}
                    >
                      <span className="pr-4">Wishlist</span>
                    </li>
                  </div>
                </Link>
                <div className="Logout-div d-flex align-items-center">
                  <i className="bx bx-log-out pl-2"></i>{" "}
                  <li
                    className="dropdown-item Logout-li"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      logout();
                    }}
                  >
                    <span className="pr-4">Logout</span>
                  </li>
                </div>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* end phone top-navbar */}

      {/* phone main-navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light mobile-nav-bar">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img className="pl-2" src={require("../Images/logo1.png")} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 ml-3 mb-lg-0 mobile-nav-list">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/AllProducts">
                  Shop
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ContactUs">
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Blog
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </a>
                <ul className="dropdown-menu " aria-labelledby="navbarDropdown">
                  {categories.map((el, ind) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={"/AllCategory/" + el._id}
                      >
                        {el.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sub Category
                </a>
                <ul className="dropdown-menu " aria-labelledby="navbarDropdown">
                  {subcategories.map((el, ind) => (
                    <li>
                      {" "}
                      <Link
                        to={"/Subcategories/" + el._id}
                        className="dropdown-item"
                      >
                        {el.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* end phone responsive header */}
    </>
  );
};
export default React.memo(Header1);
