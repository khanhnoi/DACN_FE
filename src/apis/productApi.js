import api from "./index";
import { updateProductURL } from "./urlsApi";

export const createProduct = async (request) => {
  await api.post("./eday/admin/product/create");
};

export const updateProduct = async (request) => {
  return await api.post(updateProductURL);
};
