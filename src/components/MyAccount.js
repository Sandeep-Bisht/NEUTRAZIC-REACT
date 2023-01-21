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
    console.log(Userdata, "userdata");
    setData(Userdata);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onsubmit = (data) => {
    // alert("Success");
    // console.log(
    //   data.name,
    //   data.address,
    //   data.email,
    //   data.pincode,
    //   data.alternativeNumber,
    //   data.mobileNumber
    // );
  };
  return (
    <>
      <Header1 />
      <div id="Myacount-Page">
        {Userdata ?(
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="container mt-5 mb-5">
            <div className="row">
              <div className="col-12">
                <div className="card p-5 m-2">
                  <h4 className="Myacount-heading text-center pb-3">
                    My Account
                  </h4>
                  <div className="row">
                    <div className="col-6 p-1">
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
                      {/* {errors?.name?.type === "required" && <p className="text-danger">Name is Required</p>} */}
                    </div>

                    <div className="col-6 p-1">
                      <p className="ps-1">Address:</p>
                      <input
                        type="text"
                        className="form-control bg-light"
                        name="address"
                        rows="3"
                        {...register("address", { required: true })}
                      />
                      {/* {errors?.address?.type === "required" && <p className="text-danger">Address is Required</p>} */}
                    </div>
                    <div className="col-6 p-1">
                      <p className="ps-1">Pincode:</p>
                      <input
                        type="number"
                        className="form-control bg-light"
                        name="pincode"
                        {...register("pincode", { required: true })}
                      />
                      {/* {errors?.pincode?.type === "required" && <p className="text-danger">Pincode is Required</p>} */}
                    </div>
                    <div className="col-6 p-1">
                      <p className="ps-1">Mobile Number:</p>
                      <input
                        type="number"
                        className="form-control bg-light"
                        rows="3"
                        name="mobileNumber"
                        {...register("mobileNumber", { required: true })}
                      />
                      {/* {errors?.mobileNumber?.type === "required" && <p className="text-danger">Mobile Number is Required</p>} */}
                      {/* {errors?.mobileNumber?.type === "maxLength" && (<p className="text-danger">Please Enter a Valid Mobile Number</p>)}
                      {errors?.mobileNumber?.type === "minLength" && (<p className="text-danger">Please Enter a Valid Mobile Number 23</p>)} */}
                    </div>
                    <div className="col-6 p-1">
                      <p className="ps1">Email:</p>
                      <input
                        type="email"
                        className="form-control bg-light"
                        value={data.email}
                        rows="3"
                        name="email"
                        {...register("email", {
                          required: true,
                          pattern: /^\S+@\S+$/i,
                        })}
                      />
                      {/* {errors?.email?.type === "required" && (
                        <p className="text-danger">Email is Reuired</p>
                      )} */}
                      {/* {errors?.email?.type === "pattern" && (
                        <p className="text-danger">
                          Please include an '@' in the Email Address
                        </p>
                      )} */}
                    </div>
                    <div className="col-6 p-1">
                      <p className="ps-1">Alternative Number</p>
                      <input
                        type="text"
                        className="form-control bg-light"
                        rows="3"
                        name="alternativeNumber"
                        {...register("alternativeNumber", { required: true })}
                      />
                      {/* {errors?.alternativeNumber?.type === "required" && (
                        <p className="text-danger">Mobile Number is Required</p>
                      )} */}
                      {/* {errors?.alternativeNumber?.type === "maxLength" && (<p className="text-danger">Please Enter a Valid Mobile Number</p>)}
                      {errors?.alternativeNumber?.type === "minLength" && (<p className="text-danger">Please Enter a Valid Mobile Number 23</p>)} */}
                    </div>

                    <div className="col-12 d-flex justify-content-center mt-5 p-2">
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
        <div className="col-12 mt-4 text-center EMPTYWISHLIST-DIV">
            <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_yRyM3f.json"  background="transparent"  speed="1"  style={{width: "300px", height: "300px",margin:"auto"}}  loop  autoplay></lottie-player>
 
            </div>
}
      </div>
      <Footer />
    </>
  );
};
export default MyAccount;
