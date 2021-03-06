import api from "../apis/index";
import { SIGN_IN, SIGN_OUT, GET_USER } from "./types";
import { notification } from "antd";
import { createBrowserHistory } from "history";
import axios from "axios";
import { signinURL } from "../apis/urlsApi";
import { useHistory } from "react-router";
const history = createBrowserHistory();

export const signIn = (email, password) => async (dispatch) => {
  //test login success
  // if (email === "admin@gmail.com" && password === "123") {
  //   console.log("Login ok");

  //   //set token local
  //   window.localStorage.setItem("token_jwt_eday", "token-eday-test");
  //   window.localStorage.setItem("profile", "khanhnoiTest");

  //   // change store => isSignedIn: true
  //   dispatch({ type: SIGN_IN });

  //   // redtrect url
  //   history.push("/users");

  //   // Display
  //   notification["success"]({
  //     message: "Đăng nhập thành công",
  //     duration: 3,
  //   });
  // } else {
  //   //test login fail
  //   notification["error"]({
  //     message: "Đăng nhập thất bại",
  //     duration: 1,
  //   });
  // }
  // return;

  api
    .post(signinURL, {
      email,
      password,
    })
    .then((res) => res.data)
    // .then((res) => res.data)
    .then((res) => {
      console.log(res);
      if (res.data.token) {
        window.localStorage.setItem("token_jwt_eday", res.data.token);
        dispatch({ type: SIGN_IN });

        history.push("/users");

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
      console.log("Error login");
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
  // window.localStorage.removeItem("profile");
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
        // window.localStorage.removeItem("profile");
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
  await api
    .get(`./eday/auth/me`)
    .then((res) => res.data)
    .then((res) => {
      console.log("+User:");
      console.log(res.data);
      dispatch({ type: GET_USER, payload: res.data });
      if (res.data == null) {
        console.log("=>login");
      }
    })
    .catch((err) => {
      throw new Error(err.message);
    });
  //dispatch({ type: GET_USER, payload: "khanhNoi" });
};
