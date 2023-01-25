import React from 'react'
import {TiTick} from 'react-icons/ti';
import '../components/OderSuccess.css';
import {Link} from 'react-router-dom';
import Footer from './Footer';
import Header1 from './Header1';

function OrderSuccess() {
  return (
    <>
    <Header1/>
    <div className='order-success-page'>
    <div className='container m-auto'>
        <div className='row mt-0'>
            <div className='col-8 mx-auto'>
                <div className='order-success-card'>
        <div className='success-heading'>
            <h1>Your order has been placed successfully</h1>
        </div>
        <div className='success-svg'>
<TiTick/>
        </div>
        <div className='success-thank-you'>
            <h2>Thank you for your purchase !</h2>
        </div>
        <div className='success-order-id'>
           <p>Your order ID is: 0123456789</p>
        </div>
        <div className='success-email-confirm-msg'>
            <p>You will receive an order confirmation email with details of your order.</p>
        </div>
        <button className='success-home-btn' type='button'>
            <Link to='/'>Continue Shopping</Link>
        </button>
            </div>
        </div>
        </div>
    </div>
    </div>
        <Footer/>
    </>
  )
}

export default OrderSuccess