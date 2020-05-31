import React from 'react';
import StatusBar from '../StatusBar';
import useAuthRequestStatus from '../../hooks/useAuthRequestStatus';

export interface AuthRequestBarProps {}

const AuthRequestBar: React.FC<AuthRequestBarProps> = () => {
  const { isLoading, error } = useAuthRequestStatus();

  return <StatusBar isLoading={isLoading} error={error} />;
};

export default AuthRequestBar;
