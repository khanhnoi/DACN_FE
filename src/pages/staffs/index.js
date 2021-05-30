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
import { getAllStaffsApi, deleteStaffApi } from "../../apis/staffApi";
import Loading from "../../components/Loading";
import { NO_DATA, DELETE_STAFF_SUCCESS } from "../../contanst";
import imageNotFound from "../../assets/images/image-not-found.jpg";
const { Search } = Input;

const Staffs = (props) => {
  // const [usersFake, setUsersFake] = useState(null);
  // let users = useSelector((state) =>
  //   state.users ? Object.values(state.users) : null
  // );
  const [staffs, setStaffs] = useState(null);
  const [oldStaffs, setOldStaffs] = useState(null);
  const [countDelete, setCounDelete] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Avatar",
      dataIndex: "avt",
      key: "avt",
      render: (src) => (
        <img style={{ width: "40px" }} src={src ? src : imageNotFound} />
      ),
    },
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (src) => (src ? src : NO_DATA),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (src) => (src ? src : NO_DATA),
    },
    {
      title: "Address",
      dataIndex: "addr",
      key: "addr",
      render: (src) => (src ? src : NO_DATA),
    },
    // {
    //   title: "Experience",
    //   dataIndex: "experience",
    //   key: "experience",
    // },

    // {
    //   title: "Active",
    //   dataIndex: "active",
    //   key: "active",
    //   render: (text, record) => (
    //     <Checkbox
    //       // checked={record?.active}
    //       defaultChecked={record?.active}
    //       // onChange={(e) => console.log(`checked = ${e.target.checked}`)}
    //     ></Checkbox>
    //   ),
    // },
    {
      title: "" || "Chức Năng",
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
              onClick={() =>
                handleDeleteUser(record?.id, record?.username, record?.stt)
              }
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

    if (value == "") {
      setStaffs(oldStaffs);
      return;
    }
    value = value.toLowerCase();
    let check = false;

    let data = oldStaffs.filter((item) => {
      check = false;
      check = item["username"].toLowerCase().includes(value);
      // check = check ? check : item["position"].toLowerCase().includes(value);
      // check = check ? check : item["office"].toLowerCase().includes(value);
      check = check ? check : String(item["email"]).includes(value);
      check = check ? check : String(item["phone"]).includes(value);
      check = check ? check : String(item["addr"]).includes(value);
      // check = check ? check : String(item["first_name"]).includes(value);
      // check = check ? check : String(item["last_name"]).includes(value);
      // console.log(check);
      if (check) return item;
    });

    console.log({ data });
    setStaffs(data);
  };
  const handleDeleteUser = (id, name, stt) => {
    Modal.confirm({
      title: "Warning",
      icon: <ExclamationCircleOutlined />,
      content: `Delete staff ${name}. Once deleted, it cannot be completed ...
      `,
      okText: "Delete",
      cancelText: "Cancel",
      onOk: () => {
        console.log("Xu Ly Xoa");
        // Display
        console.log({ id });
        deleteStaffApi({ id })
          .then((res) => res.data)
          .then((res) => {
            // if (res.data) {

            console.log({ res });

            //index = stt - 1
            setCounDelete(countDelete + 1);

            // Display
            notification["success"]({
              message: DELETE_STAFF_SUCCESS,
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

        // notification["success"]({
        //   message: "Xoá thành công",
        //   duration: 3,
        // });
      },
    });
  };

  useEffect(() => {
    // dispatch(fetchStaffs());
    // async function fetchFakeAPI() {
    //   const resUsersFake = await getFakeDataStaffs();
    //   setUsersFake(resUsersFake);
    // }
    // if (!users) {
    //   fetchFakeAPI();
    // }

    getAllStaffsApi().then((res) => {
      console.log(res?.data?.data);
      setStaffs(res?.data?.data);
      setOldStaffs(res?.data?.data);
    });
  }, [dispatch, countDelete]);

  useEffect(() => {}, [staffs]);

  return (
    <div style={{ padding: "20px", minHeight: "calc(100vh - 70px)" }}>
      <Row style={{ marginBottom: "10px" }}>
        <Col span={12}>
          <h5>Employee manager</h5>
        </Col>
        <Col span={12}>
          <Search
            placeholder="Search Staffs"
            onSearch={onSearchUser}
            enterButton
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {staffs ? (
            <Table
              columns={columns}
              dataSource={
                staffs?.map((staff, index) => ({
                  ...staff,
                  stt: index + 1,
                })) || []
              }
              pagination={staffs.length > 10}
            />
          ) : (
            <Loading />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(Staffs);
