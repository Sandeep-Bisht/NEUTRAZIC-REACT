import CurrencyContext from "./CurrencyContext";
import React, { useState } from "react";
import Cookies  from "universal-cookie";

const CurrencyState = (props) => {
    const [state1,setState1] = useState("0");
    const [loginState , setLoginState] = useState("0");
    const [modalreset,setModalreset] = useState("0");
  return (
    <CurrencyContext.Provider value={{state1,setState1,loginState,setLoginState,modalreset,setModalreset}}>
      {props.children}
    </CurrencyContext.Provider>
  );
};
export default CurrencyState;