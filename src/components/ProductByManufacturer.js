import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from ".././components/Footer";
import ".././views/landing/homepage.css";
import Baseline from ".././components/Baseline";
import Header1 from ".././components/Header1";
import ReadMoreReact from "read-more-react";
import $ from "jquery";
import { baseUrl } from "../utils/services";
var Userdata = "";
const ProductByManufacturer = (props) => {
  const [data, setData] = useState([]);
  var quantity=1;
  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    GetData();
    CartById();
    GetCategory();
    GetManufacturer();

    $(document).ready(function() {
      $(".frontimage").hide();
      $(".backimage").hide();
      $(".frontimage").mouseenter(function() {
        $(".backimage").hide();
      });
    });
  }, []);

  const GetData = async () => {
    Userdata = await JSON.parse(localStorage.getItem("Userdata"));
    await fetch(`${baseUrl}/api/product/all_product`)
      .then((res) => res.json())
      .then(async (data) => {
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
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };
  const GetCategory = async () => {
    await fetch(`${baseUrl}/api/category/all_category`)
      .then((res) => res.json())
      .then(async (data) => {
      })
      .catch((err) => {
        console.log(err, "error");
      });
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
                  
                  let wishList = document.getElementById(productid);
                wishList.classList.add("in-wishlist");
                wishList.classList.add("wishlisted");
                })
                .catch((err) => {
                  console.log(err, "error e");
                });
            }
          } else {
            alert("Already in wishlist");
          }
        }
      });
  };
  return (
    <>
      <Header1 />
      <div className="first-nav container-fluid">
        <span>
          <Link to="/">Home</Link>/{props.match.params._id}
        </span>
      </div>

      <div id="__next">
        {/* trending section  */}

        <section className="trending-section mt-4 mb-4">
          <div className="container m-auto h-100">
            <div className="row h-100">
              <div className="col-12 p-0">
                <div className="align-items-center position-relative h-100 d-flex text-center w-100 ">
                  <h1 className="trendign-head">Manufacturer</h1>
                  <h2 className="pl-4 product-head">Products</h2>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="products-area pb-40">
          <div className="container-fluid">
            <div className="row">
              {data.map((el, ind) => {
                if (el.manufacturer.name == props.match.params._id) {
                  return (
                    <div className="col-lg-3 col-md-12 col-sm-12 " key={ind}>
                      <div className="single-products-box border">
                        <div className="row  align-items-center product-div">
                          <div className="col-6 product-image-div">
                            <Link
                              to={"/SingleProduct/" + el._id}
                              className="product-image-link"
                            >
                              <div className="image hover-switch">
                                <img
                                  src={
                                    `${baseUrl}/` + el.image[0].path
                                  }
                                  alt=""
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
                              <div className="d-flex pb-2 pl-4">
                                <i className="bx bxs-star"></i>
                                <i className="bx bxs-star"></i>
                                <i className="bx bxs-star"></i>
                                <i className="bx bxs-star"></i>
                                <i className="bx bxs-star"></i>
                              </div>
                              <div className=" justify-content-center align-items-center d-flex pt-3 mr-5">
                                <div className="discount-price-div">
                                  <span>{el.inrDiscount}%</span>
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
                                      {el.inrDiscount}
                                </span>
                                <del className="new-price ml-1">
                                <i className="fa fa-inr"></i>{el.inrMrp}
                                </del>
                                {Userdata ? (
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
export default ProductByManufacturer;
