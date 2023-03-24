import React, { useEffect,useState } from "react";
import UserImg from "../../Images/user3.jpg";
import {Link} from "react-router-dom"
import { useContext } from "react";
import CurrencyContext from "../../routes/ContextApi/CurrencyContext";

var Userdata = " ";

function DashboardHeaader() {
  // const {loginState,setLoginState} = useContext(CurrencyContext);
  // const [isLogin,setIsLogin] = useState(loginState)
  
  // useEffect(()=>{
  // setLoginState(loginState)
  // setIsLogin(loginState)
  // },[loginState])
  

  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
  },[]);

  return (
    <>
        <div className="nav__logo">
        <div>
          <Link to="/" style={{ cursor: "pointer" }}>
            <img
              src={require("../../Images/new-logo.png")}
              className="dashboard-logo"
              alt="image"
            />
          </Link>
        </div>
        <div className="d-flex align-items-center">
          <img
            src={UserImg}
            alt="user_image"
            className="img-fluid dashboard-user"
          />
          <p className="user-name">{Userdata.username}</p>
        </div>
      </div>
    </>
  )
}

export default DashboardHeaader