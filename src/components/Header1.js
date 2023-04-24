import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import "../components/Header1.css";
import "../components/Carouselcomp";
import $ from "jquery";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import { baseUrl } from "../utils/services";
import * as ACTIONS from "../CommonService/CategoriesbyID/action";
import * as ACTIONS1 from "../CommonService/WishlistItem/action";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { useContext } from "react";
import CurrencyContext from "../routes/ContextApi/CurrencyContext";
import { BiCategoryAlt } from "react-icons/bi";

let changeNavValue = 0;
var header;
var sticky;
var Userdata = "";

const errorEmail = "Please Enter a valid Email Address";

// var userCart=[]
const Header1 = (props) => {
  let dispatch = useDispatch();
  let { state1, setState1 } = useContext(CurrencyContext);

  const state = useSelector((state) => state.GetCartItemReducer);
  const wishListstate = useSelector((state) => state.GetWishlistedReducer);

  const history = useHistory();
  const [search, setSearch] = useState("");
  const [subcategories, setSubCategories] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let [userCart, setUserCart] = useState([]);
  const [order, Setorder] = useState([]);
  const [msg, setMsg] = useState("");
  const [regmsg, setRegMsg] = useState("");
  const [categories, setCategories] = useState([]);
  const [registerModal, setRegisterModal] = useState(false);
  const [cartItems, setCartItems] = useState("");
  const [wishlisted, setWishlisted] = useState("");
  const [usermodal, setUsermodal] = useState();
  const [currancy, setCurrency] = useState("INR");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const cookies = new Cookies();
  const location = useLocation();
  const { loginState, setLoginState } = useContext(CurrencyContext);
  let { resetForm,setResetForm } = useContext(CurrencyContext);
  const [isLogin, setIsLogin] = useState(loginState);
  const [loginModal, setLoginModal] = useState(false);
  const [forgetModal, setForgetModal] = useState(false);
  const [forgetSecondModal, setForgetSecondModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userdata, setUserdata] = useState();
  const [forgetMsg, setForgetMsg] = useState("");

  useEffect(() => {
    setLoginState(loginState);
    setIsLogin(loginState);
  }, [loginState]);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      phonenumber: "",
      password: "",
      repassword: "",
    },
    mode: "onBlur",
  });

  const {
    register: register2,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: reset1,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onBlur",
  });
  const {
    register: register3,
    handleSubmit: handleForgetSubmit,
    formState: { errors: forgetErrors },
    reset: reset3,
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
  });
  const {
    register: register4,
    handleSubmit: handleForgetSecondSubmit,
    formState: { errors: forgetSecondErrors },
    reset: reset4,
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
  });

  const CategoryDataHandler = () => {
    dispatch(ACTIONS.getCategories([]));
  };

  useEffect(()=>{
    if(resetForm===0 || resetForm===1)
    {
      reset1();
    }
  },[resetForm])

  useEffect(() => {
    if (state.noOfItemsInCart >= 0) {
      setCartItems(state.noOfItemsInCart);
    }
  }, [state.noOfItemsInCart]);
  useEffect(() => {
    if (wishListstate.noOfItemsInwishlist >= 0) {
      setWishlisted(wishListstate.noOfItemsInwishlist);
    }
  }, [wishListstate.noOfItemsInwishlist]);

  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    GetCategory();
    GetWishlist();
    GetSubCategory();
    CartById();
    $(document).ready(function() {
      header = document.getElementById("myHeader");
      sticky = header.offsetTop;
      window.onscroll = function() {
        // headerFunction();
      };
      $(".arrow").click(function() {
        $(".sublist").slideUp();
      });
    });
  }, [loginState]);

  useEffect(() => {
    const currentCurrency = cookies.get("CurrencyType");
    if (currentCurrency === "Dollar") {
      setCurrency("Dollar");
      setState1("1");
    }
  }, [currancy]); 

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
        if (data.data[0] !== undefined) {
          setWishlisted(data.data.length);
          const wishlisted = data.data.length;
          dispatch(ACTIONS1.getwishlistitem(wishlisted));
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  const currencyHandler = (e) => {
    setCurrency(e.target.value);
    if (currancy === "INR") {
      setState1("1");
    } else {
      setState1("0");
    }

    cookies.set("CurrencyType", e.target.value, { path: "/" });
  };
  useEffect(() => {
    if (Userdata === null) {
      setLoginState("0");
      setCartItems("");
      setWishlisted("");
    }
    setLoginState("1");
  }, [loginState]);

  const logout = () => {
    localStorage.setItem("Userdata", null);
    toast.success("Logout successfully", {
      position: "bottom-right",
      autoClose: 2000,
    });
    reset();
    setLoginState("0");
    setCartItems("");
    setWishlisted("");
  };

  const RegisterUser = (data) => {
    if (
      data.email &&
      data.password &&
      data.repassword &&
      data.username &&
      data.phonenumber &&
      data.password == data.repassword
    ) {
      let username = data.username.toLowerCase();
      data.role = "superAdmin";
      data.userStatus = "Activate";
      fetch(`${baseUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: data.password,
          phonenumber: data.phonenumber,
          email: data.email,
          role: data.role,
          userStatus: data.userStatus,
        }),
      })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            reset1();
            return res.json();
          }
          // throw new Error(res.status);
          else if (res.status === 400) {
          }
        })
        .then((data) => {
          if (data) {
            toast.success("Registered Successfully", {
              position: "bottom-right",
              autoClose: 2000,
            });
            reset();
            setRegisterModal(false);
            setLoginModal(true);
            setRegMsg("");
          } else {
            setRegMsg("Username is already exist");
          }
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
        });
    }
  };
  const LoginUser = (data) => {
    if (data.username && data.password) {
      fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      })
        .then((res) => res.json())
        .then(async (res) => {
          setLoginState("1");
          if (res && res.userStatus && res.userStatus === "Activate") {
            if (res && res.role === "user") {
              Userdata = res;
              await localStorage.setItem("Userdata", JSON.stringify(res));
              await CartById();
              $("#loginModalCloseBtn").click();

              reset();
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
              await CartById();
              $("#loginModalCloseBtn").click();
              history.push("/Dashboard");
            } else if (res.success === 403) {
              setMsg(res.error);
            }
          } else if (res.success === 403) {
            setMsg(res.error);
          } else {
            setMsg(res.error);
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

        await UpdateCart();
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
          setCartItems(data.data[0].order.length);
        })

        .catch((err) => {
          console.log(err, "error");
        });
    }
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
          history.push("/Cart");
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
        history.push("/Cart");
      })
      .then((err) => console.log(err));
  };
  const forgetHandler = () => {
    reset3();
    setForgetModal(true);
  };
  const forgetPassword = async (data) => {
    await GetUserData(data);
  };
  const forgetSecondPassword = (data) => {
    setForgetModal(false);
    setIsModalVisible(false);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setLoginModal(false);
    setForgetModal(false);
  };
  const GetUserData = async (userEmail) => {
    const currentEmail = userEmail.email;
    try {
      const res = await fetch(`${baseUrl}/api/auth/allusers`);
      const data = await res.json();
      const filteredEmail = data.data.map((item) => item.email);
      const filteredNewEmail = filteredEmail.filter((item) => {
        return item === currentEmail;
      });
      if (filteredNewEmail.length > 0) {
        setIsModalVisible(true);
        $("#loginModalCloseBtn").click();
      } else {
        setForgetMsg("This Email is not registered yet");
      }
    } catch (err) {
      console.log(err, "error");
    }
  };
 
  return (
    <>
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
        {forgetModal === false ? (
          <div
            className="modal fade login-register-main"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content login-register-modal">
                <div className="modal-body">
                  <button
                    type="button"
                    id="loginModalCloseBtn"
                    className="d-none"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
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
                          setLoginModal(true);
                          reset1();
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
                          setLoginModal(false);
                          reset();
                          setMsg("");
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
                            onSubmit={handleSubmit(RegisterUser)}
                          >
                            <div className="row mt-0 start-register-form">
                              <div className="col-md-6 col-12">
                                <div className="form-group">
                                  <label>
                                    Username<span>*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control form-control-login"
                                    {...register("username", {
                                      required: true,
                                      pattern: /^[^\s]+$/,
                                    })}
                                    onChange={(event) =>
                                      (event.target.value = event.target.value.toLowerCase())
                                    }
                                  />
                                  {errors?.username?.type === "required" && (
                                    <p className="text-danger">
                                      This field is required
                                    </p>
                                  )}
                                  {errors?.username?.type === "pattern" && (
                                    <p className="text-danger">
                                      Username does not contain space
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-6 col-12">
                                <div className="form-group ">
                                  <label>
                                    Email<span>*</span>
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control form-control-login "
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
                                      Please enter a valid Email
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-6 col-12">
                                <div className="form-group">
                                  <label>
                                    Password<span>*</span>
                                  </label>
                                  <input
                                    type="password"
                                    className="form-control form-control-login "
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
                                      Must have more than 8 characters, Must
                                      have atleast one number, Must have upper &
                                      lowercase letters, Must have atleast one
                                      special character.
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-6 col-12">
                                <div className="form-group ">
                                  <label>
                                    Confirm Password<span>*</span>
                                  </label>
                                  <input
                                    type="password"
                                    className="form-control form-control-login "
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
                              <div className="col-md-6 col-12">
                                <div className="form-group ">
                                  <label>
                                    Phone Number<span>*</span>
                                  </label>
                                  <input
                                    type="number"
                                    className="form-control form-control-login "
                                    {...register("phonenumber", {
                                      required: true,
                                    })}
                                    onInput={(e) => {
                                      if (
                                        e.target.value.length >
                                        e.target.maxLength
                                      )
                                        e.target.value = e.target.value.slice(
                                          0,
                                          e.target.maxLength
                                        );
                                    }}
                                    maxlength={10}
                                  />
                                  {errors?.phonenumber?.type === "required" && (
                                    <p className="text-danger">
                                      This field is required
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <h5 className="Login-fail-msg">{regmsg}</h5>
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
                          <form
                            className="form-group col-lg-12"
                            onSubmit={handleLoginSubmit(LoginUser)}
                          >
                            <div className="row mt-0 start-login-form">
                              <div className="col-md-12 col-12">
                                <div className="form-group">
                                  <label>
                                    Username<span>*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control form-control-login"
                                    {...register2("username", {
                                      required: true,
                                    })}
                                  />
                                  {loginErrors?.username?.type ===
                                    "required" && (
                                    <p className="text-danger">
                                      This field is required
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-12 col-12">
                                <div className="form-group">
                                  <label>
                                    Password<span>*</span>
                                  </label>
                                  <input
                                    type="password"
                                    className="form-control form-control-login "
                                    {...register2("password", {
                                      required: true,
                                    })}
                                  />
                                  {loginErrors?.password?.type ===
                                    "required" && (
                                    <p className="text-danger">
                                      This field is required
                                    </p>
                                  )}
                                </div>
                              </div>
                              <h5 className="Login-fail-msg">{msg}</h5>
                              <div className="form-group col-lg-12 justify-content-center">
                                <button
                                  className="btn btn-success btn-lg"
                                  type="submit"
                                >
                                  Login
                                </button>
                                <span
                                  style={{ cursor: "pointer" }}
                                  onClick={() => forgetHandler()}
                                >
                                  <p className="mt-3">Forgot Password?</p>
                                </span>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>
                  <MdOutlineClose className="login-register-close-icon" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            class="modal"
            tabindex="-1"
            id="exampleModalToggle"
            aria-hidden="true"
            aria-labelledby="exampleModalToggleLabel2"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-body">
                  <button
                    type="button"
                    id="loginModalCloseBtn"
                    className="d-none"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <div className="nutra-logo-in-login-form">
                    <img
                      src="/static/media/new-logo.8b4fa066.png"
                      alt="nutrazik-logo"
                    />
                  </div>
                  <div className="col-lg-12 forgetContentDiv">
                    <div className="form-row">
                      <form
                        className="form-group col-lg-12"
                        onSubmit={handleForgetSubmit(forgetPassword)}
                      >
                        <div className="row mt-0 start-login-form">
                          <div className="col-md-12 col-12">
                            <div className="form-group ">
                              <label>
                                Email<span>*</span>
                              </label>
                              <input
                                type="email"
                                className="form-control form-control-login "
                                {...register3("email", {
                                  required: true,
                                  pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.com+$/,
                                })}
                              />
                              {forgetErrors?.email?.type === "required" && (
                                <p className="text-danger">
                                  This field is required
                                </p>
                              )}
                              {forgetErrors?.email?.type === "pattern" && (
                                <p className="text-danger">
                                  Please enter the valid Email
                                </p>
                              )}
                            </div>
                            <p className="text-danger">{forgetMsg}</p>
                          </div>
                          <h5 className="Login-fail-msg">{msg}</h5>
                          <div className="form-group col-lg-12 justify-content-center">
                            <button
                              className="btn btn-success btn-lg"
                              type="submit"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {isModalVisible ? (
          <Modal
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <div className="nutra-logo-in-login-form">
              <img
                src="/static/media/new-logo.8b4fa066.png"
                alt="nutrazik-logo"
              />
            </div>
            <div className="col-lg-12 forgetContentDiv">
              <div className="form-row">
                <form
                  className="form-group col-lg-12"
                  onSubmit={handleForgetSecondSubmit(forgetSecondPassword)}
                >
                  <div className="row mt-0 start-login-form">
                    <div className="col-12">
                      <div className="form-group">
                        <label>
                          New Password<span>*</span>
                        </label>
                        <input
                          type="password"
                          className="form-control form-control-login "
                          {...register("password", {
                            required: true,
                            pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                          })}
                        />
                        {errors?.password?.type === "required" && (
                          <p className="text-danger">This field is required</p>
                        )}
                        {errors?.password?.type === "pattern" && (
                          <p className="text-danger">
                            Must have more than 8 characters, Must have atleast
                            one number, Must have upper & lowercase letters,
                            Must have atleast one special character.
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group ">
                        <label>
                          Confirm Password<span>*</span>
                        </label>
                        <input
                          type="password"
                          className="form-control form-control-login "
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
                          <p className="text-danger">This field is required</p>
                        )}
                        {errors?.repassword?.type === "validate" && (
                          <p className="text-danger">Password does not match</p>
                        )}
                      </div>
                    </div>
                    <h5 className="Login-fail-msg">{msg}</h5>
                    <div className="form-group col-lg-12 justify-content-center">
                      <button className="btn btn-success btn-lg" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Modal>
        ) : (
          ""
        )}
        <div className="newheader">
          <div className="row mt-0 top-header-padding">
            <div className="col-md-12">
              <div className="heaader-wrapper">
                <div className="header-wrapper-left">
                  <div className=" logo-main-div">
                    <Link className="navbar-brand" to="/">
                      <img
                        src={require("../Images/new-logo.png")}
                        alt="logo"
                        className="logo2"
                      />
                    </Link>
                  </div>

                  <div className=" main-navbar-head ">
                    <div className="login-div2">
                      <input
                        type="text"
                        className="my-input-field"
                        placeholder="Search..."
                        onChange={(e) =>
                          setSearch(e.target.value.toLowerCase())
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && search.length) {
                            searchData(search);
                            history.push("/SearchResult/" + search);
                          }
                        }}
                      />
                      {/* <Link to={"/SearchResult/" + search}> */}
                        <button
                          className="search mr-1"
                          onClick={() => {
                            if (search.length) {
                              searchData(search);
                              history.push("/SearchResult/" + search);
                            }
                          }}
                        >
                          <i className="bx bx-search-alt"></i>
                        </button>
                      {/* </Link> */}
                    </div>
                  </div>
                </div>
                <div className="header-wrapper-right">
                  <div className="right-part">
                    <div className="d-flex align-items-center currancy">
                      <select
                        onChange={(e) => currencyHandler(e)}
                        value={currancy}
                      >
                        <option value="INR">INR</option>
                        <option value="Dollar">Dollar</option>
                      </select>
                    </div>
                  </div>
                  <div className="left-part">
                    <div className="cart-div">
                      <Link to="/cart">
                        <div className=" login-div1">
                          <div className="">
                            <div className="option-item">
                              <div className="cart-btn">
                                <i className="bx bx-cart"></i>
                              </div>
                            </div>
                          </div>
                          <div className=" user-login">
                            {cartItems ? (
                              <h6 className="Total-Item">{cartItems}</h6>
                            ) : (
                              ""
                            )}
                            <span className="sp">Cart</span>
                            <br />
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className=" heart-div ">
                      <Link to="/WishList">
                        <div className="  heart-div-inner">
                          <div className="">
                            <div className="option-item">
                              <div className="cart-btn">
                                {wishlisted ? <h6>{wishlisted}</h6> : ""}
                                <i className="bx bx-heart"></i>
                              </div>
                            </div>
                          </div>
                          <div className=" user-login">
                            <span className="sp">Wishlist</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="  account-div ">
                      <div className=" login-div ">
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
                                  <i className="user-icon bx bx-log-in"></i>
                                </span>

                                <span
                                  className="Sp1 "
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                  style={{ cursor: "pointer" }}
                                ></span>
                              </>
                            ) : (
                              <>
                                <i className="user-icon bx bx-user-pin"></i>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className=" user-login">
                        {Userdata == null ? (
                          <>
                            <span
                              className="Sp1"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                reset1();
                                setMsg("");
                              }}
                            >
                              Login/Register
                            </span>
                          </>
                        ) : (
                          <>
                            <div className="dropdown">
                              <button
                                className="btn btn-white btn-sm login-btn dropdown-toggle user-dropdown-btn"
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
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid main-nav px-0">
            <div className="row mt-0" id="myHeader">
              <div
                className="col-lg-2  col-1 drop-category Browse-Category"
                data-bs-toggle="modal"
                data-bs-target="#myModal"
              >
                <div>
                  <div className="category ">
                    <BiCategoryAlt></BiCategoryAlt>
                  </div>
                  <div className="category">
                    <span className="category-head">Browse Categories</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-10 col-11 p-0">
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
                          <Link
                            className="nav-link nav-heading"
                            to="/AllProducts"
                          >
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
                      <span className="contact">+91-7500872014</span>
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
        </div>
      </div>

      <ToastContainer />
    </>
  );
};
export default React.memo(Header1);
