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
import $ from "jquery";
import { baseUrl } from "../utils/services";
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
  const history = useHistory();
  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));

    GetData();
    CartById();
    GetCategory();
    GetManufacturer();
    GetSubCategory();

    $(document).ready(function() {
      $(".frontimage").hide();
      $(".backimage").hide();
      //    $('.icon-wishlist').on('click', function(){
      //       $(this).toggleClass('in-wishlist');

      // })
      $(".frontimage").mouseenter(function() {
        $(".backimage").hide();
      });
      const WishlistHeart = () => {
        $(".icon-wishlist").on("click", function() {
          $(this).toggleClass("in-wishlist");
        });
      };
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
    console.log("filreres " + data);
  };

  const GetData = async () => {
    await fetch(`${baseUrl}/api/product/all_product`)
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data, "product");
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
        console.log(data, "hello");
        setManufactureres(data.data);
        Docsearch(params.Search);
        console.log(data);
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

        category: category,
        manufacturer: manufacturer,
        description: description,
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
        console.log(res, "after update");
        history.push("/Cart");
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
        if (!JSON.stringify(data.data).includes(productid)) {
          if (!Userdata == []) {
            await fetch(`${baseUrl}api/wishlist/add_to_wishlist`, {
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
                // setWishlist(data.data[0]);
                //  await console.log(wishlist,"khlklklklk")
              })
              .catch((err) => {
                console.log(err, "error");
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
        // console.log(this.state.AddOn[i].id +"<br>"+ item.student._id);
        if (dataForFilter[i] === item) {
          dataForFilter.splice(i, 1);
        }
      }
      if (dataForFilter != null) {
        setSearchResults(params.Search);
      }
      console.log(dataForFilter);
    }
    let daata = dataForFilter;
    setDataForFilter(daata);
    setCT(Date());
    console.log("filter data" + JSON.stringify(dataForFilter));
  };
  const ChangeMinMax = async (price) => {
    await setMinPrice("0");
    await setMaxPrice(price);
    await setCT(Date());
    console.log(price + "," + maxprice + "," + "minprice" + minprice + "price");
  };

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
          <div className="container h-100">
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
        <section className="products-area pb-40">
          <div className="container-fluid">
            <div className="row">
              {filterdata.length && filterdata.map((el, ind) => {
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
                    <div className="col-lg-3 col-md-12 col-sm-12 ">
                      {/* <Link to={"/SingleProduct/" + el._id}> */}
                      <div className="single-products-box border">
                        <div className="row  align-items-center product-div">
                          <div className="col-6 product-image-div">
                            <Link
                              to={"/SingleProduct/" + el._id}
                              className="product-image-link"
                            >
                              <div className="image hover-switch">
                                <img
                                  src={require("../Images/products/Hintosulin (1).png")}
                                  alt=""
                                />
                                <img
                                  src={
                                    `${baseUrl}/` + el.image[0].path
                                  }
                                  alt=""
                                  style={{ position: "absolute" }}
                                />
                              </div>
                            </Link>
                          </div>
                          <div className="col-6 pd-0 tranding product-image-content">
                            <div className="content product-content">
                              <Link to={"/SingleProduct/" + el._id}>
                                <h3 className="pb-1 pl-4 pt-5">
                                  <ReadMoreReact
                                    text={el.name}
                                    min={10}
                                    ideal={10}
                                    max={10}
                                    readMoreText={"..."}
                                  />
                                </h3>
                              </Link>
                             
                              <div className=" justify-content-center align-items-center d-flex pt-3 mr-5">
                                <div className="discount-price-div">
                                  <span>{el.inrDiscount}</span>
                                </div>
                                <div className="discount-price-div2">
                                  <span>off</span>
                                </div>
                              </div>

                              <div className="hr-div">
                                <hr />
                              </div>
                              <div className="price-div justify-content-center align-items-center d-flex">
                                <span className="new-price ml-3">
                                  {/* $
                                  {isNaN(
                                    el.inrMrp -
                                      (el.inrMrp * el.inrDiscount) / 100
                                  )
                                    ? 0
                                    : el.inrMrp -
                                      (el.inrMrp * el.inrDiscount) / 100} */}
                                      {el.inrDiscount}
                                </span>
                                <del className="new-price ml-1">{el.inrMrp}</del>
                                <i
                                  className="bx bxs-heart ml-3"
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
                                  data-bs-toggle={
                                    Userdata == null ? "modal" : null
                                  }
                                  data-bs-target={
                                    Userdata == null ? "#exampleModal" : null
                                  }
                                ></i>
                                <i className="bx bx-cart ml-1"></i>
                              </div>
                              {/* <div className="price mt-1">
                              <div>
                                 <span className="new-price">
                                 $
                                 {isNaN(el.inrMrp - (el.inrMrp * el.inrDiscount) / 100)
                                 ? 0
                                 : el.inrMrp - (el.inrMrp * el.inrDiscount) / 100}
                                 </span>
                              </div>
                           </div> */}
                              {/* <div className="mt-2 mb-2">
                              <button className="add-to-cart-button1 text-nowrap"  onClick={()=>{cartfunction(el._id,el.name,quantity,el.inrMrp,el.inrDiscount,el.description,el.category,el.manufacturer.name,el.image[0].path)}} data-bs-toggle={Userdata==null?"modal":null} data-bs-target= {Userdata==null?"#exampleModal":null}>Add to Cart</button>
                           </div> */}
                              {/* <div className="row">
                              
                              <div className="col-12">
                                 <p className="bottom-icon text-nowrap" onClick={()=>{AddtoWishlist(el._id,el.name,quantity,el.inrMrp,el.inrDiscount,el.description,el.category,el.manufacturer.name,el.image)}}  data-bs-toggle={Userdata==null?"modal":null} data-bs-target= {Userdata==null?"#exampleModal":null}><i className='bx bx-heart' ></i>Wishlist</p>
                              <div className="icon-wishlist"></div>
                              </div>
                           </div> */}
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
      </div>
      <Baseline />
      <Footer />
    </>
  );
};
export default SearchResult;
