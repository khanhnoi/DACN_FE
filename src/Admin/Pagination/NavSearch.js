import React, { Component } from "react";

export class NavSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      option: "name",
    };
  }

  handleChangeText = (event) => {
    event.persist();
    this.setState({
      text: event.target.value,
    });
  };

  handleChangeOption = (event) => {
    event.persist();
    this.setState({
      option: event.target.value,
    });
  }

  render() {
    return (
      <div className="form-inline">
        <div className="form-group mx-sm-3 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Nhập"
            onChange={this.handleChangeText}
          />
        </div>
        <button
          className="btn btn-primary mb-2"
          onClick={() => this.props.handleSearch(this.state.text, this.state.option)}
        >
          <i className="fa fa-search"></i>
        </button>
        <select name="option" className="custom-select mb-2 mx-3" onChange={this.handleChangeOption}>
          {Object.keys(this.props.properties).map((p) => (
            <React.Fragment key={p} >
              <option value={p}>{this.props.properties[p]}</option>
            </React.Fragment>
          ))}
        </select>
      </div>
    );
  }
}
