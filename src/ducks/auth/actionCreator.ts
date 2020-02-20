import { ISignUpFormData, ISignInFormData } from '../../types/signUpForm';
import {
  ISignUpRequestAction,
  ISignUpErrorAction,
  ISignInRequestAction,
  ISignInSuccessAction,
  ISignInErrorAction,
  ISignOutRequestAction,
  ISignOutSuccessAction,
  ISignOutErrorAction,
  IAuthData,
} from './types';
import {
  SIGN_UP_REQUEST,
  SIGN_UP_ERROR,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_ERROR,
} from './constant';

export const signUp = (data: ISignUpFormData): ISignUpRequestAction => ({
  type: SIGN_UP_REQUEST,
  payload: data,
});

export const signUpError = (error: string): ISignUpErrorAction => ({
  type: SIGN_UP_ERROR,
  payload: error,
});

export const signIn = (data: ISignInFormData): ISignInRequestAction => ({
  type: SIGN_IN_REQUEST,
  payload: data,
});

export const signInSuccess = (data: IAuthData): ISignInSuccessAction => ({
  type: SIGN_IN_SUCCESS,
  payload: data,
});

export const signInError = (error: string): ISignInErrorAction => ({
  type: SIGN_IN_ERROR,
  payload: error,
});

export const signOut = (): ISignOutRequestAction => ({
  type: SIGN_OUT_REQUEST,
  payload: null,
});

export const signOutSuccess = (): ISignOutSuccessAction => ({
  type: SIGN_OUT_SUCCESS,
  payload: null,
});

export const signOutError = (error: string): ISignOutErrorAction => ({
  type: SIGN_OUT_ERROR,
  payload: error,
});
