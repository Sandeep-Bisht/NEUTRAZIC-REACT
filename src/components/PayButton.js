import axios from "axios";
import { useSelector } from "react-redux";
//import url from backend

import React from 'react'

const PayButton = () => {
  return (
    <button onClick={()=> handleCheckout()}>
        Checkout
    </button>
  )
}

export default PayButton