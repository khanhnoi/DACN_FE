import React, { Component } from "react";
import { RestDataSource } from "../RestService/RestDataSource";
import { FormValidator } from "../Validate/FormValidator";
import { ValidationMessage } from "../Validate/ValidationMessage";
import user from "./user.png";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      message: ""
    };

    this.rules = {
      name: { required: true, minlength: 3 },
      email: { required: true, email: true },
      phone: { required: true, number: true },
    };
  }

  handleChange = (event) => {
    let temp = Object.assign(this.state.profile);
    temp[event.target.name] = event.target.value;
    this.setState({
      profile: temp,
    });
  };

  componentDidMount() {
    let url =
      this.props.role === "admin"
        ? "http://127.0.0.1:8000/api/admin/profile"
        : "http://127.0.0.1:8000/api/shop/profile";
    let dataSource = new RestDataSource(url, (err) => console.log(err));
    dataSource.GetData((data) => this.setState({ profile: data.data }));
  }

  handleUpdate = () => {
    let url =
      this.props.role === "admin"
        ? "http://127.0.0.1:8000/api/admin/edit"
        : "http://127.0.0.1:8000/api/shop/edit";
    let dataSource = new RestDataSource(url, (err) => console.log(err));
    dataSource.UpdateWithToken(
      {
        name: this.state.profile.name,
        phone: this.state.profile.phone,
        email: this.state.profile.email,
      },
      (data) => {
        this.setState({ message: data.code === 200 ? "Cập nhật thành công" : "" });
      }
    );
  };

  render() {
    return (
      <div className="emp-profile">
        <div className="row">
          <div className="col-md-3">
            <img className="img-profile" src={user} alt={user} />
          </div>
          <div className="col-md-6">
            <FormValidator
              data={this.state.profile}
              rules={this.rules}
              submit={this.props.submit}
            >
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">
                  Tền người dùng
                </label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    defaultValue={this.state.profile.name}
                    onChange={this.handleChange}
                  />
                </div>
                <ValidationMessage field="name" />
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    defaultValue={this.state.profile.email}
                    onChange={this.handleChange}
                  />
                </div>
                <ValidationMessage field="email" />
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Số điện thoại</label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    name="phone"
                    defaultValue={this.state.profile.phone}
                    onChange={this.handleChange}
                  />
                </div>
                <ValidationMessage field="phone" />
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Tạo vào lúc</label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={this.state.profile.created_at}
                    disabled
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">
                  Cập nhật gần nhất
                </label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={this.state.profile.updated_at}
                    disabled
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-3 col-form-label">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={this.handleUpdate}
                  >
                    Thay đổi
                  </button>
                </div>
                <div className="col-sm-9 mt-1">
                  <p className="text-success">{this.state.message}</p>
                </div>
              </div>
            </FormValidator>
          </div>
        </div>
      </div>
    );
  }
}
