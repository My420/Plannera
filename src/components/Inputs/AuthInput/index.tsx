import React from 'react';
import AuthInput, { AuthInputProps } from './AuthInput';

const areEqual = (prevProps: AuthInputProps, nextProps: AuthInputProps) => {
  const { value: prevValue, isValid: prevIsValid, error: prevError } = prevProps;
  const { value: nextValue, isValid: nextIsValid, error: nextError } = nextProps;
  return prevValue === nextValue && prevIsValid === nextIsValid && prevError === nextError;
};

export default React.memo(AuthInput, areEqual);
