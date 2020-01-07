import { IFieldValidator } from '../types/interfaces';

// eslint-disable-next-line no-useless-escape
const tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
const ERROR = {
  EMPTY: 'field cannot be empty.',
  TOLONG: 'email address is too long',
  NOTMATCH: 'invalid email address',
};

const validateEmail = (email: string): IFieldValidator => {
  if (!email) return { isValid: false, error: ERROR.EMPTY };

  if (email.length > 254) return { isValid: false, error: ERROR.TOLONG };

  const valid = tester.test(email);
  if (!valid) return { isValid: false, error: ERROR.NOTMATCH };

  // Further checking of some things regex can't handle
  const parts = email.split('@');
  if (parts[0].length > 64) return { isValid: false, error: ERROR.NOTMATCH };

  const domainParts = parts[1].split('.');
  if (domainParts.some((part) => part.length > 63)) {
    return { isValid: false, error: ERROR.NOTMATCH };
  }

  return { isValid: true, error: '' };
};

export default validateEmail;
