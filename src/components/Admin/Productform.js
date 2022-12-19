import React, { useEffect, useState } from "react";
// import DataTable from '@bit/adeoy.utils.data-table';
import Sidemenu from "./Sidemenu";
import $ from "jquery";
import "./Dashboard.css";
var Userdata;
// http://localhost:3010/api/product/add_product
const Productform = () => {
  var productCount = 0;
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [manufactureres, setManufactureres] = useState([]);
  const [products, Setproducts] = useState([]);
  const [update, setUpdate] = useState(false);
  let [data, Setdata] = useState({
    name: "",
    description: "",
    storage: "",
    category: "",
    subcategory: "",
    inrMrp: "",
    dollerMrp: "",
    inrDiscount: "",
    dollerDiscount: "",
    manufacturer: "",
    type: "",
    image: [],
    //featuredImage : [],
  });

  console.log("on change data", data.image)

  const submitData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    await formData.append("description", data.description);
    await formData.append("name", data.name);
    await formData.append("storage", data.storage);
    await formData.append("category", data.category);
    await formData.append("subcategory", data.subcategory);
    await formData.append("inrMrp", data.inrMrp);
    await formData.append("dollerMrp", data.dollerMrp);
    await formData.append("inrDiscount", data.inrDiscount);
    await formData.append("dollerDiscount", data.dollerDiscount);
    await formData.append("manufacturer", data.manufacturer);
    await formData.append("type", data.type);
    await formData.append("image", data.image);
    //await formData.append("featuredImage", data.featuredImage)    
    //const url="http://144.91.110.221:3033/api/product/add_product"
    const url = "http://localhost:3033/api/product/add_product";
    await fetch(url, {
     
      mode: 'no-cors',
      method: "POST",
      body: formData,
    })
      .then((res) =>res.json())
      // .then((res) => {
      //   this.getAddOn();
      // })
      .catch((err) => console.log(err));
    //console.log(formData)
  };

  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    GetCategory();
    GetManufacturer();
    GetData();
    GetSubCategory();

    $(document).ready(function() {
      $(".update").click(function() {
        $(".update-btn").css("display", "block");
      });
    });
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

  const GetManufacturer = async () => {
    //await fetch("http://144.91.110.221:3033/api/manufacture/all_manufacture")
    await fetch("http://localhost:3033/api/manufacture/all_manufacture")
      .then((res) => res.json())
      .then(async (data) => {
        setManufactureres(data.data);
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };

  // Api for Get Products uploded by Admin //
  const GetData = async () => {
    //await fetch("http://144.91.110.221:3033/api/product/all_product")
    await fetch("http://localhost:3033/api/product/all_product")
      .then((res) => res.json())
      .then(async (data) => {
        Setproducts(data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  // End for products API //
  const DeleteProduct = async (_id) => {
    //await fetch("http://144.91.110.221:3033/api/product/delete_product_by_id", {
    await fetch("http://localhost:3033/api/product/delete_product_by_id", {
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
        GetData();
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  const data1 = [];

  if (Userdata != undefined && Userdata.role == "Vendor") {
    {
      products.map((item, index) => {
        data1.push(
          item.manufacturer.name == Userdata.organization
            ? {
                sr_no: index + 1,
                name: item.name,
                category: item.category,
                manufacturer: item.manufacturer.name,
                "INRprice/Dollerprice": item.inrMrp + "/" + item.dollerMrp,
                "INRdiscount/Doolerdiscount":
                  item.inrDiscount + "/" + item.dollerDiscount,
                action:
                  Userdata != undefined && Userdata.role == "superAdmin" ? (
                    <>
                      <button className="btnbtn-danger data-table-button">
                        <i
                          className="bx bx-trash"
                          onClick={() => {
                            if (window.confirm("Are you sure ?")) {
                              DeleteProduct(item._id);
                            } else {
                              return false;
                            }
                          }}
                        ></i>
                      </button>{" "}
                      <button
                        onClick={() => Editproduct(item)}
                        className=" btnbtn-danger"
                      >
                        <i className="bx bx-edit"></i>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => Editproduct(item)}
                      className="update btnbtn-danger"
                    >
                      <i className="bx bx-show"></i>
                    </button>
                  ),
              }
            : null
        );
      });
    }
  } else if (
    (Userdata != undefined && Userdata.role == "superAdmin") ||
    (Userdata != undefined && Userdata.role == "Manager")
  ) {
    {
      products.map((item, index) => {
        data1.push({
          sr_no: index + 1,
          name: item.name,
          category: item.category,
          manufacturer: item.manufacturer.name,
          "INRprice/Dollerprice": item.inrMrp + "/" + item.dollerMrp,
          "INRdiscount/Doolerdiscount":
            item.inrDiscount + "/" + item.dollerDiscount,
          action:
            Userdata != undefined && Userdata.role == "superAdmin" ? (
              <>
                <button className="btnbtn-danger">
                  <i
                    className="bx bx-trash"
                    onClick={() => {
                      if (window.confirm("Are you sure ?")) {
                        DeleteProduct(item._id);
                      } else {
                        return false;
                      }
                    }}
                  ></i>
                </button>{" "}
                <button
                  onClick={() => {
                    Editproduct(item);
                    setUpdate(true);
                  }}
                  className="btnbtn-danger"
                >
                  <i className="bx bx-edit"></i>
                </button>
              </>
            ) : (
              <button
                onClick={() => Editproduct(item)}
                className="btnbtn-danger"
              >
                <i className="bx bx-show "></i>
              </button>
            ),
        });
      });
    }
  }
  const columns = [
    { title: "SR NO", data: "sr_no" },
    { title: "Name", data: "name" },
    { title: "Manufacturer", data: "manufacturer" },
    { title: "INR Price/ Doller Price", data: "INRprice/Dollerprice" },
    {
      title: "INR Discount/ Doller Discount",
      data: "INRdiscount/Doolerdiscount",
    },
    { title: "Action", data: "action" },
  ];
  const click = (row) => {
    console.log(row);
  };
  const Editproduct = (item) => {
    let obj = {
      _id: item._id,
      name: item.name,
      image: item.image,
      // featuredImage: item.featuredImage,
      storage: item.storage,
      category: item.category,
      inrMrp: item.inrMrp,
      inrDiscount: item.inrDiscount,
      dollerMrp: item.dollerMrp,
      dollerDiscount: item.dollerDiscount,
      manufacturer: item.manufacturer,
      description: item.description,
    };
    Setdata(obj);
  };

  const UpdateProduct = async (e, _id) => {
    e.preventDefault();
    console.log(_id, "hello deepak  ");
    await fetch("http://144.91.110.221:3033/api/product/update_product_by_id", {
      method: "Put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        GetData();
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  console.log("inside ")

  return (
    <>
      <div className="container-fluid">
        {" "}
        <a href="#" className="nav__logo">
          <img
            src={require("../../Images/logo2.png")}
            className="dashboard-logo"
            alt="image"
          />
        </a>
      </div>
      <div id="body-pd">
        <Sidemenu />
        {Userdata != undefined ? (
          Userdata.role == "superAdmin" || Userdata.role == "Vendor" ? (
            <form
            enctype="multipart/form-data">
              <div className="container mb-5">
                <div className="row">
                  {/* <div className="col-1"></div> */}
                  <div className="col-10">
                    <div className="card p-4 m-2 product-form">
                      <h5>Product Creation</h5>

                      <div className="row">
                        <div className="col-6 p-1 ">
                          <input
                            type="text"
                            className="form-control Dashborad-search"
                            placeholder="Product Name"
                            defaultValue={update == true ? data.name : ""}
                            onChange={(e) => {
                              Setdata({ ...data, name: e.target.value });
                            }}
                          />
                        </div>
                        <div className="col-6 p-1">
                          <input
                            type="file"
                            name="image[]"
                            multiple
                            className="form-control Dashborad-search"
                            // value={data.image}
                            onChange={(e) => {
                              //console.log(e.target.files,"payloadddddddddddddddddddddddddddddd data")
                              Setdata({ ...data, image: e.target.files});
                            }}
                          />
                        </div>

                        {/* <div className="col-6 p-1">
                          <input
                            type="file"
                            className="form-control Dashborad-search"
                            multiple
                            // value={data.image}
                            onChange={(e) => {
                              Setdata({ ...data, featuredImage: e.target.files });
                            }}
                          />
                        </div> */}

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
                          <select
                            className="form-control Dashborad-search"
                            defaultValue={
                              update == true ? data.subcategory : ""
                            }
                            onChange={(e) => {
                              Setdata({ ...data, subcategory: e.target.value });
                            }}
                          >
                            <option selected>Select Sub Category</option>
                            {subcategories.map((el, ind) => (
                              <option value={el._id}>{el.name}</option>
                            ))}
                          </select>
                        </div>

                        <div className="col-6 p-1">
                          <select
                            className="form-control Dashborad-search"
                            defaultValue={
                              update == true ? data.manufacturer : ""
                            }
                            onChange={(e) => {
                              Setdata({
                                ...data,
                                manufacturer: e.target.value,
                              });
                            }}
                          >
                            <option selected>Select Manufacturer</option>
                            {manufactureres.map((el, ind) =>
                              Userdata.role == "superAdmin" ? (
                                <option value={el._id}>{el.name}</option>
                              ) : Userdata.organization == el.name &&
                                Userdata.role == "Vendor" ? (
                                <option value={el._id}>{el.name}</option>
                              ) : null
                            )}
                          </select>
                        </div>

                        <div className="col-6 p-1">
                          <input
                            type="text"
                            className="form-control Dashborad-search"
                            defaultValue={update == true ? data.storage : ""}
                            placeholder="Storage "
                            onChange={(e) => {
                              Setdata({ ...data, storage: e.target.value });
                            }}
                          />
                        </div>
                        <div className="col-3 p-1">
                          <input
                            type="text"
                            className="form-control Dashborad-search"
                            placeholder="MRP In Rupees"
                            defaultValue={update == true ? data.inrMrp : ""}
                            onChange={(e) => {
                              Setdata({ ...data, inrMrp: e.target.value });
                            }}
                          />
                        </div>
                        <div className="col-3 p-1">
                          <input
                            type="text"
                            className="form-control Dashborad-search"
                            defaultValue={
                              update == true ? data.inrDiscount : ""
                            }
                            placeholder="Discount In Rupees "
                            onChange={(e) => {
                              Setdata({ ...data, inrDiscount: e.target.value });
                            }}
                          />
                        </div>
                        <div className="col-3 p-1">
                          <input
                            type="text"
                            className="form-control Dashborad-search"
                            placeholder="MRP In Doller "
                            defaultValue={update == true ? data.dollerMrp : ""}
                            onChange={(e) => {
                              Setdata({ ...data, dollerMrp: e.target.value });
                            }}
                          />
                        </div>

                        <div className="col-3 p-1">
                          <input
                            type="text"
                            className="form-control Dashborad-search"
                            defaultValue={
                              update == true ? data.dollerDiscount : ""
                            }
                            placeholder="Discount In Dollers"
                            onChange={(e) => {
                              Setdata({
                                ...data,
                                dollerDiscount: e.target.value,
                              });
                            }}
                          />
                        </div>

                        <div className="col-6 p-1">
                          <textarea
                            className="form-control"
                            placeholder="Product Description"
                            defaultValue={
                              update == true ? data.description : ""
                            }
                            rows="3"
                            onChange={(e) => {
                              Setdata({ ...data, description: e.target.value });
                            }}
                          ></textarea>
                        </div>
                        <div className="col-6 p-1">
                          <select
                            className="form-control Dashborad-search"
                            defaultValue={update == true ? data.type : ""}
                            onChange={(e) => {
                              Setdata({ ...data, type: e.target.value });
                            }}
                          >
                            <option>Select Product Type</option>
                            <option value="Trending Product">
                              Trending Product
                            </option>
                            {/* <option></option> */}
                          </select>
                        </div>
                        {update == false ? (
                          <div className="col-6 pt-4">
                            <button
                              className="btn btn-primary submit"
                              onClick={(e) => submitData(e)}
                            >
                              Submit
                            </button>
                          </div>
                        ) : (
                          <div className="col-6 p-1">
                            <button
                              className="btn btn-registration"
                              onClick={(e) => UpdateProduct(e, data._id)}
                            >
                              Update
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

        {update ? (
          <div className="create-manu container text-right">
            <span>Create Manufacturer</span>
            <button onClick={() => setUpdate(false)}>
              <i className="bx bx-plus"></i>
            </button>
          </div>
        ) : null}

        {/* Table for Admin Uploaded Products */}
        <div className="container table-responsive">
          {/* <DataTable
        data={data1}
        columns={columns}
        striped={true}
        hover={true}
        responsive={true}
        // onClickRow={click}
      /> */}
        </div>
      </div>
      {/* End Of products table */}
    </>
  );
};

export default Productform;
