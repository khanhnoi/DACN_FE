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
import Loading from "../../components/Loading";
import { NO_DATA, NO_DATA_NUMBER, desc } from "../../contanst";
import { useHistory } from "react-router";
import { fetchAllProduct } from "../../actions/productAction";
import { getAllProductApi } from "../../apis/productApi";

import imageNotFound from "../../assets/images/image-not-found.jpg";

const Products = (props) => {
  // const [productsFake, setProductsFake] = useState(null);
  // const [products, setProducts] = useState(null);
  let products = useSelector((state) =>
    state.products?.allProduct ? Object.values(state.products.allProduct) : null
  );
  const dispatch = useDispatch();
  const history = useHistory();

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
      render: (src) => (
        <img style={{ width: "40px" }} src={src ? src : imageNotFound} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    //   render: (src) => (src ? src : NO_DATA),
    // },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (src) => (src ? src : NO_DATA),
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (src) => (src ? src : NO_DATA),
    },
    {
      title: "Price Sell",
      dataIndex: "price_sell",
      key: "price_sell",
      render: (src) => (src ? src : NO_DATA),
    },
    {
      title: "Price Buy",
      dataIndex: "price_buy",
      key: "price_buy",
      render: (src) => (src ? src : NO_DATA),
    },
    // {
    //   title: "Media",
    //   dataIndex: "media",
    //   key: "media",
    //   render: (src) => (
    //     <img style={{ width: "40px" }} src={src ? src : imageNotFound} />
    //   ),
    // },
    // {
    //   title: "Rated",
    //   dataIndex: "rated",
    //   key: "rated",
    //   render: (text, record) => (
    //     // record.rated ?
    //     <Rate
    //       disabled
    //       tooltips={desc}
    //       onChange={handleChangeRated}
    //       value={record.rated || NO_DATA_NUMBER}
    //     />
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

  async function fetchFakeAPI() {
    const resProductsFake = await getFakeDataProducts();
    setProductsFake(resProductsFake);
  }

  useEffect(() => {
    console.log({ products });
    if (products === null) dispatch(fetchAllProduct());

    // if (!products) {
    //   fetchFakeAPI();
    // }

    // getAllProductApi().then((res) => {
    //   console.log(res?.data?.data);
    //   setProducts(res?.data?.data);
    // });
  }, [dispatch]);

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
  // if (products)
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
          {products ? (
            <Table
              columns={columns}
              dataSource={
                products?.map((product, index) => ({
                  ...product,
                  stt: index + 1,
                })) || []
              }
              pagination={products.length > 10}
            />
          ) : (
            <Loading />
          )}
        </Col>
      </Row>
    </div>
  );
  return <Loading />;
};

export default React.memo(Products);
