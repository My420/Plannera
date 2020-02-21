import {
  IUser,
  ICreateUserRequestAction,
  ICreateUserErrorAction,
  ILoadUserRequestAction,
  ILoadUserSuccessAction,
  ILoadUserErrorAction,
  IChangeUserDataRequestAction,
  IChangeUserDataSuccessAction,
  IChangeUserDataErrorAction,
  ICreateUserData,
  IChangeUserData,
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

export const createUser = (data: ICreateUserData): ICreateUserRequestAction => ({
  type: CREATE_USER_REQUEST,
  payload: data,
});

export const createUserError = (error: string): ICreateUserErrorAction => ({
  type: CREATE_USER_ERROR,
  payload: error,
});

export const loadUser = (userID: string): ILoadUserRequestAction => ({
  type: LOAD_USER_REQUEST,
  payload: { userID },
});

export const loadUserSuccess = (data: IUser): ILoadUserSuccessAction => ({
  type: LOAD_USER_SUCCESS,
  payload: data,
});

export const loadUserError = (error: string): ILoadUserErrorAction => ({
  type: LOAD_USER_ERROR,
  payload: error,
});

export const changeUserData = (data: IChangeUserData): IChangeUserDataRequestAction => ({
  type: CHANGE_USER_DATA_REQUEST,
  payload: data,
});

export const changeUserDataSuccess = (data: IUser): IChangeUserDataSuccessAction => ({
  type: CHANGE_USER_DATA_SUCCESS,
  payload: data,
});

export const changeUserDataError = (error: string): IChangeUserDataErrorAction => ({
  type: CHANGE_USER_DATA_ERROR,
  payload: error,
});

export const clearUserState = (): IClearUserState => ({
  type: CLEAR_USER_STATE,
});
