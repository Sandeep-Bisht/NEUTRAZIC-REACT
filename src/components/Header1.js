import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useStateValue } from "../state";
import { logout } from "../state/auth/actions";
import "../views/landing/homepage.css";
import "../components/Header1.css";
import "../components/Carouselcomp";
import $ from "jquery";
import b from "./Admin/CategoryCreation";
import Carouselcomp from "../components/Carouselcomp";
import Cart from "./Cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
//import Button from './button';
import { baseUrl } from "../utils/services";
import * as ACTIONS from "../CommonService/CategoriesbyID/action";
import { useDispatch } from "react-redux";

let changeNavValue = 0;
var header;
var sticky;
var Userdata = "";

const errorEmail = "Please Enter a valid Email Address";

// var userCart=[]
const Header1 = (props) => {
  let dispatch = useDispatch();

  const state = useSelector((state) => state.GetCartItemReducer);

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
  const [cartItems, setCartItems] = useState("");
  const [usermodal, setUsermodal] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      phonenumber: "",
      password: "",
      repassword: "",
    },
  });

  const CategoryDataHandler = () => {
    dispatch(ACTIONS.getCategories([]));
  };

  useEffect(() => {
    if (state.noOfItemsInCart >= 0) {
      setCartItems(state.noOfItemsInCart);
    }
  }, [state.noOfItemsInCart]);

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
    toast.success("Logout successfully", {
      position: "bottom-right",
      autoClose: 2000,
    });
    window.location.replace("/");
  };

  const RegisterUser = (data) => {
    // setUsername(data.username);
    // setemail(data.email);
    // setPassword(data.password);
    // setRePassword(data.repassword);
    if (
      data.email &&
      data.password &&
      data.repassword &&
      data.username &&
      data.phonenumber &&
      data.password == data.repassword
    ) {
      fetch(`${baseUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
          phonenumber: data.phonenumber,
          email: data.email,
          role: "user",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success("Registered Successfully", {
            position: "bottom-right",
            autoClose: 2000,
          });
          window.location.reload();
        });
    }
  };
  const LoginUser = (e) => {
    e.preventDefault();
    if (username && password) {
      fetch(`${baseUrl}/api/auth/login`, {
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
            await localStorage.setItem("Userdata", JSON.stringify(res));
            await CartById();

            // history.push("/");

            window.location.reload();
            toast.success("Login successfully", {
              position: "bottom-right",
              autoClose: 2000,
            });
          } else if (
            res.role == "superAdmin" ||
            res.role == "Vendor" ||
            res.role == "Manager"
          ) {
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
              async (item) => {
                await cartfunction(item);
              }
            );
          }
        });
      // toast.success("Login successfull", {
      //   position: toast.POSITION.BOTTOM_RIGHT,
      //   autoClose: 5000,
      // });
    } else {
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
    await fetch(`${baseUrl}/api/category/all_category`)
      .then((res) => res.json())
      .then(async (data) => {
        setCategories(data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
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
  const searchData = (e) => {
    if (props.func) {
      props.func(e);
    }
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
        })

        .catch((err) => {
          console.log(err, "error");
        });
    }
  };
  const AddtoCart = async () => {
    //  debugger
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
        tabIndex="-1"
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
                {categories &&
                  categories.length > 0 &&
                  categories.map((el, ind) => (
                    <div className="accordion-item" key={ind}>
                      <h2 className="accordion-header" id="flush-headingOne">
                        <Link to={"/Subcategories/" + el._id}>
                          <div
                            className="d-flex align-items-center"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            {el.image && el.image.length > 0 ? (
                              <img
                                className="icons1"
                                src={`${baseUrl}/` + el.image[0].path}
                                alt=""
                              />
                            ) : (
                              ""
                            )}
                            <button
                              className="accordion-button collapsed button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseOne"
                              aria-expanded="false"
                              aria-controls="flush-collapseOne"
                              onClick={() => CategoryDataHandler()}
                            >
                              {el.name}
                            </button>
                          </div>
                        </Link>
                      </h2>
                    </div>
                  ))}
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
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <div className="row mt-0">
                  <div className="col-12">
                    <div className="nutra-logo-in-login-form">
                      <img
                        src="/static/media/new-logo.8b4fa066.png"
                        alt="nutrazik-logo"
                      />
                    </div>
                  </div>
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
                        <form
                          className="form-group col-lg-12"
                          onBlur={handleSubmit(RegisterUser)}
                        >
                          <div className="row mt-0">
                            <div className="col-6">
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
                                {errors?.username?.type === "required" && (
                                  <p className="text-danger">
                                    This field is required
                                  </p>
                                )}
                                {/* <input
                            type="text"
                            className="form-control "
                            
                            onChange={(e) => {
                              setUsername(e.target.value);
                            }}
                          /> */}
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="form-group ">
                                <label>
                                  Email<span>*</span>
                                </label>
                                <input
                                  type="email"
                                  className="form-control "
                                  {...register("email", {
                                    required: true,
                                    pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.com+$/,
                                  })}
                                />
                                {errors?.email?.type === "required" && (
                                  <p className="text-danger">
                                    This field is required
                                  </p>
                                )}
                                {errors?.email?.type === "pattern" && (
                                  <p className="text-danger">
                                    Please enter the valid Email
                                  </p>
                                )}
                                {/* <h5 className="Login-fail-msg">{regmsg}</h5> */}
                              </div>
                            </div>

                            <div className="col-6">
                              <div className="form-group">
                                <label>
                                  Password<span>*</span>
                                </label>
                                <input
                                  type="password"
                                  className="form-control "
                                  {...register("password", {
                                    required: true,
                                    pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                  })}
                                />
                                {errors?.password?.type === "required" && (
                                  <p className="text-danger">
                                    This field is required
                                  </p>
                                )}
                                {errors?.password?.type === "pattern" && (
                                  <p className="text-danger">
                                    Must have more than 8 characters, Must have
                                    atleast one number, Must have upper &
                                    lowercase letters, Must have atleast one
                                    special character.
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="form-group ">
                                <label>
                                  Confirm Password<span>*</span>
                                </label>
                                <input
                                  type="password"
                                  className="form-control "
                                  {...register("repassword", {
                                    required: true,
                                    validate: (val) => {
                                      if (watch("password") !== val) {
                                        return "Your Password Does not Match";
                                      }
                                    },
                                  })}
                                />
                                {errors?.repassword?.type === "required" && (
                                  <p className="text-danger">
                                    This field is required
                                  </p>
                                )}
                                {errors?.repassword?.type === "validate" && (
                                  <p className="text-danger">
                                    Password does not match
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="form-group ">
                                <label>
                                  Phone Number<span>*</span>
                                </label>
                                <input
                                  type="number"
                                  className="form-control "
                                  {...register("phonenumber", {
                                    required: true,
                                  })}
                                />
                                {errors?.phonenumber?.type === "required" && (
                                  <p className="text-danger">
                                    This field is required
                                  </p>
                                )}
                                {/* <h5 className="Login-fail-msg">{regmsg}</h5> */}
                              </div>
                            </div>
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
                          <span>
                            <p className="mt-3">Forgot Password?</p>
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <MdOutlineClose className="login-register-close-icon" />
              </div>
            </div>
          </div>
        </div>
        {/* End login register Modal  */}
        {/* Logo div */}
        <div className="row mt-0 top-header-padding">
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
          {/* Search Box Code */}
          <div className="col-sm-3">
            <div className="login-div2">
              <input
                type="text"
                className="my-input-field"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchData(search);
                    history.push("/SearchResult/" + search);
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
          {/* End Of search Code */}
          {/* Start Login/Register div */}
          <div className="col-sm-2">
            <div className="row login-div mt-4">
              <div className="col-sm-1">
                <div className="option-item">
                  <div className="cart-btn">
                    {Userdata == null ? (
                      <>
                        <span
                          className="sp"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          style={{ cursor: "pointer" }}
                        >
                          <i className="user-icon bx bx-user"></i>
                        </span>
                        <br />
                        <span
                          className="Sp1 mt-5"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          style={{ cursor: "pointer" }}
                        ></span>
                      </>
                    ) : (
                      <>
                        <i className="user-icon bx bx-user"></i>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-sm-8 user-login">
                {Userdata == null ? (
                  <>
                    {/* <span
                      className="sp pl-2"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      style={{ cursor: "pointer" }}
                    >
                      Account
                    </span> */}
                    <br />
                    <span
                      className="Sp1"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      style={{ cursor: "pointer" }}
                    >
                      Login/Register
                    </span>
                  </>
                ) : (
                  <>
                    {/* <span className="sp" style={{ cursor: "pointer" }}>
                      Account
                    </span> */}
                    {/* <br /> */}
                    <div className="dropdown">
                      <button
                        className="btn btn-white btn-sm dropdown-toggle user-dropdown-btn"
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
                        <div>
                          <div className="Logout-div d-flex align-items-center">
                            <i className="bx bx-file pl-2"></i>{" "}
                            <li
                              className="dropdown-item Logout-li"
                              style={{ cursor: "pointer" }}
                            >
                              <Link to="/UserOrder">
                                <span className="pr-4">Orders</span>
                              </Link>
                            </li>
                          </div>
                        </div>
                        <Link to="/Cart">
                          <div className="Logout-div d-flex align-items-center">
                            <i className="bx bx-cart pl-2"></i>{" "}
                            <li
                              className="dropdown-item Logout-li"
                              style={{ cursor: "pointer" }}
                            >
                              <span className="pr-4">Cart</span>
                              {/* <span className="text-danger">item</span> */}
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

                <div className="col-8 user-login">
                  {cartItems ? <h6 className="Total-Item">{cartItems}</h6> : ""}
                  <span className="sp">Cart</span>
                  <br />
                  {/* <span className="Sp1">₹ 0.0</span> */}
                </div>
              </div>
            </Link>
          </div>
          {/* Cart div End */}
          {/* Start Wishlidt div */}
          <div className="col-sm-2">
            <Link to="/WishList">
              <div className="row justify-content-center mt-4">
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
                  {/* <br />
                  <span className="Sp1">Edit your wishlist</span> */}
                </div>
              </div>
            </Link>
          </div>
          {/* End Wishlist div */}
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
          <div className="col-2 drop-category">
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
                        tabIndex="-1"
                        aria-disabled="true"
                      >
                        Contact
                      </Link>
                    </li>
                    <Link to={"/Blogs"}>
                      <li className="nav-item">
                        <a
                          className="nav-link nav-heading"
                          href="#"
                          tabIndex="-1"
                          aria-disabled="true"
                        >
                          Blog
                        </a>
                      </li>
                    </Link>
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
                className="my-input-field"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
                onKeyDown={(e) => {
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
      <ToastContainer />
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
                    <li key={ind}>
                      <Link
                        className="dropdown-item"
                        to={"/categories/" + el._id}
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
                    <li key={ind}>
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
