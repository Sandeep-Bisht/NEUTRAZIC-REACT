import * as CONSTANTS from "./constant";

export const getCartItem = (cartItems) => {
    console.log("from action", cartItems)
    return {
        type : CONSTANTS.GET_CARTITEMS_NUMBER,
        cartItems
    }
}
