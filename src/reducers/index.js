import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productReducer from "./productReducer";
import orderReducer from "./orderReducer";
import shopReducer from "./shopReducer";
import { SIGN_OUT } from "../actions/types";

const appReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  orders: orderReducer,
  shops: shopReducer
});

const rootReducer = (state, action) => {
  if (action.type === SIGN_OUT) state = undefined;
  return appReducer(state, action);
};

export default rootReducer;