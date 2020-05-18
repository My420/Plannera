import * as fc from 'fast-check';
import isString from './isString';

describe('Test isString function', () => {
  test('should return true if value is string', () => {
    fc.assert(
      fc.property(fc.string(), (x) => {
        expect(isString(x)).toBeTruthy();
      }),
    );
  });

  test('should return false if value is not string', () => {
    const values = [1, {}, [], true, null, undefined, false, 2.22];
    fc.assert(
      fc.property(fc.constantFrom(...values), (x) => {
        expect(isString(x)).toBeFalsy();
      }),
    );
  });
});
