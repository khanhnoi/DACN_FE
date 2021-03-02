import { Promise } from "ag-grid-community";
import { FAKE_DATA_USERS } from "../fakeData";

export const getFakeDataUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(FAKE_DATA_USERS);
    }, 250);
  });
};
