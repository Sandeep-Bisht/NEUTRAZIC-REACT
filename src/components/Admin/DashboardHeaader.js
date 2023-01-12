import React, { useEffect } from "react";
import UserImg from "../../Images/user3.jpg";

var Userdata = " ";

function DashboardHeaader() {


  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
  });

  return (
    <>
        <div className="nav__logo">
        <div>
          <a href="/" style={{ cursor: "pointer" }}>
            <img
              src={require("../../Images/new-logo.png")}
              className="dashboard-logo"
              alt="image"
            />
          </a>
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