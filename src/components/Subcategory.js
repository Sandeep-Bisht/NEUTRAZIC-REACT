import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from ".././components/Footer";
import ".././views/landing/homepage.css";
// import "../../sass/whislist.css";
// import Carouselcomp from "../../components/Carouselcomp";
import Baseline from ".././components/Baseline";
import Header1 from ".././components/Header1";
import { useHistory } from "react-router-dom";
import ReadMoreReact from "read-more-react";
import $ from "jquery";
import { baseUrl } from "../utils/services";
var Userdata = "";
let tranding = 0;
const Subcategory = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [Manufactureres, setManufactureres] = useState([]);
  const [AllProduct, setAllProduct] = useState([]);

  const [ProductCategory, setProductCategory] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [userCart, setUserCart] = useState([]);
  const [order, Setorder] = useState([]);
  const [Categorydetails, setCategoryDetails] = useState({});
  const [categoryname, Setcategoryname] = useState();
  const history = useHistory();
  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    console.log(Userdata, "sadbhksabdhk");
    GetData();
    CartById();
    GetCategory();
    GetManufacturer();

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

  const GetData = async () => {
    Userdata = await JSON.parse(localStorage.getItem("Userdata"));
    await fetch(`${baseUrl}/api/product/all_product`)
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data, "product");
        setData(data.data);
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
                // setWishlist(data.data[0]);
                //  await console.log(wishlist,"khlklklklk")
              })
              .catch((err) => {
                console.log(err, "error");
              });
          }
        } else {
        }
      });
  };

  return (
    <>
      <Header1 />

      <div id="__next">
        {/* trending section  */}

        <section className="trending-section">
          <div className="container h-100">
            <div className="row h-100">
              <div className="col-5 p-0">
                <div className="align-items-center position-relative h-100 d-flex text-center w-100 justify-content-center">
                  <h1 className="trendign-head">Skin</h1>
                  <h2 className="pl-4 product-head mb-0">Care</h2>
                </div>
              </div>
              <div className="col-5 pl-0">
                <div className="align-items-center position-relative h-100 d-flex text-center w-100 justify-content-center">
                  <hr className="w-100 trending-product-hr" />
                </div>
              </div>
              <div className="col-2 pl-0"></div>
            </div>
          </div>
        </section>
        <section className="products-area pb-40">
          <div className="container">
            <div className="row">
              {data.map((el, ind) => {
                if (el.subcategory == "6133469ff51d5a1242de049a") {
                  return (
                    <div className="col-6 col-md-3 col-sm-12 ">
                      {/* <Link to={"/SingleProduct/" + el._id}> */}
                      <div className="single-products-box border">
                        <div className="row p-4 align-items-center .product-div">
                          <div className="col-6">
                            <Link to={"/SingleProduct/" + el._id}>
                              <div className="image hover-switch">
                                <img
                                  className="backimage"
                                  src={require("../Images/products/Hintosulin (1).png")}
                                  alt=""
                                />
                                <img
                                  className="frontimage"
                                  src={
                                    `${baseUrl}/` + el.image[0].path
                                  }
                                  alt=""
                                  style={{ position: "absolute" }}
                                />
                              </div>
                            </Link>
                          </div>
                          <div className="col-6 pl-0 tranding">
                            <div className="sale">-{el.inrDiscount}%</div>
                            <div className="content product-content">
                              <Link to={"/SingleProduct/" + el._id}>
                                <h3>
                                  <ReadMoreReact
                                    text={el.name}
                                    min={10}
                                    ideal={10}
                                    max={10}
                                    readMoreText={"..."}
                                  />
                                </h3>
                              </Link>
                              <div className="d-flex">
                                <i className="bx bxs-star"></i>
                                <i className="bx bxs-star"></i>
                                <i className="bx bxs-star"></i>
                                <i className="bx bxs-star"></i>
                              </div>
                              <div className="price mt-1">
                                <div>
                                  <span className="new-price">
                                    $
                                    {isNaN(
                                      el.inrMrp -
                                        (el.inrMrp * el.inrDiscount) / 100
                                    )
                                      ? 0
                                      : el.inrMrp -
                                        (el.inrMrp * el.inrDiscount) / 100}
                                  </span>
                                </div>
                              </div>
                              <div className="mt-2 mb-2">
                                <button
                                  className="add-to-cart-button1 text-nowrap"
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
                                  data-bs-toggle={
                                    Userdata == null ? "modal" : null
                                  }
                                  data-bs-target={
                                    Userdata == null ? "#exampleModal" : null
                                  }
                                >
                                  Add to Cart
                                </button>
                              </div>
                              <div className="row">
                                <div className="col-12">
                                  <p
                                    className="bottom-icon text-nowrap"
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
                                  >
                                    <i className="bx bx-heart"></i>Wishlist
                                  </p>
                                  {/* <div className="icon-wishlist"></div> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* </Link> */}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </section>
      </div>
      <Baseline />
      <Footer />
    </>
  );
};
export default Subcategory;
