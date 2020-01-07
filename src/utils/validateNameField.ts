import { IFieldValidator } from '../types/interfaces';

export interface IValidateNameField {
  (value: string): IFieldValidator;
}

const validateNameField: IValidateNameField = (value) => {
  const tester = /[^A-Za-z0-9]+/;
  const valid = tester.test(value);
  if (valid) {
    return { isValid: false, error: 'only letters and numbers' };
  }
  const { length } = value;

  if (length < 2) {
    return { isValid: false, error: 'must be longer than 2 characters' };
  }

  if (length > 20) {
    return { isValid: false, error: 'must be less than 20 characters long' };
  }

  return { isValid: true, error: '' };
};

export default validateNameField;
