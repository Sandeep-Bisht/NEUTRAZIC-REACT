import React, { useEffect, useState } from "react";
import Sidemenu from "./Sidemenu";
import "./Dashboard.css";
import DashboardHeaader from "./DashboardHeaader";
import { baseUrl } from "../../utils/services";
import { useHistory } from "react-router";
import axios from "axios";

var Userdata;
const Warehouse = (props) => {
  const [data, Setdata] = useState({
    name: "",
    warehouseContactNo: "",
    warehouseAddress: "",
    description: "",
    creatorId: ""
  });
  const history = useHistory();
  const [editableData] = useState(props.history.location.state);
  const [formerror, Setformerror] = useState({});


  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    GetWarehouse();
    if (editableData) {
      Setdata(editableData);
    }
  }, []);

  const ValidationFrom = (value) => {
    const error = {};
    if (!value.name) {
      error.name = "This field is required";
    }
    if (!value.warehouseContactNo) {
      error.warehouseContactNo = "This field is required";
    }
    if (!value.warehouseAddress) {
      error.warehouseAddress = "This field is required";
    }
    return error;
  };

  const submitData = async (e) => {
    e.preventDefault();
    const errors = ValidationFrom(data);
    Setformerror(errors);
    if (Object.keys(errors).length === 0) {
      data.creatorId = Userdata._id;
      const url = `${baseUrl}/api/warehouse/add_warehouse`;
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then((res) => {
          res.json();
          history.push("Configuration/" + "AllWarehouseDetails")
        })
        .then((res) => {
          // GetManufacturer();
          // this.getAddOn();
        })
    }
  };

  const GetWarehouse = async () => {
    await fetch(`${baseUrl}/api/warehouse/get_all_warehouse`)
      .then((res) => res.json())
      .then(async (data) => {
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const UpdateWarehouse = async (e, _id) => {
    e.preventDefault();
    const errors = ValidationFrom(data);
    Setformerror(errors);
    if (Object.keys(errors).length === 0) {
      const formData = {
        _id: data._id,
        description: data.description,
        name: data.name
      }
      await axios.put(`${baseUrl}/api/warehouse/update_warehouse_by_id`, formData,)
        .then((res) => {
          history.push("Configuration/" + "AllWarehouseDetails");
          GetWarehouse();
        })
        .catch((err) => {
          console.log(err, "error");
        });
    }
  };

  return (
    <>
      <section id="body-pd">
        <div className="container-fluid">
          <DashboardHeaader />
          <div className="row px-0 dashboard-container">
            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-4   sidebar-dashboard">
              <Sidemenu />
            </div>
            <div className="col-xl-10 col-lg-9 col-md-9 col-sm-8 col-8 px-0">
              {Userdata !== undefined ? (
                Userdata.role === "superAdmin" || Userdata.role === "Vendor" ? (
                  <form>
                    <div className="col-12 px-0">
                      <div className="card p-4 m-2 mt-4 product-form">
                        <h5>Warehouse Creation</h5>
                        <div className="row">
                          <div className="col-6 p-1 form-floating">
                            <input
                              type="text"
                              id="floatingInputValue"
                              className="form-control Dashborad-search"
                              placeholder="Warehouse Name"
                              defaultValue={editableData ? editableData.name : ""}
                              onChange={(e) => {
                                Setdata({ ...data, name: e.target.value });
                              }}
                            />
                            <label for="floatingInputValue">Warehouse Name</label>
                            <p className="formerror">{formerror.name}</p>

                          </div>
                          <div className="col-6 p-1 form-floating">
                            <input
                              type="number"
                              id="floatingInputValue"
                              className="form-control Dashborad-search"
                              placeholder="Warehouse Contact No"
                              defaultValue={editableData ? editableData.warehouseContactNo : data.warehouseContactNo}
                              onChange={(e) => {
                                if (e.target.value.length > 0) {
                                  e.target.value = e.target.value.slice(0, e.target.maxLength)
                                  Setdata({ ...data, warehouseContactNo: e.target.value });

                                }
                              }}
                              maxLength={10}

                            />
                            <label for="floatingInputValue">Warehouse Contact No</label>
                            <p className="formerror">{formerror.warehouseContactNo}</p>

                          </div>
                          <div className="col-6 p-1 form-floating">
                            <input
                              type="text"
                              id="floatingInputValue"
                              className="form-control Dashborad-search"
                              placeholder="Warehouse Address"
                              defaultValue={editableData ? editableData.warehouseAddress : ""}
                              onChange={(e) => {
                                Setdata({ ...data, warehouseAddress: e.target.value });
                              }}
                            />
                            <label for="floatingInputValue">Warehouse Address</label>
                            <p className="formerror">{formerror.warehouseAddress}</p>
                          </div>

                          <div className="col-6 p-1 form-floating">
                            <textarea
                              className="form-control h-100"
                              placeholder="Warehouse Address"
                              id="floatingInputValue"
                              rows="5"
                              defaultValue={
                                editableData ? editableData.description : ""
                              }
                              onChange={(e) => {
                                Setdata({ ...data, description: e.target.value });
                              }}
                            ></textarea>
                            <label for="floatingInputValue">Description</label>
                          </div>
                          {editableData ? (
                            <div className="col-12 p-1">
                              <button
                                className="btn btn-primary"
                                onClick={(e) => UpdateWarehouse(e, data._id)}
                              >
                                Update
                              </button>
                            </div>
                          ) : (
                            <div className="col-12 p-1">
                              <button
                                className="btn btn-primary"
                                onClick={(e) => {
                                  submitData(e);
                                }}
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

export default Warehouse;
