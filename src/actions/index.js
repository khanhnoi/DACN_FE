// import api from "../apis/index";
// import {
//   SIGN_IN,
//   SIGN_OUT,
//   FETCH_PRODUCTS,
//   EDIT_PRODUCTS,
//   DELETE_PRODUCTS,
//   GET_USER,
//   FETCH_SHOPS,
//   FETCH_ORDERS,
//   VIEW_ORDER,
//   FETCH_ALL_PRODUCT,
//   SELECTED_PRODUCTS,
//   VIEW_PRODUCT_DETAIL
// } from "./types";
// import { notification } from 'antd'
// import { createBrowserHistory } from "history";
// const history = createBrowserHistory();

// export const signIn = (email, password) => async (dispatch) => {
//   api
//     .post("./login", {
//       email,
//       password,
//     })
//     .then(res => res.data)
//     .then(res => {
//       console.log(res)
//       if (res.code === 200) {
//         window.localStorage.setItem("token_jwt_easybuy", res.data.token);
//         window.localStorage.setItem("profile", res.data.user.name);
//         dispatch({ type: SIGN_IN });
//         history.push("/cart");
//         notification["success"]({
//           message: "Đăng nhập thành công",
//           duration: 1,
//         });
//       } else {
//         notification["error"]({
//           message: "Đăng nhập thất bại",
//           duration: 1,
//         });
//       }
//     })
//     .catch((err) => {
//       console.log(err)
//       notification["error"]({
//         message: err.message,
//         duration: 1,
//       });
//     });
// };


// export const signOut = () => async (dispatch) => {
//   api
//     .post("./logout", {
//       token: window.localStorage.getItem(["token_jwt_easybuy"]),
//     })
//     .then(res => res.data)
//     .then(res => {
//       console.log(res)
//       if (res.code === 200) {
//         dispatch({ type: SIGN_OUT });
//         window.localStorage.removeItem("token_jwt_easybuy");
//         window.localStorage.removeItem("profile");
//         history.push("/login");
//         notification["success"]({
//           message: "Đăng xuất thành công",
//           duration: 1,
//         });
//       } else {
//         notification["error"]({
//           message: "Đăng xuất thất bại",
//           duration: 1,
//         });
//       }
//     })
//     .catch((err) => {
//       notification["error"]({
//         message: err.message,
//         duration: 1,
//       });
//     });
// }

// export const fetchProducts = () => async (dispatch) => {
//   await api.get("./viewcart")
//   .then(res => res.data)
//   .then(res => {
//     dispatch({ type: FETCH_PRODUCTS, payload: res.data.listProduct });
//   })
//   .catch(err => { 
//     throw new Error(err.message)
//   })
// };

// export const fetchAllProduct = () => async (dispatch) => {
//   await api.get("./allproduct")
//   .then(res => res.data)
//   .then(res => {
//     dispatch({ type: FETCH_ALL_PRODUCT, payload: res.data });
//   })
//   .catch(err => { 
//     throw new Error(err.message)
//   })
// };

// export const viewProductDetail = (id) => async (dispatch) => {
//   await api.get("./viewdetailproduct", {
//     params: {
//       id: id
//     }
//   })
//   .then(res => res.data)
//   .then(res => {
//     console.log(res)
//     dispatch({ type: VIEW_PRODUCT_DETAIL, payload: res.data});
//   }).catch(err => {
//     throw new Error(err.message)
//   });
// }

// export const editProducts = (product) => async (dispatch) => {
//   console.log(product)
//   return await api
//     .post(
//       "./updateorderproduct",
//       {
//         order_product_id: product.id,
//         quality: product.quality,
//         description: product.description
//       },
//     )
//     .then((res) => res.data)
//     .then((res) => {
//       dispatch({ type: EDIT_PRODUCTS, payload: res.data });
//     })
//     .catch((err) => {
//       console.log(err);
//       throw new Error(err.message);
//     });
// };

// export const editSelectedProducts = (product) => async (dispatch) => {
//   console.log(product)
//   dispatch({ type: SELECTED_PRODUCTS , payload: product});
// }

// export const deleteProducts = (id) => async (dispatch) => {
//   await api
//     .post(
//       "./removeorderproduct",
//       {
//         order_product_id: id,
//       },
//     )
//     .then(() => {
//       dispatch({ type: DELETE_PRODUCTS, payload: id });
//     })
//     .catch((err) => {
//       throw new Error(err.message);
//     });
// };

// export const getUser = () => async (dispatch) => {
//   await api
//     .get(`./profile`)
//     .then((res) => res.data)
//     .then((res) => {
//       dispatch({ type: GET_USER, payload: res.data });
//     })
//     .catch((err) => {
//       throw new Error(err.message);
//     });
// };

// export const fetchOrders = () => async (dispatch) => {
//   return await api
//     .get("./listorder")
//     .then((res) => res.data)
//     .then((res) => {
//       dispatch({ type: FETCH_ORDERS, payload: res.data });
//     })
//     .catch((err) => {
//       console.log(err);
//       throw new Error(err.message);
//     });
// }

// export const viewOrder = (id) => async (dispatch) => {
//   console.log(id)
//   return await api
//     .get(
//       "./vieworder",
//       {
//         params: {
//           order_id: id,
//         },
//       }
//     )
//     .then((res) => res.data)
//     .then((res) => {
//       res.data.order.description = res.data.order.description.split("|").map(x => x.trim());
//       dispatch({ type: VIEW_ORDER, payload: res.data });
//     })
//     .catch((err) => {
//       console.log(err);
//       throw new Error(err.message);
//     });
// };

// export const fetchShops = () => async (dispatch) => {
//   return await api.get(`./listshop`)
//   .then(res => res.data)
//   .then(res => {
//     dispatch({ type: FETCH_SHOPS, payload: res.data });
//   })
//   .catch(err => {
//     console.log(err)
//     throw new Error(err.message)
//   })
// }
