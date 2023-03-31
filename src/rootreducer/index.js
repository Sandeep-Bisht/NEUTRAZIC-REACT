import { combineReducers } from "redux";
import GetCartItemReducer from "../CommonService/AddToCart/reducer";
import GetCategoriesReducer from "../CommonService/CategoriesbyID/reducer"
import GetWishlistedReducer from "../CommonService/WishlistItem/reducer";


const rootReducer = combineReducers ({
    GetCartItemReducer,
    GetCategoriesReducer,
    GetWishlistedReducer
});
export default rootReducer;