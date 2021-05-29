/*eslint-disable*/
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

// import { fetchUsers } from "../../actions/shopAction";
import { Row, Col, Select, Table, Button, Checkbox, Input, Modal } from "antd";
import { notification } from "antd";
const { Search } = Input;

// import { Icon } from "tabler-react";
// import api from "../../apis/index";
import { getFakeDataUsers } from "../../apis/fakeApis";
// const { Option } = Select;

// import { FAKE_DATA_USERS } from "../../fakeData";
// import { fromPairs } from "lodash";
import {
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router";
import { getAllUsersApi } from "../../apis/userApi";
import Loading from "../../components/Loading";
import {
  NO_DATA,
  NO_DATA_NUMBER,
  desc,
  DELETE_PRODUCT_SUCCESS,
} from "../../contanst";
import imageNotFound from "../../assets/images/image-not-found.jpg";

const Users = (props) => {
  // const [usersFake, setUsersFake] = useState(null);
  // let users = useSelector((state) =>
  //   state.users ? Object.values(state.users) : null
  // );
  const [users, setUsers] = useState(null);
  const [oldUsers, setOldUsers] = useState(null);
  const [countDelete, setCounDelete] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Avatar",
      dataIndex: "avt",
      key: "avt",
      render: (src) => (
        <img style={{ width: "40px" }} src={src ? src : imageNotFound} />
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
      render: (src) => (src ? src : NO_DATA),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (src) => (src ? src : NO_DATA),
    },
    {
      title: "Address",
      dataIndex: "addr",
      key: "addr",
      render: (src) => (src ? src : NO_DATA),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    // {
    //   title: "Active",
    //   dataIndex: "active",
    //   key: "active",
    //   render: (text, record) => (
    //     <Checkbox
    //       // checked={record?.active}
    //       defaultChecked={record?.active}
    //       // onChange={(e) => console.log(`checked = ${e.target.checked}`)}
    //     ></Checkbox>
    //   ),
    // },
    {
      title: "Chức Năng",
      dataIndex: "func",
      key: "func",
      render: (text, record) => (
        <>
          <span>
            <Button
              type="primary"
              style={{ marginRight: "10px" }}
              onClick={() => {
                console.log(`Edit ${record?.id}`);
                history.push(`users/id/${record?.id}`);
              }}
              icon={<EditOutlined />}
            ></Button>
            {/* <Button
              danger
              onClick={() => handleDeleteUser(record?.loginName)}
              icon={<DeleteOutlined />}
            ></Button> */}
          </span>
        </>
      ),
    },
  ];

  const onSearchUser = (value) => {
    console.log("Xu Ly Tim Kiem");
    console.log(value);

    if (value == "") {
      setUsers(oldUsers);
      return;
    }
    value = value.toLowerCase();
    let check = false;

    let data = oldUsers.filter((item) => {
      check = false;
      check = item["username"].toLowerCase().includes(value);
      // check = check ? check : item["position"].toLowerCase().includes(value);
      // check = check ? check : item["office"].toLowerCase().includes(value);
      check = check ? check : String(item["email"]).includes(value);
      check = check ? check : String(item["role"]).includes(value);
      check = check ? check : String(item["addr"]).includes(value);
      check = check ? check : String(item["phone"]).includes(value);
      // check = check ? check : item["startDate"].toLowerCase().includes(value);
      // console.log(check);
      if (check) return item;
    });

    console.log({ data });
    setUsers(data);
  };
  const handleDeleteUser = (name) => {
    Modal.confirm({
      title: "Cảnh báo",
      icon: <ExclamationCircleOutlined />,
      content: `Xoá người dùng ${name}. Khi đã xoá sẽ không thể hoàn tác ...
      `,
      okText: "Xoá",
      cancelText: "Huỷ Bỏ",
      onOk: () => {
        console.log("Xu Ly Xoa");
        // Display
        notification["success"]({
          message: "Xoá thành công",
          duration: 3,
        });
      },
    });
  };

  useEffect(() => {
    // dispatch(fetchUsers());
    // async function fetchFakeAPI() {
    //   const resUsersFake = await getFakeDataUsers();
    //   setUsersFake(resUsersFake);
    // }
    // if (!users) {
    //   fetchFakeAPI();
    // }

    getAllUsersApi().then((res) => {
      console.log(res?.data?.data);
      setUsers(res?.data?.data);
      setOldUsers(res?.data?.data);
    });
  }, [dispatch, countDelete]);

  useEffect(() => {}, [users]);

  return (
    <div style={{ padding: "20px", minHeight: "calc(100vh - 70px)" }}>
      <Row style={{ marginBottom: "10px" }}>
        <Col span={12}>
          <h5>User management</h5>
        </Col>
        <Col span={12}>
          <Search
            placeholder="Search Users"
            onSearch={onSearchUser}
            //onChange={onSearchUser}
            enterButton
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {users ? (
            <Table
              columns={columns}
              dataSource={
                users?.map((user, index) => ({
                  ...user,
                  stt: index + 1,
                })) || []
              }
              pagination={users.length > 10}
            />
          ) : (
            <Loading />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(Users);
