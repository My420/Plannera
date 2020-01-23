/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styles from './MenuSubmitButton.module.scss';

/* React.HTMLAttributes<HTMLButtonElement> disabled and other attr don't work */
export interface MenuSubmitButtonProps
  extends React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
  > {
  text: string;
  name: string;
  onButtonClick: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  extensionClass?: string;
}

const MenuSubmitButton: React.FC<MenuSubmitButtonProps> = ({
  text,
  name,
  extensionClass,
  onButtonClick,
  ...rest
}) => (
  <button
    className={`${styles.button} ${extensionClass}`}
    type="submit"
    name={name}
    onClick={onButtonClick}
    {...rest}
  >
    {text}
  </button>
);

MenuSubmitButton.defaultProps = {
  extensionClass: '',
};
export default MenuSubmitButton;
