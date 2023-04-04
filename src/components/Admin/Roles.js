import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import DashboardHeaader from "./DashboardHeaader";
import { baseUrl } from "../../utils/services";
import "../.././views/landing/homepage.css";
import Sidemenu from "./Sidemenu";
import $ from "jquery";

let changeNavValue = 0;
var header;
var sticky;
var Userdata = "";
const Roles = (props) => {
  const history = useHistory();
  const [email, setemail] = useState("");
  const [username, setUsername] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [manufactureres, setManufactureres] = useState([]);
  const [role, setRole] = useState("");
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [organization, setOrganization] = useState("");
  const [registerModal, setRegisterModal] = useState(false);
  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));

    GetUser();
    GetManufacturer();
  }, []);
  const GetUser = async () => {
    await fetch(`${baseUrl}/api/auth/allusers`)
      .then((res) => res.json())
      .then(async (data) => {
        setUsers(data.data);
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };

  const GetManufacturer = async () => {
    await fetch(`${baseUrl}/api/manufacture/all_manufacture`)
      .then((res) => res.json())
      .then(async (data) => {
        setManufactureres(data.data);
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };

  const RegisterUser = () => {
    fetch(`${baseUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        phonenumber: phonenumber,
        email: email,
        role: role,
        organization: organization,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        window.location.reload();
      });
  };



  const data1 = [];
  {
    users.map((item, index) => {
      data1.push({
        sr_no: index + 1,
        name: item.username,
        Email: item.email,
        company: item.organization,
        Role: (
          <select defaultValue={item.role} className="form-control">
            <option value={item.role}>{item.role}</option>
            <option>Admin</option>
            <option>Manager</option>
            <option>User</option>
          </select>
        ),
        Action: (
          <>
            <button className="btnbtn-danger">
              <i className="bx bx-trash"></i>
            </button>
            <button className="ml-2 btnbtn-danger">
              <i className="bx bx-edit"></i>
            </button>
          </>
        ),
      });
    });
  }

  return (
    <>
      <section id="body-pd">
        <div className="container-fluid">
          <DashboardHeaader />

          <div className="row px-0 dashboard-container">
            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-4  sidebar-dashboard">
              <Sidemenu />
            </div>
            <div className="col-xl-10 col-lg-9 col-md-9 col-sm-8 col-8">
              {/* login Register Modal  */}
              <div className="form-row de-flex items-align-center justify-content-center">
                <div className="container justify-content-center align-items-center d-flex pt-4 m-auto">
                  <div className="col-10 mx-auto dashboardroles-register-form-wrap">
                    <div className="form-group col-6">
                      <img src={require("../../Images/woman-laptop.jpg")} />
                    </div>
                    <div className="form-group col-6">
                      <div className="form-group col-lg-12 p-1  form-floating">
                        <input
                          type="text"
                          id="floatingform"
                          className="form-control input-text "
                          placeholder="Username*"
                          required
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                        />
                        <label htmlFor="floatingform">Username*</label>
                      </div>
                      <div className="form-group col-lg-12 p-1  form-floating">
                        <input
                          type="text"
                          id="floatingform"
                          className="form-control input-text"
                          placeholder="Phone Number*"
                          required
                          onChange={(e) => {
                            setPhonenumber(e.target.value);
                          }}
                        />
                        <label htmlFor="floatingform">Phone Number*</label>
                      </div>
                      <div className="form-group col-lg-12 p-1 form-floating">
                        <input
                          type="email"
                          id="floatingform"
                          className="form-control input-text"
                          placeholder="Email*"
                          required
                          onChange={(e) => {
                            setemail(e.target.value);
                          }}
                        />
                        <label htmlFor="floatingform">Email*</label>
                      </div>
                      <div className="form-group col-lg-12 p-1 form-floating">
                        <input
                          className="form-control input-text"
                          id="formfloating"
                          placeholder="Password*"
                          required
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                        <label htmlFor="formfloating">Password*</label>
                      </div>
                      <div className="form-group col-lg-12 p-1 form-floating">
                        <input
                          className="form-control input-text"
                          id="formfloating"
                          placeholder="Confirm Password*"
                          required
                        />
                        <label htmlFor="formfloating">Confirm Password*</label>
                      </div>
                      {Userdata != undefined &&
                        Userdata.role == "superAdmin" ? (
                        <div className="form-group col-lg-12 p-1">
                          <select
                            className="form-control custom-select"
                            onChange={(e) => {
                              setRole(e.target.value);
                            }}
                          >
                            <option>Select User Role From Here</option>
                            <option defaultValue="Manager">Manager</option>
                            <option defaultValue="Vendor">Vendor</option>
                            <option defaultValue="user">User</option>:null
                          </select>
                        </div>
                      ) : Userdata.role == "Manager" ? (
                        <div className="form-group col-lg-12 p-1">

                          <select
                            className="form-control"
                            onChange={(e) => {
                              setRole(e.target.value);
                            }}
                          >
                            <option>Select User Role From Here</option>
                            <option defaultValue="Vendor">Vendor</option>
                            <option defaultValue="user">User</option>:null
                          </select>
                        </div>
                      ) : null}
                      <div className="form-group col-lg-12 p-1">
                        <button
                          className="btn btn-registration btn-lg"
                          onClick={(e) => {
                            RegisterUser(e);
                          }}
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Roles;
