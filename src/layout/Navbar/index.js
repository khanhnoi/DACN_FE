import React, { useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Icon } from "tabler-react";
import { ItemCount } from "./styled";

import { Layout, Menu, Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const Navbar = (props) => {
  // const product = useSelector((state) => state.products);
  const { toggle, collapsed } = props;
  // const [collapsed, setCollapsed] = useState(false);
  const contentMenus = [
    {
      Icon: <UserOutlined style={{ marginRight: "10px" }} />,
      text: "Quản lý Người Dùng",
    },
    {
      Icon: <VideoCameraOutlined />,
      text: "Quản lý Sản Phẩm",
    },
    {
      Icon: <UploadOutlined />,
      text: "Quản Lý Kho",
    },
    {
      Icon: <UserOutlined />,
      text: "Quản Lý Nhân Viên",
    },
    {
      Icon: <UserOutlined />,
      text: "Khách Hàng Thân Thiện",
    },
  ];

  return (
    <>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          {contentMenus.map((menu, index) => (
            <Menu.Item key={index}>
              {menu.Icon}
              <span>{menu.text}</span>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>

      <Button className={"trigger"} onClick={toggle}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
    </>
  );
};

export default withRouter(Navbar);
