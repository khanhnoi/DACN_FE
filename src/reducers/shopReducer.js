import _ from "lodash";
import {
  FETCH_SHOPS
} from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_SHOPS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    default:
      return state;
  }
};
