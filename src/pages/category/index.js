/*eslint-disable*/
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Row, Col, Table, Button, Input, Modal, Rate } from "antd";
import { notification } from "antd";
const { Search } = Input;

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
  DELETE_CATEGORY_SUCCESS,
} from "../../contanst";
import { useHistory } from "react-router";

import {
  getListCategoryApi,
  updateCategoryApi,
  createCategoryApi,
  deleteCategoryApi,
} from "../../apis/productApi";

const Category = (props) => {
  // const [categoryFake, setcategoryFake] = useState(null);
  const [category, setcategory] = useState(null);
  const [oldcategory, setOldcategory] = useState(null);
  const [countDelete, setCounDelete] = useState(0);

  const [requestCat, setRequestCat] = useState({
    id: null,
    name: null,
  });
  const [visible, setVisible] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [countUpdate, setCounUpdate] = useState(0);
  // let category = useSelector((state) =>
  //   state.category?.allProduct ? Object.values(state.category.allProduct) : null
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
      title: "Name",
      dataIndex: "name",
      key: "name",
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
                console.log(`Edit cat ${record?.id}`);
                // history.push(`category/id/${record?.id}`);
                setIsAdd(false);
                const newId = record?.id;
                setRequestCat({
                  ...requestCat,
                  id: newId,
                  name: record.name,
                });
                setVisible(true);
              }}
              icon={<EditOutlined />}
            ></Button>
            <Button
              danger
              onClick={() =>
                handleDeleteCategory(record?.id, record?.name, record?.stt)
              }
              icon={<DeleteOutlined />}
            ></Button>
          </span>
        </>
      ),
    },
  ];

  const handleDeleteCategory = (id, name, stt) => {
    Modal.confirm({
      title: "Warning",
      icon: <ExclamationCircleOutlined />,
      content: `Delete category ${name}. Once deleted, it cannot be completed ...
      `,
      okText: "Delete",
      cancelText: "Cancel",
      onOk: () => {
        console.log("Xu Ly Xoa");
        // Display
        deleteCategoryApi(id)
          // .then((res) => res.data)
          .then((res) => {
            // if (res.data) {

            console.log({ res });

            //index = stt - 1
            setCounDelete(countDelete + 1);

            // Display
            notification["success"]({
              message: res.data.errormessage || DELETE_CATEGORY_SUCCESS,
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

  const onSearchProduct = (value) => {
    console.log("Xu Ly Tim Kiem");
    console.log(value);

    if (value == "") {
      setcategory(oldcategory);
      return;
    }
    value = value.toLowerCase();
    let check = false;

    let data = oldcategory.filter((item) => {
      check = false;
      check = item["name"].toLowerCase().includes(value);
      check = check ? check : String(item["id"]).includes(value);
      if (check) return item;
    });

    console.log({ data });
    setcategory(data);
  };

  useEffect(() => {
    getListCategoryApi().then((res) => {
      console.log(res?.data?.data);
      setcategory(res?.data?.data);
      setOldcategory(res?.data?.data);
    });
  }, [dispatch, countDelete, countUpdate]);

  // if (category)
  return (
    <div style={{ padding: "20px", minHeight: "calc(100vh - 70px)" }}>
      <Row style={{ marginBottom: "10px" }}>
        <Col span={24}>
          <h5>Categary Management</h5>
        </Col>
        <Col span={12}>
          <Button
            onClick={() => {
              setRequestCat({
                ...requestCat,
                name: "",
              });
              setVisible(true);
              setIsAdd(true);
            }}
            type="primary"
          >
            Create More Category
          </Button>
        </Col>
        <Col span={12}>
          <Search
            placeholder="Search category"
            onSearch={onSearchProduct}
            enterButton
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {category ? (
            <Table
              columns={columns}
              dataSource={
                category?.map((product, index) => ({
                  ...product,
                  stt: index + 1,
                })) || []
              }
              pagination={category.length > 10}
            />
          ) : (
            <Loading />
          )}
        </Col>
      </Row>
      <Modal
        title={isAdd ? "Create Category" : `Update Category ${requestCat.id}`}
        visible={visible}
        onOk={() => {
          // console.log("ok");
          console.log({ requestCat });

          isAdd
            ? createCategoryApi(requestCat)
                .then((res) => res.data)
                .then((res) => {
                  console.log({ res });
                  setCounUpdate(countUpdate + 1);
                  // Display
                  notification["success"]({
                    message: "Crete category Success",
                    duration: 3,
                  });
                })
            : updateCategoryApi(requestCat)
                .then((res) => res.data)
                .then((res) => {
                  console.log({ res });
                  setCounUpdate(countUpdate + 1);
                  // Display
                  notification["success"]({
                    message: "Update category Success",
                    duration: 3,
                  });
                });
          setVisible(false);
        }}
        onCancel={() => setVisible(false)}
      >
        {/* <h6> {isAdd ? "Create Category" : "New name Category"}</h6> */}
        <Input
          key="nameCat"
          type="text"
          value={requestCat.name}
          placeholder="name Category"
          onChange={(e) => {
            //console.log(e.target.value);
            isAdd
              ? setRequestCat({
                  // ...requestCat,
                  name: e.target.value,
                })
              : setRequestCat({
                  ...requestCat,
                  name: e.target.value,
                });
          }}
        />
      </Modal>
    </div>
  );
  return <Loading />;
};

export default React.memo(Category);
