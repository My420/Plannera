import { IAuthField, ISignUpState, IAuthAction } from '../../types/signUpForm';
import {
  EMAIL, PASSWORD, CONFIRM, FIRST_NAME, LAST_NAME,
} from '../../utils/constant';
import validateEmail from '../../utils/validateEmail';
import validatePassword from '../../utils/validatePassword';
import validateConfirmField from '../../utils/validateConfirmField';
import validateNameField from '../../utils/validateNameField';

export const field: IAuthField = { value: '', isValid: false, error: '' };
export const initialState: ISignUpState = {
  [EMAIL]: { ...field },
  [PASSWORD]: { ...field },
  [CONFIRM]: { ...field },
  [FIRST_NAME]: { ...field },
  [LAST_NAME]: { ...field },
};

const reducer = (state: ISignUpState, action: IAuthAction) => {
  const {
    type,
    payload: { value },
  } = action;

  const newState = (isValid: boolean, error: string): ISignUpState => ({
    ...state,
    [type]: { value, isValid, error },
  });

  switch (type) {
    case EMAIL: {
      const { isValid, error } = validateEmail(value);
      return newState(isValid, error);
    }
    case PASSWORD: {
      const passwordStatus = validatePassword(value);
      const confirmStatus = validateConfirmField(state[CONFIRM].value, value);
      if (!passwordStatus.isValid || (passwordStatus.isValid && confirmStatus.isValid)) {
        return newState(passwordStatus.isValid, passwordStatus.error);
      }
      return {
        ...newState(passwordStatus.isValid, passwordStatus.error),
        [CONFIRM]: { ...state[CONFIRM], ...confirmStatus },
      };
    }
    case CONFIRM: {
      const { isValid, error } = validateConfirmField(value, state[PASSWORD].value);
      return newState(isValid, error);
    }
    case FIRST_NAME: {
      const { isValid, error } = validateNameField(value);
      return newState(isValid, error);
    }
    case LAST_NAME: {
      const { isValid, error } = validateNameField(value);
      return newState(isValid, error);
    }
    default:
      return state;
  }
};

export default reducer;
