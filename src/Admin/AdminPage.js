import React, { Component } from "react";
import { SideBar } from "./SideBar";
import { NavBar } from "./NavBar";
import { MainContent } from "./MainContent";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import { LoginPage } from "./Login/LoginPage";

const history = createBrowserHistory();

export class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      role: null,
      name: "",
      redirect: true
    };
    this.style = {
      topNav: "navbar sticky-top bg-light px-0 py-2 mw-700",
      sideNav: {
        navbar: "side-nav col-2",
        category:
          "btn btn-side btn-transparent py-3 my-2 text-light font-weight-normal",
      },
      mainContent: "main-content col-10",
    };
  }

  handleLoginSuccess = (state) => {
    this.setState({
      isLogin: true,
      role: state.role,
      name: state.name
    });
    history.push("/profile");
  };

  handleLogout = (dataSource) => {
    dataSource.Logout(() => this.setState({ isLogin: false, role: null }));
    sessionStorage.removeItem("token_jwt_easybuy");
  };

  render() {
    return (
      <React.Fragment>
        <Router>
          <NavBar
            style={this.style.topNav}
            isLogin={this.state.isLogin}
            callback={this.handleLogout}
            role={this.state.role}
            name={this.state.name}
          />
          <div className="container-fluid px-0">
            {!this.state.isLogin ? (
              <LoginPage callback={this.handleLoginSuccess} />
            ) : (
              <React.Fragment>
                <SideBar
                  style={this.style.sideNav}
                  history={history}
                  role={this.state.role}
                />
                <MainContent style={this.style.mainContent} role={this.state.role} />
              </React.Fragment>
            )}
          </div>
        </Router>
      </React.Fragment>
    );
  }
}
