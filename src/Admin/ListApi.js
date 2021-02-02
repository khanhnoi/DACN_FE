const ServerUrl = "http://127.0.0.1:8000/";

export let AdminAPIs = {
  register: ServerUrl + "api/admin/register",
  login: ServerUrl + "api/admin/login",
  logout: ServerUrl + "api/admin/logout",
  profile: ServerUrl + "api/admin/profile",
  edit: ServerUrl + "api/admin/edit",
  delete: ServerUrl + "api/admin/delete",
};

export let AdminUserAPIs = {
  listUser: ServerUrl + "api/admin/listusers",
  removeUser: ServerUrl + "api/admin/removeuser",
  viewUser: ServerUrl + "api/admin/viewuser?id=1",
  searchUser: ServerUrl + "api/admin/searchuser",
};

export let AdminShopuserAPIs = {
  listShopusers: ServerUrl + "api/admin/listshopusers",
  removeShopuser: ServerUrl + "api/admin/removeshopuser",
  viewShopuser: ServerUrl + "api/admin/viewshopuser",
  searchUser: ServerUrl + "api/admin/searchuser",
};

export let ShopAPIs = {
  register: ServerUrl + "api/shop/register",
  login: ServerUrl + "api/shop/login",
  logout: ServerUrl + "api/shop/logout",
  profile: ServerUrl + "api/shop/profile",
};

export let ShopOrderAPIs = {
  allOrder: ServerUrl + "api/shop/allorder",
  viewOrder: ServerUrl + "api/shop/vieworder",
  updateOrder: ServerUrl + "api/shop/updateorder",
  filterOrder: ServerUrl + "api/shop/filterorder",
  updateStatus: ServerUrl + "api/shop/updatestatus",
  deleteOrder: ServerUrl + "api/shop/deleteorder",
  allProductOrder: ServerUrl + "api/shop/allproductorder?id=",
  viewUserOrder: ServerUrl + "api/shop/viewuserorder?id",
};

export let ShopProductAPIs = {
  allProduct: "api/shop/allproduct",
  viewProduct: "api/shop/viewproduct?id=",
};
