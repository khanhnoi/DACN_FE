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
  ShoppingCartOutlined,
  AppstoreOutlined,
  HeartOutlined,
  UsergroupDeleteOutlined,
  MoneyCollectOutlined,
  AlignLeftOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const Navbar = (props) => {
  const { toggle, collapsed } = props;
  const contentMenus = [
    {
      Icon: <UserOutlined style={{ marginRight: "10px" }} />,
      text: "Users" || "Quản lý Người Dùng",
      link: "/users",
    },
    {
      Icon: <ShoppingCartOutlined />,
      text: "Products" || "Quản lý Sản Phẩm",
      link: "/products",
    },
    {
      Icon: <AlignLeftOutlined />,
      text: "Category" || "Quản lý Loại Sp",
      link: "/category",
    },
    {
      Icon: <UsergroupDeleteOutlined />,
      text: "Staffs" || "Quản Lý Nhân Viên",
      link: "/staffs",
    },
    {
      Icon: <MoneyCollectOutlined />,
      text: "Payroll",
      link: "/payrolls",
    },
    {
      Icon: <AppstoreOutlined />,
      text: "Ware House",
      link: "/warehouse",
    },

    {
      Icon: <HeartOutlined />,
      text: "Order",
      link: "/order",
    },
    // {
    //   Icon: <HeartOutlined />,
    //   text: "KH Thân Thiện",
    //   link: "/friendly-customter",
    // },
  ];

  return (
    <>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["0"]}
          selectedKeys={props.history.location.pathname}
        >
          {contentMenus.map((menu, index) => (
            <Menu.Item
              key={menu.link}
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
