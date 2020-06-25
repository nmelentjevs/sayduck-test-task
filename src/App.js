import React from 'react';

import { Router, Switch, Route } from 'react-router-dom';

import { ProtectedRoute, GuestRoute } from './routes/ProtectedRoutes';
import { Login, Products, Product, NotFound } from './pages';
import { history } from './history';

const defaultProtectedRouteProps = {
  authenticationPath: '/',
};

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <ProtectedRoute
          {...defaultProtectedRouteProps}
          path="/products"
          component={Products}
        />
        <ProtectedRoute
          {...defaultProtectedRouteProps}
          path="/product/:id"
          component={Product}
        />
        <GuestRoute exact path="/" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
