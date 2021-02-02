import _ from "lodash";
import { FETCH_ORDERS, VIEW_ORDER } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case VIEW_ORDER:
      return { ...state, orderSelected: action.payload };
    default:
      return state;
  }
};
