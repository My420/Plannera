import * as fc from 'fast-check';
import validateConfirmField, { VALID_CONFIRM, ERROR_NOT_MATCH } from './validateConfirmField';

describe('test validateConfirmField function', () => {
  test('should return true if password match confirm field', () => {
    fc.assert(
      fc.property(fc.string(5, 20), (password) => {
        expect(validateConfirmField(password, password)).toEqual(VALID_CONFIRM);
      }),
    );
  });

  test('should return error if password do not match confirm field', () => {
    fc.assert(
      fc.property(fc.string(5, 20), fc.string(1, 20), (a, b) => {
        expect(validateConfirmField(a, a + b)).toEqual(ERROR_NOT_MATCH);
        expect(validateConfirmField(a + b, a)).toEqual(ERROR_NOT_MATCH);
      }),
    );
  });
});
