import React, { useEffect, useState } from "react";
import Sidemenu from "./Sidemenu";
import "./Dashboard.css";
import DashboardHeaader from "./DashboardHeaader";
// import DataTable from '@bit/adeoy.utils.data-table';
var Userdata;
const CategoryCreation = (props) => {
  var categoryCount = 0;
  const [categories, setCategories] = useState([]);
  const [update, setUpdate] = useState(false);
  const [data, Setdata] = useState({
    name: "",
    descripton: "",
    image: [],
  });

  const [editableData]=useState(props.history.location.state);

  const submitData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    await formData.append("description", data.description);
    await formData.append("name", data.name);
    formData.append("image", data.image);
    // const url="http://144.91.110.221:3033/api/category/add_category"
    const url = "http://localhost:3033/api/category/add_category";
    console.log("payload before submit", formData)
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
        GetCategory();

        this.getAddOn();
      })
      .catch((err) => console.log(err));
  };

  const SelectImage = (e) => {
    Setdata({ ...data, image: [...e.target.files] });
  };
  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    GetCategory();
  }, []);

  const DeleteCategory = async (_id) => {
    // await fetch("http://144.91.110.221:3033/api/category/delete_category_by_id", {
    await fetch("http://localhost:3033/api/category/delete_category_by_id", {
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
    // await fetch("http://144.91.110.221:3033/api/category/all_category")
    await fetch("http://localhost:3033/api/category/all_category")
      .then((res) => res.json())
      .then(async (data) => {
        setCategories(data.data);
        Setdata({ ...data, image: data.image });
        console.log(data.data, "image");
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
    await formData.append("_id", _id);
    await formData.append("description", data.description);
    await formData.append("name", data.name);
    await formData.append("image", data.image);
    await formData.append("featuredImage", []);
    await formData.append("slideShow", false);
    // await fetch("http://144.91.110.221:3033/api/category/update_category_by_id", {
    await fetch("http://localhost:3033/api/category/update_category_by_id", {
      method: "Put",
      body: formData,
    })
      .then((res) => res.json())
      .then(async (data) => {
        GetCategory();
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  // const data1 = [];
  // {
  //   categories.map((item, index) => {
  //     data1.push({
  //       sr_no: index + 1,
  //       name: item.name,
  //       Action: (
  //         <>
  //           <button
  //             className="btnbtn-danger"
  //             onClick={(e) => {
  //               if (window.confirm("Are you sure ?")) {
  //                 DeleteCategory(item._id, e);
  //               } else {
  //                 return false;
  //               }
  //             }}
  //           >
  //             <i className="bx bx-trash"></i>
  //           </button>
  //           <button
  //             className="ml-2 btnbtn-danger"
  //             onClick={() => {
  //               EditCategory(item);
  //               setUpdate(true);
  //             }}
  //           >
  //             <i className="bx bx-edit"></i>
  //           </button>
  //         </>
  //       ),
  //     });
  //   });
  // }
  const columns = [
    { title: "SR NO", data: "sr_no" },
    { title: "Category Name", data: "name" },
    { title: "Action", data: "Action" },
  ];
  const click = (row) => {
    console.log(row);
  };
  console.log(data.image, "er");

  return (
    <>
    <section id="body-pd">
      <div className="container-fluid">
        <DashboardHeaader/>
        <div className="row">
          <div className="col-2 px-0">
        <Sidemenu />
        </div>
        <div className="col-10">
        {Userdata != undefined ? (
          Userdata.role == "superAdmin" ? (
            <form>
              <div className="container">
                <div className="row">
                  {/* <div className="1"></div> */}
                  <div className="col-10">
                    <div className="card p-4 m-2 product-form">
                      <h5>Category Creation</h5>
                      <div className="row">
                        <div className="col-6">
                          <input
                            type="file"
                            className="form-control Dashborad-search"
                            placeholder="Category Name "
                            multiple
                            // onChange={SelectImage}
                            onChange={(e) => {
                              Setdata({ ...data, image: e.target.files[0] });
                            }}
                          />
                        </div>
                        <div className="col-6">
                          <input
                            type="text"
                            className="form-control Dashborad-search"
                            placeholder="Category Name "
                            defaultValue={editableData ? editableData.name : ""}
                            onChange={(e) => {
                              Setdata({ ...data, name: e.target.value });
                            }}
                          />
                        </div>
                        <div className="col-6 pt-2">
                          <textarea
                            className="form-control"
                            placeholder="Category Description"
                            rows="3"
                            defaultValue={
                              editableData ? editableData.description : ""
                            }
                            onChange={(e) => {
                              Setdata({ ...data, description: e.target.value });
                            }}
                          ></textarea>
                        </div>
                        {editableData ? (
                          <div className="col-12 pt-4">
                            
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
      </div>
    </div>
      </section>
    </>
  );
};

export default CategoryCreation;
