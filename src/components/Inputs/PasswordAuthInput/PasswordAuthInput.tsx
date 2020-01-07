import React from 'react';
import { PASSWORD } from '../../../utils/constant';
import AuthInput from '../AuthInput';

export interface PasswordAuthInputProps {
  extensionContainerClass?: string;
  extensionInputClass?: string;
  value: string;
  isValid: boolean;
  error: string;
  onInputChange: (name: string, value: string) => void;
}

const PasswordAuthInput: React.FC<PasswordAuthInputProps> = (props) => (
  <AuthInput
    id="password"
    name={`${PASSWORD}`}
    type="password"
    placeholder="Password"
    label="Password"
    {...props}
  />
);

PasswordAuthInput.defaultProps = {
  extensionContainerClass: '',
  extensionInputClass: '',
};

export default PasswordAuthInput;
