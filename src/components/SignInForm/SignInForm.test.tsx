import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { moduleName } from '../../ducks/auth/constant';
import { EMAIL, PASSWORD } from '../../utils/constant';
import SignInForm, { ISignInFormProps } from './SignInForm';
import { reducerState } from '../../ducks/auth/reducer';
import validateEmail from '../../utils/validateEmail';
import validatePassword from '../../utils/validatePassword';
import { signIn } from '../../ducks/auth/actionCreator';

const mockStore = configureStore();

const renderWithAuthRedux = (component: React.ReactNode, initialState = reducerState) => {
  const store = mockStore({ [moduleName]: initialState });
  return {
    ...render(
      <Provider store={store}>
        <MemoryRouter>{component}</MemoryRouter>
      </Provider>,
    ),
    store,
  };
};

describe('test SignInForm component', () => {
  afterEach(cleanup);

  const props: ISignInFormProps = {
    from: '/',
  };

  const text = {
    email: {
      valid: 'test@test.ru',
      invalid: 'test@test',
      errorMsg: validateEmail('test@test').error,
      emptyMsg: validateEmail('').error,
    },
    password: {
      valid: '12345678',
      invalid: '1234',
      errorMsg: validatePassword('1234').error,
      emptyMsg: validatePassword('').error,
    },
  };

  describe('component view test', () => {
    test('should match snapshot', () => {
      const { asFragment } = renderWithAuthRedux(<SignInForm {...props} />);
      expect(asFragment()).toMatchSnapshot();
    });

    test('should render element with form name', () => {
      renderWithAuthRedux(<SignInForm {...props} />);
      const element = screen.getByText('Sign in');
      expect(element).toBeTruthy();
    });

    test('request status bar should be empty', () => {
      renderWithAuthRedux(<SignInForm {...props} />);
      const element = screen.getByTestId('container');
      expect(element).toBeEmpty();
    });

    test('there should be no error messages', () => {
      renderWithAuthRedux(<SignInForm {...props} />);
      const element = screen.getAllByTestId('error');
      expect(element).toHaveLength(2);
      element.forEach((elem) => {
        expect(elem).toBeEmpty();
      });
    });

    test('should render email and password input field', () => {
      renderWithAuthRedux(<SignInForm {...props} />);
      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Password');
      expect(emailInput).toBeTruthy();
      expect(passwordInput).toBeTruthy();
    });

    test('submit button should be disabled', () => {
      renderWithAuthRedux(<SignInForm {...props} />);
      const element = screen.getByText('Continue');
      expect(element).toBeTruthy();
      expect(element).toBeDisabled();
    });

    test('should render link on Sign Up page', () => {
      renderWithAuthRedux(<SignInForm {...props} />);
      const element = screen.getByText('Sign up');
      expect(element).toHaveAttribute('href', '/signup');
    });
  });

  describe('component logic test', () => {
    test('email input should work correct with valid text ', async () => {
      renderWithAuthRedux(<SignInForm {...props} />);
      const emailInput = screen.getByPlaceholderText('Email');
      await userEvent.type(emailInput, text.email.valid);

      expect(emailInput).toHaveValue(text.email.valid);
      const emailErrorField = emailInput.previousSibling;
      expect(emailErrorField).toBeEmpty();
    });

    test('email input should work correct with invalid text ', async () => {
      renderWithAuthRedux(<SignInForm {...props} />);
      const emailInput = screen.getByPlaceholderText('Email');

      await userEvent.type(emailInput, text.email.invalid);
      expect(emailInput).toHaveValue(text.email.invalid);
      const emailErrorField = emailInput.previousSibling;
      expect(emailErrorField).toHaveTextContent(text.email.errorMsg);

      userEvent.clear(emailInput);
      expect(emailInput).toHaveValue('');
      expect(emailErrorField).toHaveTextContent(text.email.emptyMsg);
    });

    test('email input should work correct when invalid text change for valid', async () => {
      renderWithAuthRedux(<SignInForm {...props} />);
      const emailInput = screen.getByPlaceholderText('Email');

      await userEvent.type(emailInput, text.email.invalid);
      expect(emailInput).toHaveValue(text.email.invalid);
      const emailErrorField = emailInput.previousSibling;
      expect(emailErrorField).toHaveTextContent(text.email.errorMsg);

      userEvent.clear(emailInput);
      await userEvent.type(emailInput, text.email.valid);
      expect(emailInput).toHaveValue(text.email.valid);
      expect(emailErrorField).toBeEmpty();
    });

    test('password input should work correct with valid text ', async () => {
      renderWithAuthRedux(<SignInForm {...props} />);
      const passwordInput = screen.getByPlaceholderText('Password');
      await userEvent.type(passwordInput, text.password.valid);

      expect(passwordInput).toHaveValue(text.password.valid);
      const passwordErrorField = passwordInput.previousSibling;
      expect(passwordErrorField).toBeEmpty();
    });

    test('password input should work correct with invalid text ', async () => {
      renderWithAuthRedux(<SignInForm {...props} />);
      const passwordInput = screen.getByPlaceholderText('Password');

      await userEvent.type(passwordInput, text.password.invalid);
      expect(passwordInput).toHaveValue(text.password.invalid);
      const passwordErrorField = passwordInput.previousSibling;
      expect(passwordErrorField).toHaveTextContent(text.password.errorMsg);

      userEvent.clear(passwordInput);
      expect(passwordInput).toHaveValue('');
      expect(passwordErrorField).toHaveTextContent(text.password.emptyMsg);
    });

    test('password input should work correct when invalid text change for valid', async () => {
      renderWithAuthRedux(<SignInForm {...props} />);
      const passwordInput = screen.getByPlaceholderText('Password');

      await userEvent.type(passwordInput, text.password.invalid);
      expect(passwordInput).toHaveValue(text.password.invalid);
      const passwordErrorField = passwordInput.previousSibling;
      expect(passwordErrorField).toHaveTextContent(text.password.errorMsg);

      userEvent.clear(passwordInput);
      await userEvent.type(passwordInput, text.password.valid);
      expect(passwordInput).toHaveValue(text.password.valid);
      expect(passwordErrorField).toBeEmpty();
    });

    test('submit button should be enabled  if all fields have valid text', async () => {
      renderWithAuthRedux(<SignInForm {...props} />);
      const passwordInput = screen.getByPlaceholderText('Password');
      const emailInput = screen.getByPlaceholderText('Email');
      const button = screen.getByText('Continue');

      expect(button).toBeDisabled();
      await userEvent.type(emailInput, text.email.valid);
      await userEvent.type(passwordInput, text.password.valid);
      expect(button).toBeEnabled();
    });

    test('submit button should be disabled if at least one field have invalid text', async () => {
      renderWithAuthRedux(<SignInForm {...props} />);
      const passwordInput = screen.getByPlaceholderText('Password');
      const emailInput = screen.getByPlaceholderText('Email');
      const button = screen.getByText('Continue');

      expect(button).toBeDisabled();
      await userEvent.type(emailInput, text.email.valid);
      await userEvent.type(passwordInput, text.password.invalid);
      expect(button).toBeDisabled();

      userEvent.clear(emailInput);
      userEvent.clear(passwordInput);
      await userEvent.type(emailInput, text.email.invalid);
      await userEvent.type(passwordInput, text.password.valid);
      expect(button).toBeDisabled();
    });

    test('click on submit button should dispatch correct action', async () => {
      const { store } = renderWithAuthRedux(<SignInForm {...props} />);
      const passwordInput = screen.getByPlaceholderText('Password');
      const emailInput = screen.getByPlaceholderText('Email');
      const button = screen.getByText('Continue');

      await userEvent.type(emailInput, text.email.valid);
      await userEvent.type(passwordInput, text.password.valid);
      userEvent.click(button);

      const expectedAction = signIn({
        from: props.from,
        [EMAIL]: text.email.valid,
        [PASSWORD]: text.password.valid,
      });

      const actions = store.getActions();
      expect(actions).toEqual([expectedAction]);
    });

    test('user can navigate the form from the keyboard', async () => {
      renderWithAuthRedux(<SignInForm {...props} />);
      const passwordInput = screen.getByPlaceholderText('Password');
      const emailInput = screen.getByPlaceholderText('Email');
      const button = screen.getByText('Continue');
      const link = screen.getByText('Sign up');

      expect(document.body).toHaveFocus();

      userEvent.tab();
      expect(emailInput).toHaveFocus();

      await userEvent.type(emailInput, text.email.valid);

      userEvent.tab();
      expect(passwordInput).toHaveFocus();

      await userEvent.type(passwordInput, text.password.valid);

      userEvent.tab();
      expect(button).toHaveFocus();

      userEvent.tab();
      expect(link).toHaveFocus();

      userEvent.tab();
      expect(emailInput).toHaveFocus();
    });
  });
});
