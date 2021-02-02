import React, { Component } from "react";
import icon from "./icon.png";

export class ProductDetail extends Component {
  render() {
    let product = this.props.product;
    return (
      <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
        <div className="row">
          <div className="col-12">
            <h2 className="tm-block-title d-inline-block">Edit Product</h2>
          </div>
        </div>
        <div className="row tm-edit-product-row">
          <div className="col-xl-6 col-lg-6 col-md-12">
            <form className="tm-edit-product-form">
              <div className="form-group mb-3">
                <label htmlFor="name">Product Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-control validate"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control validate tm-small"
                  rows="5"
                  required=""
                >
                </textarea>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="category">Category</label>
                <select
                  className="custom-select tm-select-accounts"
                  id="category"
                >
                  <option>Select category</option>
                  <option value="1">New Arrival</option>
                  <option value="2">Most Popular</option>
                  <option value="3">Trending</option>
                </select>
              </div>
              <div className="row">
                <div className="form-group mb-3 col-xs-12 col-sm-6">
                  <label htmlFor="expire_date">Expire Date</label>
                  <input
                    id="expire_date"
                    name="expire_date"
                    type="text"
                    className="form-control validate hasDatepicker"
                    data-large-mode="true"
                  />
                </div>
                <div className="form-group mb-3 col-xs-12 col-sm-6">
                  <label htmlFor="stock">Units In Stock</label>
                  <input
                    id="stock"
                    name="stock"
                    type="text"
                    className="form-control validate"
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 mx-auto mb-4">
            <div className="tm-product-img-edit mx-auto">
              <img
                src={ icon }
                alt="Product image"
                className="img-fluid d-block mx-auto"
              />
              <i
                className="fa fa-cloud-upload-alt tm-upload-icon"
              ></i>
            </div>
            <div className="custom-file mt-3 mb-3">
              <input id="fileInput" type="file" className="d-none"/>
              <input
                type="button"
                className="btn btn-primary btn-block mx-auto"
                value="CHANGE IMAGE NOW"
              />
            </div>
          </div>
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary btn-block text-uppercase"
            >
              Update Now
            </button>
          </div>
        </div>
      </div>
    );
  }
}

{
  /* <div classNameName="row">
            <div classNameName="col-6">
                <img src={ icon } classNameName="img-product" alt="..." />
            </div>
            <div classNameName="col">
                <h4>{ product.name }</h4>
                <p classNameName="font-weight-bold">{ product.price }</p>
                <p>{ product.description }</p>
                <p>{ product.resource }</p>
            </div>
        </div> */
}
