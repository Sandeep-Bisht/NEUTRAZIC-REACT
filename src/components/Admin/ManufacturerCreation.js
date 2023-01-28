import React, { useEffect, useState } from "react";
// import DataTable from '@bit/adeoy.utils.data-table';
import { useHistory } from "react-router-dom";
import Sidemenu from "./Sidemenu";
import "./Dashboard.css";
import $ from "jquery";
import { Link } from "react-router-dom";
import DashboardHeaader from "./DashboardHeaader";
import { baseUrl } from "../../utils/services";

var Userdata;
const ManufacturerCreation = (props) => {
  var count = 0;
  const [manufactureres, setManufactureres] = useState([]);
  const [ManufacturerCount, setManufacturerCount] = useState(0);
  const [update, setUpdate] = useState(true);
  const [data, Setdata] = useState({
    name: "",
    description: "",
    image: [],
  });
  const history = useHistory();
  const [editableData] = useState(props.history.location.state);

  const submitData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    await formData.append("description", data.description);
    await formData.append("name", data.name);
    await formData.append("image", data.image);
    // await formData.append("featuredImage", []);
    // await formData.append("slideShow", false);
    const url = `${baseUrl}/api/manufacture/add_manufacture`;
    await fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        GetManufacturer();
        this.getAddOn();
      })

      .catch((err) => console.log(err));
    //console.log(formData)
    e.preventDefault();
  };

  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    GetManufacturer();
    if (editableData) {
      Setdata(editableData);
    }
  }, []);
  const DeleteManufacturer = async (_id) => {
    await fetch(`${baseUrl}/api/manufacture/delete_manufacturer_by_id`, {
      method: "Delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: _id,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        GetManufacturer();
      })
      .catch((err) => {
        console.log(err, "error");
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

  // const EditManufacturer = (item) => {
  //   let obj;
  //   obj = {
  //     _id: item._id,
  //     image: item.image,
  //     name: item.name,
  //     description: item.description,
  //   };

  //   Setdata(obj);
  // };

  const UpdateManufacturer = async (e, _id) => {
    e.preventDefault();
    const formData = new FormData();
    await formData.append("_id", data._id);
    await formData.append("description", data.description);
    await formData.append("name", data.name);
    await formData.append("image", data.image);
    await fetch(`${baseUrl}/api/manufacture/update_manufacturer_by_id`, {
      method: "Put",
      body: formData,
    })
      .then((res) => {
        history.push("/AllManufactureDetails");
        res.json();
      })
      .then(async (data) => {
        GetManufacturer();
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  // const data1 = [];
  // {
  //   manufactureres.map((item, index) => {
  //     data1.push({
  //       sr_no: index + 1,
  //       name: item.name,
  //       Action:
  //         Userdata !== undefined && Userdata.role == "superAdmin" ? (
  //           <>
  //             <button
  //               className="btnbtn-danger"
  //               onClick={() => {
  //                 if (window.confirm("Are you sure ?")) {
  //                   DeleteManufacturer(item._id);
  //                 } else {
  //                   return false;
  //                 }
  //               }}
  //             >
  //               <i className="bx bx-trash"></i>
  //             </button>
  //             <button
  //               className="ml-2 btnbtn-danger"
  //               onClick={() => {
  //                 EditManufacturer(item);
  //                 setUpdate(true);
  //               }}
  //             >
  //               <i className="bx bx-edit"></i>
  //             </button>
  //           </>
  //         ) : (
  //           <button>
  //             <i className="bx bx-show"></i>
  //           </button>
  //         ),
  //     });
  //   });
  // }
  const columns = [
    { title: "SR NO", data: "sr_no" },
    { title: "Manufacturer Name", data: "name" },
    // { title: "Manufacturer", data: "manufacturer" },
    { title: "Action", data: "Action" },
  ];
  const click = (row) => {
    console.log(row);
  };
  return (
    <>
      {/* <div className="container-fluid">
        {" "}
        <Link href="#" className="nav__logo">
          <img
            src={require("../../Images/new-logo.png")}
            className="dashboard-logo"
            alt="image"
          />
        </Link>
      </div> */}
      <section id="body-pd">
        <div className="container-fluid">
          <DashboardHeaader />
          <div className="row">
            <div className="col-2 px-0">
              <Sidemenu />
            </div>
            <div className="col-10 px-0">
              {Userdata != undefined ? (
                Userdata.role == "superAdmin" ? (
                  <form>
                    <div className="col-12 px-0">
                      <div className="card p-4 m-2 product-form">
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
                            <label for="floatingInputValue">
                              Manufacturer Name
                            </label>
                          </div>
                          <div className="col-6 p-1 form-floating">
                            <textarea
                              className="form-control"
                              id="floatingInputValue"
                              placeholder="Manufacturer Description"
                              rows="3"
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
