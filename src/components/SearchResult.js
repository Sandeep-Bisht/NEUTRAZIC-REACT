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
import * as ACTIONS from "../CommonService/AddToCart/action";
import { useDispatch } from "react-redux";
import $ from "jquery";
import { baseUrl } from "../utils/services";
import "../components/SearchResult.css";
import { BiCategory } from "react-icons/bi";
import { BsCardList } from "react-icons/bs";
import { TbBrandNotion } from "react-icons/tb";
import { GiPriceTag } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useContext } from "react";
import CurrencyContext from "../routes/ContextApi/CurrencyContext";

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
  const [currancy,setCurrency] = useState("INR");

  const history = useHistory();
  const state1 = useContext(CurrencyContext);

  const dispatch = useDispatch();
  useEffect(()=>{
    if(state1 == "1"){
      setCurrency("Dollar");
    }
  },[currancy])

  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));

    GetData();
    CartById();
    GetWishlist();
    GetCategory();
    GetManufacturer();
    GetSubCategory();
    window.scroll(0, 0);

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
                  // setWishlist(data.data[0]);
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
        return "wishlisted";
      }
    }
  };
  // End Filter Function //

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
                      Showing Results for "{SearchedText}"
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="pb-4">
            <div className="container-fluid">
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
                                      {state1.state1 =="1" ?<i class="fa fa-dollar-sign"></i>:<i className="fa fa-inr"></i>}
                                      {state1.state1 =="1" ? el.dollerDiscount : el.inrDiscount }
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
