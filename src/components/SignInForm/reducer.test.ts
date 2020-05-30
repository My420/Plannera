import * as fc from 'fast-check';
import { IAuthAction, IAuthField } from '../../types/signUpForm';
import { EMAIL, PASSWORD } from '../../utils/constant';
import reducer, { initialState } from './reducer';
import validateEmail from '../../utils/validateEmail';
import validatePassword from '../../utils/validatePassword';

describe('test SignIn reducer function', () => {
  type ActionType = typeof EMAIL | typeof PASSWORD;
  const ActionTypes: ActionType[] = [EMAIL, PASSWORD];

  const userInput = [fc.emailAddress(), fc.string(0, 10)];

  let state = { ...initialState };
  const validator = {
    [EMAIL]: validateEmail,
    [PASSWORD]: validatePassword,
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

          const validatorResult = validator[actionType](userValue);
          const field: IAuthField = {
            value: userValue,
            ...validatorResult,
          };
          const expectedState = { ...state, [actionType]: field };

          state = newState;
          expect(newState).toEqual(expectedState);
        },
      ),
    );
  });
});
