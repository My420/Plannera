import fc, { ObjectConstraints } from 'fast-check';
import isUserData from './isUserData';

describe('Test isUserData function', () => {
  test('should return true if data is valid userData', () => {
    const recordModel = {
      userID: fc.string(),
      email: fc.string(),
      lastName: fc.string(),
      firstName: fc.string(),
      initial: fc.string(),
    };

    fc.assert(
      fc.property(fc.record(recordModel), (x) => {
        expect(isUserData(x)).toBeTruthy();
      }),
    );
  });

  describe('should return false if data is not valid userData', () => {
    test('should return false if values in data object is not valid', () => {
      const values = [123, 123.123, {}, [], null, undefined, true, false];
      fc.assert(
        fc.property(fc.array(fc.constantFrom(...values), 5, 5), (arr) => {
          const data = {
            userID: arr[0],
            email: arr[1],
            lastName: arr[2],
            firstName: arr[3],
            initial: arr[4],
          };
          expect(isUserData(data)).toBeFalsy();
        }),
      );
    });

    test('should return false if keys in data object is not valid', () => {
      const settings: ObjectConstraints.Settings = {
        key: fc.base64String(6, 10),
        values: [fc.string(5, 10)],
        maxKeys: 10,
      };

      fc.assert(
        fc.property(fc.object(settings), (x) => {
          expect(isUserData(x)).toBeFalsy();
        }),
      );
    });
  });
});
