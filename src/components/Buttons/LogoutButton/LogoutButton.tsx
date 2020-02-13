import React from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import AppActions from '../../../ducks/appActionsType';
import { signOut } from '../../../ducks/auth/actionCreator';
import styles from './LogoutButton.module.scss';

export interface LogoutButtonProps {
  extensionClass?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ extensionClass, ...rest }) => {
  const dispatch = useDispatch<Dispatch<AppActions>>();
  const onButtonClick = () => dispatch(signOut());

  return (
    <button
      className={`${styles.button} ${extensionClass}`}
      type="button"
      name="logout"
      onClick={onButtonClick}
      {...rest}
    >
      Logout
    </button>
  );
};

LogoutButton.defaultProps = {
  extensionClass: '',
};

export default LogoutButton;
