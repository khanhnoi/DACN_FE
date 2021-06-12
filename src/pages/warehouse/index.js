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
import {
  getAllWarehouseApi,
  getTotalWarehouseApi,
} from "../../apis/warehouseApi";

import imageNotFound from "../../assets/images/image-not-found.jpg";

const Warehouse = (props) => {
  // const [productsFake, setProductsFake] = useState(null);
  const [warehouses, setWarehouses] = useState(null);
  const [oldWarehouses, setOldWarehouses] = useState(null);
  //const [countDelete, setCounDelete] = useState(0);
  const [total, setTotal] = useState(null);
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
      render: (text, record) => (
        <img
          style={{ width: "40px" }}
          src={record?.product?.image ? record.product.image : imageNotFound}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => <>{record?.product?.name}</>,
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
      title: "Profit",
      dataIndex: "profit",
      key: "profit",
      render: (src) => (src ? src : NO_DATA),
    },
    {
      title: "Salerable Quantity",
      dataIndex: "salerableQuantity",
      key: "salerableQuantity",
      render: (src) => (src ? src : NO_DATA),
    },
    {
      title: "Stock Quantity",
      dataIndex: "stockQuantity",
      key: "stockQuantity",
      render: (src) => (src ? src : NO_DATA),
    },
    {
      title: "Total MoneyBuy",
      dataIndex: "totalMoneyBuy",
      key: "totalMoneyBuy",
      render: (src) => (src ? src : NO_DATA),
    },
    {
      title: "Total MoneySell",
      dataIndex: "totalMoneySell",
      key: "totalMoneySell",
      render: (src) => (src ? src : NO_DATA),
    },

    // {
    //   title: "",
    //   dataIndex: "func",
    //   key: "func",
    //   render: (text, record) => (
    //     <>
    //       <span>
    //         <Button
    //           type="primary"
    //           style={{ marginRight: "10px" }}
    //           onClick={() => {
    //             console.log(`Edit ${record?.id}`);
    //             history.push(`warehouse/id/${record?.id}`);
    //           }}
    //           icon={<EditOutlined />}
    //         ></Button>
    //         <Button
    //           danger
    //           onClick={() =>
    //             handleDeleteProduct(record?.id, record?.name, record?.stt)
    //           }
    //           icon={<DeleteOutlined />}
    //         ></Button>
    //       </span>
    //     </>
    //   ),
    // },
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
      okText: "Delete",
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

  const onSearchWarehouse = (value) => {
    console.log("Xu Ly Tim Kiem");
    console.log(value);

    if (value == "") {
      setWarehouses(oldWarehouses);
      return;
    }
    value = value.toLowerCase();
    let check = false;

    let data = oldWarehouses.filter((item) => {
      check = false;
      check = item["product"]["name"].toLowerCase().includes(value);
      check = check ? check : String(item["profit"]).includes(value);
      check = check ? check : String(item["amount"]).includes(value);
      check = check ? check : String(item["salerableQuantity"]).includes(value);
      check = check ? check : String(item["stockQuantity"]).includes(value);
      check = check ? check : String(item["totalMoneyBuy"]).includes(value);
      check = check ? check : String(item["totalMoneySell"]).includes(value);
      // check = check ? check : item["startDate"].toLowerCase().includes(value);
      // console.log(check);
      if (check) return item;
    });

    console.log({ data });
    setWarehouses(data);
  };

  useEffect(() => {
    // console.log({ products });
    // if (products === null) dispatch(fetchAllProduct());

    // if (!products) {
    //   fetchFakeAPI();
    // }

    getAllWarehouseApi().then((res) => {
      console.log(res?.data?.data);
      setWarehouses(res?.data?.data);
      setOldWarehouses(res?.data?.data);
    });

    getTotalWarehouseApi().then((res) => {
      console.log(res?.data?.data);
      setTotal(res?.data?.data);
    });
  }, [dispatch]);

  useEffect(() => {}, [warehouses, total]);

  // if (products)
  return (
    <div style={{ padding: "20px", minHeight: "calc(100vh - 70px)" }}>
      <Row style={{ marginBottom: "10px" }}>
        <Col span={24}>
          <h5>Warehouse Management</h5>
        </Col>
        <Col span={12}>
          {/* <Button onClick={() => history.push("/products/add")} type="primary">
            Create More warehouse
          </Button> */}
        </Col>
        <Col span={12}>
          <Search
            placeholder="Search Warehouse"
            onSearch={onSearchWarehouse}
            enterButton
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {warehouses ? (
            <Table
              columns={columns}
              dataSource={
                warehouses?.map((warehouse, index) => ({
                  ...warehouse,
                  stt: index + 1,
                })) || []
              }
              pagination={warehouses.length > 10}
            />
          ) : (
            <Loading />
          )}
        </Col>
        <Col span={24}>
          <div style={{ display: "flex", width: "100%", padding: "1em" }}>
            <div style={{ marginLeft: "auto" }}>
              {total && <h5>Total: {total}</h5>}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
  return <Loading />;
};

export default React.memo(Warehouse);
