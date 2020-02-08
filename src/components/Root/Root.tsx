import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MAIN_PAGE, SIGN_UP_PAGE, SIGN_IN_PAGE } from '../../utils/constant';
import MainPage from '../routes/MainPage';
import SignUpPage from '../routes/SignUpPage';
import SignInPage from '../routes/SignInPage';
import ProtectedRoute from '../common/ProtectedRoute/ProtectedRoute';

const Root: React.FC = () => (
  <Switch>
    <ProtectedRoute exact path={MAIN_PAGE} component={MainPage} />
    <Route exact path={SIGN_UP_PAGE} component={SignUpPage} />
    <Route exact path={SIGN_IN_PAGE} component={SignInPage} />
  </Switch>
);

export default Root;
