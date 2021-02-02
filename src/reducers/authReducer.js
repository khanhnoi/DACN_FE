import { SIGN_IN, SIGN_OUT, GET_USER } from "../actions/types";

const INTIAL_STATE = {
  isSignedIn: window.localStorage.getItem("token_jwt_easybuy") ? true : false,
  userId: null,
  profile: null
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true };
    case SIGN_OUT:
      return { ...state, isSignedIn: false };
    case GET_USER:
      return { ...state, profile: action.payload };
    default:
      return state;
  }
};
