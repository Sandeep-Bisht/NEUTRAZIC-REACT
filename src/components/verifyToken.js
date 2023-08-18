import React, { useEffect } from 'react'
import { useLocation,Link } from 'react-router-dom'
import { TiTick } from "react-icons/ti";
import axios from "axios";
import { baseUrl } from '../utils/services';
import Header1 from './Header1';
import Footer from './Footer';

function VerifyToken(props) {
    const token = props.match.params.token;
    useEffect(()=>{ 
      verifyToken(token); 
    },[]);

    const verifyToken=async(token)=>{
     const response=await axios.post(`${baseUrl}/api/subscribed/verify`,
     {token:token}
     )
    }

  return (
    <>
    <Header1 />
    <div className="order-success-page mb-5">
        <div className="container m-auto">
          <div className="row mt-0">
            <div className="col-lg-8 col-md-10 col-sm-10 col-12 mx-auto order-success-div">
              <div className="order-success-card">
                <div className="success-heading">
                  <h1>Subscribed successfully </h1>
                </div>
                <div className="success-svg">
                  <TiTick />
                </div>
                <div className="success-thank-you">
                  <h2>Thank you for Subscribe !</h2>
                </div>
                <div className="success-email-confirm-msg">
                  <p>
                    You will update any offers.
                  </p>
                </div>
                <button className="success-home-btn" type="button">
                  <Link to="/">Continue Shopping</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default VerifyToken