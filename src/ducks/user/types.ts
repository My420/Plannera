import {
  CREATE_USER_REQUEST,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_ERROR,
  CHANGE_USER_DATA_REQUEST,
  CHANGE_USER_DATA_SUCCESS,
  CHANGE_USER_DATA_ERROR,
  CREATE_USER_ERROR,
  CLEAR_USER_STATE,
} from './constant';

export interface ILoadUserPayload {
  userID: string;
}
export interface ICreateUserData {
  userID: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface IChangeUserData {
  firstName: string;
  lastName: string;
}

export interface IUser {
  userID: string;
  email: string;
  firstName: string;
  lastName: string;
  initial: string;
}

export interface ICreateUserRequestAction {
  type: typeof CREATE_USER_REQUEST;
  payload: ICreateUserData;
}
export interface ICreateUserErrorAction {
  type: typeof CREATE_USER_ERROR;
  payload: string;
}
export interface ILoadUserRequestAction {
  type: typeof LOAD_USER_REQUEST;
  payload: ILoadUserPayload;
}
export interface ILoadUserSuccessAction {
  type: typeof LOAD_USER_SUCCESS;
  payload: IUser;
}
export interface ILoadUserErrorAction {
  type: typeof LOAD_USER_ERROR;
  payload: string;
}
export interface IChangeUserDataRequestAction {
  type: typeof CHANGE_USER_DATA_REQUEST;
  payload: IChangeUserData;
}
export interface IChangeUserDataSuccessAction {
  type: typeof CHANGE_USER_DATA_SUCCESS;
  payload: IUser;
}
export interface IChangeUserDataErrorAction {
  type: typeof CHANGE_USER_DATA_ERROR;
  payload: string;
}

export interface IClearUserState {
  type: typeof CLEAR_USER_STATE;
}

export type UserActionTypes =
  | ICreateUserRequestAction
  | ICreateUserErrorAction
  | ILoadUserRequestAction
  | ILoadUserSuccessAction
  | ILoadUserErrorAction
  | IChangeUserDataRequestAction
  | IChangeUserDataSuccessAction
  | IChangeUserDataErrorAction
  | IClearUserState;

export interface IReducerInitialState {
  userID: null | string;
  email: null | string;
  firstName: null | string;
  lastName: null | string;
  initial: null | string;
  error: null | string;
  loading: boolean;
}
export interface IUserInfo {
  email: null | string;
  firstName: null | string;
  lastName: null | string;
  initial: null | string;
}

export interface IUserStatus {
  userID: null | string;
  error: null | string;
  isLoading: boolean;
}
