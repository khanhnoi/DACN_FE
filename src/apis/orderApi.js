import api from "./index";
import { getAlldOrderURL, deleteOrdertURL } from "./urlsApi";

export const getAlldOrderApi = async () => {
  return await api.get(getAlldOrderURL);
};

// export const getProductApi = async (id) => {
//   return await api.get(getDetailProductURL(id));
// };

export const deleteOrderApi = async (id) => {
  return await api.delete(deleteOrdertURL(id));
};

// export const createProductApi = async (request) => {
//   return await api.post(createProductURL, request);
// };

// export const updateProductApi = async (request) => {
//   return await api.post(updateProductURL, request);
// };

// export const getListCategoryApi = async () => {
//   return await api.get(getListCategoryURL);
// };
