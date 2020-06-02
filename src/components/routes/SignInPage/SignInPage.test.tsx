import React from 'react';
import { Router, Route } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, cleanup, screen } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { moduleName } from '../../../ducks/auth/constant';
import SignInPage from './SignInPage';
import { reducerState } from '../../../ducks/auth/reducer';
import { SIGN_IN_PAGE, APP_NAME } from '../../../utils/constant';

const mockStore = configureStore();
const history = createBrowserHistory();
history.push('/signin');

const renderWithAuthRedux = (component: React.ReactNode, initialState = reducerState) => {
  const store = mockStore({ [moduleName]: initialState });
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={SIGN_IN_PAGE} component={component as React.FC} />
        </Router>
      </Provider>,
    ),
    store,
  };
};

describe('test SignInPage component', () => {
  afterEach(cleanup);

  test('should match snapshot', () => {
    const { asFragment } = renderWithAuthRedux(SignInPage);
    expect(asFragment()).toMatchSnapshot();
  });

  test('page should have hidden title for accessibility', () => {
    renderWithAuthRedux(SignInPage);
    const element = screen.getByText(`${APP_NAME} sign in page`);
    expect(element).toBeTruthy();
  });

  test('page should have an application logo', () => {
    renderWithAuthRedux(SignInPage);
    const element = screen.getByTitle(`${APP_NAME} logo`);
    expect(element).toBeTruthy();
  });

  test('page should show the name of the application', () => {
    renderWithAuthRedux(SignInPage);
    const element = screen.getByText(`${APP_NAME}`);
    expect(element).toBeTruthy();
  });

  test('page should show sign in form', () => {
    renderWithAuthRedux(SignInPage);
    const title = screen.getByText('Sign in');
    const button = screen.getByText('Continue');
    expect(title).toBeTruthy();
    expect(button).toBeTruthy();
  });
});
