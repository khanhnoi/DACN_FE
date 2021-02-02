import api from "../apis/index";
import {
  SIGN_IN,
  SIGN_OUT,
  GET_USER
} from "./types";
import { notification } from "antd";
import { createBrowserHistory } from "history";
import axios from "axios";
const history = createBrowserHistory();

export const signIn = (email, password) => async (dispatch) => {
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
  api
    .post("./logout", {
      token: window.localStorage.getItem(["token_jwt_easybuy"]),
    })
    .then((res) => res.data)
    .then((res) => {
      console.log(res);
      if (res.code === 200) {
        dispatch({ type: SIGN_OUT });
        window.localStorage.removeItem("token_jwt_easybuy");
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
  await api
    .get(`./profile`)
    .then((res) => res.data)
    .then((res) => {
      dispatch({ type: GET_USER, payload: res.data });
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};
