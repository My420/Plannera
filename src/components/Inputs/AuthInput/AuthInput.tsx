import React from 'react';
import { InputAttributeType } from '../../../types/types';
import styles from './AuthInput.module.scss';

export interface AuthInputProps extends React.HTMLAttributes<HTMLInputElement> {
  label: string;
  type: InputAttributeType;
  name: string;
  id: string;
  placeholder: string;
  extensionContainerClass?: string;
  extensionInputClass?: string;
  value: string;
  isValid: boolean;
  error: string;
  onInputChange: (name: string, value: string) => void;
}

const AuthInput: React.FC<AuthInputProps> = ({
  value,
  onInputChange,
  label,
  name,
  id,
  type,
  placeholder,
  extensionContainerClass,
  extensionInputClass,
  isValid,
  error,
  ...rest
}) => {
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value: newValue } = evt.currentTarget;
    onInputChange(inputName, newValue);
  };

  return (
    <label htmlFor={id} className={`${styles.label} ${extensionContainerClass}`}>
      <span className="visually-hidden">{label}</span>
      <span className={`${isValid ? styles.valid : styles.error}`}>
        {error}
        {' '}
      </span>
      <input
        value={value}
        id={id}
        className={`${styles.input} ${extensionInputClass}`}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        {...rest}
      />
    </label>
  );
};

AuthInput.defaultProps = {
  extensionContainerClass: '',
  extensionInputClass: '',
};

export default AuthInput;
