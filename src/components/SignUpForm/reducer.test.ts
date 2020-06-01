import * as fc from 'fast-check';
import { IAuthAction, IAuthField } from '../../types/signUpForm';
import {
  EMAIL, PASSWORD, CONFIRM, LAST_NAME, FIRST_NAME,
} from '../../utils/constant';
import reducer, { initialState } from './reducer';
import validateEmail from '../../utils/validateEmail';
import validatePassword from '../../utils/validatePassword';
import validateConfirmField from '../../utils/validateConfirmField';
import validateNameField from '../../utils/validateNameField';

describe('test SignUp reducer function', () => {
  type ActionType =
    | typeof EMAIL
    | typeof PASSWORD
    | typeof CONFIRM
    | typeof LAST_NAME
    | typeof FIRST_NAME;

  const ActionTypes: ActionType[] = [EMAIL, PASSWORD, CONFIRM, FIRST_NAME, LAST_NAME];

  const userInput = [fc.emailAddress(), fc.string(0, 10)];

  let state = { ...initialState };
  const validator = {
    [EMAIL]: validateEmail,
    [PASSWORD]: validatePassword,
    [CONFIRM]: validateConfirmField,
    [LAST_NAME]: validateNameField,
    [FIRST_NAME]: validateNameField,
  };

  test('should work correct', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...ActionTypes),
        fc.oneof(...userInput),
        (actionType, userValue) => {
          const action: IAuthAction = {
            type: actionType,
            payload: { value: userValue },
          };

          const newState = reducer(state, action);
          let validatorResult;
          let optionalConfirm = null;

          if (actionType === CONFIRM) {
            const currentPassword = newState[PASSWORD].value;
            validatorResult = validator[actionType](userValue, currentPassword);
          } else if (actionType === PASSWORD) {
            validatorResult = validator[actionType](userValue);
            optionalConfirm = validator[CONFIRM](state[CONFIRM].value, userValue);
          } else {
            validatorResult = validator[actionType](userValue);
          }

          const field: IAuthField = {
            value: userValue,
            ...validatorResult,
          };

          let field2: IAuthField | null = null;
          let expectedState: typeof state | null = null;

          if (optionalConfirm) {
            if (!validatorResult.isValid || (validatorResult.isValid && optionalConfirm.isValid)) {
              expectedState = { ...state, [actionType]: field };
            } else {
              field2 = {
                value: state[CONFIRM].value,
                ...optionalConfirm,
              };

              expectedState = { ...state, [actionType]: field, [CONFIRM]: field2 };
            }
          } else {
            expectedState = { ...state, [actionType]: field };
          }

          state = newState;
          expect(newState).toEqual(expectedState);

          optionalConfirm = null;
        },
      ),
    );
  });
});
