import React, { Component } from "react";
import logo from "../logo.png";
import { RestDataSource } from "./RestService/RestDataSource";
import { Link } from "react-router-dom";

export class NavBar extends Component {

  getUrl() {
    if (this.props.role) {
      return this.props.role === "admin"
        ? "http://127.0.0.1:8000/api/admin/logout"
        : "http://127.0.0.1:8000/api/shop/logout";
    }
    return "";
  }

  handleLogout = () => {
    this.dataSource = new RestDataSource(this.getUrl());
    this.props.callback(this.dataSource);
  };

  getLoginComponent() {
    return (
      <div className="navbar-brand px-3" href="#">
        <i className="fa fa-user-circle fa-6 px-2" aria-hidden="true"></i>
        <span>Xin chao, { this.props.name }</span>
        <button
          type="button"
          className="btn btn-transparent dropdown-toggle dropdown-toggle-split"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span className="sr-only">Toggle Dropdown</span>
        </button>
        <div className="dropdown-menu dropdown-menu-right">
          <Link className="dropdown-item" to="/profile">
            Xem thông tin
          </Link>
          <a className="dropdown-item" onClick={this.handleLogout}>
            Đăng xuất{" "}
          </a>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={this.props.style}>
        <div className="logo d-block">
          <img src={logo} alt="" />
        </div>
        {this.props.isLogin && this.getLoginComponent()}
      </div>
    );
  }
}
