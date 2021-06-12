/*eslint-disable*/
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Row, Col, Table, Button, Input, Modal, Rate, Form } from "antd";
import { notification } from "antd";
const { Search } = Input;

import { getFakeDataProducts } from "../../apis/fakeApis";

import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  FolderViewOutlined,
} from "@ant-design/icons";
import Loading from "../../components/Loading";
import { NO_DATA, NO_DATA_NUMBER, DELETE_ORDER_SUCCESS } from "../../contanst";
import { useHistory } from "react-router";
import { fetchAllProduct } from "../../actions/productAction";
import { getAlldOrderApi, deleteOrderApi } from "../../apis/orderApi";

import imageNotFound from "../../assets/images/image-not-found.jpg";

const Orders = (props) => {
  // const [productsFake, setProductsFake] = useState(null);
  const [orders, setOrders] = useState(null);
  const [oldOrders, setOldOrders] = useState(null);
  const [countDelete, setCounDelete] = useState(0);
  // let products = useSelector((state) =>
  //   state.products?.allProduct ? Object.values(state.products.allProduct) : null
  // );
  const [visible, setVisible] = useState(false);
  const [orderSelected, setOrderSelected] = useState({});
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
      render: (src) => (src ? src : NO_DATA_NUMBER),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (src) => (src ? src : NO_DATA_NUMBER),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (src) => (src ? src : NO_DATA),
    },

    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (text, record) =>
        record?.user?.username ? record.user.username : NO_DATA,
    },

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
                console.log(`view ${record?.id}`);
                setOrderSelected(record);
                //history.push(`products/id/${record?.id}`);
                setVisible(true);
              }}
              icon={<FolderViewOutlined />}
            ></Button>
            <Button
              danger
              onClick={() =>
                handleDeleteOrder(
                  record?.id,
                  record?.product?.name,
                  record?.stt
                )
              }
              icon={<DeleteOutlined />}
            ></Button>
          </span>
        </>
      ),
    },
  ];

  const handleDeleteOrder = (id, name, stt) => {
    Modal.confirm({
      title: "Warning",
      icon: <ExclamationCircleOutlined />,
      content: `Delete Order ${name}. Once deleted, it cannot be completed ...
      `,
      okText: "Delete",
      cancelText: "Cancel",
      onOk: () => {
        console.log("Xu Ly Xoa");
        // Display
        deleteOrderApi(id)
          .then((res) => res.data)
          .then((res) => {
            // if (res.data) {

            console.log({ res });

            //index = stt - 1
            setCounDelete(countDelete + 1);

            // Display
            notification["success"]({
              message: DELETE_ORDER_SUCCESS,
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

  const onSearchOrder = (value) => {
    console.log("Xu Ly Tim Kiem");
    console.log(value);

    if (value == "") {
      setOrders(olddOrders);
      return;
    }
    value = value.toLowerCase();
    let check = false;

    let data = oldOrders.filter((item) => {
      check = false;
      check = item["product"]["name"].toLowerCase().includes(value);
      // check = check ? check : item["position"].toLowerCase().includes(value);
      // check = check ? check : item["office"].toLowerCase().includes(value);
      check = check ? check : String(item["amount"]).includes(value);
      check = check ? check : String(item["status"]).includes(value);
      check = check
        ? check
        : item["user"]["username"].toLowerCase().includes(value);
      //check = check ? check : String(item["price_sell"]).includes(value);
      // check = check ? check : item["startDate"].toLowerCase().includes(value);
      // console.log(check);
      if (check) return item;
    });

    console.log({ data });
    setOrders(data);
  };

  useEffect(() => {
    // console.log({ products });
    // if (products === null) dispatch(fetchAllProduct());

    // if (!products) {
    //   fetchFakeAPI();
    // }

    getAlldOrderApi().then((res) => {
      console.log(res?.data?.data);
      setOrders(res?.data?.data);
      setOldOrders(res?.data?.data);
    });
  }, [dispatch, countDelete]);

  useEffect(() => {}, [orders]);

  // if (products)
  return (
    <div style={{ padding: "20px", minHeight: "calc(100vh - 70px)" }}>
      <Row style={{ marginBottom: "10px" }}>
        <Col span={24}>
          <h5>Order Management</h5>
        </Col>
        <Col span={12}>
          {/* <Button onClick={() => history.push("/orders/add")} type="primary">
            Create More Order
          </Button> */}
        </Col>
        <Col span={12}>
          <Search
            placeholder="Search Orders"
            onSearch={onSearchOrder}
            enterButton
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {orders ? (
            <Table
              columns={columns}
              dataSource={
                orders?.map((order, index) => ({
                  ...order,
                  stt: index + 1,
                })) || []
              }
              pagination={orders.length > 10}
            />
          ) : (
            <Loading />
          )}
        </Col>
      </Row>

      <Modal
        title={orderSelected?.id}
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <Form
          className="register-form"
          // onFinish={handleSubmit}
          {...{ labelCol: { span: 8 }, wrapperCol: { span: 16 } }}
        >
          <Form.Item label="Name" name="name">
            <Input
              placeholder="Name"
              defaultValue={orderSelected?.product?.name}
              disabled
            />
          </Form.Item>
          <Form.Item label="User" name="user">
            <Input
              placeholder=""
              defaultValue={orderSelected?.user?.username}
              disabled
            />
          </Form.Item>
          <Form.Item label="Amount" name="amount">
            <Input
              placeholder=""
              defaultValue={orderSelected?.amount}
              disabled
            />
          </Form.Item>

          <Form.Item label="Price" name="price">
            <Input
              placeholder=""
              defaultValue={orderSelected?.price}
              disabled
            />
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Input
              placeholder=""
              defaultValue={orderSelected?.status}
              disabled
            />
          </Form.Item>
        </Form>
        <img
          src={
            orderSelected?.product?.image
              ? orderSelected.product.image
              : imageNotFound
          }
          alt=""
          srcset=""
        />
      </Modal>
    </div>
  );
  return <Loading />;
};

export default React.memo(Orders);
