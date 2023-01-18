import {
  PRODUCT_ADMIN_CREATE_FAIL,
  PRODUCT_ADMIN_CREATE_REQUEST,
  PRODUCT_ADMIN_CREATE_RESET,
  PRODUCT_ADMIN_CREATE_SUCCESS,
  PRODUCT_ADMIN_DELETE_FAIL,
  PRODUCT_ADMIN_DELETE_REQUEST,
  PRODUCT_ADMIN_DELETE_SUCCESS,
  PRODUCT_ADMIN_UPDATE_FAIL,
  PRODUCT_ADMIN_UPDATE_REQUEST,
  PRODUCT_ADMIN_UPDATE_RESET,
  PRODUCT_ADMIN_UPDATE_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeatilsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productAdminDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_ADMIN_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_ADMIN_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_ADMIN_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productAdminCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_ADMIN_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_ADMIN_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_ADMIN_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_ADMIN_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productAdminUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_ADMIN_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_ADMIN_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_ADMIN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_ADMIN_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const productCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
