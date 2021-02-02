import React, { Component } from "react";
import { RestDataSource } from "../RestService/RestDataSource";
import { PageNumber } from "../Pagination/PageNumber";
import { NavSearch } from "../Pagination/NavSearch";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const rowsPerPage = 15;

export class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: {
        text: "",
        option: "",
      },
      searching: false,
      currentPage: 1,
      currentSearchPage: 1,
      totalPage: 0,
      totalSearchPage: 0,
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
    };
    this.searchProperties = {
      name: "Tên",
      email: "Địa chỉ email",
      address: "Địa chỉ",
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
    dataSource.Delete(data, (err) => console.log(err));
  };

  handleNextPage = (i) => {
    if (this.state.search["text"] === "") {
      console.log("current page");
      this.setState({
        currentPage: this.state.currentPage + i,
      });
    } else {
      this.setState({
        currentSearchPage: this.state.currentSearchPage + i,
      });
      console.log("current search page" + this.state.currentSearchPage);
    }
  };

  componentDidMount() {
    this.dataSource.GetDataEachPage(
      (data) => {
        this.setState({
          accounts: Object.values(data.data.data),
          totalPage: Math.ceil(data.data.total / rowsPerPage),
        });
      },
      {
        perPage: rowsPerPage,
        page: this.state.currentPage,
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage || prevState.currentSearchPage !== this.state.currentSearchPage || prevState.search !== this.state.search) {
      if (this.state.search["text"] === "") {
        this.dataSource.GetDataEachPage(
          (data) => {
            this.setState({
              currentSearchPage: 1,
              accounts: Object.values(data.data.data),
            });
          },
          {
            perPage: rowsPerPage,
            page: this.state.currentPage,
          }
        );
      } else {
        let dataSource = new RestDataSource(
          "http://127.0.0.1:8000/api/admin/searchuser",
          (err) => console.log(err)
        );
        dataSource.GetDataSearch(
          (data) =>
            this.setState({
              accounts: Object.values(data.data.data),
              currentPage: 1,
              currentSearchPage: data.data.current_page,
              totalPage: Math.ceil(data.data.total / rowsPerPage),
            }),
          {
            perPage: rowsPerPage,
            page: this.state.currentSearchPage,
          },
          this.state.search["option"],
          this.state.search["text"]
        );
      }
    }
  }

  handleSearch = (text, option) => {
    this.setState({
      search: {
        text: text,
        option: option,
      },
    });
  };

  onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };

  render() {
    return (
      <React.Fragment>
        <div style={{ width: "100%", height: "100%" }}>
          <NavSearch
            handleSearch={this.handleSearch}
            properties={this.searchProperties}
          />
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
              rowData={this.state.accounts}
              onFirstDataRendered={this.onFirstDataRendered.bind(this)}
            />
          </div>
        </div>
        <PageNumber
          currentPage={this.state.currentPage}
          currentSearchPage={this.state.currentSearchPage}
          searching={this.state.search["text"]}
          totalPage={this.state.totalPage}
          nextPage={this.handleNextPage}
        />
      </React.Fragment>
    );
  }
}
