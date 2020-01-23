import React, { useReducer } from 'react';
import { ISignInState, IAuthAction, IAuthField } from '../../types/interfaces';
import { EMAIL, PASSWORD } from '../../utils/constant';
import validateEmail from '../../utils/validateEmail';
import validatePassword from '../../utils/validatePassword';
import EmailAuthInput from '../Inputs/EmailAuthInput';
import PasswordAuthInput from '../Inputs/PasswordAuthInput';
import MenuSubmitButton from '../Buttons/MenuSubmitButton';
import styles from './SignInForm.module.scss';

const field: IAuthField = { value: '', isValid: false, error: '' };
const initialState: ISignInState = {
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

const SignInForm: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setNewValue = (name: string, value: string): void => {
    const action: IAuthAction = { type: name, payload: { value } };
    dispatch(action);
  };

  const onSubmit = (evt: React.MouseEvent<HTMLButtonElement>): void => {
    evt.preventDefault();
    // eslint-disable-next-line no-console
    console.log('some AC', evt.currentTarget.name, state);
  };

  const isSubmitDisabled: boolean = !(state[EMAIL].isValid && state[PASSWORD].isValid);
  return (
    <form className={styles.form} name="signInForm" action="signin.php">
      <p className={styles.title}>Sign in</p>
      <fieldset className={styles.signin}>
        <EmailAuthInput
          extensionContainerClass={styles.input}
          value={state[EMAIL].value}
          isValid={state[EMAIL].isValid}
          error={state[EMAIL].error}
          onInputChange={setNewValue}
        />
        <PasswordAuthInput
          extensionContainerClass={styles.input}
          value={state[PASSWORD].value}
          isValid={state[PASSWORD].isValid}
          error={state[PASSWORD].error}
          onInputChange={setNewValue}
        />
      </fieldset>
      <fieldset className={styles.controls}>
        <MenuSubmitButton
          text="Sign in"
          name="signInSubmit"
          onButtonClick={onSubmit}
          disabled={isSubmitDisabled}
        />
        <a className={styles.link} href="\signup">
          Sign up
        </a>
      </fieldset>
    </form>
  );
};

export default SignInForm;
