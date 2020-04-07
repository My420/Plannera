import {
  ICreateUserData,
  ICreateUserRequestAction,
  ICreateUserErrorAction,
  ILoadUserRequestAction,
  IUser,
  ILoadUserSuccessAction,
  ILoadUserErrorAction,
  IChangeUserData,
  IChangeUserDataRequestAction,
  IChangeUserDataSuccessAction,
  IChangeUserDataErrorAction,
  IClearUserState,
} from './types';
import {
  CREATE_USER_REQUEST,
  CREATE_USER_ERROR,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_ERROR,
  CHANGE_USER_DATA_REQUEST,
  CHANGE_USER_DATA_SUCCESS,
  CHANGE_USER_DATA_ERROR,
  CLEAR_USER_STATE,
} from './constant';
import {
  createUser,
  createUserError,
  loadUser,
  loadUserSuccess,
  loadUserError,
  changeUserData,
  changeUserDataSuccess,
  changeUserDataError,
  clearUserState,
} from './actionCreator';

describe('test User ActionCreator functions', () => {
  test('test createUser actionCreator function', () => {
    const data: ICreateUserData = {
      userID: '123123',
      email: 'test@test.test',
      firstName: 'testFirstName',
      lastName: 'testLastName',
    };

    const expectedAction: ICreateUserRequestAction = {
      type: CREATE_USER_REQUEST,
      payload: data,
    };

    const action = createUser(data);
    expect(action).toEqual(expectedAction);
  });

  test('test createUserError actionCreator function', () => {
    const error: string = 'test error';

    const expectedAction: ICreateUserErrorAction = {
      type: CREATE_USER_ERROR,
      payload: error,
    };

    const action = createUserError(error);
    expect(action).toEqual(expectedAction);
  });

  test('test loadUser actionCreator function', () => {
    const userID: string = 'test error';

    const expectedAction: ILoadUserRequestAction = {
      type: LOAD_USER_REQUEST,
      payload: { userID },
    };

    const action = loadUser(userID);
    expect(action).toEqual(expectedAction);
  });

  test('test loadUserSuccess actionCreator function', () => {
    const data: IUser = {
      userID: '123123',
      email: 'test@test.test',
      firstName: 'testFirstName',
      lastName: 'testLastName',
      initial: 'TT',
    };

    const expectedAction: ILoadUserSuccessAction = {
      type: LOAD_USER_SUCCESS,
      payload: data,
    };

    const action = loadUserSuccess(data);
    expect(action).toEqual(expectedAction);
  });

  test('test loadUserError actionCreator function', () => {
    const error: string = 'test error';

    const expectedAction: ILoadUserErrorAction = {
      type: LOAD_USER_ERROR,
      payload: error,
    };

    const action = loadUserError(error);
    expect(action).toEqual(expectedAction);
  });

  test('test changeUserData actionCreator function', () => {
    const data: IChangeUserData = {
      firstName: 'testFirstName',
      lastName: 'testLastName',
    };

    const expectedAction: IChangeUserDataRequestAction = {
      type: CHANGE_USER_DATA_REQUEST,
      payload: data,
    };

    const action = changeUserData(data);
    expect(action).toEqual(expectedAction);
  });

  test('test changeUserDataSuccess actionCreator function', () => {
    const data: IUser = {
      userID: '123123',
      email: 'test@test.test',
      firstName: 'testFirstName',
      lastName: 'testLastName',
      initial: 'TT',
    };

    const expectedAction: IChangeUserDataSuccessAction = {
      type: CHANGE_USER_DATA_SUCCESS,
      payload: data,
    };

    const action = changeUserDataSuccess(data);
    expect(action).toEqual(expectedAction);
  });

  test('test changeUserDataError actionCreator function', () => {
    const error: string = 'test error';

    const expectedAction: IChangeUserDataErrorAction = {
      type: CHANGE_USER_DATA_ERROR,
      payload: error,
    };

    const action = changeUserDataError(error);
    expect(action).toEqual(expectedAction);
  });

  test('test clearUserState actionCreator function', () => {
    const expectedAction: IClearUserState = {
      type: CLEAR_USER_STATE,
    };
    const action = clearUserState();
    expect(action).toEqual(expectedAction);
  });
});
