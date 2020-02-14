import React from 'react';
import { useSelector } from 'react-redux';
import { getAuthStatus, getAuthError } from '../../../ducks/auth/selector';
import StatusBar from '../StatusBar';

export interface AuthRequestBarProps {}

const AuthRequestBar: React.FC<AuthRequestBarProps> = () => {
  const isLoading = useSelector(getAuthStatus);
  const error = useSelector(getAuthError);

  return <StatusBar isLoading={isLoading} error={error} />;
};

export default AuthRequestBar;
