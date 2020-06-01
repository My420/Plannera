import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { moduleName } from '../../ducks/auth/constant';
import {
  EMAIL, PASSWORD, LAST_NAME, FIRST_NAME,
} from '../../utils/constant';
import SignUpForm from './SignUpForm';
import { reducerState } from '../../ducks/auth/reducer';
import validateEmail from '../../utils/validateEmail';
import validatePassword from '../../utils/validatePassword';
import { signUp } from '../../ducks/auth/actionCreator';
import validateConfirmField from '../../utils/validateConfirmField';
import validateNameField from '../../utils/validateNameField';

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

describe('test SignUpForm component', () => {
  afterEach(cleanup);

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
    confirm: {
      valid: '12345678',
      invalid: '12345',
      errorMsg: validateConfirmField('12345678', '12345').error,
      emptyMsg: validateConfirmField('12345', '12345678').error,
    },
    name: {
      valid: 'TestName',
      invalid: 'T',
      errorMsg: validateNameField('T').error,
      emptyMsg: validateNameField('').error,
    },
  };

  describe('component view test', () => {
    test('should match snapshot', () => {
      const { asFragment } = renderWithAuthRedux(<SignUpForm />);
      expect(asFragment()).toMatchSnapshot();
    });

    test('should render element with form name', () => {
      renderWithAuthRedux(<SignUpForm />);
      const element = screen.getByText('Create account');
      expect(element).toBeTruthy();
    });

    test('request status bar should be empty', () => {
      renderWithAuthRedux(<SignUpForm />);
      const element = screen.getByTestId('container');
      expect(element).toBeEmpty();
    });

    test('there should be no error messages', () => {
      renderWithAuthRedux(<SignUpForm />);
      const element = screen.getAllByTestId('error');
      expect(element).toHaveLength(5);
      element.forEach((elem) => {
        expect(elem).toBeEmpty();
      });
    });

    test('should render necessary input fields', () => {
      renderWithAuthRedux(<SignUpForm />);
      const inputs = ['Email', 'Password', 'Confirm password', 'First name', 'Last name'];
      inputs.forEach((p) => {
        const elem = screen.getByPlaceholderText(p);
        expect(elem).toBeTruthy();
      });
    });

    test('submit button should be disabled', () => {
      renderWithAuthRedux(<SignUpForm />);
      const element = screen.getByText('Continue');
      expect(element).toBeTruthy();
      expect(element).toBeDisabled();
    });

    test('should render link on Sign In page', () => {
      renderWithAuthRedux(<SignUpForm />);
      const element = screen.getByText('Sign in');
      expect(element).toHaveAttribute('href', '/signin');
    });
  });

  describe('component logic test', () => {
    test('email input should work correct with valid text ', async () => {
      renderWithAuthRedux(<SignUpForm />);
      const emailInput = screen.getByPlaceholderText('Email');
      await userEvent.type(emailInput, text.email.valid, { allAtOnce: true });

      expect(emailInput).toHaveValue(text.email.valid);
      const emailErrorField = emailInput.previousSibling;
      expect(emailErrorField).toBeEmpty();
    });

    test('email input should work correct with invalid text ', async () => {
      renderWithAuthRedux(<SignUpForm />);
      const emailInput = screen.getByPlaceholderText('Email');

      await userEvent.type(emailInput, text.email.invalid, { allAtOnce: true });
      expect(emailInput).toHaveValue(text.email.invalid);
      const emailErrorField = emailInput.previousSibling;
      expect(emailErrorField).toHaveTextContent(text.email.errorMsg);

      userEvent.clear(emailInput);
      expect(emailInput).toHaveValue('');
      expect(emailErrorField).toHaveTextContent(text.email.emptyMsg);
    });

    test('email input should work correct when invalid text change for valid', async () => {
      renderWithAuthRedux(<SignUpForm />);
      const emailInput = screen.getByPlaceholderText('Email');

      await userEvent.type(emailInput, text.email.invalid, { allAtOnce: true });
      expect(emailInput).toHaveValue(text.email.invalid);
      const emailErrorField = emailInput.previousSibling;
      expect(emailErrorField).toHaveTextContent(text.email.errorMsg);

      userEvent.clear(emailInput);
      await userEvent.type(emailInput, text.email.valid, { allAtOnce: true });
      expect(emailInput).toHaveValue(text.email.valid);
      expect(emailErrorField).toBeEmpty();
    });

    test('password input should work correct with valid text ', async () => {
      renderWithAuthRedux(<SignUpForm />);
      const passwordInput = screen.getByPlaceholderText('Password');
      await userEvent.type(passwordInput, text.password.valid, { allAtOnce: true });

      expect(passwordInput).toHaveValue(text.password.valid);
      const passwordErrorField = passwordInput.previousSibling;
      expect(passwordErrorField).toBeEmpty();
    });

    test('password input should work correct with invalid text ', async () => {
      renderWithAuthRedux(<SignUpForm />);
      const passwordInput = screen.getByPlaceholderText('Password');

      await userEvent.type(passwordInput, text.password.invalid, { allAtOnce: true });
      expect(passwordInput).toHaveValue(text.password.invalid);
      const passwordErrorField = passwordInput.previousSibling;
      expect(passwordErrorField).toHaveTextContent(text.password.errorMsg);

      userEvent.clear(passwordInput);
      expect(passwordInput).toHaveValue('');
      expect(passwordErrorField).toHaveTextContent(text.password.emptyMsg);
    });

    test('password input should work correct when invalid text change for valid', async () => {
      renderWithAuthRedux(<SignUpForm />);
      const passwordInput = screen.getByPlaceholderText('Password');

      await userEvent.type(passwordInput, text.password.invalid, { allAtOnce: true });
      expect(passwordInput).toHaveValue(text.password.invalid);
      const passwordErrorField = passwordInput.previousSibling;
      expect(passwordErrorField).toHaveTextContent(text.password.errorMsg);

      userEvent.clear(passwordInput);
      await userEvent.type(passwordInput, text.password.valid, { allAtOnce: true });
      expect(passwordInput).toHaveValue(text.password.valid);
      expect(passwordErrorField).toBeEmpty();
    });

    test('confirm input should work correct with valid text ', async () => {
      renderWithAuthRedux(<SignUpForm />);
      const passwordInput = screen.getByPlaceholderText('Password');
      await userEvent.type(passwordInput, text.password.valid, { allAtOnce: true });

      const confirmInput = screen.getByPlaceholderText('Confirm password');
      await userEvent.type(confirmInput, text.confirm.valid, { allAtOnce: true });

      expect(confirmInput).toHaveValue(text.confirm.valid);
      const confirmErrorField = confirmInput.previousSibling;
      expect(confirmErrorField).toBeEmpty();
    });

    test('confirm input should work correct with invalid text ', async () => {
      renderWithAuthRedux(<SignUpForm />);
      const passwordInput = screen.getByPlaceholderText('Password');
      await userEvent.type(passwordInput, text.password.valid, { allAtOnce: true });

      const confirmInput = screen.getByPlaceholderText('Confirm password');
      await userEvent.type(confirmInput, text.confirm.invalid, { allAtOnce: true });

      expect(confirmInput).toHaveValue(text.confirm.invalid);
      const confirmErrorField = confirmInput.previousSibling;
      expect(confirmErrorField).toHaveTextContent(text.confirm.errorMsg);

      userEvent.clear(confirmInput);
      expect(confirmInput).toHaveValue('');
      expect(confirmErrorField).toHaveTextContent(text.confirm.emptyMsg);
    });

    test('confirm input should work correct when invalid text change for valid', async () => {
      renderWithAuthRedux(<SignUpForm />);
      const passwordInput = screen.getByPlaceholderText('Password');
      await userEvent.type(passwordInput, text.password.valid, { allAtOnce: true });

      const confirmInput = screen.getByPlaceholderText('Confirm password');
      await userEvent.type(confirmInput, text.confirm.invalid, { allAtOnce: true });

      expect(confirmInput).toHaveValue(text.confirm.invalid);
      const confirmErrorField = confirmInput.previousSibling;
      expect(confirmErrorField).toHaveTextContent(text.confirm.errorMsg);

      userEvent.clear(confirmInput);
      await userEvent.type(confirmInput, text.confirm.valid, { allAtOnce: true });

      expect(confirmInput).toHaveValue(text.confirm.valid);
      expect(confirmErrorField).toBeEmpty();
    });

    test('first name input should work correct with valid text ', async () => {
      renderWithAuthRedux(<SignUpForm />);
      const nameInput = screen.getByPlaceholderText('First name');
      await userEvent.type(nameInput, text.name.valid, { allAtOnce: true });

      expect(nameInput).toHaveValue(text.name.valid);
      const nameErrorField = nameInput.previousSibling;
      expect(nameErrorField).toBeEmpty();
    });

    test('first name input should work correct with invalid text ', async () => {
      renderWithAuthRedux(<SignUpForm />);
      const nameInput = screen.getByPlaceholderText('First name');

      await userEvent.type(nameInput, text.name.invalid, { allAtOnce: true });
      expect(nameInput).toHaveValue(text.name.invalid);
      const nameErrorField = nameInput.previousSibling;
      expect(nameErrorField).toHaveTextContent(text.name.errorMsg);

      userEvent.clear(nameInput);
      expect(nameInput).toHaveValue('');
      expect(nameErrorField).toHaveTextContent(text.name.emptyMsg);
    });

    test('first name input should work correct when invalid text change for valid', async () => {
      renderWithAuthRedux(<SignUpForm />);
      const nameInput = screen.getByPlaceholderText('First name');

      await userEvent.type(nameInput, text.name.invalid, { allAtOnce: true });
      expect(nameInput).toHaveValue(text.name.invalid);
      const nameErrorField = nameInput.previousSibling;
      expect(nameErrorField).toHaveTextContent(text.name.errorMsg);

      userEvent.clear(nameInput);
      await userEvent.type(nameInput, text.name.valid, { allAtOnce: true });
      expect(nameInput).toHaveValue(text.name.valid);
      expect(nameErrorField).toBeEmpty();
    });

    test('last name input should work correct with valid text ', async () => {
      renderWithAuthRedux(<SignUpForm />);
      const nameInput = screen.getByPlaceholderText('Last name');
      await userEvent.type(nameInput, text.name.valid, { allAtOnce: true });

      expect(nameInput).toHaveValue(text.name.valid);
      const nameErrorField = nameInput.previousSibling;
      expect(nameErrorField).toBeEmpty();
    });

    test('last name input should work correct with invalid text ', async () => {
      renderWithAuthRedux(<SignUpForm />);
      const nameInput = screen.getByPlaceholderText('Last name');

      await userEvent.type(nameInput, text.name.invalid, { allAtOnce: true });
      expect(nameInput).toHaveValue(text.name.invalid);
      const nameErrorField = nameInput.previousSibling;
      expect(nameErrorField).toHaveTextContent(text.name.errorMsg);

      userEvent.clear(nameInput);
      expect(nameInput).toHaveValue('');
      expect(nameErrorField).toHaveTextContent(text.name.emptyMsg);
    });

    test('last name input should work correct when invalid text change for valid', async () => {
      renderWithAuthRedux(<SignUpForm />);
      const nameInput = screen.getByPlaceholderText('Last name');

      await userEvent.type(nameInput, text.name.invalid, { allAtOnce: true });
      expect(nameInput).toHaveValue(text.name.invalid);
      const nameErrorField = nameInput.previousSibling;
      expect(nameErrorField).toHaveTextContent(text.name.errorMsg);

      userEvent.clear(nameInput);
      await userEvent.type(nameInput, text.name.valid, { allAtOnce: true });
      expect(nameInput).toHaveValue(text.name.valid);
      expect(nameErrorField).toBeEmpty();
    });

    test('submit button should be enabled  if all fields have valid text', async () => {
      renderWithAuthRedux(<SignUpForm />);
      const passwordInput = screen.getByPlaceholderText('Password');
      const confirmInput = screen.getByPlaceholderText('Confirm password');
      const emailInput = screen.getByPlaceholderText('Email');
      const lastNameInput = screen.getByPlaceholderText('Last name');
      const firstNameInput = screen.getByPlaceholderText('First name');
      const button = screen.getByText('Continue');

      expect(button).toBeDisabled();
      await userEvent.type(emailInput, text.email.valid, { allAtOnce: true });
      await userEvent.type(passwordInput, text.password.valid, { allAtOnce: true });
      await userEvent.type(confirmInput, text.confirm.valid, { allAtOnce: true });
      await userEvent.type(lastNameInput, text.name.valid, { allAtOnce: true });
      await userEvent.type(firstNameInput, text.name.valid, { allAtOnce: true });
      expect(button).toBeEnabled();
    });

    test('submit button should be disabled if at least one field have invalid text', async () => {
      renderWithAuthRedux(<SignUpForm />);
      const passwordInput = screen.getByPlaceholderText('Password');
      const confirmInput = screen.getByPlaceholderText('Confirm password');
      const emailInput = screen.getByPlaceholderText('Email');
      const lastNameInput = screen.getByPlaceholderText('Last name');
      const firstNameInput = screen.getByPlaceholderText('First name');
      const button = screen.getByText('Continue');

      expect(button).toBeDisabled();
      await userEvent.type(emailInput, text.email.valid, { allAtOnce: true });
      await userEvent.type(passwordInput, text.password.valid, { allAtOnce: true });
      await userEvent.type(confirmInput, text.confirm.valid, { allAtOnce: true });
      await userEvent.type(lastNameInput, text.name.invalid, { allAtOnce: true });
      await userEvent.type(firstNameInput, text.name.valid, { allAtOnce: true });
      expect(button).toBeDisabled();

      userEvent.clear(lastNameInput);
      userEvent.clear(emailInput);
      await userEvent.type(emailInput, text.email.invalid, { allAtOnce: true });
      await userEvent.type(lastNameInput, text.name.valid, { allAtOnce: true });
      expect(button).toBeDisabled();
    });

    test('click on submit button should dispatch correct action', async () => {
      const { store } = renderWithAuthRedux(<SignUpForm />);
      const passwordInput = screen.getByPlaceholderText('Password');
      const confirmInput = screen.getByPlaceholderText('Confirm password');
      const emailInput = screen.getByPlaceholderText('Email');
      const lastNameInput = screen.getByPlaceholderText('Last name');
      const firstNameInput = screen.getByPlaceholderText('First name');
      const button = screen.getByText('Continue');

      await userEvent.type(emailInput, text.email.valid, { allAtOnce: true });
      await userEvent.type(passwordInput, text.password.valid, { allAtOnce: true });
      await userEvent.type(confirmInput, text.confirm.valid, { allAtOnce: true });
      await userEvent.type(lastNameInput, text.name.valid, { allAtOnce: true });
      await userEvent.type(firstNameInput, text.name.valid, { allAtOnce: true });
      userEvent.click(button);

      const expectedAction = signUp({
        [EMAIL]: text.email.valid,
        [PASSWORD]: text.password.valid,
        [LAST_NAME]: text.name.valid,
        [FIRST_NAME]: text.name.valid,
      });

      const actions = store.getActions();
      expect(actions).toEqual([expectedAction]);
    });

    test('user can navigate the form from the keyboard', async () => {
      renderWithAuthRedux(<SignUpForm />);
      const passwordInput = screen.getByPlaceholderText('Password');
      const confirmInput = screen.getByPlaceholderText('Confirm password');
      const emailInput = screen.getByPlaceholderText('Email');
      const lastNameInput = screen.getByPlaceholderText('Last name');
      const firstNameInput = screen.getByPlaceholderText('First name');
      const button = screen.getByText('Continue');
      const link = screen.getByText('Sign in');

      expect(document.body).toHaveFocus();

      userEvent.tab();
      expect(emailInput).toHaveFocus();
      await userEvent.type(emailInput, text.email.valid);

      userEvent.tab();
      expect(passwordInput).toHaveFocus();
      await userEvent.type(passwordInput, text.password.valid);

      userEvent.tab();
      expect(confirmInput).toHaveFocus();
      await userEvent.type(confirmInput, text.confirm.valid);

      userEvent.tab();
      expect(firstNameInput).toHaveFocus();
      await userEvent.type(firstNameInput, text.name.valid);

      userEvent.tab();
      expect(lastNameInput).toHaveFocus();
      await userEvent.type(lastNameInput, text.name.valid);

      userEvent.tab();
      expect(button).toHaveFocus();

      userEvent.tab();
      expect(link).toHaveFocus();

      userEvent.tab();
      expect(emailInput).toHaveFocus();
    });
  });
});
