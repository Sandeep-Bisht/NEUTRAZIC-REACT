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
  const [update, setUpdate] = useState(false);
  const [formerror,setFormerror] = useState({});
  const [data, Setdata] = useState({
    name: "",
    description: "",
    featuredCategories:"",
    image: [],    
  });
  const history=useHistory();
  const [editableData]=useState(props.history.location.state);
 
  const ValidationFrom = (value)=>{
    const error = {};
    if(!value.name){
      error.name = "This field is required";
    }
    if(value.image.length === 0){
      error.image = "This field is required";
    }
    if(!value.featuredCategories){
      error.featuredCategories = "This field is required";
    }
    return error;
  }
  const submitData = async (e) => {
    e.preventDefault();
    const errors = ValidationFrom(data);
    setFormerror(errors);
    if(Object.keys(errors).length === 0){
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
      .then((res) =>{
        res.json()
        history.push("/AllCategoriesDetails");
      } )
      .then((res) => {
        GetCategory();

        this.getAddOn();
      })
      .catch((err) => console.log(err));
    }
   };
  

  const SelectImage = (e) => {
    Setdata({ ...data, image: [...e.target.files] });
  };
  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    GetCategory();
    if(editableData){
      Setdata(editableData);
    }
  }, []);

  const DeleteCategory = async (_id) => {
    await fetch(`${baseUrl}/api/category/delete_category_by_id`, {
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
        GetCategory();
      })
      .catch((err) => {
        console.log(err, "error");
      });
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
  
  const EditCategory = (item) => {
    let obj;
    obj = {
      _id: item._id,
      image: item.image,
      name: item.name,
      description: item.description,
    };
    Setdata(obj);
  };
  const UpdateCategory = async (e, _id) => {
    e.preventDefault();
    const formData = new FormData();
    await formData.append("_id", data._id);
    await formData.append("description", data.description);
    await formData.append("name", data.name);
    await formData.append("image", data.image);
    await formData.append("featuredImage", []);
    await formData.append("slideShow", false);
    await fetch(`${baseUrl}/api/category/update_category_by_id`, {
      method: "Put",
      body: formData,
    })
      .then((res) =>{
        res.json()
        history.push("/AllCategoriesDetails");
      })
      .then(async (data) => {
        GetCategory();
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const columns = [
    { title: "SR NO", data: "sr_no" },
    { title: "Category Name", data: "name" },
    { title: "Action", data: "Action" },
  ];
  

  return (
    <>
    <section id="body-pd">
      <div className="container-fluid">
        <DashboardHeaader/>
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
                        <div className="col-6 p-1">
                          <input
                            type="file"
                            className="form-control Dashborad-search"
                            // onChange={SelectImage}
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
                            placeholder="Category Name"
                            defaultValue={editableData ? editableData.name : ""}
                            onChange={(e) => {
                              Setdata({ ...data, name: e.target.value });
                            }}
                          />
                          <p className="formerror">{formerror.name}</p>
                          <label for="floatingInputValue">Category Name</label>
                        </div>
                        <div className="col-6 p-1 form-floating">
                          <textarea
                            className="form-control h-100"
                            placeholder="Category Description"
                            id="floatingInputValue"
                            rows="5"
                            defaultValue={
                              editableData ? editableData.description : ""
                            }
                            onChange={(e) => {
                              Setdata({ ...data, description: e.target.value });
                            }}
                          ></textarea>
                          <label for="floatingInputValue">Category Description</label>
                        </div>
                        <div className="col-6 p-1 form-floating">
                          <select
                            className="form-control Dashborad-search"
                            onChange={(e) => {
                              Setdata({ ...data, featuredCategories: e.target.value });
                            }}
                          >
                            <option>Select Category Type</option>
                            <option value="Featured Categories">
                            Featured Categories
                            </option>
                            {/* <option></option> */}
                          </select>
                          <p className="formerror">{formerror.featuredCategories}</p>
                        </div>
                        {editableData ? (
                          <div className="col-12 p-1">
                            
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
