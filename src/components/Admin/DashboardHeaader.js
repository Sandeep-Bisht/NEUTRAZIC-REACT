import React, { useEffect,useState } from "react";
import UserImg from "../../Images/user3.jpg";
import {Link} from "react-router-dom"

var Userdata = " ";

function DashboardHeaader() {
useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
  },[]);

  return (
    <>
        <div className="nav__logo">
        <div className="nav__logo__img">
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