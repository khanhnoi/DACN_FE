import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from 'react-router-dom'
import { Row, Col, Rate, Card, Radio, InputNumber } from "antd";
import { viewProductDetail, addProductToCart } from '../../actions/productAction'
import { ProductTitle, AddProductButton } from './styled';
import { Icon } from 'tabler-react'
import { Price } from '../cart/styled'

const ProductDetail = (props) => {
  const product = useSelector(state => state?.products?.currentProduct)
  const dispatch = useDispatch()
  const [totalRating, setTotalRating] = useState(0)
  const [quality, setQuality] = useState(1)
  const [price, setPrice] = useState(0)

  useEffect(() => { 
    dispatch(viewProductDetail(props.match.params.id));
  }, [dispatch])
  
  useEffect(() => {
    if (product) {
      setTotalRating(
        product.rating.split(':').reduce((total, ele) => total + Number(ele), 0)
      )
      setPrice(product.listPrices[0])
    }
  }, [product])

  const addToCart = () => {
    const { product_name, product_url, resource, thumbnails, description, product_key} = product
    const data = {
      product_key,
      product_name,
      product_url,
      resource,
      thumbnails,
      description,
      quality,
      price
    }
    dispatch(addProductToCart(data))
  }

  return (
    <div
      style={{
        padding: "10px 50px",
        minHeight: "calc(100vh - 70px)",
      }}
    >
      <Card>
        <Row>
          <Col span={9}>
            <img
              src={product?.thumbnails}
              alt=""
              style={{ width: 450, height: 450, border: "1px solid #fafafa" }}
            />
          </Col>
          <Col span={15} style={{ padding: "20px 35px 0px 20px" }}>
            <Row>
              <ProductTitle>{product?.product_name}</ProductTitle>
            </Row>
            <Row>
              <Rate disabled value={Number(product?.avg_rating).toFixed(0)} />
              <span>{Number(product?.avg_rating).toFixed(1)}</span>
              <span style={{ borderLeft: "1px solid rgba(0,0,0,.14)" }}>
                {totalRating} đánh giá
              </span>
            </Row>
            <Row
              style={{ background: "#fafafa", marginTop: 10, marginBottom: 20 }}
            >
              <div style={{ padding: "15px 20px" }}>
                <Price>
                  {product?.listPrices[0]
                    ?.toFixed(0)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  ₫
                </Price>
              </div>
            </Row>

            <Row style={{ marginBottom: 10, alignItems: "baseline" }}>
              <Col span="6">
                <span>Tùy chọn</span>
              </Col>
              <Col span="18">
                <Radio.Group defaultValue="a" buttonStyle="solid" size="large">
                  <Radio.Button value="a">Xanh</Radio.Button>
                  <Radio.Button value="b">Đỏ</Radio.Button>
                  <Radio.Button value="c">Tím</Radio.Button>
                  <Radio.Button value="d">Vàng</Radio.Button>
                </Radio.Group>
              </Col>
            </Row>

            <Row style={{ marginTop: 15, alignItems: "baseline" }}>
              <Col span={6}>
                <span>Số lượng</span>
              </Col>
              <Col span={18}>
                <InputNumber min={1} max={10} defaultValue={1} onChange={value => setQuality(value)} />
              </Col>
            </Row>

            <Row>
              <Col span={10} offset={7}>
                <AddProductButton onClick={() => addToCart()}>
                  <Icon name="shopping-cart" />
                  &nbsp; Thêm vào giỏ hàng
                </AddProductButton>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default withRouter(ProductDetail)