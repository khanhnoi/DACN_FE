/*eslint-disable*/
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

// import { fetchUsers } from "../../actions/shopAction";
import { Row, Col, Select, Table, Button, Checkbox, Input, Modal } from "antd";
import { notification } from "antd";
const { Search } = Input;

import { getFakeDatafriendlyCustomters } from "../../apis/fakeApis";
import {
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router";

const FriendlyCustomter = (props) => {
  const [friendlyCustomtersFake, setFriendlyCustomtersFake] = useState(null);
  let friendlyCustomters = useSelector((state) =>
    state.friendlyCustomters ? Object.values(state.friendlyCustomters) : null
  );
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    // dispatch(fetchUsers());
    async function fetchFakeAPI() {
      const resFriendlyCustomtersFake = await getFakeDatafriendlyCustomters();

      setFriendlyCustomtersFake(resFriendlyCustomtersFake);
    }
    if (!friendlyCustomters) {
      fetchFakeAPI();
    }
  }, [dispatch, friendlyCustomtersFake]);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (src) => <img style={{ width: "40px" }} src={src} />,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Login Name",
      dataIndex: "loginName",
      key: "loginName",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Point",
      dataIndex: "point",
      key: "point",
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (text, record) => (
        <Checkbox
          // checked={record?.active}
          defaultChecked={record?.active}
          // onChange={(e) => console.log(`checked = ${e.target.checked}`)}
        ></Checkbox>
      ),
    },
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
                history.push(`friendly-customter/id/${record?.id}`);
              }}
              icon={<EditOutlined />}
            ></Button>
            <Button
              danger
              onClick={() => handleDeleteUser(record?.loginName)}
              icon={<DeleteOutlined />}
            ></Button>
          </span>
        </>
      ),
    },
  ];

  const onSearchUser = (value) => {
    console.log("Xu Ly Tim Kiem");
    console.log(value);
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

  return (
    <div style={{ padding: "20px", minHeight: "calc(100vh - 70px)" }}>
      <Row style={{ marginBottom: "10px" }}>
        <Col span={12}>
          <h5>Quản Lý Khách Hàng Thân Thiện</h5>
        </Col>
        <Col span={12}>
          <Search
            placeholder="Tìm kiếm khách hàng"
            onSearch={onSearchUser}
            enterButton
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={friendlyCustomters || friendlyCustomtersFake || []}
            pagination={
              friendlyCustomters || friendlyCustomtersFake?.length > 10
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(FriendlyCustomter);
