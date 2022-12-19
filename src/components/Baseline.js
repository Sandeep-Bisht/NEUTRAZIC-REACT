import React from 'react'
import '../components/singleproduct.css'
import {FaShippingFast} from "react-icons/fa";
import {MdSupportAgent} from 'react-icons/md';
import {MdPayment} from 'react-icons/md';
import {TbTruckReturn} from 'react-icons/tb';

const Baseline=()=>{
    return(
        <>
            <div class="facility-area">
          <div class="container m-auto">
            <div class="row">
              <div class="col-lg-3 col-sm-6 col-md-3 col-6 box ">
                <div class="single-facility-box">
                  <div class="icon">
                    <i class="flaticon-free-shipping"><FaShippingFast/></i>
                  </div>
                  <h3>Free Shipping</h3>
                  <p>Free shipping world wide</p>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-md-3 col-6  box ">
                <div class="single-facility-box">
                  <div class="icon">
                    <i class="flaticon-headset"><MdSupportAgent/></i>
                  </div>
                  <h3>Support 24/7</h3>
                  <p>Contact us 24 hours a day</p>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-md-3 col-6  box ">
                <div class="single-facility-box">
                  <div class="icon">
                    <i class="flaticon-secure-payment"><MdPayment/></i>
                  </div>
                  <h3>Secure Payments</h3>
                  <p>100% payment protection</p>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-md-3 col-6  box ">
                <div class="single-facility-box">
                  <div class="icon">
                    <i class="flaticon-return-box"><TbTruckReturn/></i>
                  </div>
                  <h3>Easy Return</h3>
                  <p>Simple returns policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        </>
    );
}
export default Baseline;