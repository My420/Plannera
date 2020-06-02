import React from 'react';
import { Router, Route } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, cleanup, screen } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { moduleName } from '../../../ducks/auth/constant';
import SignUpPage from './SignUpPage';
import { reducerState } from '../../../ducks/auth/reducer';
import { SIGN_UP_PAGE, APP_NAME } from '../../../utils/constant';

const mockStore = configureStore();
const history = createBrowserHistory();
history.push('/signup');

const renderWithAuthRedux = (component: React.ReactNode, initialState = reducerState) => {
  const store = mockStore({ [moduleName]: initialState });
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={SIGN_UP_PAGE} component={component as React.FC} />
        </Router>
      </Provider>,
    ),
    store,
  };
};

describe('test SignUpPage component', () => {
  afterEach(cleanup);

  test('should match snapshot', () => {
    const { asFragment } = renderWithAuthRedux(SignUpPage);
    expect(asFragment()).toMatchSnapshot();
  });

  test('page should have hidden title for accessibility', () => {
    renderWithAuthRedux(SignUpPage);
    const element = screen.getByText(`${APP_NAME} sign up page`);
    expect(element).toBeTruthy();
  });

  test('page should have an application logo', () => {
    renderWithAuthRedux(SignUpPage);
    const element = screen.getByTitle(`${APP_NAME} logo`);
    expect(element).toBeTruthy();
  });

  test('page should show the name of the application', () => {
    renderWithAuthRedux(SignUpPage);
    const element = screen.getByText(`${APP_NAME}`);
    expect(element).toBeTruthy();
  });

  test('page should show sign in form', () => {
    renderWithAuthRedux(SignUpPage);
    const title = screen.getByText('Create account');
    const button = screen.getByText('Continue');
    expect(title).toBeTruthy();
    expect(button).toBeTruthy();
  });
});
