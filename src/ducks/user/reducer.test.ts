import {
  ICreateUserRequestAction,
  ICreateUserData,
  ILoadUserRequestAction,
  IChangeUserDataRequestAction,
  IChangeUserData,
  IChangeUserDataSuccessAction,
  IUser,
  ILoadUserSuccessAction,
  ILoadUserErrorAction,
  ICreateUserErrorAction,
  IChangeUserDataErrorAction,
  IClearUserState,
} from './types';
import {
  CREATE_USER_REQUEST,
  LOAD_USER_REQUEST,
  CHANGE_USER_DATA_REQUEST,
  CHANGE_USER_DATA_SUCCESS,
  LOAD_USER_SUCCESS,
  LOAD_USER_ERROR,
  CREATE_USER_ERROR,
  CHANGE_USER_DATA_ERROR,
  CLEAR_USER_STATE,
} from './constant';
import reducer, { reducerState } from './reducer';

describe('test User reducer', () => {
  test('should return InitialState', () => {
    expect(reducer(undefined, {} as ICreateUserRequestAction)).toEqual(reducerState);
  });

  test('should correct process CREATE_USER_REQUEST action ', () => {
    const prevState = reducerState.set('error', 'prev error');
    const action: ICreateUserRequestAction = {
      type: CREATE_USER_REQUEST,
      payload: {} as ICreateUserData,
    };
    const expectedState = prevState.set('loading', true).set('error', null);
    expect(reducer(prevState, action)).toEqual(expectedState);
  });

  test('should correct process LOAD_USER_REQUEST action ', () => {
    const prevState = reducerState.set('error', 'prev error');
    const action: ILoadUserRequestAction = {
      type: LOAD_USER_REQUEST,
      payload: { userID: '12345' },
    };
    const expectedState = prevState.set('loading', true).set('error', null);
    expect(reducer(prevState, action)).toEqual(expectedState);
  });

  test('should correct process CHANGE_USER_DATA_REQUEST action ', () => {
    const prevState = reducerState.set('error', 'prev error');
    const action: IChangeUserDataRequestAction = {
      type: CHANGE_USER_DATA_REQUEST,
      payload: {} as IChangeUserData,
    };
    const expectedState = prevState.set('loading', true).set('error', null);
    expect(reducer(prevState, action)).toEqual(expectedState);
  });

  test('should correct process CHANGE_USER_DATA_SUCCESS action ', () => {
    const prevState = reducerState.set('loading', true).set('error', null);
    const data: IUser = {
      userID: '12345',
      email: 'test@test.test',
      firstName: 'testFirstName',
      lastName: 'testLastName',
      initial: 'TT',
    };
    const action: IChangeUserDataSuccessAction = {
      type: CHANGE_USER_DATA_SUCCESS,
      payload: data,
    };
    const expectedState = prevState
      .set('userID', data.userID)
      .set('email', data.email)
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('initial', data.initial)
      .set('loading', false)
      .set('error', null);
    expect(reducer(prevState, action)).toEqual(expectedState);
  });

  test('should correct process LOAD_USER_SUCCESS action ', () => {
    const prevState = reducerState.set('loading', true).set('error', null);
    const data: IUser = {
      userID: '123456',
      email: 'test2@test.test',
      firstName: 'test2FirstName',
      lastName: 'test2LastName',
      initial: 'TT',
    };
    const action: ILoadUserSuccessAction = {
      type: LOAD_USER_SUCCESS,
      payload: data,
    };
    const expectedState = prevState
      .set('userID', data.userID)
      .set('email', data.email)
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('initial', data.initial)
      .set('loading', false)
      .set('error', null);
    expect(reducer(prevState, action)).toEqual(expectedState);
  });

  test('should correct process LOAD_USER_ERROR action ', () => {
    const prevState = reducerState.set('loading', true);
    const data: string = 'test error';
    const action: ILoadUserErrorAction = {
      type: LOAD_USER_ERROR,
      payload: data,
    };
    const expectedState = prevState
      .set('userID', null)
      .set('email', null)
      .set('firstName', null)
      .set('lastName', null)
      .set('initial', null)
      .set('loading', false)
      .set('error', data);

    expect(reducer(prevState, action)).toEqual(expectedState);
  });

  test('should correct process CREATE_USER_ERROR action ', () => {
    const prevState = reducerState.set('loading', true);
    const data: string = 'test error 2';
    const action: ICreateUserErrorAction = {
      type: CREATE_USER_ERROR,
      payload: data,
    };
    const expectedState = prevState
      .set('userID', null)
      .set('email', null)
      .set('firstName', null)
      .set('lastName', null)
      .set('initial', null)
      .set('loading', false)
      .set('error', data);

    expect(reducer(prevState, action)).toEqual(expectedState);
  });

  test('should correct process CHANGE_USER_DATA_ERROR action ', () => {
    const prevState = reducerState
      .set('userID', '12345678')
      .set('email', 'test@test.test')
      .set('firstName', 'testName')
      .set('lastName', 'testLastName')
      .set('initial', 'TT')
      .set('loading', true)
      .set('error', null);

    const data: string = 'test error 3';
    const action: IChangeUserDataErrorAction = {
      type: CHANGE_USER_DATA_ERROR,
      payload: data,
    };
    const expectedState = prevState.set('error', data).set('loading', false);

    expect(reducer(prevState, action)).toEqual(expectedState);
  });

  test('should correct process CLEAR_USER_STATE action ', () => {
    const prevState = reducerState
      .set('userID', '12345678')
      .set('email', 'test@test.test')
      .set('firstName', 'testName')
      .set('lastName', 'testLastName')
      .set('initial', 'TT')
      .set('loading', false)
      .set('error', null);

    const action: IClearUserState = {
      type: CLEAR_USER_STATE,
    };
    const expectedState = reducerState;

    expect(reducer(prevState, action)).toEqual(expectedState);
  });
});
