import api from "../apis/index";
import { SIGN_IN, SIGN_OUT, GET_USER } from "./types";
import { notification } from "antd";
import { createBrowserHistory } from "history";
import axios from "axios";
const history = createBrowserHistory();

export const signIn = (email, password) => async (dispatch) => {
  //test login success
  if (email === "test@gmail.com" && password === "test") {
    console.log("Login ok");

    //set token local
    window.localStorage.setItem("token_jwt_eday", "token-eday-test");
    window.localStorage.setItem("profile", "khanhnoiTest");

    // change store => isSignedIn: true
    dispatch({ type: SIGN_IN });

    // redtrect url
    history.push("/cart");

    // Display
    notification["success"]({
      message: "Đăng nhập thành công",
      duration: 3,
    });
  } else {
    //test login fail
    notification["error"]({
      message: "Đăng nhập thất bại",
      duration: 1,
    });
  }
  return;

  api
    .post("./login", {
      email,
      password,
    })
    .then((res) => res.data)
    .then((res) => {
      console.log(res);
      if (res.code === 200) {
        window.localStorage.setItem("token_jwt_easybuy", res.data.token);
        window.localStorage.setItem("profile", res.data.user.name);
        dispatch({ type: SIGN_IN });
        history.push("/cart");
        notification["success"]({
          message: "Đăng nhập thành công",
          duration: 1,
        });
      } else {
        notification["error"]({
          message: "Đăng nhập thất bại",
          duration: 1,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      notification["error"]({
        message: err.message,
        duration: 1,
      });
    });
};

export const signOut = () => async (dispatch) => {
  dispatch({ type: SIGN_OUT });
  window.localStorage.removeItem("token_jwt_eday");
  window.localStorage.removeItem("profile");
  history.push("/login");
  notification["success"]({
    message: "Đăng xuất thành công",
    duration: 1,
  });
  return;
  api
    .post("./logout", {
      token: window.localStorage.getItem(["token_jwt_eday"]),
    })
    .then((res) => res.data)
    .then((res) => {
      console.log(res);
      if (res.code === 200) {
        dispatch({ type: SIGN_OUT });
        window.localStorage.removeItem("token_jwt_eday");
        window.localStorage.removeItem("profile");
        history.push("/login");
        notification["success"]({
          message: "Đăng xuất thành công",
          duration: 1,
        });
      } else {
        notification["error"]({
          message: "Đăng xuất thất bại",
          duration: 1,
        });
      }
    })
    .catch((err) => {
      notification["error"]({
        message: err.message,
        duration: 1,
      });
    });
};

export const getUser = () => async (dispatch) => {
  // await api
  //   .get(`./profile`)
  //   .then((res) => res.data)
  //   .then((res) => {
  //     dispatch({ type: GET_USER, payload: res.data });
  //   })
  //   .catch((err) => {
  //     throw new Error(err.message);
  //   });
  dispatch({ type: GET_USER, payload: "khanhNoi" });
};
