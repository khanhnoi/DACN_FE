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

// User
export const getAllUsersURL = "./eday/admin/user/getAllCustomer";
export const deteteUserURL = `./eday/admin/user/delete`;
export const getDetailUserURL = (id) => `./eday/admin/detailUser/${id}`;
// export const createProductURL = "./eday/admin/product/create";
export const updateUserURL = "./eday/admin/user/update";

// Staff
export const getAllStaffsURL = "./eday/listStaff";
export const deteteStaffURL = `./eday/admin/user/delete`;
export const getDetailStaffURL = (id) => `./eday/admin/detailStaff/${id}`;
// export const createProductURL = "./eday/admin/product/create";
export const updateStaffURL = "./eday/admin/staff/update";

// End Product
// export const baseURL = "http://localhost:8080/";
// export const baseURL = "http://localhost:8080/";
// export const baseURL = "http://localhost:8080/";
