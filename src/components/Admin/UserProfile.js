import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Sidemenu from "./Sidemenu";
import "./Dashboard.css";
import DashboardHeaader from "./DashboardHeaader";
import { baseUrl } from "../../utils/services";
import axios from "axios";

var Userdata;
const UserProfile = (props) => {
  var count = 0;
  const [userProfile, setUserProfile] = useState([]);
  const [data, Setdata] = useState({
    username: "",
    email: "",
    phonenumber:"",
    userStatus:"",
    role:""
  });
  const history = useHistory();
  const [editableData] = useState(props.history.location.state);



  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    GetUserData();
    if (editableData) {
      Setdata(editableData);
    }
  }, []);

  const GetUserData = async()=>{
    await fetch(`${baseUrl}/api/auth/allusers`)
      .then((res) => res.json())
      .then(async (data) => {
        setUserProfile(data.data);
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };


  const UpdateUserProfiles = async (e, _id) => {
    console.log(_id,"user id")
    e.preventDefault();
      try{
        const response=await axios.put(`${baseUrl}/api/auth/update_user_by_id`, {
            _id:data._id,
            username:data.username,
            email:data.email,
            phonenumber:data.phonenumber,
            userStatus:data.userStatus,
            role:data.role
        })
        if(response.status==200)
        {
          await GetUserData();
          setTimeout(()=>{
            history.push("/IAM/"+"AllUsers");
          },1500)
          
        }
        
      }catch(error)
      {
        console.log(error);
      }
  };

  return (
    <>
      <section id="body-pd">
        <div className="container-fluid">
          <DashboardHeaader />
          <div className="row px-0 dashboard-container">
            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-4  sidebar-dashboard">
              <Sidemenu />
            </div>
            <div className="col-xl-10 col-lg-9 col-md-9 col-sm-8 col-8 px-0">
              {Userdata != undefined ? (
                Userdata.role == "superAdmin" ? (
                  <form>
                    <div className="col-12 px-0">
                      <div className="card p-4 m-2 mt-4 product-form">
                        <h5>User Profile</h5>
                        <div className="row">
                          <div className="col-6 p-1 form-floating">
                            <input
                              type="text"
                              id="floatingInputValue"
                              className="form-control Dashborad-search"
                              placeholder="User Name"                           
                              defaultValue={
                                editableData ? editableData.username : ""
                              }
                              onChange={(e) => {
                                Setdata({ ...data, username: e.target.value });
                              }}
                            />
                            <label for="floatingInputValue">
                              User Name
                            </label>
                          </div>
                          <div className="col-6 p-1 form-floating">
                            <input
                              type="email"
                              id="floatingInputValue"
                              className="form-control Dashborad-search"
                              placeholder="User Email "
                              defaultValue={
                                editableData ? editableData.email : ""
                              }
                              onChange={(e) => {
                                Setdata({ ...data, email: e.target.value });
                              }}
                            />
                            <label for="floatingInputValue">
                              Email
                            </label>
                          </div>
                          <div className="col-6 p-1 form-floating">
                            <input
                            type="number"
                              className="form-control h-100"
                              id="floatingInputValue"
                              placeholder="User Phone Number"
                              rows="6"
                              defaultValue={
                                editableData ? editableData.phonenumber : ""
                              }
                              onChange={(e) => {
                                Setdata({
                                  ...data,
                                  phonenumber: e.target.value,
                                });
                              }}
                            ></input>
                            <label for="floatingInputValue">
                              Phone Number
                            </label>
                          </div>
                          <div className="col-6 p-1 form-floating">
                            <input
                            type="text"
                              className="form-control h-100"
                              id="floatingInputValue"
                              placeholder="User Role"
                              rows="6"
                              defaultValue={
                                editableData ? editableData.role : ""
                              }
                              onChange={(e) => {
                                Setdata({
                                  ...data,
                                  role: e.target.value,
                                });
                              }}
                            ></input>
                            <label for="floatingInputValue">
                              Role
                            </label>
                          </div>
                          <div className="col-6 p-1 form-floating">
                            <input
                            type="text"
                              className="form-control h-100"
                              id="floatingInputValue"
                              placeholder="User Status"
                              rows="6"
                              defaultValue={
                                editableData ? editableData.userStatus : ""
                              }
                              onChange={(e) => {
                                Setdata({
                                  ...data,
                                  userStatus: e.target.value,
                                });
                              }}
                            ></input>
                            <label for="floatingInputValue">
                              userStatus
                            </label>
                          </div>
                          {editableData && (
                            <div className="col-12 p-1">
                              <button
                                className="btn btn-primary"
                                id="update-btn"
                                onClick={(e) => UpdateUserProfiles(e, data._id)}
                              >
                                Update
                              </button>
                            </div>
                           )
                    }
                        </div>
                      </div>
                    </div>
                  </form>
                ) : null
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
