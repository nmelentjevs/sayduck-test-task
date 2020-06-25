import React from 'react';
import { Redirect, Route } from 'react-router';

export const ProtectedRoute = (props) => {
  let redirectPath = '';
  const token = localStorage.getItem('token');
  if (!token) {
    redirectPath = props.authenticationPath;
  }

  if (redirectPath) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  } else {
    return <Route {...props} />;
  }
};

export const GuestRoute = (props) => {
  const token = localStorage.getItem('token');
  if (token) {
    const renderComponent = () => <Redirect to={{ pathname: '/products' }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  } else {
    return <Route {...props} />;
  }
};
