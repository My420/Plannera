import * as fc from 'fast-check';
import validateNameField, { ERROR, VALID_NAME_FIELD } from './validateNameField';

describe('test validateNameField function', () => {
  test('should return error if name contains not only letters and numbers', () => {
    const notValidSymbols: string[] = ['.', '?', ',', '>', '<', '/', '+', '-'];
    fc.assert(
      fc.property(
        fc.hexaString(1, 10),
        fc.integer(0, notValidSymbols.length - 1),
        fc.hexaString(1, 10),
        (a, b, c) => {
          const text = `${a}${notValidSymbols[b]}${c}`;
          expect(validateNameField(text)).toEqual(ERROR.NOT_VALID_SYMBOL);
        },
      ),
    );
  });

  test('should return error if name length < 2', () => {
    fc.assert(
      fc.property(fc.hexaString(0, 1), (a) => {
        expect(validateNameField(a)).toEqual(ERROR.TO_SHORT);
      }),
    );
  });

  test('should return error if name length > 20', () => {
    fc.assert(
      fc.property(fc.hexaString(21, 50), (a) => {
        expect(validateNameField(a)).toEqual(ERROR.TO_LONG);
      }),
    );
  });

  test('should return true for correct name', () => {
    fc.assert(
      fc.property(fc.hexaString(2, 20), (a) => {
        expect(validateNameField(a)).toEqual(VALID_NAME_FIELD);
      }),
    );
  });
});
