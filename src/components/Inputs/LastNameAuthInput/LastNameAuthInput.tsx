import React from 'react';
import { LAST_NAME } from '../../../utils/constant';
import AuthInput from '../AuthInput';

export interface LastNameAuthInputProps {
  extensionContainerClass?: string;
  extensionInputClass?: string;
  value: string;
  isValid: boolean;
  error: string;
  onInputChange: (name: string, value: string) => void;
}

const LastNameAuthInput: React.FC<LastNameAuthInputProps> = (props) => (
  <AuthInput
    id="lastName"
    name={`${LAST_NAME}`}
    type="text"
    placeholder="Last name"
    label="Last name"
    {...props}
  />
);

LastNameAuthInput.defaultProps = {
  extensionContainerClass: '',
  extensionInputClass: '',
};

export default LastNameAuthInput;
