import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Footer from "./Footer";
import Header1 from "./Header1";
import ReadMoreReact from "read-more-react";
import "../views/landing/homepage.css";
import { baseUrl } from "../utils/services";

var Userdata;
const Allcategory = (props) => {
  const [AllProduct, setAllProduct] = useState([]);
  const [Categorydetails, setCategoryDetails] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [userCart, setUserCart] = useState([]);

  const history = useHistory();
  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    ProductByCategory();
    categoryDetails();
    CartById();
  }, []);

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
 
  const ProductByCategory = async () => {
    await fetch(`${baseUrl}/api/product/all_product`)
      .then((res) => res.json())
      .then(async (data) => {
        setAllProduct(data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
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
        await setCategoryDetails(data.data[0]);
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
        <div className="main-banner">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-5 col-md-12">
                <div className="main-banner-content">
                  <h1>
                    {Categorydetails.name !== undefined
                      ? Categorydetails.name
                      : null}
                  </h1>
                  <p>{Categorydetails.description}</p>
                  <a className="default-btn" href="#">
                    <i className="flaticon-trolley"></i> Shop Now
                  </a>
                </div>
              </div>
              <div className="col-lg-7 col-md-12">
                <div className="main-banner-image">
                  {Categorydetails.image !== undefined ? (
                    <img
                      src={
                        `${baseUrl}/` + Categorydetails.image[0].path
                      }
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container m-auto Category-div">
        <div className="row align-items-center">
          <div className="col-12">
            <div className="section-title">
              <h2>{Categorydetails.name}</h2>
            </div>
          </div>
        </div>
      </div>

      <div id="container m-auto p-4 products">
        <div id="columns" className="columns_4 products-row row">
          {AllProduct.map((item, ind1) => {
            if (item.category._id == props.match.params.name) {
              return (
                <div className="col-lg-3 col-md-12 col-sm-12 " key={ind1}>
                  <div className="single-products-box border">
                    <div className="row  align-items-center product-div">
                      <div className="col-6 product-image-div">
                        <Link
                          to={"/SingleProduct/" + item._id}
                          className="product-image-link"
                        >
                          <div className="image hover-switch">
                            <img
                              src={
                                `${baseUrl}/` + item.image[0].path
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
                                  {item.inrDiscount}
                            </span>
                            <del className="new-price ml-1">
                            <i className="fa fa-inr"></i>{item.inrMrp}</del>
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
                                    Userdata == null ? "#exampleModal" : null
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
      <Footer />
    </>
  );
};
export default Allcategory;
