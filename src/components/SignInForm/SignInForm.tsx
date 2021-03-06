import React, { useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { IAuthAction } from '../../types/signUpForm';
import { EMAIL, PASSWORD, SIGN_UP_PAGE } from '../../utils/constant';
import AppActions from '../../ducks/appActionsType';
import { signIn, clearAuthError } from '../../ducks/auth/actionCreator';
import reducer, { initialState } from './reducer';
import EmailAuthInput from '../Inputs/EmailAuthInput';
import PasswordAuthInput from '../Inputs/PasswordAuthInput';
import MenuSubmitButton from '../Buttons/MenuSubmitButton';
import AuthRequestBar from '../RequestStatusBar/AuthRequestBar';
import styles from './SignInForm.module.scss';

export interface ISignInFormProps {
  from: string;
}

const SignInForm: React.FC<ISignInFormProps> = ({ from }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const reduxDispatch = useDispatch<Dispatch<AppActions>>();

  const setNewValue = (name: string, value: string): void => {
    const action: IAuthAction = { type: name, payload: { value } };
    dispatch(action);
  };

  const onSubmit = (evt: React.MouseEvent<HTMLButtonElement>): void => {
    evt.preventDefault();
    reduxDispatch(
      signIn({
        [EMAIL]: state[EMAIL].value,
        [PASSWORD]: state[PASSWORD].value,
        from,
      }),
    );
  };

  const clearError = (): void => {
    reduxDispatch(clearAuthError());
  };

  const isSubmitDisabled: boolean = !(state[EMAIL].isValid && state[PASSWORD].isValid);
  return (
    <form className={styles.form} name="signInForm" action="signin.php">
      <p className={styles.title}>Sign in</p>
      <div className={styles.status}>
        <AuthRequestBar />
      </div>
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
          text="Continue"
          name="signInSubmit"
          onButtonClick={onSubmit}
          disabled={isSubmitDisabled}
        />
        <Link className={styles.link} to={SIGN_UP_PAGE} onClick={clearError}>
          Sign up
        </Link>
      </fieldset>
    </form>
  );
};

export default SignInForm;
