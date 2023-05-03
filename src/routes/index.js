import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { StateProvider } from "../state";
// import { INITIAL_STATE as AUTH_INITIAL_STATE } from "../state/auth/reducers";
// import { INITIAL_STATE as PRODUCT_INITIAL_STATE } from "../state/product/reducers";
// import reducers from "../state/reducers";
// import BaseStyles from './base-styles';
import PrivateRoute from "./private-route";
// import Content from '../components/content';
import Login from "../views/login";
import Home from "../views/home";
import HomePage from "../views/landing/HomePage";
import Footer from "../components/Footer";
import Register from "../components/form/Register";
import Dashboard from "../components/Admin/Dashboard";
import Productform from "../components/Admin/Productform";
import CategoryCreation from "../components/Admin/CategoryCreation";
import ManufacturerCreation from "../components/Admin/ManufacturerCreation";
import SingleProduct from "../components/SingleProduct";
import Cart from "../components/Cart";
import ContactUs from "../components/ContactUs";
import About from "../components/About";
import Allcategory from "../components/Allcategory";
import Ordered from "../components/Ordered";
import OrderDetails from "../components/OrderDetails";
import Checkout from "../components/Checkout";
import UserDetails from "../components/form/UserDetails";
import Header1 from "../components/Header1";
import WishList from "../components/WishList";
// import AddressPage from "../components/AddressPage";
import ShippingAddress from "../components/ShippingAddress";
import Vieworder from "../components/Admin/NewOrder";
import NewOrder from "../components/Admin/NewOrder";
import InProgressOrder from "../components/Admin/InProgressOrder";
import DeliveredOrder from "../components/Admin/DeliveredOrder";
import Roles from "../components/Admin/Roles";
import SubCategoryCreation from "../components/Admin/SubCategoryCreation";
import AllProducts from "../components/AllProducts";
import Subcategories from "../components/Subcategories";
import TrendingProducts from "../components/TrendingProducts";
import ProductByManufacturer from "../components/ProductByManufacturer";
import SearchResult from "../components/SearchResult";
import AllProductsDetails from "../components/Admin/AllProducts/AllProductsDetails";
import AllCategoriesDetails from "../components/Admin/AllCategory/AllCategoriesDetails";
import AllSubCategoriesDetails from "../components/Admin/AllSubCategory/AllSubCategoriesDetails";
import AllManufactureDetails from "../components/Admin/AllManufacture/AllManufactureDetails";
import UserProfile from "../components/Admin/UserProfile";
import MyAccount from "../components/MyAccount";
import Success from "../components/Success";
import AllUsers from "../components/Admin/AllUsers";
import PrivacyPolicy from "../components/PrivacyPolicy";
import TermsConditions from "../components/TermsConditions";
import ReturnRefund from "../components/ReturnRefund";
import ShippingPolicy from "../components/ShippingPolicy";
import Faq from "../components/Faq";
import OrderSuccess from "../components/OrderSuccess";
import Create from "../components/Admin/CreateBlog";
import Forgot from "../components/Forgot";
import Warehouse from "../components/Admin/Warehouse";
import AllWarehouseDetails from "../components/Admin/AllWarehouse/AllWarehouseDetails";
import SingleBlogPage from "../components/SingleBlogPage";
import userOrder from "../components/userOrder";
import PackedOrder from "../components/Admin/PackedOrder";
import ShippedOrder from "../components/Admin/ShippedOrder";
import CancelOrder from "../components/Admin/CancelOrder";
import AllBlogs from "../components/Admin/AllBlogs/AllBlogs";
import Blogs from "../components/Blog";
import PageNotFound from "../components/PageNotFound";
import NeedSupport from "../components/NeedSupport";
import CurrencyState from "./ContextApi/CurrencyState";
import AppStoreNutrazik from "../components/AppStoreNutrazik";
import verifyToken from "../components/verifyToken";

var Userdata = "";
const Root = (props) => {
  const [currancyType, setCurrancyType] = useState("");

  useEffect(() => {}, []);
  const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props}> </Component>
        </Layout>
      )}
    ></Route>
  );
  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
  }, []);
  return (
    <CurrencyState>
      <Provider store={store}>
        <Router>
          <>
            <Switch>
              <Route exact path="/subscribed/:token" component={verifyToken}/>
              <Route exact path="/AllProducts" component={AllProducts} />
              <Route exact path="/" component={HomePage} />
              <Route exact path="/Register" component={Register} />
              <Route exact path="/Warehouse" component={Warehouse} />
              <Route
                exact
                path="/SingleBlogPage/:slug"
                component={SingleBlogPage}
              />

              <Route exact path="/mobileapp" component={AppStoreNutrazik} />
              <Route
                exact
                path={"/Configuration/" + "AllWarehouseDetails"}
                component={AllWarehouseDetails}
              />
              <Route exact path="/userOrder" component={userOrder} />
              <Route exact path="/Dashboard" component={Dashboard} />
              <Route exact path="/Productform" component={Productform} />
              <Route exact path="/Category" component={CategoryCreation} />
              <Route exact path="/CreateBlog" component={Create} />
              <Route
                exact
                path="/Manufacturer"
                component={ManufacturerCreation}
              />
              <Route exact path="/Blogs" component={Blogs} />
              <Route exact path="/AllBlogs" component={AllBlogs} />
              <Route
                exact
                path={"/Configuration/" + "AllManufactureDetails"}
                component={AllManufactureDetails}
              />
              <Route exact path="/Ordered" component={Ordered} />
              <Route
                exact
                path={"/Configuration/" + "AllProductsDetails"}
                component={AllProductsDetails}
              />
              <Route
                exact
                path={"/Configuration/" + "AllCategoriesDetails"}
                component={AllCategoriesDetails}
              />
              <Route
                exact
                path={"/Configuration/" + "AllSubCategoriesDetails"}
                component={AllSubCategoriesDetails}
              />
              <Route
                exact
                path="/SingleProduct/:id"
                component={SingleProduct}
              />
              <Route exact path="/Cart" component={Cart} />
              <Route exact path="/ContactUs" component={ContactUs} />
              <Route exact path="/aboutus" component={About} />
              <Route exact path="/Allcategory/:name" component={Allcategory} />

              <Route exact path="/UserProfile" component={UserProfile} />
              <Route
                exact
                path="/OrderDetails/:productid"
                component={OrderDetails}
              />
              <Route exact path="/Success" component={Success} />
              <Route exact path="/Checkout" component={Checkout} />
              <Route exact path="/UserDetails/:_id" component={UserDetails} />
              <Route exact path="/Header1" component={Header1} />
              <Route exact path="/WishList" component={WishList} />
              {/* <Route exact path="/AddressPage" component={AddressPage} /> */}
              <Route
                exact
                path={"/NewOrder/" + "Pending"}
                component={NewOrder}
              />

              <Route
                exact
                path={"/NewOrder/" + "InProgress"}
                component={InProgressOrder}
              />
              <Route
                exact
                path={"/NewOrder/" + "Packed"}
                component={PackedOrder}
              />
              <Route
                exact
                path={"/NewOrder/" + "Shipped"}
                component={ShippedOrder}
              />
              <Route
                exact
                path={"/NewOrder/" + "Canceled"}
                component={CancelOrder}
              />

              <Route
                exact
                path={"/NewOrder/" + "Delivered"}
                component={DeliveredOrder}
              />
              <Route exact path={"/IAM/"+"Roles"} component={Roles} />
              <Route
                exact
                path="/SubCategory"
                component={SubCategoryCreation}
              />
              <Route path={"/IAM/"+"AllUsers"} component={AllUsers} />
              <Route
                exact
                path="/Subcategories/:_id"
                component={Subcategories}
              />
              <Route
                exact
                path="/TrendingProducts"
                component={TrendingProducts}
              />
              <Route
                exact
                path="/ProductByManufacturer/:_id"
                component={ProductByManufacturer}
              />
              <Route
                exact
                path="/SearchResult/:Search"
                component={SearchResult}
              />
              <Route exact path="/MyAccount" component={MyAccount} />
              <Route path="/PageNotFound" component={PageNotFound} />
              <Route path="/privacy&policy" component={PrivacyPolicy} />
              <Route path="/terms&condition" component={TermsConditions} />
              <Route path="/return&refund" component={ReturnRefund} />
              <Route path="/shippingPolicy" component={ShippingPolicy} />
              <Route path="/Faq" component={Faq} />
              <Route path="/orderSuccess" component={OrderSuccess} />
              <Route path="/forgotPassword" component={Forgot} />
              <Route path="/support" component={NeedSupport} />
            </Switch>
          </>
        </Router>
      </Provider>
    </CurrencyState>
    //* </StateProvider> */
  );
};

export default Root;
