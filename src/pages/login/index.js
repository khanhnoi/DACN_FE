import React from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Box, LoginForm } from "./styled";
import { signIn } from "../../actions/authAction";

const Login = (props) => {
  const dispatch = useDispatch();

  const initialValuesForm = { email: "test@gmail.com", password: "test" };

  const handleSubmit = (values) => {
    const { email, password } = values;
    // console.log(values);
    if (email && password) {
      dispatch(signIn(email, password));
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Box
        type="flex"
        justify="space-around"
        align="middle"
        className="layout-login"
        style={{ height: "100vh" }}
      >
        <LoginForm>
          <Col>
            <div className="right-layout">
              <Form
                className="login-form"
                onFinish={handleSubmit}
                onFinishFailed={onFinishFailed}
                initialValues={initialValuesForm}
                {...{ labelCol: { span: 8 }, wrapperCol: { span: 16 } }}
              >
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
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="email"
                    defaultValue={initialValuesForm.email}
                  />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your Password!" },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Password"
                    defaultValue={initialValuesForm.password}
                  />
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
                    Log in
                  </Button>

                  {/* Team remove reg func */}
                  {/* &nbsp;Or <Link to="/register">register now!</Link> */}
                </Form.Item>
              </Form>
            </div>
          </Col>
        </LoginForm>
      </Box>
    </div>
  );
};

export default Login;
