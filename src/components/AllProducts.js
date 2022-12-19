import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Footer from "./Footer";
import StarsRating from "stars-rating";
import Header1 from "./Header1";
import "../views/landing/homepage.css";
var Userdata;
const AllProducts = (props) => {
  const [AllProduct, setAllProduct] = useState([]);
  const [Categorydetails, setCategoryDetails] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [userCart, setUserCart] = useState([]);
  const [order, Setorder] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [manufactureres, setManufactureres] = useState([]);
  const [prev, SetPrev] = useState(0);
  const [next, SetNext] = useState(8);
  const [filter, setFilter] = useState("");
  const [mrp, setMrp] = useState();
  const history = useHistory();
  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));

    window.scrollTo(0, 0)
    ProductByCategory();
    categoryDetails();
    CartById();
    GetCategory();
    GetSubCategory();
    GetManufacturer();
    // GetCategory();
  }, []);
  const setPreviousValue = () => {
    if (prev >= 7) {
      SetNext(next - 8);
      SetPrev(prev - 8);
    }
  };
  const setNextValue = () => {
    if (next < AllProduct.length) {
      SetNext(next + 8);
      SetPrev(prev + 8);
    }
  };
  const cartfunction = async (
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
    if (quantity !== 0) {
      var merged = false;
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
      };
      if (userCart.order == null || userCart.order == []) {
        for (var i = 0; i < order.length; i++) {
          if (order[i].productid == newItemObj.productid) {
            order[i].quantity += newItemObj.quantity;
            order[i].mrp += newItemObj.mrp;
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
            userCart.order[i].mrp += newItemObj.mrp;
            merged = true;
          } else {
            merged = false;
          }
          setQuantity(1);
        }
        if (!merged) {
          userCart.order.push(newItemObj);
        }
        setQuantity(1);
        CartById();
        UpdateCart();

        //   await AsyncStorage.setItem("order1", JSON.stringify(userCart.order));
        //   newamount = 0;
      }
    }
  };
  const UpdateCart = () => {
    //const url = "http://144.91.110.221:3033/api/cart/update_cart_by_id";
    const url = "http://localhost:3033/api/cart/update_cart_by_id";
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
        console.log(res, "after update");
        history.push("/Cart");
      })
      .then((err) => console.log(err));
  };
  const CartById = async () => {
    if (!Userdata == []) {
      //await fetch("http://144.91.110.221:3033/api/cart/cart_by_id", {
      await fetch("http://localhost:3033/api/cart/cart_by_id", {
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
        })
        .catch((err) => {
          console.log(err, "error");
        });
    }
  };
  const AddtoCart = async () => {
    if (!Userdata == []) {
      //await fetch("http://144.91.110.221:3033/api/cart/add_to_cart", {
      await fetch("http://localhost:3033/api/cart/add_to_cart", {
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
          history.push("/Cart");
        })
        .catch((err) => {
          console.log(err, "error");
        });
    }
    // else{
    //    history.push('/Register')
    // }
  };

  const FilterItems = (item) => {
    setFilter(item);
    console.log(item, "filter");
  };

  const ProductByCategory = async () => {
    //await fetch("http://144.91.110.221:3033/api/product/all_product")
    await fetch("http://localhost:3033/api/product/all_product")
      .then((res) => res.json())
      .then(async (data) => {
        setAllProduct(data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  const categoryDetails = async () => {
    // await fetch("http://144.91.110.221:3033/api/category/category_by_id", {
    await fetch("http://localhost:3033/api/category/category_by_id", {
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
        await setCategoryDetails(data.data[0]);

        console.log(Categorydetails, "rrrr");
      })
      .catch((err) => {
        console.log(err, "error");
      });
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
    //await fetch("http://144.91.110.221:3033/api/wishlist/wishlist_by_id", {
    await fetch("http://localhost:3033/api/wishlist/wishlist_by_id", {
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
        if (!JSON.stringify(data.data).includes(productid)) {
          if (!Userdata == []) {
            await fetch(
              //"http://144.91.110.221:3033/api/wishlist/add_to_wishlist",
              "http://localhost:3033/api/wishlist/add_to_wishlist",
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
                // setWishlist(data.data[0]);
                //  await console.log(wishlist,"khlklklklk")
              })
              .catch((err) => {
                console.log(err, "error");
              });
          }
        } else {
          alert("Allready in wishlist");
        }
      });
  };

  // allcategory api //
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
  // End All Category API//

  // SubCategory API //
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
  // End Subcategory //
  // Manufacturer API //
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
  const openNav = () => {
    document.getElementById("mySidenav").style.width = "300px";
  };
  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };
  // End Manufacturer API //

  return (
    <>
      <Header1 />

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
                      <input type="checkbox" />

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
                  {subcategories.map((el, ind) => (
                    <li className="mt-2">
                      <input type="checkbox" />
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
                  {manufactureres.map((el, ind) => (
                    <li className="mt-2">
                      <input
                        type="checkbox"
                        value={el.name}
                        onClick={(e) => setFilter(e.target.value)}
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
                    <input type="number" placeholder="$Min" />
                  </div>
                  <div className="col-4">
                    {" "}
                    <input type="number" placeholder="$Max" />
                  </div>
                  <div className="col-2"></div>
                  <ul className="mt-2">
                    <li className="mt-2">
                      <input type="checkbox" />
                      <span className="ml-3">Under $500</span>
                    </li>
                    <li className="mt-2">
                      <input type="checkbox" />
                      <span className="ml-3">Under $1000</span>
                    </li>
                    <li className="mt-2">
                      <input type="checkbox" />
                      <span className="ml-3">Under $1500</span>
                    </li>
                    <li className="mt-2">
                      <input type="checkbox" />
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

      {/* <i className="fa fa-filter collapse-btn" data-bs-toggle="modal" data-bs-target="#filterModal"></i> */}

      <div id="__next">
        <div className="search-overlay null">
          <div className="d-table">
            <div className="d-table-cell">
              <div className="search-overlay-layer"></div>
              <div className="search-overlay-layer"></div>
              <div className="search-overlay-layer"></div>
              <div className="search-overlay-close">
                <span className="search-overlay-close-line"></span>
                <span className="search-overlay-close-line"></span>
              </div>
              <div className="search-overlay-form">
                <form>
                  <input
                    type="text"
                    className="input-search"
                    placeholder="Search here..."
                    name="search"
                    value=""
                  />
                  <button type="submit">
                    <i className="bx bx-search-alt"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container Category-div">
        <div className="row align-items-center">
          <div className="col-6">
            <div className="section-title">
              <h2>All Products</h2>
            </div>
          </div>
          <div className="col-5">
            <hr />
          </div>
          <div className="col-1"></div>
        </div>
      </div>

      <div id="wrap">
        <div id="columns" className="columns_4">
          {AllProduct.map((el, ind1) => {
            if (ind1 > prev && ind1 <= next) {
              return (
                <figure className="figure1">
                  {/* {Categorydetails.image!==undefined? */}
                  {/* <img src={"http://144.91.110.221:3033/" + el.image[0].path} /> */}
                  <img src={"http://localhost:3033/" + el.image[0].path} />
                  {/* :null} */}
                  <figcaption>{el.name}</figcaption>
                  <div className="text-center price-div">
                    {/* <div className="d-flex justify-content-center">
                      <StarsRating
                        count={5}
                        // onChange={ratingChanged}
                        size={20}
                        color2={"#ffd700"}
                        value={4}
                      />
                    </div> */}
                    <div className="row">
                      <div className="col-2 "></div>
                      {/* <div className="col-4 ">
                              <Link to={"/SingleProduct/" + el._id}>  
                               <p className="bottom-icon text-nowrap"><i className='bx bx-show-alt'></i> Quick view</p>
                               </Link> 
                              </div> */}
                      <div className="col-8 text-center ">
                        <p
                          className="bottom-icon text-nowrap wishlist"
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
                          data-bs-toggle={Userdata == null ? "modal" : null}
                          data-bs-target={
                            Userdata == null ? "#exampleModal" : null
                          }
                        >
                          <i className="bx bx-heart"></i>Wishlist
                        </p>
                        {/* <div className="icon-wishlist"></div> */}
                      </div>
                      <div className="col-2 "></div>
                    </div>
                    <span className="price">
                      {" "}
                      $
                      {isNaN(el.inrMrp - (el.inrMrp * el.inrDiscount) / 100)
                        ? 0
                        : el.inrMrp - (el.inrMrp * el.inrDiscount) / 100}
                    </span>
                  </div>
                  <Link
                    className="button"
                    to="/Cart"
                    onClick={() => {
                      cartfunction(
                        el._id,
                        el.name,
                        quantity,
                        el.inrMrp,
                        el.inrDiscount,
                        el.description,
                        el.category,
                        el.manufacturer.name,
                        el.image[0].path
                      );
                    }}
                    data-bs-toggle={Userdata == null ? "modal" : null}
                    data-bs-target={Userdata == null ? "#exampleModal" : null}
                  >
                    Add to Cart
                  </Link>
                </figure>
              );
            }
          })}
        </div>
      </div>
      <div className="col-12 pagination text-center">
        <button
          className="Prebutton"
          onClick={() => {
            setPreviousValue();
          }}
        >
          Prev
        </button>
        <button
          className="Nextbutton"
          onClick={() => {
            setNextValue();
          }}
        >
          Next
        </button>
      </div>

      {/* <div className="brands-area bg-f7f8fa pt-70 pb-40">
            <div className="container">
                <div className="section-title">
                    <h2>Selling Brands</h2>
                </div>
                <div className="row align-items-center">
                    <div className="col-lg-2 col-sm-4 col-md-2 col-6">
                        <div className="single-brands-item"><a className="d-block" href="#"><img
                                    src="img/brands/brands-img1.png" alt="image" /></a></div>
                    </div>
                    <div className="col-lg-2 col-sm-4 col-md-2 col-6">
                        <div className="single-brands-item"><a className="d-block" href="#"><img
                                    src="img/brands/brands-img2.png" alt="image" /></a></div>
                    </div>
                    <div className="col-lg-2 col-sm-4 col-md-2 col-6">
                        <div className="single-brands-item"><a className="d-block" href="#"><img
                                    src="img/brands/brands-img3.png" alt="image" /></a></div>
                    </div>
                    <div className="col-lg-2 col-sm-4 col-md-2 col-6">
                        <div className="single-brands-item"><a className="d-block" href="#"><img
                                    src="img/brands/brands-img4.png" alt="image" /></a></div>
                    </div>
                    <div className="col-lg-2 col-sm-4 col-md-2 col-6">
                        <div className="single-brands-item"><a className="d-block" href="#"><img
                                    src="img/brands/brands-img5.png" alt="image" /></a></div>
                    </div>
        
                    <div className="col-lg-2 col-sm-4 col-md-2 col-6">
                        <div className="single-brands-item"><a className="d-block" href="#"><img
                                    src="img/brands/brands-img6.png" alt="image" /></a></div>
                    </div>
                </div>
            </div>
        </div> */}

      <Footer />
    </>
  );
};
export default AllProducts;
