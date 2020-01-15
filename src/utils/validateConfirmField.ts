import { IFieldValidator } from '../types/interfaces';

export interface IValidateConfirmField {
  (value: string, password: string): IFieldValidator;
}

export const ERROR_NOT_MATCH: IFieldValidator = {
  isValid: false,
  error: 'does not match password field',
};
export const VALID_CONFIRM: IFieldValidator = { isValid: true, error: '' };

// eslint-disable-next-line max-len
const validateConfirmField: IValidateConfirmField = (value, password) => (value === password ? VALID_CONFIRM : ERROR_NOT_MATCH);

export default validateConfirmField;
