import React, { useState, useEffect } from "react";
import DashboardHeaader from "./DashboardHeaader";
import { baseUrl } from "../../utils/services";
import "../.././views/landing/homepage.css";
import Sidemenu from "./Sidemenu";

var Userdata = "";
const Roles = (props) => {
  const [email, setemail] = useState("");
  const [username, setUsername] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [manufactureres, setManufactureres] = useState([]);
  const [manufacturer,setManufacturer]=useState([]);
  const [users, setUsers] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [data,setData]=useState({
    email:"",
    username:"",
    phonenumber:"",
    password:"",
    manufacturer:"",
    cpassword:"",
    role:"",
  })
  var userStatus="Activate";
  const [organization, setOrganization] = useState("");
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

  var pattern= /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.com+$/;
  const validateForm = (Value) => {
    const error = {};
    if (!Value.username) {
      error.username = "This field is required";
    }
    if (!Value.email) {
      error.email = "This field is required";
    } else if (!pattern.test(Value.email)) {
      error.email = "Please enter a valid email";
    }
    if (!Value.password) {
      error.password = "This field is required";
    }
    if (!Value.cpassword) {
      error.cpassword = "This field is required";
    }
    if (!Value.manufacturer) {
      error.manufacturer = "This field is required";
    }
    if (!Value.role) {
      error.role = "This field is required";
    }
    if (!Value.phonenumber) {
      error.phonenumber = "This field is required";
    }else if(Value.phonenumber.length < 10) {
      error.phonenumber = "Please enter valid phonenumber";
    }
    return error;
  };
console.log(data.phonenumber.length,"length");
  const RegisterUser = async(e) => {
    e.preventDefault();
    const errors = validateForm(data);
    setFormErrors(errors);
    await fetch(`${baseUrl}/api/auth/register`, {
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
        role: data.role,
        manufacturer:data.manufacturer,
        userStatus:userStatus,
        organization: organization,
      }),
    })
      .then((res) => {
        res.json();
        if(res.success==200)
        {
          setData({
            email:"",
            username:"",
            phonenumber:"",
            password:"",
            manufacturer:"",
            role:"",
          })
        }
      });  
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value
    });
    setFormErrors({
      ...formErrors,
      [name]: '' // clear error message for the current input field
    });
  };
  const handleBlur = (event) => {
    const { name, value } = event.target;
    const errors = { ...formErrors };
  
    // Validate the input field on blur
    if (!value) {
      errors[name] = "This field is required";
    } else if (name === "phonenumber" && value.length < 10) {
      errors[name] = "Please enter a valid phone number";
    } else if (name === "email" && !pattern.test(value)) {
      errors[name] = "Please enter a valid email";
    } else if (name === "cpassword" && value !== data.password) {
      errors[name] = "Password does not match";
    }else {
      errors[name] = ""; // clear error message for the current input field
    }
    
    setFormErrors(errors);
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
                          name="username"
                          value={data.username}
                          className="form-control input-text "
                          placeholder="Username*"
                          required
                          onChange={(e) => {
                            setData({...data,username:e.target.value});
                            handleInputChange(e);
                          }}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="floatingform">Username*</label>
                        <div>
                            <p className="formerror">{formErrors.username}</p>
                          </div>
                      </div>
                      
                      <div className="form-group col-lg-12 p-1  form-floating">
                        <input
                          type="number"
                          id="floatingform"
                          name="phonenumber"
                          value={data.phonenumber}
                          className="form-control input-text"
                          placeholder="Phone Number*"
                          required
                          onChange={(e) => {
                            setData({...data, phonenumber:e.target.value});
                            handleInputChange(e);
                          }}
                          onBlur={handleBlur}
                          onInput={(e) => {
                            if (
                              e.target.value.length > e.target.maxLength
                            )
                              e.target.value = e.target.value.slice(
                                0,
                                e.target.maxLength
                              );
                          }}
                          maxlength={10}
                        />
                        <label htmlFor="floatingform">Phone Number*</label>
                        <div>
                            <p className="formerror">{formErrors.phonenumber}</p>
                          </div>
                      </div>
                      
                      <div className="form-group col-lg-12 p-1 form-floating">
                        <input
                          type="email"
                          id="floatingform"
                          name="email"
                          value={data.email}
                          className="form-control input-text"
                          placeholder="Email*"
                          required
                          onChange={(e) => {
                            setData({...data,email:e.target.value});
                            handleInputChange(e);
                          }}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="floatingform">Email*</label>
                        <div>
                            <p className="formerror">{formErrors.email}</p>
                          </div>
                      </div>
                      
                      <div className="form-group col-lg-12 p-1 form-floating">
                        <input
                          className="form-control input-text"
                          id="formfloating"
                          type="password"
                          placeholder="Password*"
                          name="password"
                          value={data.password}
                          required
                          onChange={(e) => {
                            setData({...data,password:e.target.value});
                            handleInputChange(e);
                          }}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="formfloating">Password*</label>
                        <div>
                            <p className="formerror">{formErrors.password}</p>
                          </div>
                      </div>
                      
                      <div className="form-group col-lg-12 p-1 form-floating">
                        <input
                          className="form-control input-text"
                          id="formfloating"
                          type="password"
                          name="cpassword"
                          value={data.cpassword}
                          placeholder="Confirm Password*"
                          required
                          onChange={(e) => {
                            setData({...data,cpassword:e.target.value});
                            handleInputChange(e);
                          }}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="formfloating">Confirm Password*</label>
                        <div>
                            <p className="formerror">{formErrors.cpassword}</p>
                          </div>
                      </div>
                      {Userdata!==undefined &&
                      Userdata.role==="superAdmin" ? 
                      <>
                      <div className="form-group col-lg-12 p-1">
                            <select
                              className="form-control custom-select"
                              name="manufacturer"
                              value={data.manufacturer}
                              onChange={(e) => {
                                setData({...data,manufacturer:e.target.value});
                                handleInputChange(e);
                              }}
                              onBlur={handleBlur}
                            >
                              <option value="" disabled hidden>
                                Select Manufacturer
                              </option>
                              {manufactureres.map((el, ind) =>
                                Userdata.role === "superAdmin" ? (
                                  <option value={el.name} key={ind}>{el.name}</option>
                                 ) : null
                              )}
                            </select>
                            <div>
                          <p className="formerror">{formErrors.manufacturer}</p>
                        </div>
                          </div>
                          
                        </>
                           :
                          null
}
                      {Userdata != undefined &&
                        Userdata.role == "superAdmin" ? (
                          <>
                        <div className="form-group col-lg-12 p-1">
                          <select
                            className="form-control custom-select"
                            name="role"
                            value={data.role}
                            onChange={(e) => {
                              setData({...data,role:e.target.value});
                              handleInputChange(e);
                            }}
                            onBlur={handleBlur}
                          >
                            <option value="" disabled hidden>Select User Role From Here</option>
                            <option value="Manager">Manager</option>
                            <option value="Vendor">Vendor</option>
                            <option value="user">User</option>
                          </select>
                          <div>
                        <p className="formerror">{formErrors.role}</p>
                      </div>
                        </div>
                        
                      </>
                      ) : Userdata.role == "Manager" ? (
                        <>
                        <div className="form-group col-lg-12 p-1">
                          <select
                            className="form-control custom-select"
                            name="role"
                            value={data.role}
                            onChange={(e) => {
                              setData({...data,role:e.target.value});
                              handleInputChange(e);
                            }}
                            onBlur={handleBlur}
                          >
                            <option value="" disabled hidden>Select User Role From Here</option>
                            <option value="Vendor">Vendor</option>
                            <option value="user">User</option>
                          </select>
                          <div>
                        <p className="formerror">{formErrors.role}</p>
                      </div>
                        </div>
                        
                      </>
                      ) : null}
                      <div className="form-group col-lg-12 p-1">
                        <button
                          className="btn btn-registration btn-lg"
                          type="submit"
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
