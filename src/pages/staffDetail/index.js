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
import { getFakeDataStaff, getFakeRolesStaff } from "../../apis/fakeApis";
import { getDetailStaffApi } from "../../apis/staffApi";
import Loading from "../../components/Loading";
import { NO_DATA, INVALID_EMAIL, UPDATE_STAFF_SUCCESS } from "../../contanst";

const { Option } = Select;

const StaffDetail = (props) => {
  const [staff, setStaff] = useState(null);
  const [rolesUser, setRolesUser] = useState([]);
  const dispatch = useDispatch();
  const id = props.match.params.id;

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
    const resRolesStaffFake = await getFakeRolesStaff();
    setRolesUser(resRolesStaffFake);
    console.log("resRolesStaffFake");
    console.log(resRolesStaffFake);

    const resStaffFake = await getFakeDataStaff(id);
    setStaff(resStaffFake);
    console.log("resStaffFake");
    console.log(resStaffFake);
  };

  // useEffect(() => {
  //   // dispatch(fetchUser(id));
  //   fetchFakeAPI();
  // }, [dispatch, staff]);

  useEffect(() => {
    // fetchFakeAPI();
    async function fetch() {
      // console.log({ categorys });
      // if (!categorys) {
      //   await dispatch(fetchCategorysProduct());
      // }
      // await dispatch(fetchDetailProduct(id));
      await getDetailStaffApi(id).then((res) => {
        setStaff(res.data.data);
        console.log(res.data.data);
      });
    }
    fetch();
  }, [dispatch, id]);

  //useEffect(() => {}, [categorys]);

  if (staff)
    return (
      <>
        <div style={{ padding: "20px", minHeight: "calc(100vh - 70px)" }}>
          <Row>
            <Col span="24">
              <h1>Staff Id: {id}</h1>
            </Col>
            <Col span={17}>
              <Form
                className="register-form"
                // onFinish={handleSubmit}
                initialValues={{
                  name: staff?.user?.username,
                  address: staff?.user?.addr,
                  email: staff?.user?.email,
                  phone: staff?.user?.phone,
                  //team: staff?.user?.team,
                  experience: staff?.experience,
                }}
                {...{ labelCol: { span: 4 }, wrapperCol: { span: 20 } }}
              >
                <Form.Item label="Name" name="name">
                  <Input
                    placeholder="Nhập tên"
                    // disabled
                    // defaultValue={user?.name}
                  />
                </Form.Item>

                <Form.Item label="Address" name="address">
                  <Input
                    placeholder="Nhập địa chỉ"
                    // disabled
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
                    placeholder="Nhập Email"
                    // disabled
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
                    placeholder=""
                    // disabled
                    // defaultValue={user?.phone}
                  />
                </Form.Item>

                <Form.Item label="Experience" name="experience">
                  <Input type="text" placeholder="" />
                </Form.Item>

                {/* <Form.Item label="Tổ Đội" name="team">
                  <Input.Group compact name="team">
                    <Select
                      defaultValue={staff?.team}
                      style={{ width: "150px" }}
                    >
                      {rolesUser.map((team, index) => (
                        <Option key={index} value={team}>
                          {team}
                        </Option>
                      ))}
                    </Select>
                  </Input.Group>
                </Form.Item> */}
              </Form>
            </Col>

            <Col span={7} style={{ padding: "20px", textAlign: "center" }}>
              <div>
                <img
                  style={{ borderRadius: "50%", width: 150, height: 150 }}
                  src={staff?.user?.avt || noUserImage}
                />
              </div>
            </Col>
            <Col span="24">
              <div style={{ textAlign: "center" }}>
                <Space size={10}>
                  <Button
                    // key="1"
                    className="btn-default"
                    type="primary"
                    onClick={handleSaveUser}
                  >
                    Lưu
                  </Button>
                  <Button
                    // key="2"
                    className="btn-default"
                    onClick={() => props.history.push("/staffs")}
                  >
                    Trở về
                  </Button>
                </Space>
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  return <Loading />;
};

export default StaffDetail;
