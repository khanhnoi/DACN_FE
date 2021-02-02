import React, { Component } from "react";

export class PageNumber extends Component {
  render() {
    return (
      <React.Fragment>
        <ul className="pagination position-fixed mb-0 r-1 b-0">
          <li
            className={
              "page-item" +
              ((!this.props.searching && this.props.currentPage === 1) ||
              (this.props.searching && this.props.currentSearchPage === 1)
                ? " disabled"
                : "")
            }
          >
            <button
              className="page-link"
              onClick={() => this.props.nextPage(-1)}
              disabled={
                (!this.props.searching && this.props.currentPage === 1) ||
                (this.props.searching && this.props.currentSearchPage === 1)
              }
            >
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </button>
          </li>
          <li className="">
            <p className="page-link">
              Page {!this.props.searching ? this.props.currentPage : this.props.currentSearchPage} of {this.props.totalPage}
            </p>
          </li>
          <li
            className={
              "page-item" +
                (!this.props.searching &&
                  this.props.currentPage === this.props.totalPage) ||
              (this.props.searching &&
                this.props.currentSearchPage === this.props.totalPage)
                ? " disabled"
                : ""
            }
          >
            <button
              className="page-link"
              onClick={() => this.props.nextPage(1)}
              disabled={
                (!this.props.searching &&
                  this.props.currentPage === this.props.totalPage) ||
                (this.props.searching &&
                  this.props.currentSearchPage === this.props.totalPage)
              }
            >
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}
