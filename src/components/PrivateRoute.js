import React from "react";
import { Redirect } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";

const PrivateRoute = (props) => {
  if (!props.isAuthenticated) return <Redirect to="/home" />;
  return (
    <>
    <Header />
      <Navbar />
      <div className="private-content">{props.children}</div>
      <Footer />
    </>
  );
};

export default PrivateRoute;
