import React, { Component } from "react";
import { Link } from "react-router-dom";

export class SideBar extends Component {
  componentDidMount() {
    console.log(this.props.role);
  }

  render() {
    return (
      <div className={this.props.style.navbar}>
        <div className="btn-group-vertical d-block pt-3">
          {this.props.role === "admin" ? (
            <React.Fragment>
              <Link className={this.props.style.category} to="/accounts">
                Tài khoản người dùng
              </Link>
              <Link className={this.props.style.category} to="/shops">
                Nhà cung cấp
              </Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link className={this.props.style.category} to="/shopusers">
                Tài khoản nhân viên
              </Link>
              <Link className={this.props.style.category} to="/orders">
                Danh sách đơn hàng
              </Link>
              <Link className={this.props.style.category} to="/products">
                Hàng hóa
              </Link>
              <Link className={this.props.style.category} to="/summary">
                Thống kê
              </Link>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}
