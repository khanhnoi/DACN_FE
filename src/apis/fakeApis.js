import { Promise } from "ag-grid-community";
import {
  FAKE_DATA_USERS,
  FAKE_DATA_USER,
  FAKE_DATA_ROLES_USER,
  FAKE_DATA_PRODUCTS,
  FAKE_DATA_PRODUCT,
  FAKE_DATA_STATUS_PRODUCT,
  FAKE_DATA_STORE,
  FAKE_DATA_STAFFS,
  FAKE_DATA_STAFF,
  FAKE_TEAMS,
  FAKE_DATA_FRIENDLY_CUSTOMERS,
  FAKE_DATA_FRIENDLY_CUSTOMER,
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

export const getFakeDataStaffs = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(FAKE_DATA_STAFFS);
    }, 250);
  });
};

export const getFakeDataStaff = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(FAKE_DATA_STAFF);
    }, 250);
  });
};

export const getFakeRolesStaff = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(FAKE_TEAMS);
    }, 250);
  });
};

export const getFakeDatafriendlyCustomters = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(FAKE_DATA_FRIENDLY_CUSTOMERS);
    }, 250);
  });
};

export const getFakeDatafriendlyCustomer = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(FAKE_DATA_FRIENDLY_CUSTOMER);
    }, 250);
  });
};
