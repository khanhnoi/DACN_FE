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
  const { toggle, collapsed } = props;
  const contentMenus = [
    {
      Icon: <UserOutlined style={{ marginRight: "10px" }} />,
      text: "Quản lý Người Dùng",
      link: "/users",
    },
    {
      Icon: <VideoCameraOutlined />,
      text: "Quản lý Sản Phẩm",
      link: "/products",
    },
    {
      Icon: <UploadOutlined />,
      text: "Quản Lý Kho",
      link: "/products",
      // link: "/store",
    },
    {
      Icon: <UserOutlined />,
      text: "Quản Lý Nhân Viên",
      link: "/staff",
    },
    {
      Icon: <UserOutlined />,
      text: "Khách Hàng Thân Thiện",
      link: "/friendly-customter",
    },
  ];

  return (
    <>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
          {contentMenus.map((menu, index) => (
            <Menu.Item
              key={index}
              onClick={() => props.history.push(menu.link)}
            >
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
