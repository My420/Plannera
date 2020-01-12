import * as fc from 'fast-check';
import validateEmail, { VALID_EMAIL, ERROR } from './validateEmail';

describe('test validateEmail function', () => {
  test('should return true if email is valid', () => {
    fc.assert(
      fc.property(fc.emailAddress(), (email) => {
        expect(validateEmail(email)).toEqual(VALID_EMAIL);
      }),
    );
  });

  test('should return error if email field is empty', () => {
    expect(validateEmail('')).toEqual(ERROR.EMPTY);
  });

  test('should return error if email is to long', () => {
    fc.assert(
      fc.property(fc.string(255, 256), (email) => {
        expect(validateEmail(email)).toEqual(ERROR.TO_LONG);
      }),
    );
  });
});
