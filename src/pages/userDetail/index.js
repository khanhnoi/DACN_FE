import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Row,
  Col,
  Select,
  Table,
  Button,
  Checkbox,
  Input,
  Modal,
  Form,
  Space,
  notification,
} from "antd";
import noUserImage from "../../assets/images/no-user-image.gif";
import { getFakeDataUser, getFakeRolesUser } from "../../apis/fakeApis";
import { getDetailUserApi, updateUserApi } from "../../apis/userApi";
import Loading from "../../components/Loading";
import {
  NO_DATA,
  INVALID_EMAIL,
  WARNING_INPUT,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILD,
} from "../../contanst";
import { useHistory } from "react-router";

const { Option } = Select;

const UserDetail = (props) => {
  const [user, setUser] = useState(null);
  const [rolesUser, setRolesUser] = useState(["ROLE_CUSTOMER", "ROLE_STAFF"]);
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const history = useHistory();

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  const handleSaveUser = () => {
    console.log("Handling Save......");

    console.log(rolesUser);

    // Display
    notification["success"]({
      message: "Lưu thành công",
      duration: 3,
    });
  };

  const fetchFakeAPI = async () => {
    const resRolesUserFake = await getFakeRolesUser();
    setRolesUser(resRolesUserFake);
    console.log("resRolesUserFake");
    console.log(resRolesUserFake);

    const resUserFake = await getFakeDataUser(id);
    setUser(resUserFake);
    console.log("resUserFake");
    console.log(resUserFake);
  };

  const onFinish = (values) => {
    console.log("onFinish");
    console.log({ values });
    const { role } = values;
    const resquest = {
      id: id,
      role: role,
    };
    handleUpdateUser(resquest);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleUpdateUser = (resquest) => {
    console.log({ resquest });

    if (resquest.role == "ROLE_CUSTOMER") {
      notification["warning"]({
        message: WARNING_INPUT,
        duration: 3,
      });
      return;
    }

    updateUserApi(resquest)
      .then((res) => res.data)
      .then((res) => {
        if (res.data) {
          // Display
          notification["success"]({
            message: UPDATE_USER_SUCCESS,
            duration: 3,
          });
          history.push("/staffs");
        }
      })
      .catch((error) => {
        // Display
        notification["error"]({
          message: UPDATE_USER_FAILD,
          duration: 3,
        });
      });
  };

  // useEffect(() => {
  //   // dispatch(fetchUser(id));
  //   fetchFakeAPI();
  // }, [dispatch, user]);

  useEffect(() => {
    async function fetch() {
      //console.log({ categorys });
      // if (!categorys) {
      //   await dispatch(fetchCategorysProduct());
      // }
      await getDetailUserApi(id).then((res) => {
        console.log(res.data.data);
        setUser(res.data.data);
      });
    }
    fetch();
  }, [dispatch, id]);

  //useEffect(() => {}, [categorys]);

  if (user)
    return (
      <>
        <div style={{ padding: "20px", minHeight: "calc(100vh - 70px)" }}>
          <Row>
            <Col span="24">
              <h1>User Id : {id}</h1>
            </Col>
            <Col span={17}>
              <Form
                className="register-form"
                // onFinish={handleSubmit}
                initialValues={{
                  name: user?.username,
                  address: user?.addr,
                  email: user?.email,
                  phone: user?.phone,
                  role: user?.role,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                {...{ labelCol: { span: 4 }, wrapperCol: { span: 20 } }}
              >
                <Form.Item label="Name" name="name">
                  <Input
                    placeholder=""
                    disabled
                    // defaultValue={user?.name}
                  />
                </Form.Item>

                <Form.Item label="Address" name="address">
                  <Input
                    placeholder=""
                    disabled
                    // defaultValue={user?.adress}
                  />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      pattern:
                        /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm,
                      message: INVALID_EMAIL,
                    },
                  ]}
                >
                  <Input
                    placeholder=""
                    disabled
                    // defaultValue={user?.email}
                  />
                </Form.Item>
                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[
                    {
                      pattern: /((09|03|07|08|05)+([0-9]{8})\b)/g,
                      message: "Số điện thoại không hợp lệ",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="Nhập số điện thoại"
                    disabled
                    // defaultValue={user?.phone}
                  />
                </Form.Item>

                <Form.Item label="Role" name="role">
                  {/* <Input.Group compact name="role"> */}
                  <Select defaultValue={user?.role} style={{ width: "150px" }}>
                    {rolesUser.map((role, index) => (
                      <Option key={index} value={role}>
                        {role}
                      </Option>
                    ))}
                  </Select>
                  {/* </Input.Group> */}
                </Form.Item>

                <Col span="24">
                  <div style={{ textAlign: "center" }}>
                    <Space size={10}>
                      <Button
                        // key="1"
                        className="btn-default"
                        type="primary"
                        //onClick={handleSaveUser}
                        htmlType="submit"
                      >
                        Lưu
                      </Button>
                      <Button
                        // key="2"
                        className="btn-default"
                        onClick={() => props.history.push("/users")}
                      >
                        Trở về
                      </Button>
                    </Space>
                  </div>
                </Col>
              </Form>
            </Col>

            <Col span={7} style={{ padding: "20px", textAlign: "center" }}>
              <div>
                <img
                  style={{ borderRadius: "50%", width: 150, height: 150 }}
                  src={user.avt || noUserImage}
                />
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  return <Loading />;
};

export default UserDetail;
