import api from "./index";
import {
  updatePayrollDayoffURL,
  getAllPayrollsURL,
  createPayRollMonthURL,
  updatePayrollStatusURL,
  updatePayrollBounsURL,
} from "./urlsApi";

// STAFF
export const getAllPayrollsApi = async () => {
  return await api.get(getAllPayrollsURL);
};

export const createPayRollMonthApi = async () => {
  // not boby req
  return await api.post(createPayRollMonthURL);
};

export const updatePayrollDayoffApi = async (requestRaw) => {
  return await api.post(updatePayrollDayoffURL(requestRaw.id), requestRaw.body);
};

export const updatePayrollStatusApi = async (requestRaw) => {
  return await api.post(updatePayrollStatusURL(requestRaw.id), requestRaw.body);
};

export const updatePayrollBounsApi = async (requestRaw) => {
  return await api.post(updatePayrollBounsURL(requestRaw.id), requestRaw.body);
};
