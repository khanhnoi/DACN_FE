import { Promise } from "ag-grid-community";
import {
  FAKE_DATA_USERS,
  FAKE_DATA_USER,
  FAKE_DATA_ROLES_USER,
  FAKE_DATA_PRODUCTS,
  FAKE_DATA_PRODUCT,
  FAKE_DATA_STATUS_PRODUCT,
  FAKE_DATA_STORE,
} from "../fakeData";

export const getFakeDataUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(FAKE_DATA_USERS);
    }, 250);
  });
};

export const getFakeDataUser = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // console.log("Getting User ......");
      resolve(FAKE_DATA_USER);
    }, 250);
  });
};

export const getFakeRolesUser = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(FAKE_DATA_ROLES_USER);
    }, 250);
  });
};

export const getFakeDataProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(FAKE_DATA_PRODUCTS);
    }, 250);
  });
};

export const getFakeDataProduct = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(FAKE_DATA_PRODUCT);
    }, 250);
  });
};

export const getFakeDataStatusProduct = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(FAKE_DATA_STATUS_PRODUCT);
    }, 250);
  });
};

export const getFakeDataStore = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(FAKE_DATA_STORE);
    }, 250);
  });
};
