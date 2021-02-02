import React from "react";
import { Form, Input, Button, notification, Col } from "antd";
import { Link } from "react-router-dom";
import { Box, LoginForm } from "../login/styled";
import api from '../../apis/index'
const Register = (props) => {

  const handleSubmit = (values) => {
    const { name, email, password, address, phone } = values;
    api
      .post("./register", {
        name,
        email,
        password,
        address,
        phone
      })
      .then((res) => {
        if (res.code === 200) {
          props.history.push("/login");
          notification["success"]({
            message: "Đăng kí thành công",
            duration: 2,
          });
        } else {
          notification["error"]({
            message: "Đăng kí thất bại",
            duration: 2,
          });
        }
      })
      .catch((err) => {
        notification["error"]({
          message: "Đăng kí thất bại",
          duration: 2,
        });
      });
  };

  return (
    <div>
      <Box
        type="flex"
        justify="space-around"
        align="middle"
        className="layout-login"
        style={{ minHeight: "100vh" }}
      >
        <LoginForm>
          <Col>
            <div className="right-layout">
              <Form
                className="register-form"
                onFinish={handleSubmit}
                {...{ labelCol: { span: 8 }, wrapperCol: { span: 16 } }}
              >
                <Form.Item
                  label="Full Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please input your full name!" },
                  ]}
                >
                  <Input placeholder="Full Name" />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your Password!" },
                    {
                      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                      message: "Mật khẩu cần có ít nhất 8 kí tự gồm chữ và số",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          "The two passwords do not match!"
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Password check" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    {
                      pattern: /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm,
                      message: "Email không hợp lệ",
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number",
                    },
                    {
                      pattern: /((09|03|07|08|05)+([0-9]{8})\b)/g,
                      message: "Số điện thoại không hợp lệ",
                    },
                  ]}
                >
                  <Input placeholder="Phone" />
                </Form.Item>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[
                    { required: true, message: "Please input your address!" },
                  ]}
                >
                  <Input placeholder="Address" />
                </Form.Item>
                <Form.Item
                  {...{
                    wrapperCol: {
                      xs: {
                        span: 24,
                        offset: 0,
                      },
                      sm: {
                        span: 16,
                        offset: 8,
                      },
                    },
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Register
                  </Button>
                  &nbsp;Or <Link to="/login">login now!</Link>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </LoginForm>
      </Box>
    </div>
  );
};

export default Register;
