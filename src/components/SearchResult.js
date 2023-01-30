import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from ".././components/Footer";
import ".././views/landing/homepage.css";
// import "../../sass/whislist.css";
// import Carouselcomp from "../../components/Carouselcomp";
import Baseline from ".././components/Baseline";
import Header1 from ".././components/Header1";
import { useHistory, useParams } from "react-router-dom";
import ReadMoreReact from "read-more-react";
import { ToastContainer, toast } from "react-toastify";
import * as ACTIONS from '../CommonService/AddToCart/action'
import { useDispatch } from "react-redux";
import $ from "jquery";
import { baseUrl } from "../utils/services";
var CartDataWoLogin = [];
var Userdata = "";
let tranding = 0;
const SearchResult = (props) => {
  var count = 0;
  const params = useParams();
  const [data, setData] = useState([]);
  const [heading, setHeading] = useState([]);
  const [categories, setCategories] = useState([]);
  const [Manufactureres, setManufactureres] = useState([]);
  const [AllProduct, setAllProduct] = useState([]);

  const [ProductCategory, setProductCategory] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [userCart, setUserCart] = useState([]);
  const [ct, setCT] = useState();
  const [order, Setorder] = useState([]);
  const [Categorydetails, setCategoryDetails] = useState({});
  const [categoryname, Setcategoryname] = useState();
  const [filterdata, setFilterData] = useState(data);
  const [searchresults, setSearchResults] = useState();
  let [dataForFilter, setDataForFilter] = useState([]);
  let [minprice, setMinPrice] = useState();
  let [maxprice, setMaxPrice] = useState();
  const [wishlistData,Setwishlist]=useState([]);
  const [cartItems, setCartItems] = useState(undefined)
  
  const history = useHistory();

  const dispatch=useDispatch();

  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));

    GetData();
    CartById();
    GetWishlist();
    GetCategory();
    GetManufacturer();
    GetSubCategory();
    

    $(document).ready(function() {
      //    $('.icon-wishlist').on('click', function(){
      //       $(this).toggleClass('in-wishlist');

      // })

      $(".frontimage").mouseover(function() {
        alert("in");
      });
      $(".frontimage").mouseleave(function() {
        alert("in");
      });
    });
  }, []);
  useEffect(() => {
    setFilterData(data);
  }, [data]);
  useEffect(() => {
    Docsearch(searchresults);
  }, [searchresults]);
  const Docsearch = async (e) => {
    // alert(e)
    setSearchResults(e);
    // await setFilterData(
    //   await data.filter((i) =>i.name.toLowerCase().includes(e.toLowerCase()))
    //   );
    setCT(Date());
  };
  const GetWishlist = async () => {
    let id;
    if(Userdata){
     id=Userdata._id
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
       if(data.data[0] !== undefined){
        Setwishlist(data.data)
       }
    })    
    .catch((err) => {
      console.log(err, "error");
    });
   
};

  const GetData = async () => {
    await fetch(`${baseUrl}/api/product/all_product`)
      .then((res) => res.json())
      .then(async (data) => {
        setData(data.data);
      })
      .then(() => {
        setSearchResults(params.Search);
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
        Docsearch(params.Search);
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };

  const GetCategory = async () => {
    await fetch(`${baseUrl}/api/category/all_category`)
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data, "hrre");
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
        setHeading(data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  const cartfunction = async (
    productid,
    name,
    quantity,
    mrp,
    singleprice,
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
        mrp: parseInt(mrp),
        singleprice: parseInt(singleprice),
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
            // order[i].mrp += newItemObj.mrp;
            // order[i].actualprice+=newItemObj.actualprice
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
        // CartById();
        await UpdateCart();
        //   await AsyncStorage.setItem("order1", JSON.stringify(userCart.order));
        //   newamount = 0;
      }
      toast.success("Successfully added to Cart", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };
  const UpdateCart = () => {
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
        //history.push("/Cart");
      })
      .then((err) => console.log(err));
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
          setUserCart(data.data[0]);
          setCartItems(data.data[0].order.length);
          let cartItems = data.data[0].order.length;
          dispatch(ACTIONS.getCartItem(cartItems))
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
          // CartById();
          // setCartItems(data.data[0].order.length);
          // history.push("/Cart");
        })
        .catch((err) => {
          console.log(err, "error");
        });
    }
    // else{
    //   history.push('/Register')
    // }
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
            await fetch(
              `${baseUrl}/api/wishlist/add_to_wishlist`,
              {
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
              }
            )
              .then((res) => res.json())
              .then(async (data) => {
                toast.error("Product is wishlisted !", {
                  position: toast.POSITION.BOTTOM_RIGHT,
                  autoClose: 2000,
                });
                
                //add product to wishlist response is comming here
                let wishList = document.getElementById(productid);
                wishList.classList.add("in-wishlist");
                wishList.classList.add("wishlisted");
                 GetWishlist();
                // setWishlist(data.data[0]);
              })
              .catch((err) => {
                console.log(err, "error e");
              });
          }
        } 
        else {
          if (!JSON.stringify(data.data).includes(productid) && data.data) {
            if (!Userdata == []) {
              await fetch(
                `${baseUrl}/api/wishlist/add_to_wishlist`,
                {
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
                }
              )
                .then((res) => res.json())
                .then(async (data) => {
                  toast.error("Product is wishlisted !", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000,
                  });
                  let wishList = document.getElementById(productid);
                  wishList.classList.add("in-wishlist");
                  wishList.classList.add("wishlisted");
                  GetWishlist();
                  // setWishlist(data.data[0]);
                })
                .catch((err) => {
                  console.log(err, "error e");
                });
                
            }
          } else {
            toast.error("Allready in wishlist !", {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 2000,
            });
          }
        }
      });
  };

  const openNav = () => {
    document.getElementById("mySidenav").style.width = "300px";
  };
  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };

  // Filrer Funcation Start //
  const FilterFunc = (item, e) => {
    setSearchResults(undefined);
    if (e.target.checked == true) {
      dataForFilter.push(item);
    }
    if (!e.target.checked) {
      for (var i = 0; i < dataForFilter.length; i++) {
        if (dataForFilter[i] === item) {
          dataForFilter.splice(i, 1);
        }
      }
      if (dataForFilter != null) {
        setSearchResults(params.Search);
      }
    }
    let daata = dataForFilter;
    setDataForFilter(daata);
    setCT(Date());
  };
  const ChangeMinMax = async (price) => {
    await setMinPrice("0");
    await setMaxPrice(price);
    await setCT(Date());
  };

  const addToCartWithoutRegistration = (
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
    var newItemObj = {
      productid: productid,
      name: name,
      image: image,
      quantity: quantity,
      mrp: parseInt(mrp),
      singleprice: parseInt(mrp),
      discountprice: discount,
      description: description,
      category: category,
      manufacturer: manufacturer,
      description: description,
      status: "Pending",
      justification: "Enjoy",
      delivery_time: "No Status",
    };
    if (
      !JSON.stringify(CartDataWoLogin).includes(name) &&
      !JSON.stringify(localStorage.getItem("CartDataWoLogin")).includes(name)
    ) {
      if (JSON.parse(localStorage.getItem("CartDataWoLogin"))) {
        CartDataWoLogin = JSON.parse(localStorage.getItem("CartDataWoLogin"));
      }
      CartDataWoLogin.push(newItemObj);
      localStorage.setItem("CartDataWoLogin", JSON.stringify(CartDataWoLogin));
    }
  };

  const checkWishlistItem = (productId) => {
    for (let item of wishlistData) {
      if (item.productId == productId) {
        return "wishlisted"
      }
    }
    }

  // End Filter Function //

  return (
    <>
      <Header1 func={Docsearch} />

      {/* <!-- Right side Modal --> */}
      <div id="mySidenav" className="sidenav">
        <Link
          href="javascript:void(0)"
          className="closebtn"
          onClick={() => closeNav()}
        >
          &times;
        </Link>

        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingTwo">
              <div className="d-flex align-items-center">
                <img
                  className="icons1"
                  src={require("../Images/Icons/categories-1.png")}
                />
                <button
                  className="accordion-button collapsed button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo"
                >
                  Categories
                </button>
              </div>
            </h2>
            <div
              id="flush-collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingTwo"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <ul>
                  {categories.map((el, ind) => (
                    
                    <li className="mt-2">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          FilterFunc(el.name, e);
                        }}
                      />

                      <span className="ml-3">{el.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingThree">
              <div className="d-flex align-items-center">
                <img
                  className="icons1"
                  src={require("../Images/Icons/category.ico")}
                />
                <button
                  className="accordion-button collapsed button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseThree"
                  aria-expanded="false"
                  aria-controls="flush-collapseThree"
                >
                  Subcategories
                </button>
              </div>
            </h2>
            <div
              id="flush-collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingThree"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body list">
                <ul>
                  {heading.map((el, ind) => (
                    <li className="mt-2">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          FilterFunc(el.name, e);
                        }}
                      />
                      <span className="ml-3">{el.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingFour">
              <div className="d-flex align-items-center">
                <img
                  className="icons1"
                  src={require("../Images/Icons/manufacturer.ico")}
                />
                <button
                  className="accordion-button collapsed button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseFour"
                  aria-expanded="false"
                  aria-controls="flush-collapseFour"
                >
                  Brand
                </button>
              </div>
            </h2>
            <div
              id="flush-collapseFour"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingTwo"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <ul>
                  {Manufactureres.map((el, ind) => (
                    <li className="mt-2">
                      <input
                        type="checkbox"
                        value={el.name}
                        onChange={(e) => {
                          FilterFunc(el.name, e);
                        }}
                      />
                      <span className="ml-3">{el.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingFive">
              <div className="d-flex align-items-center">
                <img
                  className="icons1"
                  src={require("../Images/Icons/price.ico")}
                />
                <button
                  className="accordion-button collapsed button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseFive"
                  aria-expanded="false"
                  aria-controls="flush-collapseFive"
                >
                  Price{" "}
                </button>
              </div>
            </h2>
            <div
              id="flush-collapseFive"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingTwo"
              data-bs-parent="#accordionFlushExample" 
            >
              <div className="accordion-body price">
                <div className="price-div row">
                  <div className="col-2"></div>
                  <div className="col-4">
                    <input
                      type="number"
                      value={minprice}
                      placeholder="$Min"
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </div>
                  <div className="col-4">
                    {" "}
                    <input
                      type="number"
                      value={maxprice}
                      placeholder="$Max"
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                  <div className="col-2"></div>
                  <ul className="mt-2">
                    <li className="mt-2">
                      <input
                        type="radio"
                        name="Price"
                        onClick={() => ChangeMinMax(500)}
                      />
                      <span className="ml-3">Under $500</span>
                    </li>
                    <li className="mt-2">
                      <input
                        type="radio"
                        name="Price"
                        onClick={() => ChangeMinMax(1000)}
                      />
                      <span className="ml-3">Under $1000</span>
                    </li>
                    <li className="mt-2">
                      <input
                        type="radio"
                        name="Price"
                        onClick={() => ChangeMinMax(1500)}
                      />
                      <span className="ml-3">Under $1500</span>
                    </li>
                    <li className="mt-2">
                      <input
                        type="radio"
                        name="Price"
                        onClick={() => ChangeMinMax(2000)}
                      />
                      <span className="ml-3">Under $2000</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="filter-button-div">
        <i
          className="bx bx-filter filter-button"
          onClick={() => openNav()}
          style={{}}
        ></i>
      </div>
      <div id="main"></div>

      {/* end side bar Modal */}

      <div id="__next">
        {/* trending section  */}

        <section className="trending-section mb-4">
          <div className="container m-auto h-100">
            <div className="row h-100">
              <div className="col-12 p-0">
                <div className="align-items-center position-relative h-100 d-flex text-center w-100 ">
                  <h1 className="trendign-head">Showing</h1>
                  <h2 className="pl-4 product-head mb-0">Results</h2>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="products-area pb-4">
          <div className="container-fluid">
            <div className="row  m-2">
              {filterdata && filterdata.length>0 && filterdata.map((el, ind) => {
                if (
                  el.name.toLowerCase().includes(searchresults) ||
                  el.manufacturer.name.toLowerCase().includes(searchresults) ||
                  el.category.name.toLowerCase().includes(searchresults) ||
                  (el.subcategory &&
                    el.subcategory.name
                      .toLowerCase()
                      .includes(searchresults)) ||
                  (el.type && el.type.toLowerCase().includes(searchresults)) ||
                  dataForFilter.includes(el.category && el.category.name) ||
                  dataForFilter.includes(
                    el.subcategory && el.subcategory.name
                  ) ||
                  dataForFilter.includes(
                    el.manufacturer && el.manufacturer.name
                  ) ||
                  (minprice != "" &&
                    maxprice != "" &&
                    parseInt(el.inrMrp) >= minprice &&
                    parseInt(el.inrMrp) <= maxprice)
                ) {
                  count = count + 1;
                  return (
                    <>
                      <div className="col-lg-2 col-md-12 col-sm-12" key={ind}>
                        {/* <Link to={"/SingleProduct/" + el._id}> */}
                        <div className="single-products-box border">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="product-div">
                                <div className="product-image-div">
                                  <Link
                                    to={"/SingleProduct/" + el._id}
                                    className="product-image-link"
                                  >
                                    <div className="image hover-switch">
                                      <img
                                      src={ el.otherImage && 
                                        el.otherImage.length > 0 ? `${baseUrl}/` + el.otherImage[0].path :
                                        require("../Images/products/Hintosulin (1).png")
                                      }
                                        // src={require("../../Images/products/Hintosulin (1).png")}
                                        alt=""
                                      />
                                      <img
                                        src={
                                          `${baseUrl}/` +
                                          el.image[0].path
                                        }
                                        alt=""
                                        style={{ position: "absolute", left:"0" }}
                                      />
                                    </div>
                                  </Link>
                                </div>
                                <div className="tranding product-image-content">
                                  <div className="content product-content">
                                    <Link to={"/SingleProduct/" + el._id}>
                                      <ReadMoreReact text={el.name} />
                                    </Link>
                                    <div className="price-div">
                                      <span className="new-price">
                                        <i className="fa fa-inr"></i>{" "}
                                        {el.inrDiscount}
                                      </span>
                                      <del className="new-price ml-1">
                                        {el.inrMrp}
                                      </del>
                                      {Userdata ? (
                                        <i
                                          className={`bx bxs-heart ml-3  ${checkWishlistItem(el._id)}`}
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
                                          // onClick={() => {
                                          //   wishList(el)
                                          // }}
                                        ></i>
                                      ) : (
                                        <>
                                          <i
                                            className="bx bxs-heart ml-3 pc-heart"
                                            data-bs-toggle="modal"
                                            data-bs-target={
                                              Userdata == null
                                                ? "#exampleModal"
                                                : null
                                            }
                                          ></i>

                                          <Link to="/Register">
                                            <i className="bx bxs-heart ml-3 mobile-heart"></i>
                                          </Link>
                                        </>
                                      )}
                                      <div>
                                        {Userdata ? (
                                          <i
                                            className="bx bx-cart"
                                            onClick={() => {
                                              {
                                                Userdata !== null
                                                  ? cartfunction(
                                                      el._id,
                                                      el.name,
                                                      quantity,
                                                      el.inrMrp,
                                                      el.inrDiscount,
                                                      el.discount,
                                                      el.description,
                                                      el.category,
                                                      el.manufacturer.name,
                                                      el.image[0].path
                                                    )
                                                  : addToCartWithoutRegistration(
                                                      el._id,
                                                      el.name,
                                                      quantity,
                                                      el.inrMrp,
                                                      el.inrDiscount,
                                                      el.discount,
                                                      el.description,
                                                      el.category,
                                                      el.manufacturer.name,
                                                      el.image[0].path
                                                    );
                                              }
                                            }}
                                          ></i>
                                        ) : (
                                          <i
                                            className="bx bx-cart mr-1"
                                            data-bs-toggle="modal"
                                            data-bs-target={
                                              Userdata == null
                                                ? "#exampleModal"
                                                : null
                                            }
                                          >
                                            <Link to="/Register"></Link>
                                          </i>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* </Link> */}
                      </div>
                    </>
                  );
                }
              })}
              {count == 0 && <lottie-player
                        src="https://assets10.lottiefiles.com/packages/lf20_yRyM3f.json"
                        background="transparent"
                        speed="1"
                        style={{
                          width: "300px",
                          height: "300px",
                          margin: "auto",
                        }}
                        loop
                        autoplay
                      ></lottie-player>}
            </div>
          </div>
        </section>
        <ToastContainer/>
      </div>
      <Baseline />
      <Footer />
    </>
  );
};
export default SearchResult;
