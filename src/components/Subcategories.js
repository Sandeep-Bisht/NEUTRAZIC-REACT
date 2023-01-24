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
const Subcategories = (props) => {
  const [data, setData] = useState([]);
  const [heading, setHeading] = useState([]);
  const [categories, setCategories] = useState([]);
  const [Manufactureres, setManufactureres] = useState([]);
  const [AllProduct, setAllProduct] = useState([]);

  const [ProductCategory, setProductCategory] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [userCart, setUserCart] = useState([]);
  const [order, Setorder] = useState([]);
  const [Categorydetails, setCategoryDetails] = useState({});
  const [categoryname, Setcategoryname] = useState();
  const [getSubCategories,setGetSubCategories]=useState([]);

  console.log(getSubCategories,"inside the all the categories")
  const history = useHistory();
  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    console.log(Userdata, "sadbhksabdhk");
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

  const GetData = async () => {
    Userdata = await JSON.parse(localStorage.getItem("Userdata"));
    console.log(Userdata, "sadbhksabdhk");
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
        setCategories(data.data._id);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  const GetSubCategory = async () => {
    await fetch(`${baseUrl}/api/subcategory/all_subcategory`)
      .then((res) => res.json())
      .then(async (data) => {
        data.data.map((item, index) => {
          if (props.match.params._id == item._id) {
            setHeading(item.name);
          }
        });
        setGetSubCategories(data.data);
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
                // setWishlist(data.data[0]);
                //  await console.log(wishlist,"khlklklklk")
                let wishList = document.getElementById(productid);
                wishList.classList.add("in-wishlist");
                wishList.classList.add("wishlisted");
              })
              .catch((err) => {
                console.log(err, "error e");
              });
          }
        } else {
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
                  // setWishlist(data.data[0]);
                  //  await console.log(wishlist,"khlklklklk")
                  let wishList = document.getElementById(productid);
                wishList.classList.add("in-wishlist");
                wishList.classList.add("wishlisted");
                })
                .catch((err) => {
                  console.log(err, "error e");
                });
            }
          } else {
            alert("Allready in wishlist");
          }
        }
      });
  };
  return (
    <>
    <Header1 />

    <div id="__next">
      {/* trending section  */}

     
      <section className=" pb-40">
        <div className="container-fluid">
          <div className="row">
              <div className="col-2">
              <div id="wrapper">
<div id="sidebar-wrapper">
  <ul class="sidebar-nav">
      <li class="sidebar-brand">
          <a href="#">
              SubCategory
          </a>
      </li>
      {
          getSubCategories.map((item)=>{
              if (
                  item.category == props.match.params._id
                ) {
              return (
                  <>
                   <li>
          <a href="#">{item.name}</a>
      </li>
                  </>
              )
          }})
      }
  </ul>
</div>


</div>
     </div>
     <div className="col-10">
     <section className="trending-section  mb-5">
        <div className="container-fluid h-100">
          <div className="row h-100">
            <div className="col-12 p-0">
              <div className="align-items-center position-relative h-100 d-flex w-100 ">
                <h1 className="trendign-head">SubCategory</h1>
                <h2 className="pl-4 product-head">Products</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="products-area pb-40">
        <div className="container-fluid">
          <div className="row">
            {getSubCategories.map((item, ind) => {
              if (
                item.category == props.match.params._id
              ) {
                return (
                  <div className="col-lg-3 col-md-12 col-sm-12 ">
                    <div className="single-products-box border">
                      <div className="row  align-items-center product-div-subcategory">
                        <div className="col-6 product-image-div">
                          <Link
                            to={"/SingleProduct/" + item._id}
                            className="product-image-link"
                          >
                            <div className="image hover-switch">
                              {/* <img
                         src={
                         require('../../Images/products/Hintosulin (1).png')
                         }
                         alt="" 
                          /> */}
                              <img
                                src={
                                  `${baseUrl}/` +
                                  item.image[0].path
                                }
                                alt=""
                              />
                            </div>
                          </Link>
                        </div>
                        <div className="col-6 pd-0 tranding product-image-content">
                          <div className="content product-content">
                            <Link to={"/SingleProduct/" + item._id}>
                              <h3 className="pb-1 pl-4 pt-5">
                                <ReadMoreReact
                                  text={item.name}
                                  min={7}
                                  ideal={7}
                                  max={7}
                                  readMoreText={"..."}
                                />
                              </h3>
                            </Link>
                            <div className="d-flex pb-2 pl-4">
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                            </div>
                            <div className=" justify-content-center align-items-center d-flex pt-3 mr-5">
                              <div className="discount-price-div">
                                <span>{item.inrDiscount}%</span>
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
                                  item.inrMrp -
                                    (item.inrMrp * item.inrDiscount) / 100
                                )
                                  ? 0
                                  : item.inrMrp -
                                    (item.inrMrp * item.inrDiscount) / 100} */}
                                    {item.inrDiscount}
                              </span>
                              <del className="new-price ml-1">
                                {item.inrMrp}
                              </del>
                              {Userdata ? (
                                <i
                                  className="bx bxs-heart ml-3"
                                  onClick={() => {
                                    AddtoWishlist(
                                      item._id,
                                      item.name,
                                      quantity,
                                      item.inrMrp,
                                      item.inrDiscount,
                                      item.description,
                                      item.category,
                                      item.manufacturer.name,
                                      item.image
                                    );
                                  }}
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

                              <i className="bx bx-cart ml-1"></i>
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
          </div>
        </div>
      </section>
    </div>
    <Baseline />
    <Footer />
  </>
  );
};
export default Subcategories;
