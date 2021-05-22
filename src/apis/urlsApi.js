export const baseURL = "http://localhost:8080/";

export const signinURL = "./eday/auth/signin";
// export const getAllProductURL = "./eday/product/list";

// Product
export const getAllProductURL = "./eday/product/list";
export const deteteProductURL = (id) => `./eday/admin/${id}/deleted`;
export const getDetailProductURL = (id) => `./eday/product/${id}/detail`;
export const createProductURL = "./eday/admin/product/create";
export const updateProductURL = "./eday/admin/product/update";

//category
export const getListCategoryURL = "./eday/cat/list";
// export const getListCategoryURL = "./eday/admin/cat/list";

// End Product
// export const baseURL = "http://localhost:8080/";
// export const baseURL = "http://localhost:8080/";
// export const baseURL = "http://localhost:8080/";
