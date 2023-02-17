import React, { useEffect, useState } from "react";
import "./Register.css";
import useLogin from "../../state/auth/hooks/useLogin";
import { Login } from "../../state/auth/queries";
import Header1 from "../Header1";
import Footer from "../Footer";
import { useHistory } from "react-router";
import { baseUrl } from '../../utils/services';

var Userdata = "";
const Register = (props) => {
  const history = useHistory();
  const [email, setemail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
 
  const [regmsg, setRegMsg] = useState("");
  const [msg, setMsg] = useState("");
  let [userCart, setUserCart] = useState([]);
  const [order, Setorder] = useState([]);

  // useEffect(() => {
  //     Userdata = JSON.parse(localStorage.getItem("Userdata"));

  //   }, [])

  const RegisterUser = () => {
    if (
      username != null &&
      password != null &&
      email != null &&
      password == repassword
    ) {
      fetch(`${baseUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
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

  function openRegister() {
    document.getElementById("card").style.transform = "rotateY(-180deg)";
  }
  function openLogin() {
    document.getElementById("card").style.transform = "rotateY(0deg)";
  }
  const LoginUser = (e) => {
    e.preventDefault();
    if (username != "" && password != "") {
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
            window.location.reload();
             history.push("/");
          } else if (
            res.role == "superAdmin" ||
            res.role == "Vendor" ||
            res.role == "Manager"
          ) {
            await localStorage.setItem("Userdata", JSON.stringify(res));
            await localStorage.setItem("Userdata1", JSON.stringify(res.role));
            window.location.reload();
            history.push("/Dashboard");
          } 
          else if (Userdata == undefined) {
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

  useEffect(() => {
    //loadSignup();
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
  }, []);
  return (
    <>
      <Header1 />
      <div className="justify-content-center align-items-center d-flex mt-4 mb-4">
        <div className="conatiner Register-container login-reg-form">
          <div className="card Register-card">
            <div className="inner-box" id="card">
              <div className="card-front">
                <h2>LOGIN</h2>
                <form>
                  <input
                    type="text"
                    className="input-box"
                    placeholder="Username"
                    required
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                  <input
                    type="password"
                    className="input-box"
                    placeholder="Password"
                    required
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <h5 className="Login-fail-msg">{msg}</h5>
                  <button
                    type="submit"
                    className="submit-btn"
                    onClick={(e) => {
                      LoginUser(e);
                    }}
                  >
                    Submit
                  </button>
                  <input type="checkbox" />
                  <span>Remember Me</span>
                </form>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    openRegister();
                  }}
                >
                  I'm New Here
                </button>
                <a href="#">Forget Password</a>
              </div>
              <div className="card-back">
                <h2>SIGNUP</h2>
                <form action="">
                  <input
                    type="text"
                    className="input-box"
                    placeholder="Jhon"
                    required
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                  <input
                    type="email"
                    className="input-box"
                    placeholder="example@mail.com"
                    required
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                  />
                  <input
                    type="password"
                    className="input-box"
                    placeholder="Password"
                    required
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <input
                    type="password"
                    className="input-box"
                    placeholder="Re Enter Password"
                    required
                    onChange={(e) => {
                      setRePassword(e.target.value);
                    }}
                  />
                  <h5 className="Login-fail-msg">{regmsg}</h5>
                  <button
                    type="submit"
                    className="submit-btn"
                    onClick={(e) => {
                      RegisterUser(e);
                    }}
                  >
                    Submit
                  </button>
                  <input type="checkbox" />
                  <span>Remember Me</span>
                </form>
                <button
                  type="button"
                  className="btn1"
                  onClick={() => {
                    openLogin();
                  }}
                >
                  I've an account
                </button>
                <a href="#">Forget Password</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Register;
