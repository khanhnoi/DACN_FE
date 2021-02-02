/*eslint-disable*/
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts, editProducts, deleteProducts, editSelectedProducts } from '../../actions/productAction'
import { Row, Col, Select, Table, InputNumber, Card, Modal, Form, Input } from "antd";
import { Icon } from "tabler-react";
import { Price, ProductName, ProductTitle, OrderButton } from './styled'
import api from '../../apis/index'
const { Option } = Select

const Cart = (props) => {
  const [visible, setVisible] = useState(false)
  const product = useSelector(state => ( state.products?.cart ? Object.values(state.products?.cart): null))
  const selectedProducts = useSelector(state => ( state.products?.selectedProducts ? Object.values(state.products?.selectedProducts): null))
  const [totalValue, setTotalValue] = useState(0)
  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  useEffect(() => {
    product && setTotalValue(
      product.reduce((res, ele, index) => {
        return res + ele.price * ele.quality;
      }, 0)
    );
  }, [product])
  console.log(product)
  const onChangeNumber = (value, index) => {
    if(product) {
      product[index].quality = value;
      dispatch(editProducts(product[index]))
    }
  }

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text, row) => {
        return (
          <div>
            <Row>
              <img src={row.thumbnails} style={{ width: 50, height: 50 }} />
              <ProductName>{row.product_name}</ProductName>
            </Row>
          </div>
        );
      },
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (text) => (
        <div>
          <span>{text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
        </div>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quality",
      key: "quality",
      render: (text, row, index) => {
        return (
          <InputNumber
            min={1}
            max={99}
            style={{ width: 50 }}
            defaultValue={text}
            onChange={(value) => onChangeNumber(value, index)}
          />
        );
      },
    },
    {
      title: "Tiền hàng",
      dataIndex: "total",
      key: "total",
      render: (text, row, index) => {
        const total = row.price * row.quality;
        return (
          <span>{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, row, index) => (
        <div>
          <a title="Xóa sản phẩm" onClick={() => confirmDelete(row.id)}>
            <Icon name="trash-2" />
          </a>
        </div>
      ),
    },
  ];

  const confirmDelete = useCallback((id) => {
    Modal.confirm({
      title: "Confirm",
      content: "Bạn có muốn xóa sản phẩm khỏi giỏ hàng?",
      okText: "OK",
      okType: "danger",
      cancelText: "cancel",
      onOk() {
        dispatch(deleteProducts(id));
      },
    });
  }, []);

  const rowSelection = {
    selectedProducts,
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      dispatch(editSelectedProducts(selectedRows));
    }
  };

  return (
    <div style={{ padding: "20px", minHeight: "calc(100vh - 70px)" }}>
      <Row>
        <ProductTitle>Giỏ hàng </ProductTitle> ({product?.length || 0} sản phẩm)
      </Row>
      <Row>
        <Col lg={{ span: 16 }} xs={{ span: 24 }}>
          <Table
            rowSelection={{
              type: 'checkbox',
              ...rowSelection,
            }}
            columns={columns}
            dataSource={product || []}
            pagination={product?.length > 10}
          />
        </Col>
        <Col lg={{ span: 8 }} xs={{ span: 24 }} style={{ padding: "0px 10px" }}>
          <Card>
            <Row style={{ padding: "10px" }}>
              <Col span={12}>
                <strong>Tiền hàng</strong>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                {totalValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                &nbsp;đ
              </Col>
            </Row>

            <Row style={{ padding: "10px" }}>
              <Col span={12}>Phí vận chuyển </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <span>
                  {(totalValue*0.035).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}&nbsp;đ
                </span>
              </Col>
            </Row>
            <hr />

            <Row style={{ padding: "10px" }}>
              <Col span={10}>
                <strong>Tổng tiền</strong>
              </Col>
              <Col span={14} style={{ textAlign: "right" }}>
                <Price>
                  {(totalValue*1.035).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}₫
                </Price>
              </Col>
            </Row>
          </Card>
          <Row>
            <Col span={24}>
              <OrderButton onClick={() => props.history.push("/checkout")}>
                Tiến hành đặt hàng
              </OrderButton>
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal
        title="Edit note"
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        <Form
          className="register-form"
          {...{ labelCol: { span: 8 }, wrapperCol: { span: 16 } }}
        >
          <Form.Item label="Ghi chú" name="description">
            <Input placeholder="Nhập ghi chú" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default React.memo(Cart)