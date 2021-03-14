import { Redirect, Route } from "react-router";
import { routes } from "../const";

// TODO: Implement PrivateRoute in App.js
export default function PrivateRoute({ children, ...rest }) {
    const isAuthenticated = true;
    return (
        <Route {...rest} render={props => (
            isAuthenticated ? children : <Redirect to={routes.LOGIN} />
        )} />
    )
}