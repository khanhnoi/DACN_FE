import React from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Menu } from 'antd'
import { Icon } from 'tabler-react' 
import { ItemCount } from './styled'

const Navbar = (props) => {
  const product = useSelector((state) => state.products)

  return (
    <div
      style={{
        position: "sticky",
        top: 60,
        zIndex: 10,
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6'
      }}
    >
      <Menu selectedKeys={props.history.location.pathname} mode="horizontal">
        <Menu.Item key="/shops" onClick={() => props.history.push("/shops")}>
          <Icon name="list" />
          &nbsp; Danh sách shop
        </Menu.Item>
        <Menu.Item
          key="/products"
          onClick={() => props.history.push("/products")}
        >
          <Icon name="list" />
          &nbsp; Danh sách sản phẩm
        </Menu.Item>
        <Menu.Item key="/cart" onClick={() => props.history.push("/cart")}>
          <Icon name="shopping-cart" />
          &nbsp;Giỏ hàng
          <ItemCount>
            {product?.cart ? Object.keys(product.cart).length : 0}
          </ItemCount>
        </Menu.Item>
        <Menu.Item key="/orders" onClick={() => props.history.push("/orders")}>
          <Icon name="grid" />
          &nbsp; Đơn hàng đã đặt
        </Menu.Item>
        <Menu.Item
          key="/profile"
          onClick={() => props.history.push("/profile")}
        >
          <Icon name="user" />
          &nbsp;Thông tin cá nhân
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default withRouter(Navbar)
