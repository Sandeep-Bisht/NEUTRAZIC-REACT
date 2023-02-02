import * as CONSTANTS from "./constant";

export const getCategories = (categories) => {
    return {
        type : CONSTANTS.GET_Categories_NUMBER,
        categories
    }
}
