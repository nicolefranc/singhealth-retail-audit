import React from "react";
import { Redirect, Route } from "react-router-dom";
import { routes } from "../const";
import { tokenValidator } from "./tokenValidator";

function AuthRoute({ component: Component, users: users, ...rest }) {
  let isAuthenticated = localStorage.getItem("jwt");
  let validatorResult = tokenValidator(isAuthenticated);

  const sessionInvalid = !isAuthenticated || validatorResult.expired;
  // console.log("session invalid for ", Component.name, ": ", sessionInvalid);
  
  const unauthorized = !users.includes(validatorResult.type);
  // console.log("unauthorized to enter", Component.name, ": ", unauthorized);
  return (
    <Route
      {...rest}
      render={(props) =>
        sessionInvalid ? (
          <Redirect to={routes.LOGIN} />
        ) : unauthorized ? (
          <Redirect to={routes.DEFAULT} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

export default AuthRoute;
