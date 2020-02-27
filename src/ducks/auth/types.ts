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

export interface IAuthData {
  userID: null | string;
  email: null | string;
}

export interface ISignUpRequestAction {
  type: typeof SIGN_UP_REQUEST;
  payload: ISignUpFormData;
}
export interface ISignUpErrorAction {
  type: typeof SIGN_UP_ERROR;
  payload: string;
}
export interface ISignInRequestAction {
  type: typeof SIGN_IN_REQUEST;
  payload: ISignInFormData;
}
export interface ISignInSuccessAction {
  type: typeof SIGN_IN_SUCCESS;
  payload: IAuthData;
}

export interface ISignInErrorAction {
  type: typeof SIGN_IN_ERROR;
  payload: string;
}
export interface ISignOutRequestAction {
  type: typeof SIGN_OUT_REQUEST;
  payload: null;
}
export interface ISignOutSuccessAction {
  type: typeof SIGN_OUT_SUCCESS;
  payload: null;
}
export interface ISignOutErrorAction {
  type: typeof SIGN_OUT_ERROR;
  payload: string;
}

export interface IAuthClearErrorAction {
  type: typeof AUTH_CLEAR_ERROR;
  payload: null;
}

export type AuthActionTypes =
  | ISignUpRequestAction
  | ISignUpErrorAction
  | ISignInRequestAction
  | ISignInSuccessAction
  | ISignInErrorAction
  | ISignOutSuccessAction
  | ISignOutRequestAction
  | ISignOutErrorAction
  | IAuthClearErrorAction;

export interface IReducerInitialState extends IAuthData {
  error: null | string;
  loading: boolean;
}

export interface IAuthChannelAction {
  uid: string | null;
  email: string | null;
}
