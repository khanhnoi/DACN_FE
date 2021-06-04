import api from "./index";
import {
  // getDetailStaffURL,
  // getAllStaffsURL,
  // updateStaffURL,
  // deteteStaffURL,
  getAllPayrollsURL,
} from "./urlsApi";

// STAFF
export const getAllPayrollsApi = async () => {
  return await api.get(getAllPayrollsURL);
};

// export const getDetailStaffApi = async (id) => {
//   return await api.get(getDetailStaffURL(id));
// };

// export const deleteStaffApi = async (request) => {
//   return await api.post(deteteStaffURL, request);
// };

// export const createProductApi = async (request) => {
//   return await api.post(createProductURL, request);
// };

// export const updateStaffApi = async (request) => {
//   return await api.post(updateStaffURL, request);
// };

// export const getListCategoryApi = async () => {
//   return await api.get(getListCategoryURL);
// };
