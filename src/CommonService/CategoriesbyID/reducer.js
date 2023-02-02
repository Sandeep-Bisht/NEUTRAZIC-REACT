import * as CONSTANTS from './constant';

export const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CONSTANTS.GET_Categories_NUMBER :
            return {
                ...state,
                noOfItemsIncategories : action.categories
            }      
            default:
            return state;
    }
};