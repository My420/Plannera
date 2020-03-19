import {
  ISignUpRequestAction,
  ISignUpErrorAction,
  ISignInRequestAction,
  IAuthData,
  ISignInSuccessAction,
  ISignInErrorAction,
  ISignOutRequestAction,
  ISignOutSuccessAction,
  ISignOutErrorAction,
  IAuthClearErrorAction,
} from './types';
import { ISignUpFormData, ISignInFormData } from '../../types/signUpForm';
import {
  SIGN_UP_REQUEST,
  SIGN_UP_ERROR,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_ERROR,
  AUTH_CLEAR_ERROR,
} from './constant';
import {
  EMAIL, PASSWORD, FIRST_NAME, LAST_NAME,
} from '../../utils/constant';
import {
  signUp,
  signUpError,
  signIn,
  signInSuccess,
  signInError,
  signOut,
  signOutSuccess,
  signOutError,
  clearAuthError,
} from './actionCreator';

describe('test Auth ActionCreator functions', () => {
  test('test signUp actionCreator function', () => {
    const data: ISignUpFormData = {
      [EMAIL]: 'test@test.test',
      [PASSWORD]: '1234',
      [FIRST_NAME]: 'firstTest',
      [LAST_NAME]: 'lastTest',
    };

    const expectedAction: ISignUpRequestAction = {
      type: SIGN_UP_REQUEST,
      payload: data,
    };
    const action = signUp(data);
    expect(action).toEqual(expectedAction);
  });

  test('test signUpError actionCreator function', () => {
    const error: string = 'test error msg';

    const expectedAction: ISignUpErrorAction = {
      type: SIGN_UP_ERROR,
      payload: error,
    };
    const action = signUpError(error);
    expect(action).toEqual(expectedAction);
  });

  test('test signIn actionCreator function', () => {
    const data: ISignInFormData = {
      [EMAIL]: 'test@test.test',
      [PASSWORD]: '1234',
      from: '/',
    };

    const expectedAction: ISignInRequestAction = {
      type: SIGN_IN_REQUEST,
      payload: data,
    };
    const action = signIn(data);
    expect(action).toEqual(expectedAction);
  });

  test('test signInSuccess actionCreator function', () => {
    const data: IAuthData = {
      userID: 'test',
      email: 'test@test.test',
    };

    const expectedAction: ISignInSuccessAction = {
      type: SIGN_IN_SUCCESS,
      payload: data,
    };
    const action = signInSuccess(data);
    expect(action).toEqual(expectedAction);
  });

  test('test signInError actionCreator function', () => {
    const data: string = 'test error';

    const expectedAction: ISignInErrorAction = {
      type: SIGN_IN_ERROR,
      payload: data,
    };
    const action = signInError(data);
    expect(action).toEqual(expectedAction);
  });

  test('test signOut actionCreator function', () => {
    const expectedAction: ISignOutRequestAction = {
      type: SIGN_OUT_REQUEST,
      payload: null,
    };
    const action = signOut();
    expect(action).toEqual(expectedAction);
  });

  test('test signOutSuccess actionCreator function', () => {
    const expectedAction: ISignOutSuccessAction = {
      type: SIGN_OUT_SUCCESS,
      payload: null,
    };
    const action = signOutSuccess();
    expect(action).toEqual(expectedAction);
  });

  test('test signOutError actionCreator function', () => {
    const data: string = 'test error';

    const expectedAction: ISignOutErrorAction = {
      type: SIGN_OUT_ERROR,
      payload: data,
    };
    const action = signOutError(data);
    expect(action).toEqual(expectedAction);
  });

  test('test clearAuthError actionCreator function', () => {
    const expectedAction: IAuthClearErrorAction = {
      type: AUTH_CLEAR_ERROR,
      payload: null,
    };
    const action = clearAuthError();
    expect(action).toEqual(expectedAction);
  });
});
