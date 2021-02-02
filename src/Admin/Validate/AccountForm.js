import React, { Component } from "react";
import { FormValidator } from "./FormValidator";
import { ValidationMessage } from "./ValidationMessage";

export class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: { },
    };

    this.rules = {
      name: { required: true, minlength: 3, alpha: true },
      email: { required: true, email: true },
      phoneNumber: { required: true, number: true },
      password: { required: true, equals: "confirmPassword" },
      confirmPassword: { required: true, equals: "password" },
    };
  }

  handleChange = (event) => {
    let temp = Object.assign(this.state.formData);
    temp[event.target.name] = event.target.value;
    this.setState({
      formData: temp
    });
  };

  fetchData = (account) => {
    const formData = {
      id: account.id || "",
      name: account.name || "",
      email: account.email || "",
      phoneNumber:
        (account.phoneNumber === undefined ? "" : account.phoneNumber) || "",
      password: account.password || "",
      confirmPassword: account.password || "",
    };
    this.setState({ formData: formData });
  };

  handleClick = () => {
    const account = {
      id: this.state.formData.id || "432",
      name: this.state.formData.name,
      email: this.state.formData.email,
      phoneNumber: this.state.formData.phoneNumber,
      password: this.state.formData.password,
    };
    this.props.saveCallback(account);
  };

  componentDidUpdate(prevProps) {
    if(this.props.clear !== prevProps.clear){
      this.fetchData(this.props.account);
    }
    if (this.props.account !== prevProps.account) {
      //this.setState({ formData: {} });
      this.fetchData(this.props.account);
    }
  }

  render() {
    return (
      <div
        className="modal fade"
        id="accountModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <FormValidator
                data={this.state.formData}
                rules={this.rules}
                submit={this.props.submit}
              >
                <div className="form-group">
                  <label>ID</label>
                  <input
                    className="form-control"
                    name="id"
                    disabled
                    value={this.state.formData.id}
                  />
                </div>
                <div className="form-group">
                  <label>Họ và tên</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    value={this.state.formData.name}
                    onChange={this.handleChange}
                  />
                </div>
                <ValidationMessage field="name" />
                <div className="form-group">
                  <label>Email</label>
                  <input
                    className="form-control"
                    type="text"
                    name="email"
                    value={this.state.formData.email}
                    onChange={this.handleChange}
                  />
                </div>
                <ValidationMessage field="email" />
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input
                    className="form-control"
                    type="text"
                    name="phoneNumber"
                    value={this.state.formData.phoneNumber}
                    onChange={this.handleChange}
                  />
                </div>
                <ValidationMessage field="phoneNumber" />
                <div className="form-group">
                  <label>Mật khẩu</label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    value={this.state.formData.password}
                    onChange={this.handleChange}
                  />
                </div>
                <ValidationMessage field="password" />
                <div className="form-group">
                  <label>Xác nhận mật khẩu</label>
                  <input
                    className="form-control"
                    type="password"
                    name="confirmPassword"
                    value={this.state.formData.confirmPassword}
                    onChange={this.handleChange}
                  />
                </div>
                <ValidationMessage field="confirmPassword" />
              </FormValidator>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={this.handleClick}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
