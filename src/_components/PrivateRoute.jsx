import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            //pass the current page user tryin to go to
            //user ocming from props.location
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)
