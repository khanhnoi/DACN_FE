import api from "./index";
import {
  getAllUsersURL,
  getDetailUserURL,
  updateUserURL,
  deteteUserURL,
} from "./urlsApi";

// USERS
export const getAllUsersApi = async () => {
  return await api.get(getAllUsersURL);
};

export const getDetailUserApi = async (id) => {
  return await api.get(getDetailUserURL(id));
};

export const deleteUserApi = async (request) => {
  return await api.post(deteteUserURL, request);
};

// export const createProductApi = async (request) => {
//   return await api.post(createProductURL, request);
// };

export const updateUserApi = async (request) => {
  return await api.post(updateUserURL, request);
};

// export const getListCategoryApi = async () => {
//   return await api.get(getListCategoryURL);
// };
