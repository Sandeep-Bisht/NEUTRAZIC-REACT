import CurrencyContext from "./CurrencyContext";
import React, { useState } from "react";
import Cookies  from "universal-cookie";

const CurrencyState = (props) => {
    const [state1,setState1] = useState("0");
    const [loginState , setLoginState] = useState("0");
    const [resetForm,setResetForm]=useState("0")
  return (
    <CurrencyContext.Provider value={{state1,setState1,loginState,setLoginState, resetForm,setResetForm}}>
      {props.children}
    </CurrencyContext.Provider>
  );
};
export default CurrencyState;