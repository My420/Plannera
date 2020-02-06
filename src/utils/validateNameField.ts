import { IFieldValidator, IErrorConstant } from '../types/signUpForm';

export interface IValidateNameField {
  (value: string): IFieldValidator;
}

export const ERROR: IErrorConstant = {
  NOT_VALID_SYMBOL: { isValid: false, error: 'only letters and numbers' },
  TO_SHORT: { isValid: false, error: 'must be longer than 2 characters' },
  TO_LONG: { isValid: false, error: 'must be less than 20 characters long' },
};

export const VALID_NAME_FIELD = { isValid: true, error: '' };

const validateNameField: IValidateNameField = (value) => {
  const tester = /[^A-Za-z0-9]+/;
  const valid = tester.test(value);
  if (valid) {
    return ERROR.NOT_VALID_SYMBOL;
  }
  const { length } = value;

  if (length < 2) {
    return ERROR.TO_SHORT;
  }

  if (length > 20) {
    return ERROR.TO_LONG;
  }

  return VALID_NAME_FIELD;
};

export default validateNameField;
