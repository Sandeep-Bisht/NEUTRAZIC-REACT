import * as CONSTANTS from './constant';

export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CONSTANTS.GET_Wishlist_NUMBER :
            return {
                ...state,
                noOfItemsInwishlist : action.wishlisted
            }      
            default:
            return state;
    }
};