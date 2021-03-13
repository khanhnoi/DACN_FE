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

const FAKE_DATA_PRODUCTS = [];
for (let i = 0; i < 25; i++) {
  FAKE_DATA_PRODUCTS.push({
    stt: `${i + 1}`,
    id: `${i}`,
    image: "http://khanhnoi.mobie.in/img/khanh-noi.jpg",
    description: `This is a Product${i}`,
    name: `Product${i}`,
    size: `${i + 3}`,
    price: `${i * 10000}`,
    media: "update yet",
    rated: (i + 4) % 5,
    status:
      (i % 3 == 0 && "Đang bán") || (i % 3 == 1 && "Sắp bán") || "Sắp hết",
    // func: "xxxx",
  });
}

const FAKE_DATA_PRODUCT = {
  id: `1`,
  image: "http://khanhnoi.mobie.in/img/khanh-noi.jpg",
  description: `This is a Product`,
  name: `Product`,
  size: `3`,
  price: `10000`,
  number: 43,
  media: "update yet",
  rated: 3,
  status: "Đang bán" || "Sắp bán" || "Sắp hết",
  media: [
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-2",
      name: "image.png",
      status: "done",
      url:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-3",
      name: "image.png",
      status: "done",
      url:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-4",
      name: "image.png",
      status: "done",
      url:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },

    // {
    //   uid: "-xxx",
    //   percent: 50,
    //   name: "image.png",
    //   status: "uploading",
    //   url:
    //     "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },

    // {
    //   uid: "-5",
    //   name: "image.png",
    //   status: "error",
    // },
  ],
};

const FAKE_DATA_STATUS_PRODUCT = [
  "Hiện tại không bán",
  "Sắp bán",
  "Đang bán",
  "Hết hàng",
  "Đang khuyến mãi",
];

//store fake
const FAKE_DATA_STORE = [];
for (let i = 0; i < 25; i++) {
  FAKE_DATA_STORE.push({
    stt: `${i + 1}`,
    id: `${i}`,
    name: `Product${i}`,
    total: `${i + 3}`,
    unit: `${i * 10000}`,
    unit_price: "update yet",
    inventory: (i + 4) * 5,
    income: (i + 3) * i * 10000,
  });
}

export {
  FAKE_DATA_USERS,
  FAKE_DATA_USER,
  FAKE_DATA_ROLES_USER,
  FAKE_DATA_PRODUCTS,
  FAKE_DATA_PRODUCT,
  FAKE_DATA_STATUS_PRODUCT,
  FAKE_DATA_STORE,
};
