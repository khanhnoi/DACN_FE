/*eslint-disable*/
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Row, Col, Table, Button, Input, Modal, Rate } from "antd";
import { notification } from "antd";
const { Search } = Input;

import { getFakeDataProducts } from "../../apis/fakeApis";

import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router";

const Products = (props) => {
  const [productsFake, setProductsFake] = useState(null);
  let products = useSelector((state) =>
    state.products ? Object.values(state.products) : null
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
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (src) => <img style={{ width: "40px" }} src={src} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Media",
      dataIndex: "media",
      key: "media",
    },
    {
      title: "Rated",
      dataIndex: "rated",
      key: "rated",
      render: (text, record) => (
        <Rate
          tooltips={desc}
          onChange={handleChangeRated}
          value={record.rated}
        />
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
                history.push(`products/id/${record?.id}`);
              }}
              icon={<EditOutlined />}
            ></Button>
            <Button
              danger
              onClick={() => handleDeleteProduct(record?.name)}
              icon={<DeleteOutlined />}
            ></Button>
          </span>
        </>
      ),
    },
  ];

  useEffect(() => {
    // dispatch(fetchproducts());
    async function fetchFakeAPI() {
      const resProductsFake = await getFakeDataProducts();
      setProductsFake(resProductsFake);
    }
    if (!products) {
      fetchFakeAPI();
    }
  }, [dispatch, productsFake]);

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

  const handleChangeRated = (value) => {
    console.log("Change Rated " + value);
  };

  return (
    <div style={{ padding: "20px", minHeight: "calc(100vh - 70px)" }}>
      <Row style={{ marginBottom: "10px" }}>
        <Col span={24}>
          <h5>Quản Lý Sản Phẩm</h5>
        </Col>
        <Col span={12}>
          <Button onClick={() => history.push("/products/add")} type="primary">
            Thêm Sản Phẩm
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
            dataSource={products || productsFake || []}
            pagination={products || productsFake?.length > 10}
          />
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(Products);
