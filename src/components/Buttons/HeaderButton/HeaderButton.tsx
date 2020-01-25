import React from 'react';
import styles from './HeaderButton.module.scss';

export interface HeaderButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  name: string;
  onButtonClick: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  extensionClass?: string;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({
  children,
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
    {children}
  </button>
);

HeaderButton.defaultProps = {
  extensionClass: '',
};

export default HeaderButton;
