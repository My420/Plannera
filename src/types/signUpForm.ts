import {
  EMAIL, PASSWORD, CONFIRM, LAST_NAME, FIRST_NAME,
} from '../utils/constant';

export interface ISignUpFormData {
  [EMAIL]: string;
  [PASSWORD]: string;
  [FIRST_NAME]: string;
  [LAST_NAME]: string;
}

export interface ISignInFormData {
  [EMAIL]: string;
  [PASSWORD]: string;
  from: string;
}

export interface ISignUpState {
  [EMAIL]: IAuthField;
  [PASSWORD]: IAuthField;
  [CONFIRM]: IAuthField;
  [FIRST_NAME]: IAuthField;
  [LAST_NAME]: IAuthField;
}

export interface ISignInState {
  [EMAIL]: IAuthField;
  [PASSWORD]: IAuthField;
}

export interface IAuthField {
  value: string;
  isValid: boolean;
  error: string;
}

export interface IAuthPayload {
  value: string;
}

export interface IAuthAction {
  type: string;
  payload: IAuthPayload;
}

export interface IFieldValidator {
  isValid: boolean;
  error: string;
}
export interface IErrorConstant {
  [key: string]: IFieldValidator;
}
