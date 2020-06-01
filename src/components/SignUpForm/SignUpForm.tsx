import React, { useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { IAuthAction } from '../../types/signUpForm';
import {
  EMAIL,
  PASSWORD,
  CONFIRM,
  FIRST_NAME,
  LAST_NAME,
  SIGN_IN_PAGE,
} from '../../utils/constant';
import reducer, { initialState } from './reducer';
import { signUp, clearAuthError } from '../../ducks/auth/actionCreator';
import AppActions from '../../ducks/appActionsType';
import EmailAuthInput from '../Inputs/EmailAuthInput';
import PasswordAuthInput from '../Inputs/PasswordAuthInput';
import ConfirmAuthInput from '../Inputs/ConfirmAuthInput';
import FirstNameAuthInput from '../Inputs/FirstNameAuthInput';
import LastNameAuthInput from '../Inputs/LastNameAuthInput';
import MenuSubmitButton from '../Buttons/MenuSubmitButton';
import styles from './SignUpForm.module.scss';
import AuthRequestBar from '../RequestStatusBar/AuthRequestBar';

export interface ISignUpFormProps {}

const SignUpForm: React.FC<ISignUpFormProps> = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const reduxDispatch = useDispatch<Dispatch<AppActions>>();

  const setNewValue = (name: string, value: string): void => {
    const action: IAuthAction = { type: name, payload: { value } };
    dispatch(action);
  };

  const onSubmit = (evt: React.MouseEvent<HTMLButtonElement>): void => {
    evt.preventDefault();
    reduxDispatch(
      signUp({
        [EMAIL]: state[EMAIL].value,
        [PASSWORD]: state[PASSWORD].value,
        [FIRST_NAME]: state[FIRST_NAME].value,
        [LAST_NAME]: state[LAST_NAME].value,
      }),
    );
  };

  const clearError = (): void => {
    reduxDispatch(clearAuthError());
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
      <div className={styles.status}>
        <AuthRequestBar />
      </div>
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
          text="Continue"
          name="signUpSubmit"
          onButtonClick={onSubmit}
          disabled={isSubmitDisabled}
        />
        <Link className={styles.link} to={SIGN_IN_PAGE} onClick={clearError}>
          Sign in
        </Link>
      </fieldset>
    </form>
  );
};

export default SignUpForm;
