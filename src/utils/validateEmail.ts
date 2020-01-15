import { IFieldValidator, IErrorConstant } from '../types/interfaces';

// eslint-disable-next-line no-useless-escape
const tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

export const ERROR: IErrorConstant = {
  EMPTY: { isValid: false, error: 'field cannot be empty.' },
  TO_LONG: { isValid: false, error: 'email address is too long' },
  NOT_VALID: { isValid: false, error: 'invalid email address' },
};

export const VALID_EMAIL = { isValid: true, error: '' };

const validateEmail = (email: string): IFieldValidator => {
  if (!email) return ERROR.EMPTY;

  if (email.length > 254) return ERROR.TO_LONG;

  const valid = tester.test(email);
  if (!valid) return ERROR.NOT_VALID;

  // Further checking of some things regex can't handle
  const parts = email.split('@');
  if (parts[0].length > 64) return ERROR.NOT_VALID;

  const domainParts = parts[1].split('.');
  if (domainParts.some((part) => part.length > 63)) {
    return ERROR.NOT_VALID;
  }

  return VALID_EMAIL;
};

export default validateEmail;
