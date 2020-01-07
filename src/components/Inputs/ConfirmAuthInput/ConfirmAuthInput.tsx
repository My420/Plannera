import React from 'react';
import { CONFIRM } from '../../../utils/constant';
import AuthInput from '../AuthInput';

export interface ConfirmAuthInputProps {
  extensionContainerClass?: string;
  extensionInputClass?: string;
  value: string;
  isValid: boolean;
  error: string;
  onInputChange: (name: string, value: string) => void;
}

const ConfirmAuthInput: React.FC<ConfirmAuthInputProps> = (props) => (
  <AuthInput
    id="confirm"
    name={`${CONFIRM}`}
    type="password"
    placeholder="Confirm password"
    label="Confirm password"
    {...props}
  />
);

ConfirmAuthInput.defaultProps = {
  extensionContainerClass: '',
  extensionInputClass: '',
};

export default ConfirmAuthInput;
