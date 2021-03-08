import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import HeaderLayout from "../layout/Header";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Typography, Modal } from "antd";
import { colors } from "tabler-react";
import MenuItem from "antd/lib/menu/MenuItem";
import ContentLayout from "../layout/Content";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const PrivateRoute = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  if (!props.isAuthenticated) return <Redirect to="/home" />;

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <HeaderLayout />
      <Layout>
        <Navbar
          collapsed={collapsed}
          toggle={toggle}
          setCollapsed={setCollapsed}
        />
        <ContentLayout>{props.children}</ContentLayout>
      </Layout>
      <Modal />

      <Footer />
    </>
  );
};

export default PrivateRoute;
