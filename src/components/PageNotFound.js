import React from 'react'
import { Router } from 'react-router';
import '../components/PageNotFound.css';
import {Link} from "react-router-dom"

function PageNotFound() {
  
  return (
    <>
    <section className='page-not-found-page'>
    <div className='container m-auto'>
        <div className='row'>
            <div className='col-md-12 col-lg-12 col-sm-12'>
            <p className='error-1'>HTTP: <span>404</span></p>
            <p className='error-2'>Page Not Found</p>
            <Link to="/">Back to Home</Link>
            </div>
        </div>
    </div>
    </section>
    </>
  )
}

export default PageNotFound