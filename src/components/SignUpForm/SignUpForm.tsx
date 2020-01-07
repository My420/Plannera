import React, { useReducer } from 'react';
import { IAuthState, IAuthAction, IAuthField } from '../../types/interfaces';
import {
  EMAIL, PASSWORD, CONFIRM, FIRST_NAME, LAST_NAME,
} from '../../utils/constant';
import validateEmail from '../../utils/validateEmail';
import validatePassword from '../../utils/validatePassword';
import validateConfirmField from '../../utils/validateConfirmField';
import validateNameField from '../../utils/validateNameField';
import EmailAuthInput from '../Inputs/EmailAuthInput';
import PasswordAuthInput from '../Inputs/PasswordAuthInput';
import ConfirmAuthInput from '../Inputs/ConfirmAuthInput';
import FirstNameAuthInput from '../Inputs/FirstNameAuthInput';
import LastNameAuthInput from '../Inputs/LastNameAuthInput';
import MenuSubmitButton from '../Buttons/MenuSubmitButton';
import styles from './SignUpForm.module.scss';

const SignUpForm: React.FC = () => {
  const field: IAuthField = { value: '', isValid: false, error: '' };
  const initialState: IAuthState = {
    [EMAIL]: { ...field },
    [PASSWORD]: { ...field },
    [CONFIRM]: { ...field },
    [FIRST_NAME]: { ...field },
    [LAST_NAME]: { ...field },
  };

  const reducer = (state: IAuthState, action: IAuthAction) => {
    const {
      type,
      payload: { value },
    } = action;

    const newState = (isValid: boolean, error: string): IAuthState => ({
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

  const [state, dispatch] = useReducer(reducer, initialState);

  const setNewValue = (name: string, value: string): void => {
    const action: IAuthAction = { type: name, payload: { value } };
    dispatch(action);
  };

  const onSubmit = (evt: React.MouseEvent<HTMLButtonElement>): void => {
    evt.preventDefault();
    // eslint-disable-next-line no-console
    console.log('some AC', evt.currentTarget.dataset.name, state);
  };

  const isSubmitDisabled: boolean = !(
    state[EMAIL].isValid
    && state[PASSWORD].isValid
    && state[CONFIRM].isValid
    && state[LAST_NAME].isValid
    && state[FIRST_NAME].isValid
  );

  return (
    <form className={styles.form} name="signUpForm" action="signup.php">
      <p className={styles.title}>Create account</p>
      <fieldset className={styles.signup}>
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
        <ConfirmAuthInput
          extensionContainerClass={styles.input}
          value={state[CONFIRM].value}
          isValid={state[CONFIRM].isValid}
          error={state[CONFIRM].error}
          onInputChange={setNewValue}
        />

        <FirstNameAuthInput
          extensionContainerClass={styles.input}
          value={state[FIRST_NAME].value}
          isValid={state[FIRST_NAME].isValid}
          error={state[FIRST_NAME].error}
          onInputChange={setNewValue}
        />

        <LastNameAuthInput
          extensionContainerClass={styles.input}
          value={state[LAST_NAME].value}
          isValid={state[LAST_NAME].isValid}
          error={state[LAST_NAME].error}
          onInputChange={setNewValue}
        />
      </fieldset>
      <fieldset className={styles.controls}>
        <MenuSubmitButton
          text="Sign up"
          dataName="signUpSubmit"
          onButtonClick={onSubmit}
          disabled={isSubmitDisabled}
        />
        <a className={styles.link} href="\signin">
          Sign in
        </a>
      </fieldset>
    </form>
  );
};

export default SignUpForm;
