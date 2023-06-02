import React, { useEffect, useState } from "react";
import Sidemenu from "./Sidemenu";
import "./Dashboard.css";
import DashboardHeaader from "./DashboardHeaader";
import { baseUrl } from "../../utils/services";
import { useHistory } from "react-router";
var Userdata;
const CategoryCreation = (props) => {
  var categoryCount = 0;
  const [categories, setCategories] = useState([]);
  const [formerror, setFormerror] = useState({});
  const [editableArray,setEditableArray]=useState([]);
  const [data, Setdata] = useState({
    name: "",
    description: "",
    featuredCategories: "",
    image: [],
  });
  const history = useHistory();
  const [editableData] = useState(props.history.location.state);

  const ValidationFrom = (value) => {
    const error = {};
    if (!value.name) {
      error.name = "This field is required";
    }
    if (value.image.length === 0) {
      error.image = "This field is required";
    }
    if (!value.featuredCategories) {
      error.featuredCategories = "This field is required";
    }
    return error;
  };
  const submitData = async (e) => {
    e.preventDefault();
    const errors = ValidationFrom(data);
    setFormerror(errors);
    if (Object.keys(errors).length === 0) {
      const formData = new FormData();
      await formData.append("description", data.description);
      await formData.append("name", data.name);
      await formData.append("featuredCategories", data.featuredCategories);
      await formData.append("image", data.image);
      const url = `${baseUrl}/api/category/add_category`;
      await fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          res.json()
          history.push("Configuration/" + "AllCategoriesDetails");
        })
        .then((res) => {
          GetCategory();

          this.getAddOn();
        })
        .catch((err) => console.log(err));
    }
  };


  useEffect(()=>{
    const arr=[];
    if (editableData) {
      arr.push(editableData)
      }
      setEditableArray(arr)
  },[])

  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    GetCategory();
    if (editableData) {
      let { featuredCategories, ...restData } = editableData;
      {
        featuredCategories
          ? (restData.featuredCategories = featuredCategories)
          : (restData.featuredCategories = "");
      }
      Setdata(restData);
    }
  }, []);

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

  const UpdateCategory = async (e, _id) => {
    e.preventDefault();
    const errors = ValidationFrom(data);
    setFormerror(errors);
    if (Object.keys(errors).length === 0) {
      const formData = new FormData();
      formData.append("_id", data._id);
      formData.append("description", data.description);
      formData.append("name", data.name);
      formData.append("image", data.image);
      formData.append("slideShow", false);

      fetch(`${baseUrl}/api/category/update_category_by_id`, {
        method: "PUT",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          history.push("Configuration/AllCategoriesDetails");
          GetCategory();
        })
        .catch((err) => {
          console.log(err, "error");
        });
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
console.log(editableArray,"array");
console.log(editableData,"editable data of category");
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
                        <h5>Category Creation</h5>
                        <div className="row">
                        <div className="col-6">
                              <div className="row pt-2">
                          {
                            editableArray && editableArray.length>0  ?
                            <div className="d-flex">
                            <div className="col-10">
                            <div>
                              <span className="category-select-div">Image</span>
                              <input
                                type="file"
                                name="image"
                                className="form-control Dashborad-search"
                                onChange={(e) => {
                                  Setdata({ ...data, image: e.target.files[0] });
                                  // handleInputChange(e);
                                }}
                              />
                            </div>
                            <p className="formerror">{formerror.image}</p>
                            </div>
                            <div className="col-2 p-2 d-flex align-items-end edit-images">
                             <img src={`${baseUrl}/${data.image[0].path}`} style={{width:"70px", height:"40px"}} alt=""/>
                          </div>
                          </div>:
                          <div className="col-12 p-2">
                          <div>
                            <span className="category-select-div">Image</span>
                            <input
                              type="file"
                              name="image"
                              className="form-control Dashborad-search"
                              onChange={(e) => {
                                Setdata({ ...data, image: e.target.files[0] });
                                // handleInputChange(e);
                              }}
                            />
                          </div>
                          <p className="formerror">{formerror.image}</p>
                        </div>
                          }
                          </div>
                          </div>
                          <div className="col-6 p-2">
                            <div>
                              <span className="category-select-div">Category Name</span>
                              <input
                                type="text"
                                id="floatingInputValue"
                                name="name"
                                className="form-control Dashborad-search"
                                defaultValue={editableData ? editableData.name : ""}
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
                              <span className="category-select-div">Category Description</span>
                              <textarea
                                className="form-control h-100"
                                id="floatingInputValue"
                                rows="5"
                                defaultValue={editableData ? editableData.description : ""}
                                onChange={(e) => {
                                  Setdata({ ...data, description: e.target.value });
                                }}
                              ></textarea>
                            </div>
                          </div>
                          <div className="col-6 p-2">
                            <div>
                              <span className="category-select-div">Featured Categories</span>
                              <select
                                className="form-control Dashborad-search custom-select"
                                value={data.featuredCategories}
                                name="featuredCategories"
                                onChange={(e) => {
                                  Setdata({ ...data, featuredCategories: e.target.value });
                                  handleInputChange(e);
                                }}
                              >
                                <option value="" hidden>
                                  Select Category Type
                                </option>
                                <option value="Featured Categories">Featured Categories</option>
                              </select>
                            </div>
                            <p className="formerror">{formerror.featuredCategories}</p>
                          </div>
                          {editableData ? (
                            <div className="col-12 p-2">
                              <button
                                className="btn btn-primary"
                                onClick={(e) => UpdateCategory(e, data._id)}
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

export default CategoryCreation;
