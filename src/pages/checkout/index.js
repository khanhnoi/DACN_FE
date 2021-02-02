/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../actions/productAction";
import { fetchShops } from "../../actions/shopAction"
import { Row, Col, Steps, Modal, Card, Divider, Form, Input, Select } from "antd";
import { Border, EditIcon } from "./styled";
import { OrderButton } from '../cart/styled'
import { Icon } from "tabler-react";
import api from '../../apis/index'
const { Step } = Steps;
const { Option } = Select;

const Checkout = () => {
  const product = useSelector((state) =>
    state.products?.selectedProducts
      ? Object.values(state.products?.selectedProducts)
      : null
  );
  const shops = useSelector((state) =>
    state.shops ? Object.values(state.shops) : null
  );
  const user = useSelector((state) => state.auth.profile)
  const [visible, setVisible] = useState(false);
  const [totalValue, setTotalValue] = useState(0)
  const [shopSelected, setShopSelected] = useState(null)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchShops());
  }, [dispatch]);

  useEffect(() => {
    product &&
      setTotalValue(
        product.reduce((res, ele, index) => {
          return res + ele.price * ele.quality;
        }, 0)
      );
  }, [product]);

  const renderCartList = () => {
    if (product) {
      return product.map((x) => {
        return (
          <>
            <Col span={2}>
              <img src={x.thumbnails} />
            </Col>
            <Col span={20}>
              <span>{x?.product_name}</span>
              <div>&nbsp;x{x?.quality}</div>
            </Col>
            <Col span={2}>
              <b>
                {(x.price * x.quality)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                &nbsp;đ
              </b>
            </Col>
          </>
        );
      })
    }
  }

  const handleSelect = (value) => {
    setShopSelected(value)
  }

  const renderOption = () => {
    if (shops) {
      return shops.map((x) => {
        return (
          <Option value={x.id}>{x.name}</Option>
        );
      })
    }
  }

  const order = () => {
    api.post("./order", 
      {
        order_products: product.map(x => x.id),
        shipping_name: user?.name,
        shipping_phone: user?.phone,
        shipping_address: user?.address,
        shop_id: shopSelected
      },
      {
        headers: {
        Authorization: `Bearer ${window.localStorage.getItem(
          "token_jwt_easybuy"
        )}`,
      }
    });
  }

  return (
    <div style={{ padding: "10px 30px", minHeight: "calc(100vh - 70px)" }}>
      <Card style={{ margin: "10px 0px" }}>
        <Row
          style={{
            fontSize: 18,
            alignItems: "baseline",
            color: "rgb(238, 77, 45)",
          }}
        >
          <Icon name="map-pin" />
          <span>Địa chỉ nhận hàng</span>
        </Row>
        <Row
          style={{
            fontSize: 18,
            alignItems: "baseline",
          }}
        >
          <b>{user?.shipping_name} &nbsp;</b>
          <b>{user?.shipping_phone} &nbsp;</b>
          <span>{user?.shipping_address}</span>
        </Row>
      </Card>
      <Card style={{ margin: "10px 0px" }}>
        <Row style={{ alignItems: "baseline" }}>{renderCartList()}</Row>
      </Card>
      <Card style={{ margin: "10px 0px" }}>
        <Row style={{ placeContent: "flex-end" }}>
          <Select
            style={{ width: 200 }}
            placeholder="Select a shop"
            onChange={handleSelect}
          >
            {renderOption()}
          </Select>
        </Row>
        <Divider />
        <Row>
          <Col span={2} offset={18}>
            <p>Tạm tính</p>
          </Col>
          <Col span={2} offset={2}>
            {totalValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            &nbsp;đ
          </Col>
        </Row>
        <Row>
          <Col span={2} offset={18}>
            <p>Phí dịch vụ</p>
          </Col>
          <Col span={2} offset={2}>
            {(totalValue * 0.035)
              .toFixed(0)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            &nbsp;đ
          </Col>
        </Row>
        <Row>
          <Col span={2} offset={18}>
            <p>Tổng tiền</p>
          </Col>
          <Col span={2} offset={2}>
            <span style={{ fontSize: 18, color: 'red'}}>
              {(totalValue * 1.035)
                .toFixed(0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              &nbsp;đ
            </span>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={6} offset={18}>
            <OrderButton onClick={() => order()}>
              Tiến hành đặt hàng
            </OrderButton>
          </Col>
        </Row>
      </Card>
      <Modal
        title="Edit address"
        visible={visible}
        // onOk={this.handleOk}
        onCancel={() => setVisible(false)}
      >
        <Form
          className="register-form"
          // onFinish={handleSubmit}
          {...{ labelCol: { span: 8 }, wrapperCol: { span: 16 } }}
        >
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input placeholder="Address" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Checkout;
