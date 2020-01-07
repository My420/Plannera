import { IFieldValidator } from '../types/interfaces';

export interface IValidatePassword {
  (value: string): IFieldValidator;
}

const validatePassword: IValidatePassword = (value) => {
  if (value.length < 5) return { isValid: false, error: 'must be longer than 5 characters' };
  if (value.length > 20) return { isValid: false, error: 'must be less than 20 characters long' };
  return { isValid: true, error: '' };
};

export default validatePassword;
