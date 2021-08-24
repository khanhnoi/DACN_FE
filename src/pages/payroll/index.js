import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import {
  Row,
  Col,
  Select,
  Table,
  Button,
  Checkbox,
  Input,
  Modal,
  Space,
} from "antd";
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
  createPayRollMonthApi,
  updatePayrollStatusApi,
  updatePayrollBounsApi,
  downloadPayRollExportApi,
} from "../../apis/payrollApi";
import Loading from "../../components/Loading";
import { NO_DATA, DELETE_STAFF_SUCCESS } from "../../contanst";
import imageNotFound from "../../assets/images/image-not-found.jpg";
import { set } from "lodash";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import "./styles.css";
import fileDownload from "js-file-download";
import Axios from "axios";
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
  const [isDayOff, setIsDayOff] = useState(false);
  const [valuesDaySelected, setValuesDaySelected] = useState([]);
  const [requestDayoff, setRequestDayoff] = useState({
    id: null,
    body: {
      dayOff: [],
    },
  });
  //status pay
  const [isStatusPayroll, setIsStatusPayroll] = useState(false);
  const [isStatusPayrollCheckbox, setIsStatusPayrollCheckbox] = useState(true);
  const [statusPayroll, setStatusPayroll] = useState(false);
  const [requestStatus, setRequestStatus] = useState({
    id: null,
    body: {
      month: "",
    },
  });
  //bonus
  //const [isBouns, setIsBouns] = useState(false);
  //const [isBounsInput, setIsBounsInput] = useState(false);
  const [requestBouns, setRequestBouns] = useState({
    id: null,
    body: {
      month: null,
      bonus: null,
      comment: null,
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => record?.worker?.user?.username,
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
    // {
    //   title: "comment",
    //   dataIndex: "comment",
    //   key: "comment",
    //   render: (src) => (src ? src : NO_DATA),
    // },
    // {
    //   title: "dayOff",
    //   dataIndex: "dayOff",
    //   key: "dayOff",
    //   render: (src) => (src ? src : NO_DATA),
    // },

    {
      title: "Day Off",
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
    // {
    //   title: "Day Work",
    //   dataIndex: "dayWork",
    //   key: "dayWork",
    //   render: (src) => (src ? src : NO_DATA),
    // },
    // {
    //   title: "Hour Of Day",
    //   dataIndex: "hourOfDay",
    //   key: "hourOfDay",
    //   render: (src) => (src ? src : NO_DATA),
    // },
    // {
    //   title: "Salary To Month",
    //   dataIndex: "salaryToMonth",
    //   key: "salaryToMonth",
    //   render: (src) => (src ? src : NO_DATA),
    // },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      render: (src) => (src == true ? "Done Pay" : "Not Yet"),
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
              disabled={record?.status || record?.contractSalary == null}
              onClick={() => {
                console.log({ record });
                console.log(`Edit ${record?.worker?.id}`);
                const newId = record?.worker?.id;
                console.log({ requestDayoff });
                setRequestDayoff({
                  ...requestDayoff,
                  id: newId,
                });
                console.log({ requestDayoff });
                setRequestStatus({
                  ...requestStatus,
                  id: newId,
                  body: { month: record?.payRollIdentity?.month },
                });
                setRequestBouns({
                  ...requestBouns,
                  id: newId,
                  body: {
                    month: record?.payRollIdentity?.month,
                    bonus: record?.bonus,
                    comment: record?.comment,
                  },
                });
                // neu status la true thi ko can call api nua, statusPayroll la trang thai UI nen se nguoc lai
                setStatusPayroll(record?.status);
                // Mo checkBox de co the call api
                if (record?.status == false) setIsStatusPayrollCheckbox(false);

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
                setRequestDayoff({
                  ...requestDayoff,
                  id: newId,
                  body: {
                    ...requestDayoff.body,
                    month: record?.payRollIdentity?.month,
                  },
                });
                console.log({
                  ...requestDayoff,
                  id: newId,
                  body: {
                    ...requestDayoff.body,
                    month: record?.payRollIdentity?.month,
                  },
                });
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
  const handleCreatePayRollMonth = () => {
    Modal.confirm({
      title: "Warning",
      icon: <ExclamationCircleOutlined />,
      content: `Create PayRoll Month ?
      `,
      okText: "OK",
      cancelText: "Cancel",
      onOk: () => {
        console.log("createPayRollMonth........");
        // Display

        createPayRollMonthApi()
          .then((res) => res.data)
          .then((res) => {
            // if (res.data) {

            console.log({ res });
            setCounUpdate(countUpdate + 1);

            // Display
            notification["success"]({
              message: "Create PayRoll Month Success",
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

  const handleDownloadPayRollExport = () => {
    const now = new Date();
    const year = now.getYear() + 1900;
    const month = now.getMonth() + 1;
    //console.log(year, month);
    const requestDownLoad = {
      month: `${year}${month > 9 ? month : `0${month}`}`,
    };
    console.log({ requestDownLoad });
    downloadPayRollExportApi(requestDownLoad).then(({ data }) => {
      fileDownload(data, "PayRollExport.xls");
      console.log("success!", data);
    });

    // Axios({
    //   url: "http://localhost:8080/eday/payroll/downloadPayRollExport",
    //   method: "GET",
    //   responseType: "blob", // Important
    // }).then((response) => {
    //   console.log(response);
    //   FileDownload(response.data, "report.xsl");
    // });

    // function getFileToDownload(apiUrl) {
    //   return Axios.get(apiUrl, requestDownLoad, {
    //     responseType: "arraybuffer",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    // }

    // getFileToDownload(
    //   "http://localhost:8080/eday/payroll/downloadPayRollExport"
    // ).then((response) => {
    //   const type = response.headers["content-type"];
    //   const blob = new Blob([response.data], { type: type, encoding: "UTF-8" });
    //   const link = document.createElement("a");
    //   link.href = window.URL.createObjectURL(blob);
    //   link.download = "file.xlsx";
    //   link.click();
    // });
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

  // useEffect(() => {}, [payrolls]);

  return (
    <div style={{ padding: "20px", minHeight: "calc(100vh - 70px)" }}>
      <Row style={{ marginBottom: "10px" }}>
        <Col span={24}>
          <h5>Payroll manager</h5>
        </Col>
        <Col span={12}>
          <Button onClick={handleCreatePayRollMonth} type="primary">
            Create PayRoll Month
          </Button>
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
        <Col span={12}>
          <Button onClick={handleDownloadPayRollExport} type="primary">
            Download PayRoll Export
          </Button>
        </Col>
      </Row>
      <Modal
        title="Update Payroll"
        visible={visible}
        onOk={() => {
          //payroll dayoff
          if (isDayOff) {
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

            // setIsDayOff(false);
          }

          //payroll change Status
          console.log({ isStatusPayroll });
          if (isStatusPayroll) {
            updatePayrollStatusApi(requestStatus)
              .then((res) => res.data)
              .then((res) => {
                console.log({ res });

                setCounUpdate(countUpdate + 1);
                // Display
                notification["success"]({
                  message: "Payroll Status Success",
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
            setIsStatusPayroll(false);
          }

          //payroll change Bouns
          if (true) {
            updatePayrollBounsApi(requestBouns)
              .then((res) => res.data)
              .then((res) => {
                console.log({ res });
                if (res.errormessage?.length > 0) {
                  notification["error"]({
                    message: res.errormessage,
                    duration: 3,
                  });
                } else {
                  setCounUpdate(countUpdate + 1);
                }
                // Display
                notification["success"]({
                  message: "Payroll Bouns Success",
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
          }

          setVisible(false);
        }}
        onCancel={() => setVisible(false)}
      >
        <h6>Payroll DayOff:</h6>
        <DatePicker
          value={valuesDaySelected}
          //onChange={setValues}
          multiple
          plugins={[<DatePanel />]}
          className="dayoff-selected-custom"
          onChange={(dates) => {
            //console.log(dates);
            setIsDayOff(true);
            const reqBodyDayOff = dates.map((e) => e.day).sort((a, b) => a - b);
            //console.log({ reqBodyDayOff });
            console.log({ requestDayoff });
            setRequestDayoff({
              ...requestDayoff,
              body: { ...requestDayoff.body, dayOff: reqBodyDayOff },
            });
            console.log({ requestDayoff });
          }}
        />
        <br />
        <h6>Status:</h6>
        <Checkbox
          // neu status la true thi ko can call api nua, statusPayroll la trang thai UI nen se nguoc lai
          checked={statusPayroll}
          onChange={(e) => {
            console.log(`checked = ${e.target.checked}`);
            //if(e.target.checked) {
            setStatusPayroll(e.target.checked);
            setIsStatusPayroll(true);
            //}
          }}
          // neu status la true thi ko can call api nua, statusPayroll la trang thai UI nen se nguoc lai
          disabled={isStatusPayrollCheckbox}
        >
          Status Pay
        </Checkbox>
        <br />
        <h6>Update Bouns:</h6>
        {/* <Space direction="vertical"> */}
        <Input
          key="bouns"
          type="number"
          value={requestBouns?.body?.bonus}
          placeholder="Value Bonus"
          onChange={(e) => {
            //console.log(e.target.value);
            setRequestBouns({
              ...requestBouns,
              body: { ...requestBouns.body, bonus: e.target.value },
            });
          }}
          disabled={isStatusPayrollCheckbox}
        />
        <br />
        <Input
          key="cmt"
          type="text"
          value={requestBouns?.body?.comment}
          placeholder="Comment"
          onChange={(e) => {
            //console.log(e.target.value);
            setRequestBouns({
              ...requestBouns,
              body: { ...requestBouns.body, comment: e.target.value },
            });
          }}
          disabled={isStatusPayrollCheckbox}
        />
        {/* </Space> */}
      </Modal>
    </div>
  );
};

export default React.memo(Payrolls);
