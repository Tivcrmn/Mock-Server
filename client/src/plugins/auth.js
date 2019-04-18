import React from 'react';
import { Route, Redirect } from "react-router-dom";

export function AuthRoute({ component: Component, ...rest }) {
  let token = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}
