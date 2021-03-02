/*eslint-disable*/
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProduct } from "../../actions/productAction";
import { Row, Col, Card, Rate, Button, Pagination, Input, Slider } from "antd";
import { Icon } from "tabler-react";
import api from "../../apis/index";
import Loading from "../../components/Loading";
const { Search } = Input;
const { Meta } = Card;

const Products = (props) => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSearchProduct, setIsSearchProduct] = useState(false)
  const [searchName, setSearchName] = useState('')
  const [searchRate, setSearchRate] = useState(0)
  const [searchPrice, setSearchPrice] = useState([0,0]);
  const [totalItem, settotalItem] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(10);

  const marks = {
    0: "0đ",
    100: {
      label: <strong>10.000.000đ</strong>,
    },
  };

  useEffect(() => {
    setIsLoading(true)
    api.get("./allproduct", {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem(
        "token_jwt_easybuy"
      )}`,
    },
    })
    .then(res => res.data)
    .then(({data}) => {
      setProducts(Object.values(data.data));
      settotalItem(data.total);
      setCurrentPage(data.current_page);
      setIsLoading(false)
    })
    .catch(err => { 
      throw new Error(err.message)
    })
  }, []);

  // const renderRate = (text) => {
  //   let total = text?.split(":").reduce((res, ele, index) => {
  //     return res + Number(ele);
  //   }, 0);
  //   let result = text?.split(":").reduce((res, ele, index) => {
  //     return res + (ele * index) / total;
  //   }, 0);
  //   return result
  // }
  // console.log(products)

  const renderProducts = useCallback(() => {
    if (products) {
      return products.map((x) => {
        return (
          <Col lg={{ span: 4.8 }}>
            <Card
              onClick={() => props.history.push(`/product/${x.id}`)}
              hoverable
              style={{ width: 200 }}
              cover={<img alt="example" src={x.thumbnails} />}
            >
              <Meta title={x.product_name} description={x.resource} />
              <Row>
                {x.avg_rating > 0 && (
                  <>
                    <Rate
                      disabled
                      value={Number(x?.avg_rating).toFixed(0)}
                    />
                    <span>{Number(x?.avg_rating).toFixed(1)}</span>
                  </>
                )}
              </Row>
              <br />
              <Button type="primary" danger block>
                Đặt hàng
              </Button>
            </Card>
          </Col>
        );
      });
    }
  }, [products])
  
  const onShowSizeChange = (current, pageSize) => {
    setPageSize(pageSize)
    api
      .get(
        `./${
          isSearchProduct
            ? `searchproduct?perPage=${pageSize}&page=1&name=${searchName}&rating=${searchRate}:5&product_price=${searchPrice[0]}:${searchPrice[1]}`
            : `allproduct?perPage=${pageSize}&page=1`
        }`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "token_jwt_easybuy"
            )}`,
          },
        }
      )
      .then((res) => res.data)
      .then(({ data }) => {
        setProducts(Object.values(data.data));
        settotalItem(data.total);
        setCurrentPage(data.current_page);
        setIsLoading(false);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  const onChange = (page) => {
    api
      .get(
        `./${
          isSearchProduct
            ? `searchproduct?perPage=${pageSize}&page=${page}&name=${searchName}&rating=${searchRate}:5&product_price=${searchPrice[0]}:${searchPrice[1]}`
            : `allproduct?perPage=${pageSize}&page=${page}`
        }`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "token_jwt_easybuy"
            )}`,
          },
        }
      )
      .then((res) => res.data)
      .then(({ data }) => {
        setProducts(Object.values(data.data));
        settotalItem(data.total);
        setCurrentPage(data.current_page);
        setIsLoading(false);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  const onSearchShopByName = (value) => {
    setSearchName(value)
    api
      .get(
        `./searchproduct?perPage=${pageSize}&name=${value}&rating=${searchRate}:5&product_price=${searchPrice[0]}:${searchPrice[1]}`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "token_jwt_easybuy"
            )}`,
          },
        }
      )
      .then((res) => res.data)
      .then(({ data }) => {
        setProducts(Object.values(data.data));
        settotalItem(data.total);
        setCurrentPage(data.current_page);
        setIsLoading(false);
        setIsSearchProduct(true);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  const onSearchShopByRate = (value) => {
    setSearchRate(value)
    api
      .get(
        `./searchproduct?perPage=${pageSize}&name=${searchName}&rating=${value}:5&product_price=${searchPrice[0]}:${searchPrice[1]}`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "token_jwt_easybuy"
            )}`,
          },
        }
      )
      .then((res) => res.data)
      .then(({ data }) => {
        setProducts(Object.values(data.data));
        settotalItem(data.total);
        setCurrentPage(data.current_page);
        setIsLoading(false);
        setIsSearchProduct(true);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  const onSearchByPrice = (value) => {
    setSearchPrice(value)
    api
      .get(
        `./searchproduct?perPage=${pageSize}&name=${searchName}&rating=${searchRate}:5&product_price=${value[0]}:${value[1]}`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "token_jwt_easybuy"
            )}`,
          },
        }
      )
      .then((res) => res.data)
      .then(({ data }) => {
        setProducts(Object.values(data.data));
        settotalItem(data.total);
        setCurrentPage(data.current_page);
        setIsLoading(false);
        setIsSearchProduct(true);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
    
  }

  return (
    <div style={{ padding: "20px 30px", minHeight: "calc(100vh - 70px)" }}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Row>
            <Col lg={{ span: 4 }} xs={{ span: 24 }}>
              <Row>
                <span>Tìm sản phẩm</span>
              </Row>
              <Row>
                <Search
                  placeholder="Nhập tên sản phẩm"
                  onSearch={(value) => onSearchShopByName(value)}
                  style={{ width: 200 }}
                />
              </Row>
              <Row>
                <span>Đánh giá</span>
              </Row>
              <Row>
                <Rate
                  defaultValue={5}
                  onChange={(value) => onSearchShopByRate(value)}
                />{" "}
                &nbsp;trở lên
              </Row>

              <Row>
                <span>Khoảng giá</span>
              </Row>
              <Row>
                <Slider
                  range
                  defaultValue={[1000, 1000000]}
                  min={1000}
                  max={10000000}
                  style={{ width: 200 }}
                  onAfterChange={(value) => onSearchByPrice(value)}
                />
              </Row>
            </Col>
            <Col lg={{ span: 20 }} xs={{ span: 24 }}>
              <Row>{renderProducts()}</Row>
              <Row style={{ marginTop: 20 }}>
                <Pagination
                  current={currentPage}
                  onChange={onChange}
                  onShowSizeChange={(current, size) =>
                    onShowSizeChange(current, size)
                  }
                  total={totalItem}
                  showQuickJumper
                  showTotal={() => `Total ${totalItem} items`}
                />
              </Row>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default React.memo(Products);
