import * as fc from 'fast-check';
import isObject from './isObject';

describe('Test isObject function', () => {
  test('should return true if value is object', () => {
    fc.assert(
      fc.property(fc.object(), (x) => {
        expect(isObject(x)).toBeTruthy();
      }),
    );
  });

  test('should return false if value is not object', () => {
    const values = [1, true, null, undefined, false, 2.22, 'test', [1, 2, 3]];
    fc.assert(
      fc.property(fc.constantFrom(...values), (x) => {
        expect(isObject(x)).toBeFalsy();
      }),
    );
  });
});
