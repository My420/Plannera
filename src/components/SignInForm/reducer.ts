import { ISignInState, IAuthAction, IAuthField } from '../../types/signUpForm';
import { EMAIL, PASSWORD } from '../../utils/constant';
import validateEmail from '../../utils/validateEmail';
import validatePassword from '../../utils/validatePassword';

export const field: IAuthField = { value: '', isValid: false, error: '' };
export const initialState: ISignInState = {
  [EMAIL]: { ...field },
  [PASSWORD]: { ...field },
};

const reducer = (state: ISignInState, action: IAuthAction) => {
  const {
    type,
    payload: { value },
  } = action;

  const newState = (isValid: boolean, error: string): ISignInState => ({
    ...state,
    [type]: { value, isValid, error },
  });

  switch (type) {
    case EMAIL: {
      const { isValid, error } = validateEmail(value);
      return newState(isValid, error);
    }
    case PASSWORD: {
      const { isValid, error } = validatePassword(value);
      return newState(isValid, error);
    }
    default:
      return state;
  }
};

export default reducer;
