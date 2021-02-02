import React, { Component } from "react";
import { NavOrder } from "./NavOrder";
import { OrderView } from "./OrderView";
import { RestDataSource } from "../RestService/RestDataSource";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { OrderStatus } from "./OrderStatus";

export class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOrder: {},
      orders: [],
      columnDefs: [
        {
          headerName: "Stt",
          field: "stt",
          suppressSizeToFit: true,
          width: 60,
        },
        {
          headerName: "Giá tiền",
          field: "sum_price",
          width: 120,
        },
        {
          headerName: "Chi phí",
          field: "charge",
          width: 120,
        },
        {
          headerName: "Đặt trước",
          field: "deposit",
          width: 120,
        },
        {
          headerName: "Ngày giao",
          field: "delivery_date",
          width: 180,
        },
        {
          headerName: "Trạng thái",
          field: "status",
          width: 210,
        },
        {
          headerName: "Thời gian tạo",
          field: "created_at",
          width: 265,
        },
        {
          headerName: "Cập nhật gần nhất",
          field: "updated_at",
          width: 265,
        },
        {
          headerName: "Chi tiết",
          cellRendererFramework: (param) => {
            return (
              <button
                className="btn btn-sm btn-info m-1"
                data-toggle="modal"
                data-target="#orderModal"
                onClick={() => this.setState({ currentOrder: param.data })}
              >
                Xem
              </button>
            );
          },
          width: 100,
        },
        {
          headerName: "",
          cellRendererFramework: (param) => {
            return (
              <button
                className="btn btn-sm btn-danger m-1"
                onClick={() => this.deleteAccount(param.data)}
              >
                Xóa đơn hàng
              </button>
            );
          },
          width: 150,
        },
      ],
      paginationPageSize: 15,
      defaultColDef: { resizable: true },
    };
    this.dataSource = new RestDataSource(
      "http://127.0.0.1:8000/api/shop/allorder",
      (err) => console.log("orders: " + err)
    );
  }

  componentDidMount() {
    this.dataSource.GetData((data) => {
      let counter = 1;
      data.forEach((element) => {
        element.stt = counter++;
        element.status = OrderStatus[element.status];
      });
      this.setState({ orders: data });
    });
  }

  onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };

  getShowOrder = (date) => {
    console.log(this.state.orders.filter(o => o.create_at > date));
    return this.state.orders.filter(o => o.create_at > date);
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ width: "100%", height: "100%" }}>
          <div className="test-container">
            <div className="test-header">
              <NavOrder callback2={this.getShowOrder} />
            </div>
            <div
              id="myGrid"
              style={{
                height: "85vh",
                width: "100%",
              }}
              className="ag-theme-alpine"
            >
              <AgGridReact
                columnDefs={this.state.columnDefs}
                defaultColDef={this.state.defaultColDef}
                rowData={this.state.orders}
                pagination={true}
                paginationPageSize={this.state.paginationPageSize}
                onFirstDataRendered={this.onFirstDataRendered.bind(this)}
              />
            </div>
          </div>
        </div>
        <OrderView order={this.state.currentOrder} />
      </React.Fragment>
    );
  }
}
