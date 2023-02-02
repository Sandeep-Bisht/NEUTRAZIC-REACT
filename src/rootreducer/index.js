import { combineReducers } from "redux";
import GetCartItemReducer from "../CommonService/AddToCart/reducer";
import GetCategoriesReducer from "../CommonService/CategoriesbyID/reducer"


const rootReducer = combineReducers ({
    GetCartItemReducer,
    GetCategoriesReducer
});
export default rootReducer;