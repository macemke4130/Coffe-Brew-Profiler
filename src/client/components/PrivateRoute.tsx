import * as React from 'react';
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => {
    const isAuth = localStorage.getItem("token");
    if (isAuth) {
        return (
            <Route {...rest}>
                {children}
            </Route>
        );
    } else {
        return (
            <Redirect to="/login" />
        );
    }
};

interface PrivateRouteProps {
    exact?: boolean,
    path: string,
    children: React.ReactNode
}

export default PrivateRoute;