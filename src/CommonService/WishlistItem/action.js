import * as CONSTANTS from "./constant";

export const getwishlistitem = (wishlisted) => {
    return {
        type : CONSTANTS.GET_Wishlist_NUMBER,
        wishlisted
    }
}