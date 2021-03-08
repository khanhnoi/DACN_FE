const FAKE_DATA_USERS = [];

for (let i = 0; i < 25; i++) {
  FAKE_DATA_USERS.push({
    stt: `${i + 1}`,
    id: `${i}`,
    avatar: "http://khanhnoi.mobie.in/img/khanh-noi.jpg",
    email: `user${i}@gmail.com`,
    loginName: `User${i}`,
    phone: `0332186185${i}`,
    adress: `Đà Nẵng ${i}`,
    role: "admin",
    active: i % 3 == 0 ? true : false,
    // func: "xxxx",
  });
}

const FAKE_DATA_USER = {
  id: `1`,
  avatar: "http://khanhnoi.mobie.in/img/khanh-noi.jpg",
  email: `userTest@gmail.com`,
  name: `User Test`,
  phone: `0332186185`,
  adress: `Đà Nẵng `,
  role: "user" || "admin" || "manager",
  // active: true,
};

const FAKE_DATA_ROLES_USER = ["admin", "user", "manager"];

export { FAKE_DATA_USERS, FAKE_DATA_USER, FAKE_DATA_ROLES_USER };
