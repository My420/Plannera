import * as fc from 'fast-check';
import validatePassword, {
  ERROR,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  VALID_PASSWORD,
} from './validatePassword';

describe('test validatePassword function', () => {
  test('should return true if password is correct', () => {
    fc.assert(
      fc.property(fc.string(PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH), (password) => {
        expect(validatePassword(password)).toEqual(VALID_PASSWORD);
      }),
    );
  });

  test(`should return error if password length < ${PASSWORD_MIN_LENGTH}`, () => {
    fc.assert(
      fc.property(fc.string(0, PASSWORD_MIN_LENGTH - 1), (password) => {
        expect(validatePassword(password)).toEqual(ERROR.TO_SHORT);
      }),
    );
  });

  test(`should return error if password length > ${PASSWORD_MAX_LENGTH}`, () => {
    fc.assert(
      fc.property(fc.string(PASSWORD_MAX_LENGTH + 1, 100), (password) => {
        expect(validatePassword(password)).toEqual(ERROR.TO_LONG);
      }),
    );
  });
});
