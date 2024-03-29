import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import $ from "jquery";
import Sidemenu from "./Sidemenu";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { GiFactory } from "react-icons/gi";
import { FiUserCheck } from "react-icons/fi";
import { GiBoxUnpacking } from "react-icons/gi";
import { BiCategory } from "react-icons/bi";
import { BsListNested } from "react-icons/bs";
import DashboardHeaader from "./DashboardHeaader";
import { baseUrl } from "../../utils/services";
import PageNotFound from "../PageNotFound";
import LineChart from "../../LineChart";
import PieChart from "../PieChart";
import { useContext } from "react";
import CurrencyContext from "../../routes/ContextApi/CurrencyContext";

var Userdata;
const Dashboard = () => {
  const [Manufacturer, setManufacturer] = useState("");
  const [products, Setproducts] = useState("");
  const [Orders, setOrders] = useState("");
  const [users, setUsers] = useState("");
  const [categories, setCategories] = useState("");
  const [subCategories, setSubCategories] = useState("");
  const [localuser, setLocaluser] = useState("");
  const [blogs, setBlogs] = useState("");
  const [warehouse, setWarehouse] = useState("")
  const { loginState, setLoginState } = useContext(CurrencyContext);
  const [isLogin, setIsLogin] = useState(loginState)

  useEffect(() => {
    setLoginState(loginState)
    setIsLogin(loginState)
  }, [loginState])

  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    GetUser();
    GetCategory();
    GetSubCategory();
    GetManufacturer();
    GetOrders();
    GetProducts();
    GetLocalUserData();
    GetBlogs();
    GetWarehouse();
  }, [loginState]);

  const GetLocalUserData = () => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    const users = Userdata;
    setLocaluser(users);
  };

  const GetProducts = async () => {
    await fetch(`${baseUrl}/api/product/all_product`)
      .then((res) => res.json())
      .then(async (data) => {
        if(Userdata!==undefined && Userdata.role==="Vendor")
    {
       var responseData=data.data.filter((item)=>{
        return (Userdata.manufacturer===item.manufacturer.name);
       })
       Setproducts(responseData.length);
    }
    else{
      Setproducts(data.data.length);
    }
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  const GetBlogs = async () => {
    await fetch(`${baseUrl}/api/blogs/find_all_slug`)
      .then((res) => res.json())
      .then(async (data) => {
        setBlogs(data.data.length);
      })
  }
  const GetCategory = async () => {
    await fetch(`${baseUrl}/api/category/all_category`)
      .then((res) => res.json())
      .then(async (data) => {
        setCategories(data.data.length);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const GetSubCategory = async () => {
    await fetch(`${baseUrl}/api/subcategory/all_subcategory`)
      .then((res) => res.json())
      .then(async (data) => {
        setSubCategories(data.data.length);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const GetUser = async () => {
    await fetch(`${baseUrl}/api/auth/allusers`)
      .then((res) => res.json())
      .then(async (data) => {
        setUsers(data.data.length);
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };
  const GetOrders = async () => {
    await fetch(`${baseUrl}/api/order/all_order`)
      .then((res) => res.json())
      .then(async (data) => {
        if(Userdata.role=="Vendor")
        {
        {
          const orderArray=data.data.filter((items)=>{
            return (Userdata.manufacturer==items.order[0].order[0].manufacturer);
          })
          setOrders(orderArray.length);
        }
        }else{
          setOrders(data.data.length);
        }
        
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };

  const GetManufacturer = async () => {
    await fetch(`${baseUrl}/api/manufacture/all_manufacture`)
      .then((res) => res.json())
      .then(async (data) => {
        if(Userdata!==undefined && Userdata.role==="Vendor")
    {
       var responseData=data.data.filter((item)=>{
        return (Userdata.manufacturer===item.name);
       })
       setManufacturer(responseData.length);
    }
    else{
      setManufacturer(data.data.length);
    }
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };
  const GetWarehouse = async () => {
    await fetch(`${baseUrl}/api/warehouse/get_all_warehouse`)
      .then((res) => res.json())
      .then(async (data) => {
        setWarehouse(data.data.length)
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  return (
    <>
      {localuser !== null ? (
        localuser.role == "superAdmin" || localuser.role == "Vendor" ? (
          <section id="body-pd">
            <div className="container-fluid">
              <DashboardHeaader />
              <div className="row px-0 dashboard-container">
                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-4 sidebar-dashboard">
                  <Sidemenu />
                </div>
                <div className="col-xl-10 col-lg-9 col-md-9 col-sm-8 col-8">
                  <main className="main graph-main-div">
                    <div className="row cardsec-row">
                      {
                        Userdata!==undefined && Userdata!=="" ? (
                          Userdata.role==="Vendor" ? (
                            <>
                            <div className="col-lg-3 col-md-6 col-sm-6 col-12 pt-4">
                        <Link to={"/Configuration/" + "AllManufactureDetails"}>
                          <div className="card cardsec">
                            <div className="row">
                              <div className="col-12">
                                <div className="d-flex justify-content-between align-items-center">
                                  <div>
                                    <GiFactory className="cardicon" />
                                    <h6 className="cardheads">Manufacturer </h6>
                                  </div>
                                  <div>
                                    <span className="count1">{Manufacturer}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-6 col-12 pt-4">
                        <Link to={"/Configuration/" + "AllProductsDetails"}>
                          <div className="card cardsec">
                            <div className="row">
                              <div className="col-12">
                                <div className="d-flex justify-content-between align-items-center">
                                  <div>
                                    <GiBoxUnpacking className="cardicon" />
                                    <h6 className="cardheads">Products </h6>
                                  </div>
                                  <div>
                                    <span className="count1">{products}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-6 col-12 pt-4">
                        <Link to={"/Configuration/" + "AllWarehouseDetails"}>
                          <div className="card cardsec">
                            <div className="row">
                              <div className="col-12">
                                <div className="d-flex justify-content-between align-items-center">
                                  <div>
                                    <BsListNested className="cardicon" />
                                    <h6 className="cardheads">Warehouse</h6>
                                  </div>
                                  <div>
                                    <span className="count1">{warehouse}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-6 col-12 pt-4">
                        <Link to={"/NewOrder/" + "Pending/"}>
                          <div className="card cardsec">
                            <div className="row">
                              <div className="col-12">
                                <div className="d-flex justify-content-between align-items-center">
                                  <div>
                                    <BsListNested className="cardicon" />
                                    <h6 className="cardheads">Orders</h6>
                                  </div>
                                  <div>
                                    <span className="count1">{Orders}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                      </>
                          ):
                          <>
                          <div className="col-lg-3 col-md-6 col-sm-6 col-12 pt-4">
                        <Link to={"/Configuration/" + "AllManufactureDetails"}>
                          <div className="card cardsec">
                            <div className="row">
                              <div className="col-12">
                                <div className="d-flex justify-content-between align-items-center">
                                  <div>
                                    <GiFactory className="cardicon" />
                                    <h6 className="cardheads">Manufacturer </h6>
                                  </div>
                                  <div>
                                    <span className="count1">{Manufacturer}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>

                      <div className="col-lg-3 col-md-6 col-sm-6 col-12 pt-4">
                        <Link to={"/IAM/"+"AllUsers"}>
                          <div className="card cardsec">
                            <div className="row">
                              <div className="col-12">
                                <div className="d-flex justify-content-between align-items-center">
                                  <div>
                                    <FiUserCheck className="cardicon" />
                                    <h6 className="cardheads">Users </h6>
                                  </div>
                                  <div>
                                    <span className="count1">{users}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>

                      <div className="col-lg-3 col-md-6 col-sm-6 col-12 pt-4">
                        <Link to="/AllBlogs">
                          <div className="card cardsec">
                            <div className="row">
                              <div className="col-12">
                                <div className="d-flex justify-content-between align-items-center">
                                  <div>
                                    <BsCartPlus className="cardicon" />
                                    <h6 className="cardheads">Blogs </h6>
                                  </div>
                                  <div>
                                    <span className="count1">{blogs}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-6 col-12 pt-4">
                        <Link to={"/Configuration/" + "AllProductsDetails"}>
                          <div className="card cardsec">
                            <div className="row">
                              <div className="col-12">
                                <div className="d-flex justify-content-between align-items-center">
                                  <div>
                                    <GiBoxUnpacking className="cardicon" />
                                    <h6 className="cardheads">Products </h6>
                                  </div>
                                  <div>
                                    <span className="count1">{products}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-6 col-12 pt-4">
                        <Link to={"/Configuration/" + "AllCategoriesDetails"}>
                          <div className="card cardsec">
                            <div className="row">
                              <div className="col-12">
                                <div className="d-flex justify-content-between align-items-center">
                                  <div>
                                    <BiCategory className="cardicon" />
                                    <h6 className="cardheads">Category </h6>
                                  </div>
                                  <div>
                                    <span className="count1">{categories}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-6 col-12 pt-4">
                        <Link to={"/Configuration/" + "AllSubCategoriesDetails"}>
                          <div className="card cardsec">
                            <div className="row">
                              <div className="col-12">
                                <div className="d-flex justify-content-between align-items-center">
                                  <div>
                                    <BsListNested className="cardicon" />
                                    <h6 className="cardheads">Sub category</h6>
                                  </div>
                                  <div>
                                    <span className="count1">{subCategories}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-6 col-12 pt-4">
                        <Link to={"/Configuration/" + "AllWarehouseDetails"}>
                          <div className="card cardsec">
                            <div className="row">
                              <div className="col-12">
                                <div className="d-flex justify-content-between align-items-center">
                                  <div>
                                    <BsListNested className="cardicon" />
                                    <h6 className="cardheads">Warehouse</h6>
                                  </div>
                                  <div>
                                    <span className="count1">{warehouse}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-6 col-12 pt-4">
                        <Link to={"/NewOrder/" + "Pending"}>
                          <div className="card cardsec">
                            <div className="row">
                              <div className="col-12">
                                <div className="d-flex justify-content-between align-items-center">
                                  <div>
                                    <BsListNested className="cardicon" />
                                    <h6 className="cardheads">Orders</h6>
                                  </div>
                                  <div>
                                    <span className="count1">{Orders}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                      </>
                        ):
                        null
                      }
                      
                    </div>
                  </main>
                  <div className="container">
                    <div className='row my-5'>
                      <div className='col-md-6'>
                        <PieChart />
                      </div>
                      <div className='col-md-6'>
                        <LineChart />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) :
          (<PageNotFound />)
      ) : (
        (<PageNotFound />)
      )
      }

    </>
  );
};
export default Dashboard;
