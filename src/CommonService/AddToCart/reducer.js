import * as CONSTANTS from './constant';

export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CONSTANTS.GET_CARTITEMS_NUMBER :
            return {
                ...state,
                noOfItemsInCart : action.cartItems
            }      
        default:
            return state;
    }
};
