import React from 'react'
import '../components/singleproduct.css'
const ShippingAddress = ()=>{
    return(<>
          
          <div className="shipping-address">
          <div className="status"><span className="address-status">Address chnaged successfully.</span></div>
            <h2>Shipping Address</h2>
            <div>
              <p>Mayank Gurung
                  582 dakra dehradun
                  Shiv statue
                  Dehradun 248003
                  Uttarakhand, India
                <a>  <span className="Edit"> Edit</span></a>
              </p>
               
            </div>
           
          </div>
      
    </>);
}

export default ShippingAddress;