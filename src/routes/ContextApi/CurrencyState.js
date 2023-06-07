import CurrencyContext from "./CurrencyContext";
import React, { useState } from "react";
import { useEffect } from "react";
import Cookies from "universal-cookie";

const CurrencyState = (props) => {
  const [state1, setState1] = useState("0");
  const [loginState, setLoginState] = useState("0");
  const [resetForm, setResetForm] = useState("0");
  const [searchedtext, setSearchedText] = useState("");
  const [searchlength, setSearchLength] = useState("");

  return (
    <CurrencyContext.Provider
      value={{
        state1,
        setState1,
        loginState,
        setLoginState,
        resetForm,
        setResetForm,
        searchedtext,
        setSearchedText,
        searchlength,
        setSearchLength,
      }}
    >
      {props.children}
    </CurrencyContext.Provider>
  );
};
export default CurrencyState;
