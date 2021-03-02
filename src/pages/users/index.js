/*eslint-disable*/
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { fetchUsers } from "../../actions/shopAction";
import { Row, Col, Select, Table, Button, Checkbox } from "antd";
import { Icon } from "tabler-react";
import api from "../../apis/index";
import { getFakeDataUsers } from "../../apis/fakeApis";
const { Option } = Select;

import { FAKE_DATA_USERS } from "../../fakeData";
import { fromPairs } from "lodash";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const Users = (props) => {
  const [usersFake, setUsersFake] = useState(null);
  let users = useSelector((state) =>
    state.users ? Object.values(state.users) : null
  );
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(fetchUsers());
    async function fetchFakeAPI() {
      const resUsersFake = await getFakeDataUsers();
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
      title: "Adress",
      dataIndex: "adress",
      key: "adress",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
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
              }}
              icon={<EditOutlined />}
            ></Button>
            <Button
              danger
              onClick={() => {
                console.log(`Delete ${record?.id}`);
              }}
              icon={<DeleteOutlined />}
            ></Button>
          </span>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px", minHeight: "calc(100vh - 70px)" }}>
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

export default React.memo(Users);
