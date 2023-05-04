import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from ".././components/Footer";
import ".././views/landing/homepage.css";
import Header1 from ".././components/Header1";
import { useHistory, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as ACTIONS from "../CommonService/AddToCart/action";
import * as ACTIONS1 from "../CommonService/WishlistItem/action";
import { useDispatch } from "react-redux";
import $ from "jquery";
import { baseUrl } from "../utils/services";
import "../components/SearchResult.css";
import { useContext } from "react";
import CurrencyContext from "../routes/ContextApi/CurrencyContext";
import Loader from "react-spinner-loader";


var CartDataWoLogin = [];
var Userdata = "";
let tranding = 0;
const SearchResult = (props) => {
  const SearchedText = props.match.params.Search;
  var count = 0;
  const params = useParams();
  const [data, setData] = useState([]);
  const [heading, setHeading] = useState([]);
  const [categories, setCategories] = useState([]);
  const [Manufactureres, setManufactureres] = useState([]);
  const [AllProduct, setAllProduct] = useState([]);
  const [loading, setLoading] = useState(true);
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
  const [wishlistData, Setwishlist] = useState([]);
  const [cartItems, setCartItems] = useState(undefined);
  const [currancy, setCurrency] = useState("INR");
  const { loginState, setLoginState } = useContext(CurrencyContext);
  let { resetForm, setResetForm } = useContext(CurrencyContext);
  const  {searchedtextstate,setSearchedTextState} = useContext(CurrencyContext);
  const {searchedtext,setSearchedText} = useContext(CurrencyContext);



  const history = useHistory();
  const state1 = useContext(CurrencyContext);

  const dispatch = useDispatch();
  useEffect(() => {
    if (state1 == "1") {
      setCurrency("Dollar");
    }
  }, [currancy])

  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    // setSearchedTextState("1");
    GetData();
    CartById();
    GetWishlist();
    GetCategory();
    GetManufacturer();
    GetSubCategory();
    window.scroll(0, 0);

    $(document).ready(function () {

      $(".frontimage").mouseover(function () {
        alert("in");
      });
      $(".frontimage").mouseleave(function () {
        alert("in");
      });
    });
  }, [loginState]);
  useEffect(() => {
    setFilterData(data);
  }, [data]);
  useEffect(() => {
    Docsearch(searchresults);
  }, [searchresults]);
  const Docsearch = async (e) => {
    setSearchResults(e);
    setCT(Date());
  };


  const handleResetForm = () => {
    if (resetForm === 0) {
      setResetForm(1);
    }
    else {
      setResetForm(0);
    }
  }

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

  const GetData = async () => {
    await fetch(`${baseUrl}/api/product/all_product`)
      .then((res) => res.json())
      .then(async (data) => {
        setData(data.data);
        setLoading(false);
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
        // CartById();
        await UpdateCart();
      }
      toast.success("Added to Cart", {
        position: "bottom-right",
        autoClose: 1000,
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
          dispatch(ACTIONS.getCartItem(cartItems));
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

  const checkWishlistItem = (productId) => {
    for (let item of wishlistData) {
      if (item.productId == productId) {
        return "wishlisted";
      }
    }
  };

  return (
    <>
      <Header1 func={Docsearch} />

      {/* end side bar Modal */}
      <div className="container">
        <div id="__next_search">
          {/* trending section  */}

          <section className="trending-section">
            <div className="container-fluid">
              <div className="row mt-0">
                <div className="col-12">
                  <div className="">
                    <h1 className="Search-Result p-3">
                      Showing Results for "{searchedtext}"
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="pb-4">
            <div className="container-fluid">
              {
                loading ?
                  <Loader
                    show={loading}
                    stack="vertical"
                  /> :
                  <div className="row mt-0">
                    <div id="columns" className="columns_5">
                      {filterdata &&
                        filterdata.length > 0 &&
                        filterdata.map((el, ind) => {
                          if (
                            el.name.toLowerCase().startsWith(searchresults) ||
                            (minprice != "" &&
                              maxprice != "" &&
                              parseInt(el.inrMrp) >= minprice &&
                              parseInt(el.inrMrp) <= maxprice)
                          ) {
                            count = count + 1;
                            return (
                              <>
                                <figure className="figure search-figure" key={ind}>
                                  <Link
                                    to={"/SingleProduct/" + el._id}
                                    className="product-image-link"
                                  >
                                    <div>
                                      <img
                                        src={`${baseUrl}/` + el.image[0].path}
                                        alt=""
                                      />
                                    </div>

                                    <figcaption>{el.name}</figcaption>
                                  </Link>
                                  <div className="contanier Search-price-div">
                                    <div className="row">
                                      <div className="col-lg-6 col-sm-6 col-md-6 col-12 text-start search-text-start">
                                        <span className="price">
                                          {" "}
                                          {state1.state1 == "1" ? <i className="fa fa-dollar-sign"></i> : <i className="fa fa-inr"></i>}
                                          {state1.state1 == "1" ? el.dollerDiscount : el.inrDiscount}
                                        </span>
                                      </div>

                                      <div className="col-6 text-end">
                                        <p
                                          className={`text-nowrap wishlist search-result-wishlist`}
                                        >
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
                                                Userdata == null
                                                  ? "#exampleModal"
                                                  : null
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
                                      data-bs-toggle={
                                        Userdata == null ? "modal" : null
                                      }
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
                              </>
                            );
                          }
                        })}
                      {count == 0 && (
                        <lottie-player
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
                        ></lottie-player>
                      )}
                    </div>
                  </div>
              }

            </div>
          </section>
          <ToastContainer />
        </div>
      </div>
      <Footer />
    </>
  );
};
export default SearchResult;
