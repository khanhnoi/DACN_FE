import api from "../apis/index";
import {
  FETCH_PRODUCTS,
  EDIT_PRODUCTS,
  DELETE_PRODUCTS,
  FETCH_ALL_PRODUCT,
  GET_CATEGORYS,
  SELECTED_PRODUCTS,
  VIEW_PRODUCT_DETAIL,
  ADD_PRODUCTS,
} from "./types";
import {
  getAllProductURL,
  getDetailProductURL,
  getListCategoryURL,
} from "../apis/urlsApi";
import { notification } from "antd";

export const fetchAllProduct = () => async (dispatch) => {
  await api
    .get(getAllProductURL)
    .then((res) => res.data)
    .then((res) => {
      console.log(res);
      dispatch({ type: FETCH_ALL_PRODUCT, payload: res.data });
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};

export const fetchDetailProduct = (id) => async (dispatch) => {
  await api
    .get(getDetailProductURL(id))
    .then((res) => res.data)
    .then((res) => {
      console.log(res);
      dispatch({ type: VIEW_PRODUCT_DETAIL, payload: res.data });
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const fetchCategorysProduct = () => async (dispatch) => {
  await api
    .get(getListCategoryURL)
    .then((res) => res.data)
    .then((res) => {
      console.log(res);
      dispatch({ type: GET_CATEGORYS, payload: res.data });
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

//end Code

export const fetchProducts = () => async (dispatch) => {
  await api
    .get("./viewcart")
    .then((res) => res.data)
    .then((res) => {
      // dispatch({ type: FETCH_PRODUCTS, payload: res.data.listProduct });
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};

export const editProducts = (product) => async (dispatch) => {
  console.log(product);
  return await api
    .post("./updateorderproduct", {
      order_product_id: product.id,
      quality: product.quality,
      description: product.description,
    })
    .then((res) => res.data)
    .then((res) => {
      dispatch({ type: EDIT_PRODUCTS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });
};

export const editSelectedProducts = (product) => async (dispatch) => {
  console.log(product);
  dispatch({ type: SELECTED_PRODUCTS, payload: product });
};

export const deleteProducts = (id) => async (dispatch) => {
  await api
    .post("./removeorderproduct", {
      order_product_id: id,
    })
    .then(() => {
      dispatch({ type: DELETE_PRODUCTS, payload: id });
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};

export const addProductToCart = ({
  product_key,
  resource,
  product_name,
  quality,
  price,
  description,
  thumbnails,
  product_url,
}) => async (dispatch) => {
  await api
    .post("./addtocart", {
      product_key,
      resource,
      product_name,
      quality,
      price,
      description,
      thumbnails,
      product_url,
    })
    .then((res) => res.data)
    .then((res) => {
      console.log(res);
      if (res.code === 200) {
        dispatch({ type: ADD_PRODUCTS, payload: res.data });
        notification["success"]({
          message: "Th??m v??o gi??? h??ng th??nh c??ng",
          duration: 1,
        });
      } else {
        notification["error"]({
          message: "Th??m v??o gi??? h??ng th???t b???i",
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

// add until delete, to delete

export const viewProductDetail = (id) => async (dispatch) => {
  await api
    .get(`./eday/product/${id}/detail`)
    .then((res) => res.data)
    .then((res) => {
      console.log(res);
      dispatch({ type: VIEW_PRODUCT_DETAIL, payload: res.data });
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
