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
  return await api.post(createProductURL, request);
};

export const updateProductApi = async (request) => {
  return await api.post(updateProductURL, request);
};

export const getListCategoryApi = async () => {
  return await api.get(getListCategoryURL);
};
