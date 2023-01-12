import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Footer from "./Footer";
import StarsRating from "stars-rating";
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
  const [order, Setorder] = useState([]);

  const history = useHistory();
  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    console.log(Userdata, "sadbhksabdhk");
    ProductByCategory();
    categoryDetails();
    CartById();
  }, []);

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
      {/* sidebar Modal */}
      {/* <!-- Modal --> */}

      <Header1 />
      {/* <i className="fa fa-filter collapse-btn" data-bs-toggle="modal" data-bs-target="#filterModal"></i> */}

      {/* Side nav bar */}

      {/* End Side navbar */}
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

      <div className="container Category-div">
        <div className="row align-items-center">
          <div className="col-6">
            <div className="section-title">
              <h2>{Categorydetails.name}</h2>
            </div>
          </div>
          <div className="col-5">
            <hr />
          </div>
          <div className="col-1"></div>
        </div>
      </div>

      <div id="container-fluid p-4 products">
        <div id="columns" className="columns_4 products-row row">
          {AllProduct.map((item, ind1) => {
            if (item.category._id == props.match.params.name) {
              return (
                <div className="col-lg-3 col-md-12 col-sm-12 ">
                  {/* <Link to={"/SingleProduct/" + el._id}> */}
                  <div className="single-products-box border">
                    <div className="row  align-items-center product-div">
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
                              ${" "}
                              {isNaN(
                                item.inrMrp -
                                  (item.inrMrp * item.inrDiscount) / 100
                              )
                                ? 0
                                : item.inrMrp -
                                  (item.inrMrp * item.inrDiscount) / 100}
                            </span>
                            <del className="new-price ml-1">{item.inrMrp}</del>
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
              );
            }
          })}
        </div>
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
export default Allcategory;
