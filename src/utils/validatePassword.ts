import { IFieldValidator, IErrorConstant } from '../types/signUpForm';

export interface IValidatePassword {
  (value: string): IFieldValidator;
}

export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 20;

export const ERROR: IErrorConstant = {
  TO_SHORT: { isValid: false, error: `must be longer than ${PASSWORD_MIN_LENGTH} characters` },
  TO_LONG: { isValid: false, error: `must be less than ${PASSWORD_MAX_LENGTH} characters long` },
};

export const VALID_PASSWORD = { isValid: true, error: '' };

const validatePassword: IValidatePassword = (value) => {
  if (value.length < PASSWORD_MIN_LENGTH) return ERROR.TO_SHORT;
  if (value.length > PASSWORD_MAX_LENGTH) return ERROR.TO_LONG;
  return VALID_PASSWORD;
};

export default validatePassword;
