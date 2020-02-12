import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../../../ducks/auth';
import styles from './LogoutButton.module.scss';

export interface LogoutButtonProps {
  extensionClass?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ extensionClass, ...rest }) => {
  const dispatch = useDispatch();
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
