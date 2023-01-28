import React, {useEffect} from 'react';
import Footer from './Footer';
import Header1 from './Header1';
import '../components/ReturnRefund.css';

function ReturnRefund() {
    useEffect(()=>{
        window.scroll(0,0);
    },[])
  return (
    <>
<Header1/>
    <div className='container m-auto'>
        <div className='row'>
            <div className='col-12'>
                <div className='return-policy-section'>
                    <h2>Return policy</h2>
                    <p><b>last updated January 01, 2023</b></p>
                    <h2>Refund</h2>
                    <p>All sales are final and no refund will be issued.</p>
                    <h2>Questions?</h2>
                    <p>If you have any questions concerning our return policy, please contact us at : <br/> <b>nutrazik.giksindia.com</b></p>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
    </>
  )
}

export default ReturnRefund