import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  Row,
  Col,
  Select,
  Button,
  Input,
  DatePicker,
  Form,
  Space,
  notification,
  Table,
} from "antd";
import { getFakeDatafriendlyCustomer } from "../../apis/fakeApis";
import { DateWrapper } from "./styled";
import { dateFormat, monthFormat, dateFormatList } from "../../configs/date";

import noUserImage from "../../assets/images/no-user-image.gif";

const { Option } = Select;
const { RangePicker } = DatePicker;

const FriendlyCustomerDetail = (props) => {
  const [friendlyCustomerFake, setFriendlyCustomerFake] = useState(null);
  let friendlyCustomer = useSelector((state) =>
    state.friendlyCustomer ? Object.values(state.friendlyCustomer) : null
  );
  const dispatch = useDispatch();
  const id = props.match.params.id;

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",
    },
    {
      title: "Add Buy",
      dataIndex: "addBuy",
      key: "addBuy",
    },
    {
      title: "Point",
      dataIndex: "point",
      key: "point",
    },
  ];

  const fetchFakeAPI = async () => {
    const resFriendlyCustomerFake = await getFakeDatafriendlyCustomer();
    setFriendlyCustomerFake(resFriendlyCustomerFake);
  };

  useEffect(() => {
    // dispatch(fetchFriendlyCustomer(id));

    if (!friendlyCustomer) {
      fetchFakeAPI();
    }
  }, [dispatch, friendlyCustomerFake]);

  if (friendlyCustomerFake !== null)
    return (
      <>
        <div style={{ padding: "20px", minHeight: "calc(100vh - 70px)" }}>
          <Row>
            <Col span={18}>
              <h1>Khách Hàng Thân Thiện {id}</h1>
              <Form
                className="register-form"
                // onFinish={handleSubmit}
                initialValues={{
                  name: friendlyCustomerFake?.name,
                }}
                {...{ labelCol: { span: 3 }, wrapperCol: { span: 21 } }}
              >
                <Form.Item label="Name" name="name">
                  <Input placeholder="Nhập tên" disabled />
                </Form.Item>
              </Form>

              <DateWrapper>
                <RangePicker
                  defaultValue={[
                    moment("2015/01/01", dateFormat),
                    moment("2015/01/01", dateFormat),
                  ]}
                  format={dateFormat}
                  style={{ marginBottom: "20px", marginLeft: "auto" }}
                />
              </DateWrapper>

              <Table
                columns={columns}
                dataSource={
                  friendlyCustomer?.data || friendlyCustomerFake?.data || []
                }
                pagination={
                  friendlyCustomer?.data ||
                  friendlyCustomerFake?.data?.length > 10
                }
              />
            </Col>

            <Col span={6} style={{ padding: "20px", textAlign: "center" }}>
              <div>
                <img
                  style={{ borderRadius: "50%", width: 150, height: 150 }}
                  src={friendlyCustomerFake.avatar || noUserImage}
                />
              </div>
              <Button style={{ margin: "10px" }}>View Profile</Button>
            </Col>
            <Col span="24">
              <div style={{ textAlign: "center", marginTop: "30px" }}>
                <Space size={10}>
                  <Button
                    // key="2"
                    className="btn-default"
                    onClick={() => props.history.push("/friendly-customter")}
                  >
                    Trở về
                  </Button>
                </Space>
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  return null;
};

export default React.memo(FriendlyCustomerDetail);
