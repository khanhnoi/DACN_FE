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
import {
  NO_DATA,
  NO_DATA_NUMBER,
  desc,
  DELETE_PRODUCT_SUCCESS,
} from "../../contanst";
import { useHistory } from "react-router";
import { fetchAllProduct } from "../../actions/productAction";
import { getAllProductApi, deleteProductApi } from "../../apis/productApi";

import imageNotFound from "../../assets/images/image-not-found.jpg";

const Products = (props) => {
  // const [productsFake, setProductsFake] = useState(null);
  const [products, setProducts] = useState(null);
  const [oldProducts, setOldProducts] = useState(null);
  const [countDelete, setCounDelete] = useState(0);
  // let products = useSelector((state) =>
  //   state.products?.allProduct ? Object.values(state.products.allProduct) : null
  // );
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
      title: "",
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
              onClick={() =>
                handleDeleteProduct(record?.id, record?.name, record?.stt)
              }
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

  const handleDeleteProduct = (id, name, stt) => {
    Modal.confirm({
      title: "Warning",
      icon: <ExclamationCircleOutlined />,
      content: `Delete product ${name}. Once deleted, it cannot be completed ...
      `,
      okText: "Xoá",
      cancelText: "Cancel",
      onOk: () => {
        console.log("Xu Ly Xoa");
        // Display
        deleteProductApi(id)
          .then((res) => res.data)
          .then((res) => {
            // if (res.data) {

            console.log({ res });

            //index = stt - 1
            setCounDelete(countDelete + 1);

            // Display
            notification["success"]({
              message: DELETE_PRODUCT_SUCCESS,
              duration: 3,
            });

            // } else {
            //   notification["error"]({
            //     message: DELETE_PRODUCT_FAILD,
            //     duration: 3,
            //   });
            // }
          })
          .catch((error) => {
            // Display
            console.log(error);
            notification["error"]({
              message: error.message,
              duration: 3,
            });
          });
      },
    });
  };

  const handleChangeRated = (value) => {
    console.log("Change Rated " + value);
  };

  const onSearchProduct = (value) => {
    console.log("Xu Ly Tim Kiem");
    console.log(value);

    if (value == "") {
      setProducts(oldProducts);
      return;
    }
    value = value.toLowerCase();
    let check = false;

    let data = oldProducts.filter((item) => {
      check = false;
      check = item["name"].toLowerCase().includes(value);
      // check = check ? check : item["position"].toLowerCase().includes(value);
      // check = check ? check : item["office"].toLowerCase().includes(value);
      check = check ? check : String(item["amount"]).includes(value);
      check = check ? check : String(item["size"]).includes(value);
      check = check ? check : String(item["price_buy"]).includes(value);
      check = check ? check : String(item["price_sell"]).includes(value);
      // check = check ? check : item["startDate"].toLowerCase().includes(value);
      // console.log(check);
      if (check) return item;
    });

    console.log({ data });
    setProducts(data);
  };

  useEffect(() => {
    // console.log({ products });
    // if (products === null) dispatch(fetchAllProduct());

    // if (!products) {
    //   fetchFakeAPI();
    // }

    getAllProductApi().then((res) => {
      console.log(res?.data?.data);
      setProducts(res?.data?.data);
      setOldProducts(res?.data?.data);
    });
  }, [dispatch, countDelete]);

  useEffect(() => {}, [products]);

  // if (products)
  return (
    <div style={{ padding: "20px", minHeight: "calc(100vh - 70px)" }}>
      <Row style={{ marginBottom: "10px" }}>
        <Col span={24}>
          <h5>Product Management</h5>
        </Col>
        <Col span={12}>
          <Button onClick={() => history.push("/products/add")} type="primary">
            Create More Product
          </Button>
        </Col>
        <Col span={12}>
          <Search
            placeholder="Search Products"
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
