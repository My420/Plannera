import {
  ISignOutErrorAction,
  ISignUpRequestAction,
  ISignInRequestAction,
  ISignInSuccessAction,
  IAuthData,
  ISignUpErrorAction,
  ISignOutSuccessAction,
  ISignInErrorAction,
  IAuthClearErrorAction,
} from './types';
import { ISignUpFormData, ISignInFormData } from '../../types/signUpForm';
import {
  SIGN_UP_REQUEST,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_OUT_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT_ERROR,
  AUTH_CLEAR_ERROR,
} from './constant';
import reducer, { reducerState } from './reducer';

describe('test Auth reducer', () => {
  test('should return InitialState', () => {
    expect(reducer(undefined, {} as ISignOutErrorAction)).toEqual(reducerState);
  });

  test('should correct process SIGN_UP_REQUEST action ', () => {
    const prevState = reducerState.set('error', 'prev error');
    const action: ISignUpRequestAction = {
      type: SIGN_UP_REQUEST,
      payload: {} as ISignUpFormData,
    };
    const expectedState = prevState.set('loading', true).set('error', null);
    expect(reducer(prevState, action)).toEqual(expectedState);
  });

  test('should correct process SIGN_IN_REQUEST action ', () => {
    const prevState = reducerState.set('error', 'prev error');
    const action: ISignInRequestAction = {
      type: SIGN_IN_REQUEST,
      payload: {} as ISignInFormData,
    };
    const expectedState = prevState.set('loading', true).set('error', null);
    expect(reducer(prevState, action)).toEqual(expectedState);
  });

  test('should correct process SIGN_IN_SUCCESS action ', () => {
    const prevState = reducerState.set('loading', true);
    const data: IAuthData = {
      userID: 'testID',
      email: 'test@test.test',
    };
    const action: ISignInSuccessAction = {
      type: SIGN_IN_SUCCESS,
      payload: data,
    };
    const expectedState = prevState
      .set('userID', data.userID)
      .set('email', data.email)
      .set('loading', false)
      .set('error', null);

    expect(reducer(prevState, action)).toEqual(expectedState);
  });

  test('should correct process SIGN_UP_ERROR action ', () => {
    const prevState = reducerState.set('loading', true);
    const data: string = 'test error';
    const action: ISignUpErrorAction = {
      type: SIGN_UP_ERROR,
      payload: data,
    };
    const expectedState = prevState
      .set('userID', null)
      .set('email', null)
      .set('loading', false)
      .set('error', data);

    expect(reducer(prevState, action)).toEqual(expectedState);
  });

  test('should correct process SIGN_IN_ERROR action ', () => {
    const prevState = reducerState.set('loading', true);
    const data: string = 'test error';
    const action: ISignInErrorAction = {
      type: SIGN_IN_ERROR,
      payload: data,
    };
    const expectedState = prevState
      .set('userID', null)
      .set('email', null)
      .set('loading', false)
      .set('error', data);

    expect(reducer(prevState, action)).toEqual(expectedState);
  });

  test('should correct process SIGN_OUT_SUCCESS action ', () => {
    const prevState = reducerState.set('userID', '123').set('email', 'test@test.test');

    const action: ISignOutSuccessAction = {
      type: SIGN_OUT_SUCCESS,
      payload: null,
    };
    const expectedState = reducerState;

    expect(reducer(prevState, action)).toEqual(expectedState);
  });

  test('should correct process SIGN_OUT_ERROR action ', () => {
    const prevState = reducerState.set('userID', '123').set('email', 'test@test.test');
    const data: string = 'test error';
    const action: ISignOutErrorAction = {
      type: SIGN_OUT_ERROR,
      payload: data,
    };
    const expectedState = prevState.set('error', data);

    expect(reducer(prevState, action)).toEqual(expectedState);
  });

  test('should correct process AUTH_CLEAR_ERROR action ', () => {
    const prevState = reducerState
      .set('userID', '123')
      .set('email', 'test@test.test')
      .set('error', 'test error');

    const action: IAuthClearErrorAction = {
      type: AUTH_CLEAR_ERROR,
      payload: null,
    };
    const expectedState = prevState.set('error', null);

    expect(reducer(prevState, action)).toEqual(expectedState);
  });
});
