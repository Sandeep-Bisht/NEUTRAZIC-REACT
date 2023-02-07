import React from 'react'
import {BiArrowBack} from 'react-icons/bi';
import {TbKey} from 'react-icons/tb';
import '../components/Forgot.css';
import {Link} from 'react-router-dom';

function Forgot() {
  return (
    <>
    <section className='forgot-password-page'>
        <div className='container m-auto'>
            <div className='row mt-0'>
                <div className='col-8 mx-auto'>
                    <div className='d-flex justify-content-center align-items-center'>
                    <div className='forgot-page-wrapper'>
                        <div className='key-logo'>
                            <TbKey className='key-icon-wrap'/>
                        </div>
                        <div className='forgot-header'>
                        <h1>Forgot Password?</h1>
                        </div>
                        <div className='forgot-para'>
                        <p>No worries, we'll send you reset instructions.</p>
                        </div>
                        <div className='forgot-input'>
                        <label for='forgot-email'>Email</label>
                        <input type='text' id='forgot-email' placeholder='Enter your email' className='forgot-input-wrap'/>
                        </div>
                        <div className='forgot-reset-btn'>
                            <button type='button' className='reset-btn-wrap'>
                            Reset Password
                            </button>
                        </div>
                        <div className='back-to-login-wrapper'>
                        <BiArrowBack/><Link to='' className='back-to-login-link-wrap'>Back to log in</Link>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default Forgot