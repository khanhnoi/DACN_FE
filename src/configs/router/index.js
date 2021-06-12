export const UnauthenticatedRoutes = [
  {
    exact: true,
    path: "/home",
    component: "home",
  },
  {
    exact: true,
    path: "/login",
    component: "login",
  },
  {
    exact: true,
    path: "/register",
    component: "register",
  },
];

export const AuthenticatedRoutes = [
  {
    exact: true,
    path: "/users",
    component: "users",
  },
  {
    exact: true,
    path: "/users/id/:id",
    component: "userDetail",
  },
  {
    exact: true,
    path: "/products",
    component: "products",
  },
  {
    exact: true,
    path: "/products/add",
    component: "productAdd",
  },
  {
    exact: true,
    path: "/products/id/:id",
    component: "productDetail",
  },
  {
    exact: true,
    path: "/warehouse",
    component: "warehouse",
  },
  {
    exact: true,
    path: "/staffs",
    component: "staffs",
  },
  {
    exact: true,
    path: "/staffs/id/:id",
    component: "staffDetail",
  },
  {
    exact: true,
    path: "/payrolls",
    component: "payroll",
  },
  // {
  //   exact: true,
  //   path: "/payrolls/id/:id",
  //   component: "payrollDetail",
  // },
  {
    exact: true,
    path: "/order",
    component: "orders",
  },
  {
    exact: true,
    path: "/friendly-customter",
    component: "friendlyCustomer",
  },
  {
    exact: true,
    path: "/friendly-customter/id/:id",
    component: "friendlyCustomerDetail",
  },
  {
    exact: true,
    path: "/cart",
    component: "cart",
  },
  {
    exact: true,
    path: "/profile",
    component: "profile",
  },
  {
    exact: true,
    path: "/orders",
    component: "orders",
  },
  {
    exact: true,
    path: "/viewOrder/:id",
    component: "viewOrder",
  },
  {
    exact: true,
    path: "/checkout",
    component: "checkout",
  },
  {
    exact: true,
    path: "/shops",
    component: "shops",
  },
  {
    exact: true,
    path: "/product/:id",
    component: "productDetail",
  },
];
