import api from "./index";
import {
  getAllProductURL,
  updateProductURL,
  createProductURL,
  getDetailProductURL,
  getListCategoryURL,
} from "./urlsApi";

export const getAllProductApi = async () => {
  return await api.get(getAllProductURL);
};

export const getProductApi = async (id) => {
  return await api.get(getDetailProductURL(id));
};

export const createProductApi = async (request) => {
  return await api.post(
    createProductURL,
    {
      name: "Test upload ko imag ",
      amount: "100",
      size: "29",
      price_buy: 28000,
      price_sell: 30000,
      catId: 1,
      inputDay: "",
      image: "",
    } || request
  );
};

export const updateProductApi = async (request) => {
  return await api.post(updateProductURL, request);
};

export const getListCategoryApi = async () => {
  return await api.get(getListCategoryURL);
};
