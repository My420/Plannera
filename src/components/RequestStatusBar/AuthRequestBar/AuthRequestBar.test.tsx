import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, cleanup, screen } from '@testing-library/react';
import { moduleName } from '../../../ducks/auth/constant';
import AuthRequestBar from './AuthRequestBar';
import { reducerState } from '../../../ducks/auth/reducer';

const mockStore = configureStore();

const renderWithAuthRedux = (component: React.ReactNode, initialState = reducerState) => {
  const store = mockStore({ [moduleName]: initialState });
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe('test AuthRequestBar component', () => {
  afterEach(cleanup);

  test('should match snapshot', () => {
    const errorText = 'test error text';
    const state = reducerState.set('loading', true).set('error', errorText);
    const { asFragment } = renderWithAuthRedux(<AuthRequestBar />, state);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should display an empty div if data is not loading and there is no error', () => {
    renderWithAuthRedux(<AuthRequestBar />);
    const elem = screen.getByTestId('container');
    expect(elem).toBeEmpty();
  });

  test('should render the loading icon if data is loading', () => {
    const state = reducerState.set('loading', true);
    renderWithAuthRedux(<AuthRequestBar />, state);
    const element = screen.getByTitle('Loading...');
    expect(element).toBeTruthy();
  });

  test('should render error message if error is happen', () => {
    const errorText = 'test error text';
    const state = reducerState.set('error', errorText);
    renderWithAuthRedux(<AuthRequestBar />, state);
    const element = screen.getByText(errorText);
    expect(element).toBeTruthy();
  });
});
