import api from "../apis/index";
import { FETCH_ORDERS, VIEW_ORDER } from "./types";

export const fetchUsers = () => async (dispatch) => {
  return await api
    .get("./user")
    .then((res) => res.data)
    .then((res) => {
      dispatch({ type: FETCH_ORDERS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });
};

export const viewOrder = (id) => async (dispatch) => {
  console.log(id);
  // return await api
  //   .get("./vieworder", {
  //     params: {
  //       order_id: id,
  //     },
  //   })
  //   .then((res) => res.data)
  //   .then((res) => {
  //     res.data.order.description = res.data.order.description
  //       .split("|")
  //       .map((x) => x.trim());
  //     dispatch({ type: VIEW_ORDER, payload: res.data });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     throw new Error(err.message);
  //   });
};
