import api from "./index";
import { getAllStaffsURL } from "./urlsApi";

// USERS
export const getAllStaffsApi = async () => {
  return await api.get(getAllStaffsURL);
};

// export const getProductApi = async (id) => {
//   return await api.get(getDetailProductURL(id));
// };

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
