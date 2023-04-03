import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Sidemenu from "./Sidemenu";
import "./Dashboard.css";
import $ from "jquery";
import { Link } from "react-router-dom";
import DashboardHeaader from "./DashboardHeaader";
import { baseUrl } from "../../utils/services";
import axios from "axios";

var Userdata;
const ManufacturerCreation = (props) => {
  var count = 0;
  const [manufactureres, setManufactureres] = useState([]);
  const [ManufacturerCount, setManufacturerCount] = useState(0);
  const [update, setUpdate] = useState(true);
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
      // await formData.append("featuredImage", []);
      await formData.append("creatorId", data.creatorId);
      const url = `${baseUrl}/api/manufacture/add_manufacture`;
      await fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          res.json();
          history.push("/AllManufactureDetails");
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
          history.push("/AllManufactureDetails");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    { title: "SR NO", data: "sr_no" },
    { title: "Manufacturer Name", data: "name" },
    { title: "Action", data: "Action" },
  ];

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
                          <div className="col-6 p-1">
                            <input
                              type="file"
                              multiple
                              className="form-control Dashborad-search"
                              onChange={(e) => {
                                Setdata({ ...data, image: e.target.files[0] });
                              }}
                            />
                            <p className="formerror">{formerror.image}</p>
                          </div>
                          <div className="col-6 p-1 form-floating">
                            <input
                              type="text"
                              id="floatingInputValue"
                              className="form-control Dashborad-search"
                              placeholder="Manufacturer Name "
                              defaultValue={
                                editableData ? editableData.name : ""
                              }
                              onChange={(e) => {
                                Setdata({ ...data, name: e.target.value });
                              }}
                            />
                            <p className="formerror">{formerror.name}</p>
                            <label for="floatingInputValue">
                              Manufacturer Name
                            </label>
                          </div>
                          <div className="col-6 p-1 form-floating">
                            <textarea
                              className="form-control h-100"
                              id="floatingInputValue"
                              placeholder="Manufacturer Description"
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
                            <label for="floatingInputValue">
                              Manufacturer Description
                            </label>
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
