/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from 'react-router-dom'
import { viewOrder } from "../../actions/orderAction";
import {
  Row,
  Col,
  Steps,
  Modal,
  Card,
  Divider,
  Form,
  Input,
  Button,
  Rate, 
  notification
} from "antd";
import { Border, EditIcon } from "./styled";
import api from '../../apis/index'
import { Icon } from "tabler-react";
import { OrderStatus } from "../../components/OrderStatus";

const { Step } = Steps;

const ViewOrder = (props) => {
  const product = useSelector(state => ( state.products ? Object.values(state.products): null))
  const currentOrder = useSelector(state => ( state.orders?.orderSelected ? state.orders.orderSelected: null))
  const [visible, setVisible] = useState(false);
  const [totalValue, setTotalValue] = useState(0);
  const [isRating, setIsRating] = useState(false)
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(viewOrder(props.match.params.id));
  }, [dispatch]);

  useEffect(() => {
    product && (
      setTotalValue(
        product.reduce((res, ele, index) => {
          return res + ele.price * ele.quality;
        }, 0)
      )
    )
  }, [product]);

  const openRatingModal = () => {
    setVisible(true)
    setIsRating(true)
  }

  const renderProductList = () => {
    if (currentOrder) {
      return currentOrder.listProduct.map((x) => {
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
              {(x.price * x.quality)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              &nbsp;đ
            </Col>
          </>
        );
      });
    }
  };

  const handleSubmit = (values) => {
    console.log(values)
    const { rate_shop, feedback } = values
    let strRate = Object.keys(values)
      .filter((x) => (x !== "rate_shop" && x !== "feedback"))
      .reduce((total, value) => {
        return total = total.concat(`${value}:${values[Number(value)]},`)
      }, '')
      .slice(0,-1)
    console.log(strRate)
    api
      .post(`./rateorder`, {
        id: currentOrder.order.id,
        rate_shop,
        feedback,
        strRate,
      })
      .then((res) => res.data)
      .then((res) => {
        if (res.code === 200) {
          notification["success"]({
            message: "Đánh giá thành công",
            duration: 1,
          });
        } else {
          notification["error"]({
            message: "Đánh giá thất bại",
            duration: 1,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        notification["error"]({
          message: err.message,
          duration: 1,
        });
      });
    // { isRating ? (
    //   console.log(values)
    // ) : (
    //   console.log(values)
    // )}
  }

  return (
    <div style={{ padding: "10px 30px", minHeight: "calc(100vh - 70px)" }}>
      <Card>
        <Row align="middle">
          <Col span={4}>
            <Row align="middle">
              <Icon name="chevron-left" />
              <div>TRỞ LẠI</div>
            </Row>
          </Col>
          <Col span={6} offset={14}>
            <Row align="middle">
              <div>ID ĐƠN HÀNG: {currentOrder?.order?.id}</div>
              <Divider type="vertical" />
              <div style={{ color: "red" }}>
                {OrderStatus(currentOrder?.order?.status)}
              </div>
            </Row>
          </Col>
        </Row>
        <Row style={{ padding: "40px 0px" }}>
          <Col lg={{ span: 24 }} xs={{ span: 24 }}>
            <Steps
              size="small"
              progressDot
              current={currentOrder?.order?.status - 1}
            >
              <Step title="Chờ xử lý" />
              <Step title="Chờ thanh toán" />
              <Step title="Đã thanh toán" />
              <Step title="Chờ giao hàng" />
              <Step title="Đang giao" />
              <Step title="Hoàn thành" />
              <Step title="Đã hủy" />
            </Steps>
          </Col>
        </Row>
        <Border></Border>
        <div>
          <h4>Địa chỉ nhận hàng</h4>
          <div>{currentOrder?.order?.description[0]}</div>
          <div>{currentOrder?.order?.description[1]}</div>
          <Row>
            <div>{currentOrder?.order?.description[2]}</div>
            <EditIcon>
              <Icon name="edit-3" onClick={() => setVisible(true)} />
            </EditIcon>
          </Row>
        </div>
        {currentOrder?.order?.isRated !== "1" && (
          <>
            <Row>
              <Col span={3} offset={21}>
                <Button
                  type="primary"
                  danger
                  block
                  onClick={() => openRatingModal()}
                >
                  Đánh giá
                </Button>
              </Col>
            </Row>
            <Divider />
          </>
        )}
        <Border></Border>
        <div>
          <Row>{renderProductList()}</Row>
          <Divider />
          <Row>
            <Col span={2} offset={18}>
              <p>Tạm tính</p>
            </Col>
            <Col span={2} offset={2}>
              {currentOrder?.order?.sum_price
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              &nbsp;đ
            </Col>
          </Row>
          <Row>
            <Col span={2} offset={18}>
              <p>Phí vận chuyển</p>
            </Col>
            <Col span={2} offset={2}>
              {currentOrder?.order?.charge
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              &nbsp;đ
            </Col>
          </Row>
          <Row>
            <Col span={2} offset={18}>
              <p>Tổng tiền</p>
            </Col>
            <Col span={2} offset={2}>
              {(currentOrder?.order?.sum_price + currentOrder?.order?.charge)
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              &nbsp;đ
            </Col>
          </Row>
        </div>
      </Card>
      <Modal
        title={isRating ? `Đánh giá` : `Edit address`}
        visible={visible}
        onCancel={() => {
          setVisible(false);
          setIsRating(false);
        }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              handleSubmit(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        {!isRating ? (
          <Form
            form={form}
            className="register-form"
            onFinish={handleSubmit}
            {...{ labelCol: { span: 8 }, wrapperCol: { span: 16 } }}
          >
            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input placeholder="Address" />
            </Form.Item>
          </Form>
        ) : (
          <Form
            className="register-form"
            onFinish={handleSubmit}
            form={form}
            {...{ labelCol: { span: 8 }, wrapperCol: { span: 16 } }}
          >
            <Form.Item
              label="Đánh giá shop"
              name="rate_shop"
              rules={[{ required: true, message: "Please input your rating!" }]}
            >
              <Rate />
            </Form.Item>
            <Form.Item
              label="Feedback"
              name="feedback"
              rules={[
                { required: true, message: "Please input your feedback!" },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Input your feedback" />
            </Form.Item>
            {currentOrder &&
              currentOrder.listProduct.map((x) => (
                <Form.Item
                  label={x.product_name}
                  name={x.product_id}
                  rules={[
                    {
                      required: true,
                      message: "Please input your rating product!",
                    },
                  ]}
                >
                  <Rate />
                </Form.Item>
              ))}
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default withRouter(ViewOrder);
