import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header1 from "./Header1";
import "../views/landing/homepage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../utils/services";
import * as ACTIONS from "../CommonService/AddToCart/action";
import * as ACTIONS1 from "../CommonService/WishlistItem/action";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import CurrencyContext from "../routes/ContextApi/CurrencyContext";
import Loader from "react-spinner-loader";
import Baseline from "./Baseline";
import InfiniteScroll from 'react-infinite-scroll-component';
import { BiFilter } from "react-icons/bi";
import { Modal } from 'antd';
var Userdata;
const AllProducts = (props) => {
  const state1 = useContext(CurrencyContext);

  let dispatch = useDispatch();

  const [AllProduct, setAllProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [userCart, setUserCart] = useState([]);
  const order=[];
  const [categories, setCategories] = useState([]);
  const [wishlistData, Setwishlist] = useState([]);
  const [currancy, setCurrency] = useState("INR");
  const { loginState, setLoginState } = useContext(CurrencyContext);
  const [isLogin, setIsLogin] = useState(loginState);
  let { resetForm, setResetForm } = useContext(CurrencyContext);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allProductCheck,setAllProductCheck]=useState(true);
  const [AllPaginationProduct,setAllPaginationProduct]=useState([]);
  const handleOrderChange = (order) => {
    setSelectedOrder(order);
  };
useEffect(()=>{
  if(selectedOrder){
    ProductByCategory();
    AssecnedingDesecending();
  }
},[selectedOrder])
  useEffect(() => {
    setLoginState(loginState);
    setIsLogin(loginState);
  }, [loginState,isLogin]);

  useEffect(() => {
    if (state1 == "1") {
      setCurrency("Dollar");
    }
  }, [currancy]);

  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    window.scrollTo(0, 0);
    ProductByCategory();
    categoryDetails();
    GetWishlist();
    CartById();
    GetCategory();
    GetManufacturer();
  }, []);
  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    window.scrollTo(0, 0);
    GetWishlist();
    CartById();
  }, [loginState]);

  const handleResetForm = () => {
    if (resetForm === 0) {
      setResetForm(1);
    } else {
      setResetForm(0);
    }
  };

  const cartfunction = async (
    productid,
    name,
    quantity,
    maximumOrder,
    mrp,
    singleprice,
    dollerDiscount,
    dollerMrp,
    discount,
    description,
    category,
    manufacturer,
    image
  ) => {
    if (quantity > 0) {
      var merged = false;
      var newItemObj = {
        productid: productid,
        name: name,
        image: image,
        quantity: quantity,
        maximumOrder: maximumOrder,
        mrp: parseInt(mrp),
        singleprice: parseInt(singleprice),
        dollerDiscount: dollerDiscount,
        dollerMrp: dollerMrp,
        discountprice: discount,
        description: description,
        category: category,
        manufacturer: manufacturer,
        description: description,
        status: "Pending",
        justification: "Enjoy",
        delivery_time: "No Status",
      };
      if (userCart.order == null || userCart.order == []) {
        for (var i = 0; i < order.length; i++) {
          if (order[i].productid == newItemObj.productid) {
            order[i].quantity += newItemObj.quantity;

            merged = true;
            setQuantity(1);
          }
        }
        if (!merged) {
          order.push(newItemObj);
          setQuantity(1);
          await AddtoCart();
          await CartById();
        }
      } else {
        for (var i = 0; i < userCart.order.length; i++) {
          if (userCart.order[i].productid == newItemObj.productid) {
            userCart.order[i].quantity += newItemObj.quantity;
            merged = true;
          }
          setQuantity(1);
        }
        if (!merged) {
          userCart.order.push(newItemObj);
        }
        setQuantity(1);
        UpdateCart(productid);
      }
    }
  };
  const UpdateCart = (id) => {
    const product = userCart.order.map((item) => item)
    const productsData = product.filter((item) => item.productid == id)
    if (productsData[0].quantity <= productsData[0].maximumOrder) {
      const url = `${baseUrl}/api/cart/update_cart_by_id`;
      fetch(url, {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: userCart._id,
          userid: Userdata._id,
          order: userCart.order,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          CartById();
          toast.success("Added to cart", {
            position: "bottom-right",
            autoClose: 1000,
          });
        })
        .then((err) => console.log(err));
    }
    else {
      toast.success("You have reached the max limit", {
        position: "bottom-right",
        autoClose: 1000,
      });
    }
  };
  const CartById = async () => {
    if (!Userdata == []) {
      await fetch(`${baseUrl}/api/cart/cart_by_id`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: Userdata._id,
        }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          if (data.error && data.message === "Data Not Found") {
            setUserCart([]);
            dispatch(ACTIONS.getCartItem(0));
          }
          else {
            setUserCart(data.data[0]);
            let cartItems = data.data[0].order.length;
            dispatch(ACTIONS.getCartItem(cartItems));
          }
        })
        .catch((err) => {
          console.log(err, "error");
        });
    }
  };
  const AddtoCart = async () => {
    if (!Userdata == []) {
      await fetch(`${baseUrl}/api/cart/add_to_cart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: Userdata._id,
          order: order,
        }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          setUserCart(data.data);
        })
        .catch((err) => {
          console.log(err, "error");
        });
    }
  };
  
  const ProductByCategory = async () => {
    if(allProductCheck)
    {
    try {
      let response;
      if (selectedOrder) {
        response = await fetch(`${baseUrl}/api/product/all_product?_page=${currentPage}&_limit=5&_order=${selectedOrder}`);
      } else {
        response = await fetch(`${baseUrl}/api/product/all_product?_page=${currentPage}&_limit=10`);
      }
      
      const data = await response.json();
      setCurrentPage(prevPage => prevPage + 1);
      
      let sortedData = [...AllPaginationProduct];
      if (selectedOrder) {
        sortedData.sort((a, b) => {
          if (selectedOrder === "ascending") {
            return a.inrDiscount - b.inrDiscount;
          } else {
            return b.inrDiscount - a.inrDiscount;
          }
        });
      }
      await setAllPaginationProduct(sortedData);
      
      setAllPaginationProduct(prevData => [...prevData, ...data.data]);
      setLoading(false);
    } catch (err) {
      console.log(err, "error");
    }
  }
  };


  const filterCategoryById = async (categoryId) => {
    try {
      const response = await fetch(`${baseUrl}/api/product/all_product`);
      const data = await response.json();
      if (categoryId) {
        const filterData = data.data.filter((item) => {
          return (item.category._id == categoryId)
        });
         if (selectedOrder) {
          const filterCtegorySortedPrice=filterData.sort((a, b) => {
            if (selectedOrder === "ascending") {
              return a.inrDiscount - b.inrDiscount;
            } else {
              return b.inrDiscount - a.inrDiscount;
            }
          });
          setAllProduct(filterCtegorySortedPrice);
        }else{
          setAllProduct(filterData);
        setLoading(false);
        }
      } else {
        setAllProduct(prevData => [...prevData, ...data.data]);
        setLoading(false);
      }
    } catch (err) {
      console.log(err, "error");
    }
  };

  const categoryDetails = async () => {
    await fetch(`${baseUrl}/api/category/category_by_id`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: props.match.params.name,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const GetWishlist = async () => {
    let id;
    if (Userdata) {
      id = Userdata._id;
    }
    await fetch(`${baseUrl}/api/wishlist/wishlist_by_id`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: id,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.error && data.message === "Data Not Found") {
          Setwishlist([])
          dispatch(ACTIONS1.getwishlistitem(0));
        }
        if (data.data[0] !== undefined) {
          Setwishlist(data.data);
          const wishlisted = data.data.length;
          dispatch(ACTIONS1.getwishlistitem(wishlisted));
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const checkWishlistItem = (productId) => {
    for (let item of wishlistData) {
      if (item.productId == productId) {
        return "wishlisted";
      }
    }
  };

  const AddtoWishlist = async (
    productid,
    name,
    quantity,
    mrp,
    discount,
    description,
    category,
    manufacturer,
    image
  ) => {
    await fetch(`${baseUrl}/api/wishlist/wishlist_by_id`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: Userdata._id,
      }),
    })
      .then((data) => data.json())
      .then(async (data) => {
        if (data.data == undefined) {
          if (!Userdata == []) {
            await fetch(`${baseUrl}/api/wishlist/add_to_wishlist`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userid: Userdata._id,
                image: image,
                name: name,
                productId: productid,
                rating: "5",
                category: category,
                manufacturer: manufacturer,
                description: description,
              }),
            })
              .then((res) => res.json())
              .then(async (data) => {
                toast.error("Added to wishlist", {
                  position: toast.POSITION.BOTTOM_RIGHT,
                  autoClose: 1000,
                });

                let wishList = document.getElementById(productid);
                wishList.classList.add("in-wishlist");
                wishList.classList.add("wishlisted");
                GetWishlist();
              })
              .catch((err) => {
                console.log(err, "error e");
              });
          }
        } else {
          if (!JSON.stringify(data.data).includes(productid) && data.data) {
            if (!Userdata == []) {
              await fetch(`${baseUrl}/api/wishlist/add_to_wishlist`, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  userid: Userdata._id,
                  image: image,
                  name: name,
                  productId: productid,
                  rating: "5",
                  category: category,
                  manufacturer: manufacturer,
                  description: description,
                }),
              })
                .then((res) => res.json())
                .then(async (data) => {
                  toast.error("Added to wishlist", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 1000,
                  });
                  let wishList = document.getElementById(productid);
                  wishList.classList.add("in-wishlist");
                  wishList.classList.add("wishlisted");
                  GetWishlist();
                })
                .catch((err) => {
                  console.log(err, "error e");
                });
            }
          } else {
            toast.error("Already in wishlist !", {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 1000,
            });
          }
        }
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

  const GetManufacturer = async () => {
    await fetch(`${baseUrl}/api/manufacture/all_manufacture`)
      .then((res) => res.json())
      .then(async (data) => {
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };

  const showModal = () => {
    setIsModalOpen(true);
    const filter=document.getElementById("filterId");
    filter.classList.add("filterClass")
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    const filter=document.getElementById("filterId");
    filter.classList.remove("filterClass")
  };
  const handleCheckboxChange = async (e) => {
    setAllProductCheck(false);
    setCurrentPage(1);
    setAllPaginationProduct([]);
    setSelectedCategory(e.target.value);
    filterCategoryById(e.target.value);
  }
  const AssecnedingDesecending=()=>{
    let sortedData = [...AllProduct];
      sortedData.sort((a, b) => {
        if (selectedOrder === "ascending") {
          return a.inrDiscount - b.inrDiscount;
        } else {
          return b.inrDiscount - a.inrDiscount;
        }
      });
      setAllProduct(sortedData);
  }
  useEffect(()=>{
    if(allProductCheck==true)
    {
      ProductByCategory(); 
    }
  },[allProductCheck])
  const allProducts=(e)=>{
    setSelectedOrder(null);
    setSelectedCategory(null);
    setAllProductCheck(!allProductCheck);
  }
  const CustomCloseIcon = () => (
    <svg
      className="custom-close-icon-forget"
      viewBox="0 0 12 12"
      width="12"
      height="12"
    >
      <line x1="1" y1="11" x2="11" y2="1" strokeWidth="2" />
      <line x1="1" y1="1" x2="11" y2="11" strokeWidth="2" />
    </svg>
  );

  return (
    <>
      <Header1 />
      <div className="container m-auto Category-div">
        <div className="row align-items-center">
          <div className="col-12">
            <div className="section-title my-4" style={{ display: "flex", justifyContent: "space-between" }}>
              <h2>All Products</h2>
              <div className="d-flex" id="filterId"  style={{cursor: "pointer" }} onClick={showModal}>
                <h5>Filters</h5><BiFilter style={{height:("30px")}}/></div>
              {
                isModalOpen && <div>
    <Modal className="all_Product-filter" title="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
              closeIcon={<CustomCloseIcon />}
              >
      <h6>AllProducts</h6>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          value={allProductCheck}
          checked={allProductCheck}
          onChange={allProducts}
        />
        <label className="form-check-label">All products</label>
      </div>
      <h6>Category</h6>
      {categories &&
        categories.length > 0 &&
        categories.map((items) => {
          return (
            <div className="form-check" key={items.name}>
              <input
                className="form-check-input"
                type="radio"
                value={items._id}
                id={`radio-${items.name}`}
                name="category"
                checked={selectedCategory === items._id && !allProductCheck}
                onChange={handleCheckboxChange}
              />
              <label
                className="form-check-label"
                htmlFor={`radio-${items.name}`}
              >
                {items.name}
              </label>
            </div>
          );
        })}
      <h6>Price</h6>
      <div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            checked={selectedOrder === "ascending"}
            onChange={() => handleOrderChange("ascending")}
          />
          <label className="form-check-label">Ascending order</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            checked={selectedOrder === "descending"}
            onChange={() => handleOrderChange("descending")}
          />
          <label className="form-check-label">Descending order</label>
        </div>
      </div>
    </Modal>

                   </div>
              }
            </div>
            {loading ?
              <Loader
                show={loading}
                stack="vertical"
              /> :
              <div>
                <div id="columns" className="columns_5">
                  <InfiniteScroll
                    dataLength={AllPaginationProduct.length}
                    next={ProductByCategory}
                    hasMore={true}
                  >

                    {allProductCheck ? AllPaginationProduct.map((el, ind1) => {
                      return (
                        <figure className="figure allproduct-figure  mt-3" key={ind1}>
                          <Link Link to={"/SingleProduct/" + el._id}>
                            <div>
                              <img src={`${baseUrl}/` + el.image[0].path} />
                            </div>
                            <figcaption className="Product-name-home">{el.name}</figcaption>
                          </Link>

                          <div className="contanier allproduct-price-div">
                            <div className="row">
                              <div className="col-5 text-start ">
                                <span className="price">
                                  {" "}
                                  {state1.state1 == "1" ? (
                                    <i className="fa fa-dollar-sign"></i>
                                  ) : (
                                    <i className="fa fa-inr"></i>
                                  )}
                                  {state1.state1 == "1"
                                    ? el.dollerDiscount
                                    : el.inrDiscount}
                                </span>
                              </div>
                              <div className="col-7 text-end">
                                <p className={`text-nowrap wishlist`}>
                                  {Userdata ? (
                                    <i
                                      id={el._id}
                                      onClick={() => {
                                        AddtoWishlist(
                                          el._id,
                                          el.name,
                                          quantity,
                                          el.inrMrp,
                                          el.inrDiscount,
                                          el.description,
                                          el.category,
                                          el.manufacturer.name,
                                          el.image
                                        );
                                      }}
                                      className={`bx bxs-heart ${checkWishlistItem(
                                        el._id
                                      )}`}
                                    ></i>
                                  ) : (
                                    <i
                                      className="bx bxs-heart "
                                      data-bs-toggle="modal"
                                      data-bs-target={
                                        Userdata == null ? "#exampleModal" : null
                                      }
                                      onClick={() => handleResetForm()}
                                    ></i>
                                  )}
                                  Wishlist
                                </p>
                              </div>
                            </div>
                          </div>
                          {Userdata ? (
                            <button
                              className="button btn"
                              onClick={() => {
                                cartfunction(
                                  el._id,
                                  el.name,
                                  quantity,
                                  el.maximumOrder,
                                  el.inrMrp,
                                  el.inrDiscount,
                                  el.dollerDiscount,
                                  el.dollerMrp,
                                  el.discount,
                                  el.description,
                                  el.category,
                                  el.manufacturer.name,
                                  el.image[0].path
                                );
                              }}
                              data-bs-toggle={Userdata == null ? "modal" : null}
                              data-bs-target={
                                Userdata == null ? "#exampleModal" : null
                              }
                            >
                              Add to Cart
                            </button>
                          ) : (
                            <button
                              className="button btn"
                              data-bs-toggle="modal"
                              data-bs-target={
                                Userdata == null ? "#exampleModal" : null
                              }
                              onClick={() => handleResetForm()}
                            >
                              Add to Cart
                            </button>
                          )}
                        </figure>
                      );
                    }):AllProduct.map((el, ind1) => {
                      return (
                        <figure className="figure allproduct-figure  mt-3" key={ind1}>
                          <Link Link to={"/SingleProduct/" + el._id}>
                            <div>
                              <img src={`${baseUrl}/` + el.image[0].path} />
                            </div>
                            <figcaption className="Product-name-home">{el.name}</figcaption>
                          </Link>

                          <div className="contanier allproduct-price-div">
                            <div className="row">
                              <div className="col-5 text-start ">
                                <span className="price">
                                  {" "}
                                  {state1.state1 == "1" ? (
                                    <i className="fa fa-dollar-sign"></i>
                                  ) : (
                                    <i className="fa fa-inr"></i>
                                  )}
                                  {state1.state1 == "1"
                                    ? el.dollerDiscount
                                    : el.inrDiscount}
                                </span>
                              </div>
                              <div className="col-7 text-end">
                                <p className={`text-nowrap wishlist`}>
                                  {Userdata ? (
                                    <i
                                      id={el._id}
                                      onClick={() => {
                                        AddtoWishlist(
                                          el._id,
                                          el.name,
                                          quantity,
                                          el.inrMrp,
                                          el.inrDiscount,
                                          el.description,
                                          el.category,
                                          el.manufacturer.name,
                                          el.image
                                        );
                                      }}
                                      className={`bx bxs-heart ${checkWishlistItem(
                                        el._id
                                      )}`}
                                    ></i>
                                  ) : (
                                    <i
                                      className="bx bxs-heart "
                                      data-bs-toggle="modal"
                                      data-bs-target={
                                        Userdata == null ? "#exampleModal" : null
                                      }
                                      onClick={() => handleResetForm()}
                                    ></i>
                                  )}
                                  Wishlist
                                </p>
                              </div>
                            </div>
                          </div>
                          {Userdata ? (
                            <button
                              className="button btn"
                              onClick={() => {
                                cartfunction(
                                  el._id,
                                  el.name,
                                  quantity,
                                  el.maximumOrder,
                                  el.inrMrp,
                                  el.inrDiscount,
                                  el.dollerDiscount,
                                  el.dollerMrp,
                                  el.discount,
                                  el.description,
                                  el.category,
                                  el.manufacturer.name,
                                  el.image[0].path
                                );
                              }}
                              data-bs-toggle={Userdata == null ? "modal" : null}
                              data-bs-target={
                                Userdata == null ? "#exampleModal" : null
                              }
                            >
                              Add to Cart
                            </button>
                          ) : (
                            <button
                              className="button btn"
                              data-bs-toggle="modal"
                              data-bs-target={
                                Userdata == null ? "#exampleModal" : null
                              }
                              onClick={() => handleResetForm()}
                            >
                              Add to Cart
                            </button>
                          )}
                        </figure>
                      );
                    })}
                  </InfiniteScroll>
                </div>
              </div>
            }
          </div>
        </div>
        <div className="d-flex justify-content-center mt-3 mb-3">
        </div>
      </div>
      <ToastContainer />
      <Baseline />
      <Footer />
    </>
  );
};
export default AllProducts;
