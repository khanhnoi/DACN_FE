import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { Row, Col, Select, Table, Button, Checkbox, Input, Modal } from "antd";
import { notification } from "antd";
import { getFakeDataStaffs } from "../../apis/fakeApis";
import {
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
const { Search } = Input;

const Staffs = (props) => {
  const [usersFake, setUsersFake] = useState(null);
  let users = useSelector((state) =>
    state.users ? Object.values(state.users) : null
  );
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    // dispatch(fetchStaffs());
    async function fetchFakeAPI() {
      const resUsersFake = await getFakeDataStaffs();
      setUsersFake(resUsersFake);
    }
    if (!users) {
      fetchFakeAPI();
    }
  }, [dispatch, usersFake]);

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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
      title: "Experience",
      dataIndex: "experience",
      key: "experience",
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
                history.push(`staffs/id/${record?.id}`);
              }}
              icon={<EditOutlined />}
            ></Button>
            <Button
              danger
              onClick={() => handleDeleteUser(record?.name)}
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
      content: `Xoá nhân viên ${name}. Khi đã xoá sẽ không thể hoàn tác ...
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
          <h5>Quản Lý Nhân Viên</h5>
        </Col>
        <Col span={12}>
          <Search
            placeholder="Tìm kiếm nhân viên"
            onSearch={onSearchUser}
            enterButton
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={users || usersFake || []}
            pagination={users || usersFake?.length > 10}
          />
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(Staffs);
