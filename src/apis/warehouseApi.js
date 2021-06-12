import api from "./index";
import { getAllWarehouseURL, getTotalWarehouseURL } from "./urlsApi";

export const getAllWarehouseApi = async () => {
  return await api.get(getAllWarehouseURL);
};

export const getTotalWarehouseApi = async (id) => {
  return await api.get(getTotalWarehouseURL);
};

// export const deleteProductApi = async (id) => {
//   return await api.delete(deteteProductURL(id));
// };

// export const createProductApi = async (request) => {
//   return await api.post(createProductURL, request);
// };

// export const updateProductApi = async (request) => {
//   return await api.post(updateProductURL, request);
// };

// export const getListCategoryApi = async () => {
//   return await api.get(getListCategoryURL);
// };

// // USERS
// export const getAllUsersApi = async () => {
//   return await api.get(getAllUsersURL);
// };
