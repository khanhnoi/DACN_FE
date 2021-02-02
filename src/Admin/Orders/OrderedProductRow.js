import React, { Component } from "react";
import { RestDataSource } from "../RestService/RestDataSource";

export class OrderedProductRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
    };
    this.dataSource = new RestDataSource("http://127.0.0.1:8000/api/shop/viewproduct", (err) =>
      console.log(err)
    );
  }
  componentDidMount() {
    this.dataSource.GetDataWithId(
      (data) => this.setState({ product: data.data }),
      this.props.product.id
    );
    console.log("orderedProductRow mounted!");
  }
  render() {
    let p = this.props.product;
    return (
      <tr>
        <th scope="row">{this.props.index + 1}</th>
        <th><img className="img-icon-order" src={this.state.product.thumbnails} alt="" /></th>
        <td>{this.state.product.product_name}</td>
        <td>{p.price}</td>
        <td>{p.quality}</td>
        <td>{p.price * p.quality}</td>
      </tr>
    );
  }
}
