import { SIGN_IN, SIGN_OUT, GET_USER } from "../actions/types";

const INTIAL_STATE = {
  isSignedIn: window.localStorage.getItem("token_jwt_eday") ? true : false,
  userId: null,
  profile: null,
};

const mockProfile = {
  id: 1,
  name: "khanhnoi",
  email: "test@gmail.com",
  email_verified_at: "2019-01-28T12:53:21.000000Z",
  phone: "0123456781",
  address: "DN",
  shipping_name: "user1",
  shipping_phone: "0123456781",
  shipping_address: "DN",
  created_at: "2019-02-08T12:53:21.000000Z",
  updated_at: "2020-06-28T13:35:01.000000Z",
  deleted_at: null,
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true };
    case SIGN_OUT:
      return { ...state, isSignedIn: false };
    case GET_USER:
      // return { ...state, profile: mockProfile };
      return { ...state, profile: action.payload };
    default:
      return state;
  }
};
