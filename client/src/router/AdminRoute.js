import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router";

const AdminRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.userReducer.user);
  const token = localStorage.getItem("token");
  if (!token) {
    return <Redirect to="/" />;
  } else {
    if (user && user.role === "admin") {
      return <Route component={Component} {...rest} />;
    }
    return <Route component={Component} {...rest} />;
  }
};

export default AdminRoute;
