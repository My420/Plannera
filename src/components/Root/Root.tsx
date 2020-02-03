import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from '../routes/MainPage';
import SignUpPage from '../routes/SignUpPage';
import SignInPage from '../routes/SignInPage';

const Root: React.FC = () => (
  <Switch>
    <Route exact path="/" component={MainPage} />
    <Route exact path="/signup" component={SignUpPage} />
    <Route exact path="/signin" component={SignInPage} />
  </Switch>
);

export default Root;
