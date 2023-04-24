import React, { useEffect, useState } from "react";
import Sidemenu from "./Sidemenu";
import "./Dashboard.css";
import DashboardHeaader from "./DashboardHeaader";
import { baseUrl } from "../../utils/services";
import { useHistory } from "react-router";
import axios from "axios";

var Userdata;
const SubCategoryCreation = (props) => {
  var categoryCount = 0;
  const [subcategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formerror, Setformerror] = useState({});
  const [data, Setdata] = useState({
    name: "",
    description: "",
    category: "",
    image: [],
  });

  const [editableData] = useState(props.history.location.state);
  const history = useHistory();

  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    GetSubCategory();
    GetCategory();
    if (editableData) {
      let { category, ...restData } = editableData;
      {
        category
          ? (restData.category = category._id)
          : (restData.category = "");
      }
      Setdata(restData);
    }
  }, []);

  const ValidationFrom = (value) => {
    const error = {};
    if (!value.category) {
      error.category = "This field is required";
    }
    if (!value.name) {
      error.name = "This field is required";
    }
    if (value.image.length === 0) {
      error.image = "This field is required";
    }
    return error;
  };
  const submitData = async (e) => {
    e.preventDefault();
    const errors = ValidationFrom(data);
    Setformerror(errors);
    if (Object.keys(errors).length === 0) {
      const formData = new FormData();
      await formData.append("description", data.description);
      await formData.append("category", data.category);
      await formData.append("name", data.name);
      formData.append("image", data.image);
      const url = `${baseUrl}/api/subcategory/add_subcategory`;
      await fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          res.json();
          history.push("/AllSubCategoriesDetails");
        })
        .then((res) => {
          GetSubCategory();

          this.getAddOn();
        })
        .catch((err) => console.log(err));
    }
  };

  const GetCategory = async () => {
    await fetch(`${baseUrl}/api/category/all_category`)
      .then((res) => res.json())
      .then(async (data) => {
        setCategories(data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  const GetSubCategory = async () => {
    await fetch(`${baseUrl}/api/subcategory/all_subcategory`)
      .then((res) => res.json())
      .then(async (data) => {
        setSubCategories(data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const UpdateSubCategory = async (e, _id) => {
    e.preventDefault();
    const formData = new FormData();
    await formData.append("_id", data._id);
    await formData.append("name", data.name);
    await formData.append("description", data.description);
    await formData.append("category", data.category);
    await formData.append("image", data.image);
    const response = await axios.put(
      `${baseUrl}/api/subcategory/update_subcategory_by_id`,
      formData
    );
    if (response.status === 200) {
      await GetSubCategory();
      setTimeout(() => {
        history.push("/AllSubCategoriesDetails");
      }, 1500);
    }
  };


  return (
    <>
      <section id="body-pd">
        <div className="container-fluid">
          <DashboardHeaader />
          <div className="row px-0 dashboard-container">
            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-4  sidebar-dashboard ">
              <Sidemenu />
            </div>
            <div className="col-xl-10 col-lg-9 col-md-9 col-sm-8 col-8 px-0">
              {Userdata !== undefined ? (
                Userdata.role === "superAdmin" ? (
                  <form>
                    <div className="col-12 px-0">
                      <div className="card p-4 m-2 mt-4 product-form">
                        <h5>SubCategory Creation</h5>
                        <div className="row">
                          <div className="col-6 p-1">
                            <input
                              type="file"
                              className="form-control Dashborad-search"
                              placeholder="SubCategory Name "
                              onChange={(e) => {
                                Setdata({ ...data, image: e.target.files[0] });
                              }}
                            />
                            <p className="formerror">{formerror.image}</p>
                          </div>
                          <div className="col-6 p-1">
                            <select
                              className="form-control Dashborad-search custom-select"
                              defaultValue={
                                editableData ? editableData.name : ""
                              }
                              onChange={(e) => {
                                Setdata({ ...data, category: e.target.value });
                              }}
                            >
                              <option selected>
                                {editableData
                                  ? editableData.name
                                  : "Select Category"}
                              </option>
                              {categories.map((el, ind) => (
                                <option value={el._id}>{el.name}</option>
                              ))}
                            </select>
                            <p className="formerror">{formerror.category}</p>
                          </div>
                          <div className="col-6 p-1 form-floating">
                            <input
                              type="text"
                              id="floatingInputValue"
                              className="form-control Dashborad-search"
                              placeholder="SubCategory Name "
                              defaultValue={
                                editableData ? editableData.name : ""
                              }
                              onChange={(e) => {
                                Setdata({ ...data, name: e.target.value });
                              }}
                            />
                            <p className="formerror">{formerror.name}</p>

                            <label for="floatingInputValue">
                              SubCategory Name
                            </label>
                          </div>

                          <div className="col-6 p-1 form-floating">
                            <textarea
                              className="form-control h-100"
                              id="floatingInputValue"
                              placeholder="SubCategory Description"
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
                              SubCategory Description
                            </label>
                          </div>
                          {editableData ? (
                            <div className="col-12 p-1">
                              <button
                                className="btn btn-primary"
                                onClick={(e) => UpdateSubCategory(e, data._id)}
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

export default SubCategoryCreation;
