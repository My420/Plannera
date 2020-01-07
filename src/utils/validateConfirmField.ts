import { IFieldValidator } from '../types/interfaces';

export interface IValidateConfirmField {
  (value: string, password: string): IFieldValidator;
}

const validateConfirmField: IValidateConfirmField = (value, password) => (value === password
  ? { isValid: true, error: '' }
  : { isValid: false, error: 'does not match password field' });

export default validateConfirmField;
