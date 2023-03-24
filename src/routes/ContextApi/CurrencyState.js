import CurrencyContext from "./CurrencyContext";
import React, { useState } from "react";
import Cookies  from "universal-cookie";

const CurrencyState = (props) => {
  console.log(props,"Props Provider");
    const [state1,setState1] = useState("0");
    const [loginState , setLoginState] = useState("0");
  return (
    <CurrencyContext.Provider value={{state1,setState1,loginState,setLoginState}}>
      {props.children}
    </CurrencyContext.Provider>
  );
};
export default CurrencyState;