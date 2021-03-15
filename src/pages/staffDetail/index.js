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

  useEffect(() => {
    // dispatch(fetchUser(id));
    fetchFakeAPI();
  }, [dispatch, staff]);

  if (staff)
    return (
      <>
        <div style={{ padding: "20px", minHeight: "calc(100vh - 70px)" }}>
          <Row>
            <Col span="24">
              <h1>Chỉnh sửa Nhân Viên {id}</h1>
            </Col>
            <Col span={17}>
              <Form
                className="register-form"
                // onFinish={handleSubmit}
                initialValues={{
                  name: staff?.name,
                  address: staff?.address,
                  email: staff?.email,
                  phone: staff?.phone,
                  team: staff?.team,
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
                      pattern: /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm,
                      message: "Email không hợp lệ",
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
                    placeholder="Nhập số điện thoại"
                    // disabled
                    // defaultValue={user?.phone}
                  />
                </Form.Item>

                <Form.Item label="Kinh nghiệm" name="experience">
                  <Input type="text" placeholder="Nhập kinh nghiệm" />
                </Form.Item>

                <Form.Item label="Tổ Đội" name="team">
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
                </Form.Item>
              </Form>
            </Col>

            <Col span={7} style={{ padding: "20px", textAlign: "center" }}>
              <div>
                <img
                  style={{ borderRadius: "50%", width: 150, height: 150 }}
                  src={staff.avatar || noUserImage}
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
  return null;
};

export default StaffDetail;
