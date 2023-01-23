import * as CONSTANTS from "./constant";

export const getCartItem = (cartItems) => {
    return {
        type : CONSTANTS.GET_CARTITEMS_NUMBER,
        cartItems
    }
}
