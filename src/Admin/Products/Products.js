import React, { Component } from "react";
import { PageNumber } from "../Pagination/PageNumber";
import { NavSearch } from "../Pagination/NavSearch";
import { ProductsBoard } from "./ProductsBoard";
import { ProductDetail } from "./ProductDetail";
import { RestDataSource } from "../RestService/RestDataSource";

const rowsPerPage = 10;

export class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      currentSearchPage: 1,
      search: {
        text: "",
        option: ""
      },
      totalPage: 0,
      currentProduct: {},
      products: [
        //id, product name, description, resource, thumbnails, rating,
      ],
      searchProperties: {},
    };
    this.dataSource = new RestDataSource(
      "http://127.0.0.1:8000/api/shop/allproduct",
      (err) => console.log(err)
    );
  }

  componentDidMount() {
    this.dataSource.GetDataEachPage(
      (data) => {
        this.setState({
          products: Object.values(data.data.data),
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
    if (prevState.currentPage !== this.state.currentPage) {
      if (this.state.search["text"] === "") {
        this.dataSource.GetDataEachPage(
          (data) => {
            this.setState({
              currentSearchPage: 1,
              products: Object.values(data.data.data),
            });
          },
          {
            perPage: rowsPerPage,
            page: this.state.currentPage,
          }
        );
      }
    }
  }

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

  handleSearch = (text, option) => {
    this.setState({
      search: {
        text: text,
        option: option,
      },
    });
  };

  render() {
    if (this.state.currentProduct) {
      return (
        <React.Fragment>
          {/* <NavSearch
            handleSearch={this.handleSearch}
            properties={this.searchProperties}
          /> */}
          <ProductsBoard products={this.state.products} />
          {/* <button
            type="button"
            className="btn btn-primary fixed-bottom float-left mr-3 mb-3 left-auto"
            data-toggle="modal"
            data-target="#productModal"
          >
            Add new product
          </button> */}
          <PageNumber
            currentPage={this.state.currentPage}
            currentSearchPage={this.state.currentSearchPage}
            searching={this.state.search["text"]}
            totalPage={this.state.totalPage}
            nextPage={this.handleNextPage}
          />
        </React.Fragment>
      );
    } else {
      return <ProductDetail product={this.state.currentProduct} />;
    }
  }
}
