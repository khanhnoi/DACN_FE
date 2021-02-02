import React, { Component } from 'react';
import { RestDataSource } from "../RestService/RestDataSource";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

export class ShopUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
          columnDefs: [
            {
              headerName: "Id",
              field: "id",
              suppressSizeToFit: true,
              width: 60,
            },
            {
              headerName: "Tên",
              field: "name",
              width: 180,
            },
            {
              headerName: "Địa chỉ Email",
              field: "email",
              width: 180,
            },
            {
              headerName: "Số điện thoại",
              field: "phone",
              width: 110,
            },
            {
              headerName: "Địa chỉ",
              field: "address",
              width: 90,
            },
            {
              headerName: "Thời gian tạo",
              field: "created_at",
              width: 200,
            },
            {
              headerName: "Cập nhật gần nhất",
              field: "updated_at",
              width: 200,
            },
            {
              headerName: "",
              cellRendererFramework: (param) => {
                return (
                  <button
                    className="btn btn-sm btn-danger m-1"
                    onClick={() => this.deleteAccount(param.data)}
                  >
                    Xóa tài khoản
                  </button>
                );
              },
            },
          ],
          defaultColDef: { resizable: true },
          accounts: [],
          paginationPageSize: 15,
        };
    
        this.dataSource = new RestDataSource(
          "http://127.0.0.1:8000/api/admin/listusers",
          (err) => console.log(err)
        );
      }
    
      deleteAccount = (data) => {
        let dataSource = new RestDataSource(
          "http://127.0.0.1:8000/api/admin/removeuser"
        );
        dataSource.Delete(data, (err) => {
          console.log(err);
        });
      };
    
      componentDidMount() {
        this.dataSource.GetData((data) => {
          console.log(data);
          this.setState({ accounts: data });
        });
      }
    
      onFirstDataRendered = (params) => {
        params.api.sizeColumnsToFit();
      };
    
      render() {
        return (
          <React.Fragment>
            <div style={{ width: "100%", height: "100%" }}>
              <div
                id="myGrid"
                style={{
                  height: "90vh",
                  width: "100%",
                }}
                className="ag-theme-alpine"
              >
                <AgGridReact
                  columnDefs={this.state.columnDefs}
                  defaultColDef={this.state.defaultColDef}
                  rowData={this.state.accounts}
                  pagination={true}
                  paginationPageSize={this.state.paginationPageSize}
                  onFirstDataRendered={this.onFirstDataRendered.bind(this)}
                />
              </div>
            </div>
          </React.Fragment>
        );
      }
}