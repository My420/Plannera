import React from 'react';
import styles from './AvatarButton.module.scss';

export interface AvatarButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  initial: string;
  name: string;
  onButtonClick: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  extensionClass?: string;
}

const AvatarButton: React.FC<AvatarButtonProps> = ({
  initial,
  name,
  extensionClass,
  onButtonClick,
  ...rest
}) => (
  <button
    className={`${styles.button} ${extensionClass}`}
    type="button"
    name={name}
    onClick={onButtonClick}
    {...rest}
  >
    {initial.slice(0, 2)}
  </button>
);

AvatarButton.defaultProps = {
  extensionClass: '',
};

export default AvatarButton;
