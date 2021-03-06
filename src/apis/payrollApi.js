import api from "./index";
import {
  updatePayrollDayoffURL,
  getAllPayrollsURL,
  createPayRollMonthURL,
  updatePayrollStatusURL,
  updatePayrollBounsURL,
  downloadPayRollExportURL,
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
  console.log({ requestRaw });
  return await api.post(updatePayrollDayoffURL(requestRaw.id), requestRaw.body);
};

export const updatePayrollStatusApi = async (requestRaw) => {
  return await api.post(updatePayrollStatusURL(requestRaw.id), requestRaw.body);
};

export const updatePayrollBounsApi = async (requestRaw) => {
  return await api.post(updatePayrollBounsURL(requestRaw.id), requestRaw.body);
};

export const downloadPayRollExportApi = async (request) => {
  console.log(request);
  return await api.post(downloadPayRollExportURL, request);
};
