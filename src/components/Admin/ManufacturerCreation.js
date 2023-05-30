import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Sidemenu from "./Sidemenu";
import "./Dashboard.css";
import $ from "jquery";
import DashboardHeaader from "./DashboardHeaader";
import { baseUrl } from "../../utils/services";
import axios from "axios";

var Userdata;
const ManufacturerCreation = (props) => {
  const [manufactureres, setManufactureres] = useState([]);
  const [formerror, setFormerror] = useState({});
  const [data, Setdata] = useState({
    name: "",
    description: "",
    image: [],
    creatorId: "",
  });
  const history = useHistory();
  const [editableData] = useState(props.history.location.state);
  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    GetManufacturer();
    if (editableData) {
      const {image ,...restData}=editableData;
      {
        image.length>0 && (restData.image=[]) 
      }
      Setdata(editableData);
    }
  }, []);

  const ValidattionForm = (value) => {
    const error = {};
    if (value.image.length === 0) {
      error.image = "This field is required";
    }
    if (!value.name) {
      error.name = "This field is required";
    }
    return error;
  };
  const submitData = async (e) => {
    e.preventDefault();
    const errors = ValidattionForm(data);
    setFormerror(errors);
    if (Object.keys(errors).length === 0) {
      data.creatorId = Userdata._id;
      const formData = new FormData();
      await formData.append("description", data.description);
      await formData.append("name", data.name);
      await formData.append("image", data.image);
      await formData.append("creatorId", data.creatorId);
      const url = `${baseUrl}/api/manufacture/add_manufacture`;
      await fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          res.json();
          history.push("Configuration/"+"AllManufactureDetails");
        })
        .then((res) => {
          GetManufacturer();
          this.getAddOn();
        })

        .catch((err) => console.log(err));
    }
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
  const UpdateManufacturer = async (e, _id) => {
    e.preventDefault();
    const errors = ValidattionForm(data);
    setFormerror(errors);
    if (Object.keys(errors).length === 0) {
    const formData = new FormData();
    await formData.append("_id", data._id);
    await formData.append("description", data.description);
    await formData.append("name", data.name);
    await formData.append("image", data.image);
    try {
      const response = await axios.put(
        `${baseUrl}/api/manufacture/update_manufacturer_by_id`,
        formData
      );
      if (response.status == 200) {
        await GetManufacturer();
        setTimeout(() => {
          history.push("Configuration/"+"AllManufactureDetails");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    Setdata({
      ...data,
      [name]: value
    });
    setFormerror({
      ...formerror,
      [name]: '' // clear error message for the current input field
    });
  };
  const handleBlur = (event) => {
    const { name, value } = event.target;
    const errors = { ...formerror };

    // Validate the input field on blur
    if (!value) {
      errors[name] = `This is required`;
    }
    setFormerror(errors);
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
                Userdata.role == "superAdmin" || Userdata.role == "Vendor" ? (
                  <form>
                    <div className="col-12 px-0">
                      <div className="card p-4 m-2 mt-4 product-form">
                        <h5>Manufacturer Creation</h5>
                        <div className="row">
                          <div className="col-6 p-2">
                            <div>
                          <span className="category-select-div">Image</span>
                            <input
                              type="file"
                              name="image"
                              multiple
                              className="form-control Dashborad-search"
                              onChange={(e) => {
                                Setdata({ ...data, image: e.target.files[0] });
                                // handleInputChange(e);
                              }}
                              onBlur={handleBlur}
                            />
                            </div>
                            <p className="formerror">{formerror.image}</p>
                          </div>
                          <div className="col-6 p-2">
                            <div>
                          <span className="category-select-div">Manufacturer Name</span>
                            <input
                              type="text"
                              name="name"
                              id="floatingInputValue"
                              className="form-control Dashborad-search"
                              defaultValue={
                                editableData ? editableData.name : ""
                              }
                              onChange={(e) => {
                                Setdata({ ...data, name: e.target.value });
                                handleInputChange(e);
                              }}
                              onBlur={handleBlur}

                            />
                            </div>
                            <p className="formerror">{formerror.name}</p>
                          </div>
                          <div className="col-6 p-2">
                            <div>
                          <span className="category-select-div">Manufacturer Description</span>
                            <textarea
                              className="form-control h-100"
                              id="floatingInputValue"
                              rows="6"
                              defaultValue={
                                editableData ? editableData.description : ""
                              }
                              onChange={(e) => {
                                Setdata({
                                  ...data,
                                  description: e.target.value,
                                });
                              }}
                            ></textarea>
                            </div>
                          </div>
                          {editableData ? (
                            <div className="col-12 p-1">
                              <button
                                className="btn btn-primary"
                                id="update-btn"
                                onClick={(e) => UpdateManufacturer(e, data._id)}
                              >
                                Update
                              </button>
                            </div>
                          ) : (
                            <div className="col-12 p-1">
                              <button
                                className="btn btn-primary"
                                onClick={(e) => submitData(e)}
                              >
                                Submit
                              </button>
                            </div>
                          )}
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

export default ManufacturerCreation;
