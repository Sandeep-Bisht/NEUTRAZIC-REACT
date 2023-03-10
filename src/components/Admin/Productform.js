import React, { useEffect, useState } from "react";
// import DataTable from '@bit/adeoy.utils.data-table';
import Sidemenu from "./Sidemenu";
import $ from "jquery";
import "./Dashboard.css";
import DashboardHeaader from "./DashboardHeaader";
import { baseUrl } from "../../utils/services";
import { useHistory } from "react-router-dom";
import axios from "axios";
var Userdata;
const Productform = (props) => {
  var productCount = 0;
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [manufactureres, setManufactureres] = useState([]);
  const [warehouse, setWarehouse] = useState([]);
  const [products, Setproducts] = useState([]);
  const [update, setUpdate] = useState(false);
  const [shwoTable, setShowTable] = useState(false);
  const [formErrors,setFormErrors]=useState({});
  //const [validate,setValidate]=useState(true);
  const [editableData] = useState(props.history.location.state);

  let [data, Setdata] = useState({
    name: "",
    description: "",
    warehouse: "",
    category: "",
    subcategory: "",
    quantity: "",
    inrMrp: "",
    dollerMrp: "",
    inrDiscount: "",
    dollerDiscount: "",
    manufacturer: "",
    type: "",
    image: [],
    otherImage: [],
  });

  const history = useHistory();

  const validateForm=(Value)=>{
    const error={};
    if(!Value.name){
      error.name="This field is required";
    }
    if(!Value.warehouse){
      error.warehouse="This field is required";
    }
    if(!Value.category){
      error.category="This field is required";
    }
     if(!Value.subcategory){
      error.subcategory="This field is required";
    }
    if(!Value.manufacturer){
      error.manufacturer="This field is required";
    }
    if(Value.image.length===0)
    {
      error.image="This field is required";
    }
    if(Value.otherImage.length===0)
    {
      error.otherImage="This field is required";
    }
    return error;
  }
   console.log(formErrors,"erroroasssssss");
   
   const submitData =async(e) => {
    e.preventDefault();


    const errors = validateForm(data)
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      const formData = new FormData();
    await formData.append("description", data.description);
    await formData.append("name", data.name);
    await formData.append("warehouse", data.warehouse);
    await formData.append("category", data.category);
    await formData.append("subcategory", data.subcategory);
    await formData.append("quantity", data.quantity);
    await formData.append("inrMrp", data.inrMrp);
    await formData.append("dollerMrp", data.dollerMrp);
    await formData.append("inrDiscount", data.inrDiscount);
    await formData.append("dollerDiscount", data.dollerDiscount);
    await formData.append("manufacturer", data.manufacturer);
    await formData.append("type", data.type);
    await formData.append("image", data.image);
    for (let item of data.otherImage) {
      await formData.append("otherImage", item);
    }
    const url = `${baseUrl}/api/product/add_product`;
    await fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        res.json();
        history.push("/AllProductsDetails");
      })
      .then((res) => {
        GetData();
        this.getAddOn();
      })
      .catch((err) => console.log(err));
    } else {
      console.log('Form has errors. Please correct them.');
    } 
    
  };

  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    GetWarehouse();
    GetCategory();
    GetManufacturer();
    GetData();
    GetSubCategory();
    if (editableData) {
      let {category, subcategory, manufacturer, type, ...restData} = editableData
      {category ? restData.category = category._id : restData.category = ""}
      {subcategory? restData.subcategory=subcategory._id:restData.subcategory=""}
      {manufacturer? restData.manufacturer=manufacturer._id:restData.manufacturer=""}
      {type? restData.type=type._id:restData.type=""}
      console.log(restData,"rest data ");
      Setdata(restData);
    }
    $(document).ready(function () {
      $(".update").click(function () {
        $(".update-btn").css("display", "block");
      });
    });
  }, []);

  const GetWarehouse = async () => {
    const response = await axios.get(
      `${baseUrl}/api/warehouse/get_all_warehouse`
    );
    setWarehouse(response.data.data);
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
      otherImage: item.otherImage,
      warehouse: item.warehouse,
      category: item.category,
      quantity: item.quantity,
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

    console.log(data,"inside update")
    const formData = new FormData();
    await formData.append("_id", data._id);
    await formData.append("description", data.description);
    await formData.append("name", data.name);
    await formData.append("warehouse", data.warehouse);
    await formData.append("category", data.category);
    await formData.append("subcategory", data.subcategory);
    await formData.append("quantity", data.quantity);
    await formData.append("inrMrp", data.inrMrp);
    await formData.append("dollerMrp", data.dollerMrp);
    await formData.append("inrDiscount", data.inrDiscount);
    await formData.append("dollerDiscount", data.dollerDiscount);
    await formData.append("manufacturer", data.manufacturer);
    await formData.append("type", data.type);
    await formData.append("image", data.image);
    for (let item of data.otherImage) {
      await formData.append("otherImage", item);
    }
    try {
      const response = await axios.put(
        `${baseUrl}/api/product/update_product_by_id`,
        formData
      );
      if (response.status == 200) {
        await GetData();
        setTimeout(() => {
          history.push("/AllProductsDetails");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showAllProductHandler = () => {
    setShowTable(true);
  };

  console.log(editableData,'editable data')

  return (
    <>
      <section id="body-pd">
        <div className="container-fluid">
          <DashboardHeaader />
          <div className="row px-0 dashboard-container">
            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-4 sidebar-dashboard">
              <Sidemenu />
            </div>
            <div className="col-xl-10 col-lg-9 col-md-9 col-sm-8 col-8 px-0">
            {Userdata != undefined ? (
                Userdata.role == "superAdmin" || Userdata.role == "Vendor" ? (
                  <form>
                    <div className="col-12 px-0">
                      <div className="card p-4 m-2 mt-4 product-form">
                        <h5>Product Creation</h5>
                        <div className="row">
                          <div className="col-6 p-1">
                                <input
                                  type="text"
                                  id="floatingform"
                                  className="form-control Dashborad-search"
                                  placeholder="Product Name"
                                  value={data.name}
                                  // defaultValue={
                                  //   editableData ? editableData.name : ""
                                  // }
                                  onChange={(e) => {
                                    Setdata({ ...data, name: e.target.value });
                                  }}
                                />
                                <p className="formerror">{formErrors.name}</p>
                                <label for="floatingform" >Product Name</label>
                              </div>
                              <div className="col-6 p-1">
                                <input
                                  type="file"
                                  className="form-control Dashborad-search"
                                  name="image[]"
                                  onChange={(e) => {
                                    Setdata({
                                      ...data,
                                      image: e.target.files[0],
                                    });
                                  }}
                                />
                                <p className="formerror">{formErrors.image}</p>
                              </div>
                              
                              <div className="col-6 p-1">
                                <input
                                  type="file"
                                  className="form-control Dashborad-search"
                                  multiple
                                  name="otherImage[]"
                                  // value={data.image}
                                  onChange={(e) => {
                                    Setdata({
                                      ...data,
                                      otherImage: e.target.files,
                                    });
                                  }}
                                />
                                <p className="formerror">{formErrors.otherImage}</p>
                              </div>
                              

                              <div className="col-6 p-1 required">
                                <select
                                  className="form-control Dashborad-search custom-select"
                                  value={data.category}
                                  // value={editableData ? editableData.category._id : ''}
                                  onChange={(e) => {
                                    Setdata({
                                      ...data,
                                      category: e.target.value,
                                    });
                                  }}
                                >
                                 
                                  <option value='' hidden defaultChecked>Select Category</option>
                                  {categories.map((el, ind) => (
                                    <option value={el._id} >{el.name}</option>
                                  ))}
                                </select>
                                <p className="formerror">{formErrors.category}</p>
                              </div>
                              <div className="col-6 p-1 required">
                                <select
                                  className="form-control Dashborad-search custom-select"
                                  value={data.subcategory}
                                  onChange={(e) => {
                                    Setdata({
                                      ...data,
                                      subcategory: e.target.value,
                                    });
                                  }}
                                >
                                  <option value='' disabled hidden>
                                    Select Sub Category
                                  </option>
                                  {subcategories.map((el, ind) => (
                                    <option value={el._id}>{el.name}</option>
                                  ))}
                                </select>
                                <p className="formerror">{formErrors.subcategory}</p>
                              </div>

                              { Userdata.role == "superAdmin" ? (
                                <div className="col-6 p-1 required">
                                <select
                                  className="form-control Dashborad-search custom-select"
                                  value={data.subcategory}
                                  onChange={(e) => {
                                    Setdata({
                                      ...data,
                                      subcategory: e.target.value,
                                    });
                                  }}
                                >
                                  <option value='' disabled hidden>
                                    Select Vendor
                                  </option>
                                  {subcategories.map((el, ind) => (
                                    <option value={el._id}>{el.name}</option>
                                  ))}
                                </select>
                              </div>
                              ) : <div className="col-6 p-1 form-floating required">
                              <input
                                type="text"
                                id="floatingform"
                                className="form-control Dashborad-search"
                                placeholder="Product Name"
                                value={Userdata && Userdata.username}
                              />
                            </div> }

                              

                              <div className="col-6 p-1 required">
                                <select
                                  className="form-control Dashborad-search custom-select"
                                  value={data.manufacturer}
                                  onChange={(e) => {
                                    Setdata({
                                      ...data,
                                      manufacturer: e.target.value,
                                    });
                                  }}
                                >
                                  <option value='' disabled hidden>
                                    Select Manufacturer
                                  </option>
                                  {manufactureres.map((el, ind) =>
                                    Userdata.role == "superAdmin" ? (
                                      <option value={el._id}>{el.name}</option>
                                    ) : Userdata._id == el.creatorId &&
                                      Userdata.role == "Vendor" ? (
                                      <option value={el._id}>{el.name}</option>
                                    ) : null
                                  )}
                                </select>
                                <p className="formerror">{formErrors.manufacturer}</p>
                              </div>                            

                              <div className="col-6 p-1 required">
                                <select
                                  className="form-control Dashborad-search custom-select"
                                  value={data.warehouse}
                                  onChange={(e) => {
                                    Setdata({
                                      ...data,
                                      warehouse: e.target.value,
                                    });
                                  }}
                                >
                                  <option value='' disabled hidden>
                                    Select warehouse
                                  </option>
                                  {warehouse.map((el, ind) =>
                                    Userdata.role == "superAdmin" ? (
                                      <option value={el._id}>{el.name}</option>
                                    ) : Userdata._id == el.creatorId &&
                                      Userdata.role == "Vendor" ? (
                                      <option value={el._id}>{el.name}</option>
                                    ) : null
                                  )}                                 
                                </select>
                                <p className="formerror">{formErrors.warehouse}</p>
                              </div>
                              <div className="col-6 p-1 form-floating">
                                <input
                                  type="number"
                                  id="floatingform"
                                  className="form-control Dashborad-search"
                                  // defaultValue={
                                  //   editableData ? editableData.quantity : ""
                                  // }
                                  defaultValue={
                                    data.quantity
                                  }
                                  placeholder="Quantity of Product"
                                  onChange={(e) => {
                                    Setdata({
                                      ...data,
                                      quantity: e.target.value,
                                    });
                                  }}
                                />
                                <label for="floatingform">
                                  Quantity of Product
                                </label>
                              </div>
                              <div className="col-3 p-1 form-floating">
                                <input
                                  type="text"
                                  id="floatingform"
                                  className="form-control Dashborad-search"
                                  placeholder="MRP In Rupees"
                                  defaultValue={
                                    data.inrMrp
                                  }
                                  // defaultValue={
                                  //   editableData ? editableData.inrMrp : ""
                                  // }
                                  onChange={(e) => {
                                    Setdata({
                                      ...data,
                                      inrMrp: e.target.value,
                                    });
                                  }}
                                />
                                <label for="floatingform">MRP In Rupees</label>
                              </div>
                              <div className="col-3 p-1 form-floating">
                                <input
                                  type="text"
                                  id="floatingform"
                                  className="form-control Dashborad-search"
                                  // defaultValue={
                                  //   editableData ? editableData.inrDiscount : ""
                                  // }
                                  defaultValue={
                                    data.inrDiscount
                                  }
                                  placeholder="Price after discount In Rupees"
                                  onChange={(e) => {
                                    Setdata({
                                      ...data,
                                      inrDiscount: e.target.value,
                                    });
                                  }}
                                />
                                <label for="floatingform">
                                  Price after Discount
                                </label>
                              </div>
                              <div className="col-3 p-1 form-floating">
                                <input
                                  type="text"
                                  id="floatingform"
                                  className="form-control Dashborad-search"
                                  placeholder="MRP In Doller"
                                  defaultValue={
                                    data.dollerMrp
                                  }
                                  // defaultValue={
                                  //   editableData ? editableData.dollerMrp : ""
                                  // }
                                  onChange={(e) => {
                                    Setdata({
                                      ...data,
                                      dollerMrp: e.target.value,
                                    });
                                  }}
                                />
                                <label for="floatingform">MRP In Dollar</label>
                              </div>

                              <div className="col-3 p-1 form-floating">
                                <input
                                  type="text"
                                  id="floatingform"
                                  className="form-control Dashborad-search"
                                  defaultValue={
                                    data.dollerDiscount
                                  }
                                  // defaultValue={
                                  //   editableData
                                  //     ? editableData.dollerDiscount
                                  //     : ""
                                  // }
                                  placeholder="Price after discount In Dollers"
                                  onChange={(e) => {
                                    Setdata({
                                      ...data,
                                      dollerDiscount: e.target.value,
                                    });
                                  }}
                                />
                                <label for="floatingform">
                                  Discount In Dollar
                                </label>
                              </div>
                              <div className="col-6 p-1">
                                <select
                                  className="form-control Dashborad-search custom-select"
                                  value={
                                    data.type
                                  }
                                  // defaultValue={
                                  //   editableData ? editableData.type : ""
                                  // }
                                  onChange={(e) => {
                                    Setdata({ ...data, type: e.target.value });
                                  }}
                                >
                                  <option value='' hidden defaultChecked>Select Product Type</option>
                                  <option value="Trending Product">
                                    Trending Product
                                  </option>
                                  {/* <option></option> */}
                                </select>
                              </div>
                              <div className="col-6 p-1 form-floating">
                                <textarea
                                  className="form-control h-100"
                                  id="floatingform"
                                  placeholder="Product Description"
                                  // defaultValue={
                                  //   editableData ? editableData.description : ""
                                  // }
                                  defaultValue={
                                    data.description
                                  }
                                  rows="3"
                                  onChange={(e) => {
                                    Setdata({
                                      ...data,
                                      description: e.target.value,
                                    });
                                  }}
                                ></textarea>
                                <label for="formfloating">
                                  Product Description
                                </label>
                              </div>

                              <div className="row">
                                {editableData ? (
                                  <div className="col-6 p-1">
                                    <button
                                      className="btn btn-registration"
                                      onClick={(e) =>
                                        UpdateProduct(e, data._id)
                                      }
                                    >
                                      Update
                                    </button>
                                  </div>
                                ) : (
                                  <div className="col-6 p-1">
                                    <button
                                      className="btn btn-primary submit"
                                      type="submit"
                                    >
                                      Submit
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        {/* </div> */}
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
