import React from 'react'
import '../components/PageNotFound.css';

function PageNotFound() {
  return (
    <>
    <section className='page-not-found-page'>
    <div className='container m-auto'>
        <div className='row'>
            <div className='col-md-12 col-lg-12 col-sm-12'>
            <p className='error-1'>HTTP: <span>404</span></p>
            <p className='error-2'>Page Not Found</p>
            </div>
        </div>
    </div>
    </section>
    </>
  )
}

export default PageNotFound