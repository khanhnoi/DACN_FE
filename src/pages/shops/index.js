/*eslint-disable*/
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchShops
} from "../../actions/shopAction";
import {
  Row,
  Col,
  Select,
  Table,
  InputNumber,
  Modal
} from "antd";
import { Icon } from "tabler-react";
import api from "../../apis/index";
const { Option } = Select;

const Shops = (props) => {
  const shops = useSelector((state) =>
    state.shops ? Object.values(state.shops) : null
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchShops());
  }, [dispatch]);

  const columns = [
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
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
  ];


  return (
    <div style={{ padding: "20px", minHeight: "calc(100vh - 70px)" }}>
      <Row>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={shops || []}
            pagination={shops?.length > 10}
          />
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(Shops);
