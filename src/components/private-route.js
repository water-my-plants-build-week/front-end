import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({ component, render, ...props }) {
  /*
   * We store the token returned from the server in localStorage, so if the user
   * has been authenticated with the server we can fetch that token from
   * localStorage. If they have not we should redirect the user to the login
   * page.
   */
  const token = localStorage.getItem("token");

  /*
   * To allow the user access to both the component and render prop API,
   * we check if the user passed in a function to the render prop. If they did
   * not, then we default to using the component.
   */
  const Component = typeof render === "function" ? render : component;

  return (
    <Route
      {...props}
      render={routeProps => {
        return token ? (
          <Component {...routeProps} />
        ) : (
          <Redirect to={{ pathname: "/login", from: routeProps.location }} />
        );
      }}
    />
  );
}

PrivateRoute.propTypes = {
  path: PropTypes.string,
  render: PropTypes.func
};
