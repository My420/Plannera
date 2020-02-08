import React from 'react';
import { useSelector } from 'react-redux';
import {
  Route, Redirect, RouteProps, useLocation,
} from 'react-router-dom';
import { AppState } from '../../../redux/store';

const ProtectedRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
  const userID = useSelector((state: AppState) => state.auth.userID);
  const prevUrl = useLocation().pathname;

  return userID ? (
    <Route {...rest} component={Component} />
  ) : (
    <Redirect to={{ pathname: '/signin', state: { from: prevUrl } }} />
  );
};

export default ProtectedRoute;
