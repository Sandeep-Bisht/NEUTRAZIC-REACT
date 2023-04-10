import React from "react";
import Header1 from "./Header1";
import Footer from "./Footer";
import "./Component.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

var Userdata = "";

const MyAccount = () => {
  const [data, setData] = useState({});
  window.scroll(0, 0);
  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    setData(Userdata);
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },   
  } = useForm(
    {
      mode:"onBlur",
    },
   
  );
  const onsubmit = (data) => {
    
  };
 
  
  return (
    <>
      <Header1 />
      <section className="myAccount-area">
      <div id="Myacount-Page">
        {Userdata ?(
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="container mt-5 mb-4">
            <div className="row">
              <div className="col-12 Myacount-Page">
                <div className="card p-4 m-2">
                  <h4 className="Myacount-heading text-center pb-3">
                    My Account
                  </h4>
                  <div className="row">
                    <div className="col-md-6 col-12 p-1">
                      <p className="ps-1">Name:</p>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        rows="3"
                        value={data.username}
                        name="name"
                        {...register("name", { required: true, maxLength: 20 })}
                      />
                      {/* {errors?.name?.type === "required" && <p className="text-danger">This field is required</p>} */}
                    </div>

                    <div className="col-md-6 col-12 p-1">
                      <p className="ps-1">Address:</p>
                      <input
                        type="text"
                        className="form-control bg-light"
                        name="address"
                        rows="3"
                        {...register("address", { required: false })}
                      />
                    </div>
                    <div className="col-md-6 col-12 p-1">
                      <p className="ps-1">Pincode:</p>
                      <input
                        type="number"
                        className="form-control bg-light"
                        name="pincode"
                        onInput={(e)=>{
                          if(e.target.value>e.target.maxLength)
                          {
                            e.target.value=e.target.value.slice(0,e.target.maxLength)
                          }
                        }}
                        maxLength={6}
                        {...register("pincode", { required: false })}
                      />
                    </div>
                    <div className="col-md-6 col-12 p-1">
                      <p className="ps-1">Mobile Number:</p>
                      <input
                        type="number"
                        value={data.phonenumber}
                        className="form-control bg-light"
                        rows="3"
                        name="mobileNumber"/>
                      </div>
                    <div className="col-md-6 col-12 p-1">
                      <p className="ps1">Email:</p>
                      <input
                        type="email"
                        className="form-control bg-light"
                        value={data.email}
                        rows="3"
                        name="email"
                      />
                    </div>
                    <div className="col-md-6 col-12 p-1">
                      <p className="ps-1">Alternative Number</p>
                      <input
                        type="number"
                        className="form-control bg-light"
                        rows="3"
                        name="alternativeNumber"
                        onInput={(e)=>{
                          if(e.target.value>e.target.maxLength)
                          {
                            e.target.value=e.target.value.slice(0,e.target.maxLength);
                          }
                        }}
                        maxLength={10}
                        {...register("alternativeNumber", { required: false })}
                      />
                      </div>

                    <div className="col-12 d-flex justify-content-center mt-4 p-2">
                      <button
                        className="Myacount-button btn btn-primary"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        ):
        <div className="col-12 pt-4 text-center EMPTYWISHLIST-DIV myAccount-empty-div">
            <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_yRyM3f.json" className="lottie-myAccount" background="transparent"  speed="1"  style={{width: "300px", height: "300px",margin:"auto"}}  loop  autoplay></lottie-player>
            </div>
          }
      </div> 
      </section>
      <Footer />
    </>
  );
};
export default MyAccount;
