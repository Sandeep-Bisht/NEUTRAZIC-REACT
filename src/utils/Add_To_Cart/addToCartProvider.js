import React, { Children } from "react";

function addToCartReducer(state, action) {
    switch (action.type) {
      case 'AddToCart_Loading':
        return {
          ...state,
          isLoading: true
        };
       case 'AddToCart_Success':
        return {
          ...state,
          isLoading: false,
          addToCartResponse: action.payload
        };
        case 'AddToCart_Failure':
        return {
          ...state,
          isLoading: false,
          Errorresponse: Math.random()
        };
      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  }

let AddToCartStateContext = React.createContext();
let AddToCartDispatchContext = React.createContext();

let AddToCartProvider = ({children}) => {
    let [state, dispatch] = React.useReducer(addToCartReducer, {
        isAuthenticated: true
      });
    
      return (
        <AddToCartStateContext.Provider value={state}>
          <AddToCartDispatchContext.Provider value={dispatch}>{children}</AddToCartDispatchContext.Provider>
        </AddToCartStateContext.Provider>
    );
}

function useAddToCartState() {
    let context = React.useContext(AddToCartStateContext);
    if (context === undefined) {
      throw new Error('useAppState must be used within a AppProvider');
    }
    return context;
  }
  
function useAddToCartDispatch() {
    let context = React.useContext(AddToCartDispatchContext);
    if (context === undefined) {
      throw new Error('useAppDispatch must be used within a AppProvider');
    }
    return context;
}

export {
    AddToCartProvider,
    useAddToCartState,
    useAddToCartDispatch,
    updateCart
};


function updateCart(dispatch, userCart, Userdata) {
  dispatch({type: 'AddToCart_Loading'})
  const url = "http://localhost:3033/api/cart/update_cart_by_id";
    fetch(url, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: userCart._id,
        userid: Userdata._id,
        order: userCart.order,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "inside update");
        if(res.error !== 200) {
          dispatch({
            type:'AddToCart_Failure',
            payload: res.message
          });
        } else {
          dispatch({
            type:'AddToCart_Success',
            payload: res
          });
        }
        
        // history.push("/Cart");
      })
      .then((err) => {
        dispatch({
          type:'AddToCart_Failure',
          payload: err
        });
      });
}