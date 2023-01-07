import * as CONSTANTS from "./constant";

export function addItemToCart() {
    console.log("inside action")
    return {
        type : CONSTANTS.ADD_ITEM_TO_CART,
        
    }
}
