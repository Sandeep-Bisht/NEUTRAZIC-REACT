import React, { useEffect, useState } from "react";
import Sidemenu from "./Sidemenu";
import "./Dashboard.css";
// import DataTable from '@bit/adeoy.utils.data-table';

var Userdata;
const SubCategoryCreation = (props) => {
  var categoryCount = 0;
  const [subcategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [update, setUpdate] = useState(false);
  const [data, Setdata] = useState({
    name: "",
    descripton: "",
    category: "",
    image: [],
  });
  const submitData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    await formData.append("description", data.description);
    await formData.append("category", data.category);
    await formData.append("name", data.name);
    formData.append("image", data.image);
    //const url="http://144.91.110.221:3033/api/subcategory/add_subcategory"
    const url = "http://localhost:3033/api/subcategory/add_subcategory";
    await fetch(url, {
      method: "POST",
      // headers: {
      // 'Accept': 'application/json',
      // 'Content-Type': 'multipart/form-data'
      //   },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        GetSubCategory();

        this.getAddOn();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));

    GetSubCategory();
    GetCategory();
  }, []);
  const GetCategory = async () => {
    //await fetch("http://144.91.110.221:3033/api/category/all_category")
    await fetch("http://localhost:3033/api/category/all_category")
      .then((res) => res.json())
      .then(async (data) => {
        setCategories(data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const DeleteSubCategory = async (_id) => {
    // await fetch("http://144.91.110.221:3033/api/subcategory/delete_subcategory_by_id", {
    await fetch(
      "http://localhost:3033/api/subcategory/delete_subcategory_by_id",
      {
        method: "Delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: _id,
        }),
      }
    )
      .then((res) => res.json())
      .then(async (data) => {
        GetSubCategory();
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const GetSubCategory = async () => {
    //await fetch("http://144.91.110.221:3033/api/subcategory/all_subcategory")
    await fetch("http://localhost:3033/api/subcategory/all_subcategory")
      .then((res) => res.json())
      .then(async (data) => {
        setSubCategories(data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const EditSubCategory = (item) => {
    let obj;
    obj = {
      _id: item._id,
      image: item.image,
      name: item.name,
      description: item.description,
    };

    Setdata(obj);
  };
  const UpdateSubCategory = async (e, _id) => {
    e.preventDefault();

    //await fetch("http://144.91.110.221:3033/api/subcategory/update_subcategory_by_id", {
    await fetch(
      "http://localhost:3033/api/subcategory/update_subcategory_by_id",
      {
        method: "Put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
        }),
      }
    )
      .then((res) => res.json())
      .then(async (data) => {
        GetSubCategory();
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const data1 = [];
  {
    subcategories.map((item, index) => {
      data1.push({
        sr_no: index + 1,
        name: item.name,
        Action:
          Userdata != undefined && Userdata.role == "superAdmin" ? (
            <>
              <button
                className="btnbtn-danger"
                onClick={(e) => {
                  if (window.confirm("Are you sure ?")) {
                    DeleteSubCategory(item._id, e);
                  } else {
                    return false;
                  }
                }}
              >
                <i className="bx bx-trash"></i>
              </button>
              <button
                className="ml-2 btnbtn-danger"
                onClick={() => {
                  EditSubCategory(item);
                  setUpdate(true);
                }}
              >
                <i className="bx bx-edit"></i>
              </button>
            </>
          ) : (
            <button>
              <i className="bx bx-show"></i>
            </button>
          ),
      });
    });
  }
  const columns = [
    { title: "SR NO", data: "sr_no" },
    { title: "Sub Category Name", data: "name" },
    { title: "Action", data: "Action" },
  ];
  const click = (row) => {
    console.log(row);
  };

  return (
    <>
      <div className="container-fluid">
        {" "}
        <a href="#" className="nav__logo">
          <img
            src={require("../../Images/new-logo.png")}
            className="dashboard-logo"
            alt="image"
          />
        </a>
      </div>

      <div id="body-pd">
        <Sidemenu />
        {Userdata !== undefined ? (
          Userdata.role == "superAdmin" ? (
            <form>
              <div className="container">
                <div className="row">
                  {/* <div className="col-1"></div> */}
                  <div className="col-10">
                    <div className="card p-4 m-2 product-form">
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
                        </div>
                        <div className="col-6 p-1">
                          <select
                            className="form-control Dashborad-search"
                            defaultValue={update == true ? data.category : ""}
                            onChange={(e) => {
                              Setdata({ ...data, category: e.target.value });
                            }}
                          >
                            <option selected>Select Category</option>
                            {categories.map((el, ind) => (
                              <option value={el._id}>{el.name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="col-6 p-1">
                          <input
                            type="text"
                            className="form-control Dashborad-search"
                            placeholder="SubCategory Name "
                            defaultValue={update == true ? data.name : ""}
                            onChange={(e) => {
                              Setdata({ ...data, name: e.target.value });
                            }}
                          />
                        </div>

                        <div className="col-6 p-1">
                          <textarea
                            className="form-control"
                            placeholder="SubCategory Description"
                            rows="3"
                            defaultValue={
                              update == true ? data.description : ""
                            }
                            onChange={(e) => {
                              Setdata({ ...data, description: e.target.value });
                            }}
                          ></textarea>
                        </div>
                        {update == false ? (
                          <div className="col-12 pt-4">
                            <button
                              className="btn btn-primary"
                              onClick={(e) => {
                                submitData(e);
                              }}
                            >
                              Submit
                            </button>
                          </div>
                        ) : null}
                        {update ? (
                          <div className="col-12 p-1">
                            <button
                              className="btn btn-primary"
                              onClick={(e) => UpdateSubCategory(e, data._id)}
                            >
                              Update
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="col-1"></div>
                </div>
              </div>
            </form>
          ) : null
        ) : null}
      </div>
      {update ? (
        <div className="create-manu container text-right">
          <span>Create Manufacturer</span>
          <button onClick={() => setUpdate(false)}>
            <i className="bx bx-plus"></i>
          </button>
        </div>
      ) : null}
      {/*     
    <table className="table table-hover table-striped text-center">
  <thead>
    <tr>
    <th scope="col">Sr.No</th>
      <th scope="col">Category Name</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>

  {categories.map((el, ind) => {
      categoryCount +=1;
    return(
    <tr>
      
      <td>{categoryCount}</td>
      <td>{el.name}</td>
     
      <td><i className="bx bx-trash"></i><i className="bx bx-edit pl-4"></i></td>
    </tr>
    )
     })}
  
  </tbody>
</table> */}
      <div className="container">
        {/* <DataTable
        data={data1}
        columns={columns}
        striped={true}
        hover={true}
        responsive={true}
        // onClickRow={click}
      /> */}
      </div>
    </>
  );
};

export default SubCategoryCreation;
