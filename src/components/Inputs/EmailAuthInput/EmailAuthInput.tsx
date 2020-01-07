import React from 'react';
import { EMAIL } from '../../../utils/constant';
import AuthInput from '../AuthInput';

export interface EmailAuthInputProps {
  extensionContainerClass?: string;
  extensionInputClass?: string;
  value: string;
  isValid: boolean;
  error: string;
  onInputChange: (name: string, value: string) => void;
}

const EmailAuthInput: React.FC<EmailAuthInputProps> = (props) => (
  <AuthInput
    id="email"
    name={`${EMAIL}`}
    type="email"
    placeholder="Email"
    label="Email"
    {...props}
  />
);

EmailAuthInput.defaultProps = {
  extensionContainerClass: '',
  extensionInputClass: '',
};

export default EmailAuthInput;
