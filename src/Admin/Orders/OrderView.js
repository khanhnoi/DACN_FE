import React, { Component } from "react";
import { OrderedProductRow } from "./OrderedProductRow";
import { RestDataSource } from "../RestService/RestDataSource";

export class OrderView extends Component {

  constructor(props){
    super(props);
    this.state = {
      user: {},
      products: []
    }
    this.dataSourceUser = new RestDataSource("http://127.0.0.1:8000/api/shop/viewuserorder", err => console.log(err));
    this.dataSourceProducts = new RestDataSource("http://127.0.0.1:8000/api/shop/allproductorder", err => console.log(err));

  }

  componentDidUpdate(prevProps) {
    if(this.props.order !== prevProps.order){
      this.dataSourceUser.GetDataWithId(data => this.setState({ user: data.data }), this.props.order.id);
      this.dataSourceProducts.GetDataWithId(data => this.setState({ products: data.data }), this.props.order.id);
    }
  }

  // "id": 1,
  //       "user_id": 9,
  //       "sum_price": 0,
  //       "charge": 0,
  //       "deposit": 0,
  //       "delivery_date": null,
  //       "shop_id": 2,
  //       "status": 0,
  //       "payment": 0,
  //       "description": null,
  //       "note": null,
  //       "isRated": "1",
  //       "created_at": "2019-12-30T06:05:01.000000Z",
  //       "updated_at": "2019-11-05T06:05:01.000000Z",
  //       "deleted_at": null,
  //       "order_code": "IXMSBt7Aji"

  render() {
    let order = this.props.order;
    return (
      <div
        className="modal fade"
        id="orderModal"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div
          className="modal-dialog order-modal modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Thông tin đơn hàng</h5>
            </div>
            <div className="modal-body">
              <p className="font-weight-bold">ID {order.id}</p>
              <p className="mb-1">Ngày đặt hàng: {order.updated_at} </p>
              <p className="mb-1">Trạng thái đơn hàng: {order.status} </p>
              <p className="mb-1">Tổng giá: {order.sum_price}</p>
              <div className="border p-1 mt-3 border-gray">
                <table className="table table-borderless">
                  <thead className="mb-1">
                    <tr>
                      <th scope="col">Người đặt hàng</th>
                      <th scope="col">Địa chỉ nhận hàng</th>
                    </tr>
                  </thead>
                  <tbody className="mb-1">
                    <tr className="mb-0">
                      <td className="py-0">{ this.state.user.name }</td>
                      <td className="py-0">{ this.state.user.address }</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <br/>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Hình ảnh</th> 
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Đơn giá</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Tổng</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.products.map((p, index) => 
                      <OrderedProductRow key={index} index={index} product={p} />                    
                    )
                  }
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
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
