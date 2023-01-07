import * as CONSTANTS from "./constant";

export const INITIAL_STATE ={};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case CONSTANTS.ADD_ITEM_TO_CART :
            return {
                ...state,
                addItemToCart : action.response
            }

            default : return state;
    }
}

