import React, { useEffect, useState } from "react";
// import DataTable from '@bit/adeoy.utils.data-table';
import Sidemenu from "./Sidemenu";
import $ from "jquery";
import "./Dashboard.css";
import DashboardHeaader from "./DashboardHeaader";
import { baseUrl } from "../../utils/services";
var Userdata;
// http://localhost:3010/api/product/add_product
const Productform = (props) => {

  var productCount = 0;
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [manufactureres, setManufactureres] = useState([]);
  const [products, Setproducts] = useState([]);
  const [update, setUpdate] = useState(false);
  const [shwoTable, setShowTable] = useState(false);
  const [editableData]=useState(props.history.location.state);
 
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
    otherImage : []
  });


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
    await formData.append("image", data.image) 
    for(let item of data.otherImage){
      await formData.append("otherImage", item);
    }           
    const url = `${baseUrl}/api/product/add_product`;
    await fetch(url, {
      mode: 'no-cors',
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      // .then((res) => {
      //   this.getAddOn();
      // })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    GetCategory();
    GetManufacturer();
    GetData();
    GetSubCategory();

    $(document).ready(function () {
      $(".update").click(function () {
        $(".update-btn").css("display", "block");
      });
    });
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

  // Api for Get Products uploded by Admin //
  const GetData = async () => {
    await fetch(`${baseUrl}/api/product/all_product`)
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
    await fetch(`${baseUrl}/api/product/delete_product_by_id`, {
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
  // const data1 = [];

  // if (Userdata != undefined && Userdata.role == "Vendor") {
  //   {
  //     products.map((item, index) => {
  //       data1.push(
  //         item.manufacturer.name == Userdata.organization
  //           ? {
  //             sr_no: index + 1,
  //             name: item.name,
  //             category: item.category,
  //             manufacturer: item.manufacturer.name,
  //             "INRprice/Dollerprice": item.inrMrp + "/" + item.dollerMrp,
  //             "INRdiscount/Doolerdiscount":
  //               item.inrDiscount + "/" + item.dollerDiscount,
  //             action:
  //               Userdata != undefined && Userdata.role == "superAdmin" ? (
  //                 <>
  //                   <button className="btnbtn-danger data-table-button">
  //                     <i
  //                       className="bx bx-trash"
  //                       onClick={() => {
  //                         if (window.confirm("Are you sure ?")) {
  //                           DeleteProduct(item._id);
  //                         } else {
  //                           return false;
  //                         }
  //                       }}
  //                     ></i>
  //                   </button>{" "}
  //                   <button
  //                     onClick={() => Editproduct(item)}
  //                     className=" btnbtn-danger"
  //                   >
  //                     <i className="bx bx-edit"></i>
  //                   </button>
  //                 </>
  //               ) : (
  //                 <button
  //                   onClick={() => Editproduct(item)}
  //                   className="update btnbtn-danger"
  //                 >
  //                   <i className="bx bx-show"></i>
  //                 </button>
  //               ),
  //           }
  //           : null
  //       );
  //     });
  //   }
  // } else if (
  //   (Userdata != undefined && Userdata.role == "superAdmin") ||
  //   (Userdata != undefined && Userdata.role == "Manager")
  // ) {
  //   {
  //     products.map((item, index) => {
  //       data1.push({
  //         sr_no: index + 1,
  //         name: item.name,
  //         category: item.category,
  //         manufacturer: item.manufacturer.name,
  //         "INRprice/Dollerprice": item.inrMrp + "/" + item.dollerMrp,
  //         "INRdiscount/Doolerdiscount":
  //           item.inrDiscount + "/" + item.dollerDiscount,
  //         action:
  //           Userdata != undefined && Userdata.role == "superAdmin" ? (
  //             <>
  //               <button className="btnbtn-danger">
  //                 <i
  //                   className="bx bx-trash"
  //                   onClick={() => {
  //                     if (window.confirm("Are you sure ?")) {
  //                       DeleteProduct(item._id);
  //                     } else {
  //                       return false;
  //                     }
  //                   }}
  //                 ></i>
  //               </button>{" "}
  //               <button
  //                 onClick={() => {
  //                   Editproduct(item);
  //                   setUpdate(true);
  //                 }}
  //                 className="btnbtn-danger"
  //               >
  //                 <i className="bx bx-edit"></i>
  //               </button>
  //             </>
  //           ) : (
  //             <button
  //               onClick={() => Editproduct(item)}
  //               className="btnbtn-danger"
  //             >
  //               <i className="bx bx-show "></i>
  //             </button>
  //           ),
  //       });
  //     });
  //   }
  // }
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
      otherImage : item.otherImage,
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
    await fetch(`${baseUrl}/api/product/update_product_by_id`, {
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


  const showAllProductHandler = () => {
    setShowTable(true);
  }

  return (
    <> 
      <section id="body-pd">
      <div className="container-fluid">
       <DashboardHeaader/>
       <div className="row">
        <div className="col-2 px-0">
        <Sidemenu />
        </div>
        <div className="col-10 px-0">
        {Userdata != undefined ? (
          Userdata.role == "superAdmin" || Userdata.role == "Vendor" ? (
            <form
              encType="multipart/form-data">
              <div className="container-fluid">
                <div className="row px-0">
                  {/* <div className="col-1"></div> */}
                  <div className="col-10 px-0">
                    <div className="card p-4 m-2 product-form" id="Allproduct-form">
                      <h5>Product Creation</h5>

                      <div className="row">
                        <div className="col-6 p-1 form-floating ">
                          <input
                            type="text"
                            id="floatingform"
                            className="form-control Dashborad-search"
                            placeholder="Product Name"
                            defaultValue={editableData  ? editableData.name : ""}
                            onChange={(e) => {
                              Setdata({ ...data, name: e.target.value });
                            }}
                          />
                          <label for="floatingform">Product Name</label>
                        </div>
                        <div className="col-6 p-1">
                          <input
                            type="file"
                            name="image[]"                                                
                            className="form-control Dashborad-search"
                            accept="image/png, .jpeg, .jpg"
                            //value={editableData  ? editableData.image[0].path : ""}
                            onChange={(e) => {
                              Setdata({ ...data, image: e.target.files[0] });
                            }}
                          />
                        </div>

                        <div className="col-6 p-1">
                          <input
                            type="file"
                            className="form-control Dashborad-search"
                            multiple
                            // value={data.image}
                            onChange={(e) => {
                              Setdata({ ...data, otherImage: e.target.files });
                            }}
                          />
                        </div>

                        <div className="col-6 p-1">
                          <select
                            className="form-control Dashborad-search"
                            onChange={(e) => {
                              Setdata({ ...data, category: e.target.value });
                            }}
                          >
                            <option selected >{editableData  ? editableData.category.name : "Select Category"}</option>
                            {categories.map((el, ind) => (
                              <option value={el._id}>{el.name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="col-6 p-1">
                          <select
                            className="form-control Dashborad-search"
                           onChange={(e) => {
                              Setdata({ ...data, subcategory: e.target.value });
                            }}
                          >
                            <option selected>{editableData  ? editableData.subcategory.name : "Select Sub Category"}</option>
                            {subcategories.map((el, ind) => (
                              <option value={el._id}>{el.name}</option>
                            ))}
                          </select>
                        </div>

                        <div className="col-6 p-1">
                          <select
                            className="form-control Dashborad-search"
                            onChange={(e) => {
                              Setdata({
                                ...data,
                                manufacturer: e.target.value,
                              });
                            }}
                          >
                            <option selected>{editableData  ? editableData.manufacturer.name : "Select Manufacturer"}</option>
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

                        <div className="col-6 p-1 form-floating">
                          <input
                            type="text"
                            id="floatingform"
                            className="form-control Dashborad-search"
                            defaultValue={editableData  ? editableData.storage : ""}
                            placeholder="Storage"
                            onChange={(e) => {
                              Setdata({ ...data, storage: e.target.value });
                            }}
                          />
                          <label for="floatingform">Storage</label>
                        </div>
                        <div className="col-3 p-1 form-floating">
                          <input
                            type="text"
                            id="floatingform"
                            className="form-control Dashborad-search"
                            placeholder="MRP In Rupees"
                            defaultValue={editableData  ? editableData.inrMrp : ""}
                            onChange={(e) => {
                              Setdata({ ...data, inrMrp: e.target.value });
                            }}
                          />
                          <label for="floatingform">MRP In Rupees</label>
                        </div>
                        <div className="col-3 p-1 form-floating">
                          <input
                            type="text"
                            id="floatingform"
                            className="form-control Dashborad-search"
                            defaultValue={
                              editableData  ? editableData.inrDiscount : ""
                            }
                            placeholder="Price after discount In Rupees"
                            onChange={(e) => {
                              Setdata({ ...data, inrDiscount: e.target.value });
                            }}
                          />
                          <label for="floatingform">Price after Discount</label>
                        </div>
                        <div className="col-3 p-1 form-floating">
                          <input
                            type="text"
                            id="floatingform"
                            className="form-control Dashborad-search"
                            placeholder="MRP In Doller"
                            defaultValue={editableData  ? editableData.dollerMrp : ""}
                            onChange={(e) => {
                              Setdata({ ...data, dollerMrp: e.target.value });
                            }}
                          />
                          <label for="floatingform">MRP In Doller</label>
                        </div>

                        <div className="col-3 p-1 form-floating">
                          <input
                            type="text"
                            id="floatingform"
                            className="form-control Dashborad-search"
                            defaultValue={
                              editableData  ? editableData.dollerDiscount : ""
                            }
                            placeholder="Price after discount In Dollers"
                            onChange={(e) => {
                              Setdata({
                                ...data,
                                dollerDiscount: e.target.value,
                              });
                            }}
                          />
                          <label for="floatingform">Discount In Dollers</label>
                        </div>

                        <div className="col-6 p-1 form-floating">
                          <textarea
                            className="form-control"
                            id="floatingform"
                            placeholder="Product Description"
                            defaultValue={
                              editableData  ? editableData.description : ""
                            }
                            rows="3"
                            onChange={(e) => {
                              Setdata({ ...data, description: e.target.value });
                            }}
                          ></textarea>
                          <label for="formfloating">Product Description</label>
                        </div>
                        <div className="col-6 p-1">
                          <select
                            className="form-control Dashborad-search"
                            defaultValue={editableData  ? editableData.typ : ""}
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
                        <div className="row">
                        {editableData  ? (
                          
                          <div className="col-6 p-1">
                            <button
                              className="btn btn-registration"
                              onClick={(e) => UpdateProduct(e, data._id)}
                            >
                              Update
                            </button>
                            
                          </div>
                          

                        ) : (
                          <div className="col-6 p-1">
                            <button
                              className="btn btn-primary submit"
                              onClick={(e) => submitData(e)}
                            >
                              Submit
                            </button>
                          </div>
                          
                        )}
                        </div>
                      </div>
                    </div>
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

export default Productform;
