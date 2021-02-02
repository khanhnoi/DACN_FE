import React, { Component } from "react";
import { RestDataSource } from "../RestService/RestDataSource";

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: 0,
      error: "",
      role: "",
      name: "",
      token: ""
    };
    this.dataSource = new RestDataSource(
      this.state.url,
      (err) => {
        this.setState({ error: err });
      }
    );
  }

  handleLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    this.dataSource.BASE_URL = (data.get("check") === 'admin' ? "http://127.0.0.1:8000/api/admin/login" : "http://127.0.0.1:8000/api/shop/login" );
    this.dataSource.Login(
      {
        email: data.get("email"),
        password: data.get("password"),
      },
      (data) => {
        this.setState({
          code: data.code,
          role: data.data.admin ? "admin" : "shopusers",
          name: data.data.admin ? data.data.admin.name : data.data.shop_users.name,
        });
        sessionStorage.setItem("token_jwt_easybuy", data.data.token);
      }
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.code !== this.state.code) {
      this.props.callback(this.state);
    }
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="mw-700 border border-info border- mt-100">
          <div className="card-header">Đăng nhập</div>
          <div className="card-body">
            <form onSubmit={this.handleLogin}>
              <div className="form-group row">
                <label
                  htmlFor="email_address"
                  className="col-md-4 col-form-label text-md-right"
                >
                  Địa chỉ Email
                </label>
                <div className="col-md-6">
                  <input type="email" className="form-control" name="email" />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="password"
                  className="col-md-4 col-form-label text-md-right"
                >
                  Mật khẩu
                </label>
                <div className="col-md-6">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    required
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-md-6 offset-md-4">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="check"
                      value="admin"
                      defaultChecked
                    />
                    <label className="form-check-label">Admin</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="check"
                      value="shopuser"
                    />
                    <label className="form-check-label">Shop</label>
                  </div>
                </div>
              </div>
              <div className="form-group row"></div>

              <div className="col-md-6 offset-md-4">
                <button type="submit" className="btn btn-primary">
                  Đăng nhập
                </button>
              </div>

              <div className="col-md-6 offset-md-4 mt-2 text-danger">
                {this.state.error}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
