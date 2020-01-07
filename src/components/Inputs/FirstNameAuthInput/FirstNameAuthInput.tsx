import React from 'react';
import { FIRST_NAME } from '../../../utils/constant';
import AuthInput from '../AuthInput/AuthInput';

export interface FirstNameAuthInputProps {
  extensionContainerClass?: string;
  extensionInputClass?: string;
  value: string;
  isValid: boolean;
  error: string;
  onInputChange: (name: string, value: string) => void;
}

const FirstNameAuthInput: React.FC<FirstNameAuthInputProps> = (props) => (
  <AuthInput
    id="firstName"
    name={`${FIRST_NAME}`}
    type="text"
    placeholder="First name"
    label="First name"
    {...props}
  />
);

FirstNameAuthInput.defaultProps = {
  extensionContainerClass: '',
  extensionInputClass: '',
};

export default FirstNameAuthInput;
