/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { Table, Input, Form, Col, Row, Modal } from "antd";
import { useSelector } from "react-redux";
import noUserImage from "../../assets/images/no-user-image.gif";
import { Icon } from "tabler-react";

const Profile = () => {
  const data = useSelector((state) => state.auth.profile);
  const [visible, setVisible] = useState(false);

  const dataSource = [
    {
      title: "Tên đăng nhập",
      info: data?.name,
    },
    {
      title: "Email",
      info: data?.email,
    },
    {
      title: "Số điện thoại",
      info: data?.phone,
    },
    {
      title: "Địa chỉ",
      info: data?.address,
    },
  ];
  const columns = [
    {
      title: "Thông tin",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Giá trị",
      dataIndex: "info",
      key: "info",
      render: (text) => (
        <div>
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => <Icon name="edit-3" onClick={() => setVisible(true)} />,
    },
  ];

  return (
    <div style={{ minHeight: "calc(100vh - 70px)" }}>
      <Row>
        <Col
          lg={{ span: 8 }}
          xs={{ span: 24 }}
          style={{ padding: "20px", textAlign: "center" }}
        >
          <div>
            <img
              style={{ borderRadius: "50%", width: 150, height: 150 }}
              src={noUserImage}
            />
          </div>

          <div>
            <h2>Thông tin tài khoản</h2>
          </div>
          <div>
            <p>
              Các thông tin quan trọng của Quý Khách như tên đăng nhập E'day, mã
              khách hàng, email dùng để nhận thông báo v.v... Để bảo mật tài
              khoản, quý khách nên đổi mật khẩu 3 tháng một lần, mật khẩu nên sử
              dụng chữ số và ký tự viết hoa.
            </p>
          </div>
        </Col>
        <Col lg={{ span: 16 }} sm={{ span: 24 }} style={{ padding: "10px" }}>
          <Table
            columns={columns}
            dataSource={dataSource}
            showHeader={false}
            pagination={false}
          />
        </Col>
      </Row>
      <Modal
        title="Edit user"
        visible={visible}
        // onOk={this.handleOk}
        onCancel={() => setVisible(false)}
      >
        <Form
          className="register-form"
          // onFinish={handleSubmit}
          {...{ labelCol: { span: 8 }, wrapperCol: { span: 16 } }}
        >
          <Form.Item label="Full Name" name="name">
            <Input placeholder="Full Name" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
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
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("The two passwords do not match!");
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
                pattern: /((09|03|07|08|05)+([0-9]{8})\b)/g,
                message: "Số điện thoại không hợp lệ",
              },
            ]}
          >
            <Input placeholder="Phone" />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input placeholder="Address" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;
