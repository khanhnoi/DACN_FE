import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { Row, Col, Select, Table, Button, Checkbox, Input, Modal } from "antd";
import { notification } from "antd";
import { getFakeDataStaffs } from "../../apis/fakeApis";
import {
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { getAllStaffsApi, deleteStaffApi } from "../../apis/staffApi";
import {
  getAllPayrollsApi,
  updatePayrollDayoffApi,
} from "../../apis/payrollApi";
import Loading from "../../components/Loading";
import { NO_DATA, DELETE_STAFF_SUCCESS } from "../../contanst";
import imageNotFound from "../../assets/images/image-not-found.jpg";
import { set } from "lodash";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import "./styles.css";
const { Search } = Input;

const Payrolls = (props) => {
  // const [usersFake, setUsersFake] = useState(null);
  // let users = useSelector((state) =>
  //   state.users ? Object.values(state.users) : null
  // );
  // const [staffs, setStaffs] = useState(null);
  // const [oldStaffs, setOldStaffs] = useState(null);
  const [payrolls, setPayrolls] = useState(null);
  const [oldPayrolls, setOldPayrolls] = useState(null);
  const [countUpdate, setCounUpdate] = useState(0);
  const [visible, setVisible] = useState(false);
  //dayOff
  const [valuesDaySelected, setValuesDaySelected] = useState([]);
  const [requestDayoff, setRequestDayoff] = useState({
    id: null,
    body: {
      dayOff: [],
    },
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Bonus",
      dataIndex: "bonus",
      key: "bonus",
      // render: (src) => (
      //   <img style={{ width: "40px" }} src={src ? src : imageNotFound} />
      // ),
      render: (src) => (src ? src : NO_DATA),
    },
    {
      title: "comment",
      dataIndex: "comment",
      key: "comment",
      render: (src) => (src ? src : NO_DATA),
    },
    {
      title: "dayOff",
      dataIndex: "dayOff",
      key: "dayOff",
      render: (src) => (src ? src : NO_DATA),
    },

    {
      title: "dayOff2",
      dataIndex: "func",
      key: "func",
      render: (text, record) => {
        //console.log(record?.dayOff);
        //console.log({ record });
        let valuesDay = [];
        if (record?.dayOff != "") {
          let dayOffs = record?.dayOff?.split(",");

          //console.log(dayOffs);

          //console.log(record?.payRollIdentity?.month)
          //get year and month from date api
          const year =
            record?.payRollIdentity?.month[0] +
            record?.payRollIdentity?.month[1] +
            record?.payRollIdentity?.month[2] +
            record?.payRollIdentity?.month[3];
          const month =
            record?.payRollIdentity?.month[4] +
            record?.payRollIdentity?.month[5];
          //console.log({ year });
          //console.log({ month });

          const day = new Date(Number(year), Number(month - 1), 1, 0);
          day.setDate(1);
          for (let i = 0; i < dayOffs?.length; i++) {
            //console.log(Number(dayOffs[i]));
            valuesDay.push(day.setDate(Number(dayOffs[i])));
          }
        }

        return (
          <>
            <span>
              <DatePicker
                value={valuesDay}
                //onChange={setValues}
                multiple
                plugins={[<DatePanel />]}
                className="dayoff-custom"
              />
            </span>
          </>
        );
      },
    },
    {
      title: "dayWork",
      dataIndex: "dayWork",
      key: "dayWork",
      render: (src) => (src ? src : NO_DATA),
    },
    {
      title: "hourOfDay",
      dataIndex: "hourOfDay",
      key: "hourOfDay",
      render: (src) => (src ? src : NO_DATA),
    },
    {
      title: "salaryToMonth",
      dataIndex: "salaryToMonth",
      key: "salaryToMonth",
      render: (src) => (src ? src : NO_DATA),
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      render: (src) => (src == true ? "Ok" : "Not Yet"),
      //render: (src) => (src ? src : NO_DATA),
    },
    {
      title: "totalSalary",
      dataIndex: "totalSalary",
      key: "totalSalary",
      render: (src) => (src ? src : NO_DATA),
    },

    // {
    //   title: "Active",
    //   dataIndex: "active",
    //   key: "active",
    //   render: (text, record) => (
    //     <Checkbox
    //       // checked={record?.active}
    //       defaultChecked={record?.active}
    //       // onChange={(e) => console.log(`checked = ${e.target.checked}`)}
    //     ></Checkbox>
    //   ),
    // },

    {
      title: " " || "Chức Năng",
      dataIndex: "func",
      key: "func",
      render: (text, record) => (
        <>
          <span>
            <Button
              type="primary"
              style={{ marginRight: "10px" }}
              onClick={() => {
                console.log(`Edit ${record?.worker?.id}`);
                setRequestDayoff({ ...requestDayoff, id: record?.worker?.id });
                //dayOff
                let valuesDay = [];
                if (record?.dayOff != "") {
                  let dayOffs = record?.dayOff?.split(",");

                  //get year and month from date api
                  const year =
                    record?.payRollIdentity?.month[0] +
                    record?.payRollIdentity?.month[1] +
                    record?.payRollIdentity?.month[2] +
                    record?.payRollIdentity?.month[3];
                  const month =
                    record?.payRollIdentity?.month[4] +
                    record?.payRollIdentity?.month[5];
                  //console.log({ year });
                  //console.log({ month });

                  const day = new Date(Number(year), Number(month - 1), 1, 0);
                  day.setDate(1);
                  for (let i = 0; i < dayOffs?.length; i++) {
                    //console.log(Number(dayOffs[i]));
                    valuesDay.push(day.setDate(Number(dayOffs[i])));
                  }
                }

                setValuesDaySelected(valuesDay);
                setVisible(true);
              }}
              icon={<EditOutlined />}
            ></Button>
            {/* <Button
              danger
              onClick={() =>
                handleDeleteUser(record?.id, record?.username, record?.stt)
              }
              icon={<DeleteOutlined />}
            ></Button> */}
          </span>
        </>
      ),
    },
  ];

  const onSearchPayroll = (value) => {
    console.log("Xu Ly Tim Kiem");
    console.log(value);

    if (value == "") {
      setPayrolls(oldPayrolls);
      return;
    }
    value = value.toLowerCase();
    let check = false;

    let data = oldPayrolls.filter((item) => {
      check = false;
      check = String(item["bonus"]).toLowerCase().includes(value);
      check = check ? check : String(item["comment"]).includes(value);
      check = check ? check : String(item["contractSalary"]).includes(value);
      check = check ? check : String(item["dayOff"]).includes(value);
      check = check ? check : String(item["dayWork"]).includes(value);
      check = check ? check : String(item["hourOfDay"]).includes(value);
      check = check ? check : String(item["salaryToMonth"]).includes(value);
      check = check ? check : String(item["totalSalary"]).includes(value);
      //check = check ? check : String(item["salaryToMonth"]).includes(value);
      if (check) return item;
    });

    console.log({ data });
    setPayrolls(data);
  };
  const handleDeleteUser = (id, name, stt) => {
    Modal.confirm({
      title: "Warning",
      icon: <ExclamationCircleOutlined />,
      content: `Delete payroll ${name}. Once deleted, it cannot be completed ...
      `,
      okText: "Delete",
      cancelText: "Cancel",
      onOk: () => {
        console.log("Xu Ly Xoa");
        // Display
        console.log({ id });
        deleteStaffApi({ id })
          .then((res) => res.data)
          .then((res) => {
            // if (res.data) {

            console.log({ res });

            //index = stt - 1
            //setCounDelete(countDelete + 1);

            // Display
            notification["success"]({
              message: DELETE_STAFF_SUCCESS,
              duration: 3,
            });

            // } else {
            //   notification["error"]({
            //     message: DELETE_PRODUCT_FAILD,
            //     duration: 3,
            //   });
            // }
          })
          .catch((error) => {
            // Display
            console.log(error);
            notification["error"]({
              message: error.message,
              duration: 3,
            });
          });

        // notification["success"]({
        //   message: "Xoá thành công",
        //   duration: 3,
        // });
      },
    });
  };

  useEffect(() => {
    // dispatch(fetchStaffs());
    // async function fetchFakeAPI() {
    //   const resUsersFake = await getFakeDataStaffs();
    //   setUsersFake(resUsersFake);
    // }
    // if (!users) {
    //   fetchFakeAPI();
    // }

    // getAllStaffsApi().then((res) => {
    //   console.log(res?.data?.data);
    //   setStaffs(res?.data?.data);
    //   setOldStaffs(res?.data?.data);
    // });

    getAllPayrollsApi().then((res) => {
      console.log(res?.data?.data);
      setPayrolls(res?.data?.data);
      setOldPayrolls(res?.data?.data);
    });
  }, [dispatch, countUpdate]);

  useEffect(() => {}, [payrolls]);

  return (
    <div style={{ padding: "20px", minHeight: "calc(100vh - 70px)" }}>
      <Row style={{ marginBottom: "10px" }}>
        <Col span={12}>
          <h5>Payroll manager</h5>
        </Col>
        <Col span={12}>
          <Search
            placeholder="Search Payrolls"
            onSearch={onSearchPayroll}
            enterButton
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {payrolls ? (
            <Table
              columns={columns}
              dataSource={
                payrolls?.map((payroll, index) => ({
                  ...payroll,
                  stt: index + 1,
                })) || []
              }
              pagination={payrolls.length > 10}
            />
          ) : (
            <Loading />
          )}
        </Col>
      </Row>
      <Modal
        title="Update Payroll"
        visible={visible}
        onOk={() => {
          console.log({ requestDayoff });
          updatePayrollDayoffApi(requestDayoff)
            .then((res) => res.data)
            .then((res) => {
              console.log({ res });

              setCounUpdate(countUpdate + 1);
              // Display
              notification["success"]({
                message: "Payroll DayOff Success",
                duration: 3,
              });
            })
            .catch((error) => {
              console.log(error);
              notification["error"]({
                message: error.message,
                duration: 3,
              });
            });
          setVisible(false);
        }}
        onCancel={() => setVisible(false)}
      >
        <DatePicker
          value={valuesDaySelected}
          //onChange={setValues}
          multiple
          plugins={[<DatePanel />]}
          className="dayoff-selected-custom"
          onChange={(dates) => {
            //console.log(dates);
            const reqBodyDayOff = dates.map((e) => e.day).sort((a, b) => a - b);
            //console.log({ reqBodyDayOff });
            setRequestDayoff({
              ...requestDayoff,
              body: { dayOff: reqBodyDayOff },
            });
          }}
        />
      </Modal>
    </div>
  );
};

export default React.memo(Payrolls);
