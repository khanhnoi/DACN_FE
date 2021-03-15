/*eslint-disable*/
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Row, Col, Table, Button, Input, Modal, Rate } from "antd";
import { notification } from "antd";
const { Search } = Input;

import { getFakeDataStore } from "../../apis/fakeApis";

import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router";

const Store = (props) => {
  const [storeFake, setStoreFake] = useState(null);
  let store = useSelector((state) =>
    state.store ? Object.values(state.store) : null
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Unit price",
      dataIndex: "unitPrice",
      key: "unitPrice",
    },
    {
      title: "Inventory",
      dataIndex: "inventory",
      key: "inventory",
    },
    {
      title: "Income",
      dataIndex: "income",
      key: "income",
    },
  ];

  const onSearchProduct = (value) => {
    console.log("Xu Ly Tim Kiem");
    console.log(value);
  };
  const handleDeleteProduct = (name) => {
    Modal.confirm({
      title: "Cảnh báo",
      icon: <ExclamationCircleOutlined />,
      content: `Xoá sản phẩm ${name}. Khi đã xoá sẽ không thể hoàn tác ...
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

  const handleExport = () => {
    console.log("handle  export........");
  };

  useEffect(() => {
    // dispatch(fetchStore());
    async function fetchFakeAPI() {
      const resStoreFake = await getFakeDataStore();
      setStoreFake(resStoreFake);
    }
    if (!store) {
      fetchFakeAPI();
    }
  }, [dispatch, storeFake]);

  return (
    <div style={{ padding: "20px", minHeight: "calc(100vh - 70px)" }}>
      <Row style={{ marginBottom: "10px" }}>
        <Col span={24}>
          <h5>Quản Lý Kho</h5>
        </Col>
        <Col span={12}>
          <Button onClick={() => handleExport()} type="primary">
            Export
          </Button>
        </Col>
        <Col span={12}>
          <Search
            placeholder="Tìm kiếm sản phẩm"
            onSearch={onSearchProduct}
            enterButton
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={store || storeFake || []}
            pagination={store || storeFake?.length > 10}
          />
          <div style={{ textAlign: "right", marginTop: "10px" }}>
            <h5>Tổng Số: 1.000.000 đ</h5>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(Store);
