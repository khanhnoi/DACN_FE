import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Tabs, Table, Modal } from "antd";
import moment from 'moment';
import api from '../../apis/index'
import { fetchOrders } from '../../actions/orderAction'
const { TabPane } = Tabs;

const Order = (props) => {
  const orders = useSelector((state) =>
    state.orders ? Object.values(state.orders) : null
  );
  const dispatch = useDispatch()
  const callback = (key) => {
    console.log(key)
  }

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  const viewOrderDetail = (id) => {
    props.history.push(`/viewOrder/${id}`)
  }

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "order_code",
      key: "order_code",
    },
    {
      title: "Tổng tiền",
      dataIndex: "sum_price",
      key: "sum_price",
      sorter: (a, b) => a.sum_price - b.sum_price,
      render: (text) => (
        <div>
          <span>{text?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
        </div>
      ),
    },
    {
      title: "Thông tin",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Ngày đặt",
      dataIndex: "created_at",
      key: "created_at",
      sorter: (a, b) => moment(a.created_at) - moment(b.created_at),
      render: (text) => (
        <div>
          <span>{moment(text).format("HH:mm DD/MM/YYYY")}</span>
        </div>
      ),
    },
    {
      title: "Action",
      key: "status",
      dataIndex: "status",
      render: (status, row) => {
        return (
          <div>
            {status >= 3 ? (
              <Button onClick={confirm} disabled>
                Hủy
              </Button>
            ) : (
              <Button onClick={confirm}>Hủy</Button>
            )}
            <Button
              type="primary"
              onClick={() => viewOrderDetail(row.id)}
            >
              Xem chi tiết
            </Button>
          </div>
        );
      },
    },
  ];

  const confirm = () => {
    Modal.confirm({
      title: "Confirm",
      content: "Bạn có muốn hủy đơn hàng?",
      okText: "OK",
      cancelText: "cancel",
      onCancel() {},
    });
  }

  return (
    <div style={{ padding: "10px 20px", minHeight: "calc(100vh - 70px)" }}>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Tất cả" key="1">
          <Table
            columns={columns}
            dataSource={orders}
            bordered={true}
            pagination={orders?.length > 10}
          />
        </TabPane>
        <TabPane tab="Đang chờ xử lý" key="2">
          <Table
            columns={columns}
            dataSource={orders.filter((x) => x.status === 1)}
            bordered={true}
            pagination={orders.filter((x) => x.status === 1) > 10}
          />
        </TabPane>
        <TabPane tab="Chờ thanh toán" key="3">
          <Table
            columns={columns}
            dataSource={orders.filter((x) => x.status === 2)}
            bordered={true}
            pagination={orders.filter((x) => x.status === 2) > 10}
          />
        </TabPane>
        <TabPane tab="Đã thanh toán" key="4">
          <Table
            columns={columns}
            dataSource={orders.filter((x) => x.status === 3)}
            bordered={true}
            pagination={orders.filter((x) => x.status === 3) > 10}
          />
        </TabPane>
        <TabPane tab="Chờ giao hàng" key="5">
          <Table
            columns={columns}
            dataSource={orders.filter((x) => x.status === 4)}
            bordered={true}
            pagination={orders.filter((x) => x.status === 4) > 10}
          />
        </TabPane>
        <TabPane tab="Đang giao" key="6">
          <Table
            columns={columns}
            dataSource={orders.filter((x) => x.status === 5)}
            bordered={true}
            pagination={orders.filter((x) => x.status === 5) > 10}
          />
        </TabPane>
        <TabPane tab="Đã giao" key="7">
          <Table
            columns={columns}
            dataSource={orders.filter((x) => x.status === 6)}
            bordered={true}
            pagination={orders.filter((x) => x.status === 6) > 10}
          />
        </TabPane>
        <TabPane tab="Bị từ chối" key="8">
          <Table
            columns={columns}
            dataSource={orders.filter((x) => x.status === 7)}
            bordered={true}
            pagination={orders.filter((x) => x.status === 7) > 10}
          />
        </TabPane>
        <TabPane tab="Đã hủy" key="9">
          <Table
            columns={columns}
            dataSource={orders.filter((x) => x.status === 8)}
            bordered={true}
            pagination={orders.filter((x) => x.status === 8) > 10}
          />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Order