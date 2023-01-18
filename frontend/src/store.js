import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productAdminCreateReducer,
  productAdminDeleteReducer,
  productAdminUpdateReducer,
  productCreateReviewReducer,
  productDeatilsReducer,
  productListReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userAdminDeleteReducer,
  userAdminListReducer,
  userAdminUpadateReducer,
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";
import {
  myOrdersReducer,
  orderAdminDeliverReducer,
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  ordersAdminListReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDeatilsReducer,
  productAdminDelete: productAdminDeleteReducer,
  productAdminCreate: productAdminCreateReducer,
  productAdminUpdate: productAdminUpdateReducer,
  productCreateReview: productCreateReviewReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderAdminDeliver: orderAdminDeliverReducer,
  myOrders: myOrdersReducer,
  ordersAdminList: ordersAdminListReducer,
  userAdminList: userAdminListReducer,
  userAdminDelete: userAdminDeleteReducer,
  userAdminUpdate: userAdminUpadateReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleWare = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
