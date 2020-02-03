import React from 'react';
import HeaderButton from '../Buttons/HeaderButton';
import styles from './AppNavigation.module.scss';

export interface AppNavigationProps {}

const AppNavigation: React.FC<AppNavigationProps> = () => (
  <div>
    <button className={styles.homeLink} type="button">
      Home
    </button>
    <HeaderButton name="boards" onButtonClick={() => {}} extensionClass={styles.boardsButton}>
      Boards
    </HeaderButton>
  </div>
);

export default AppNavigation;
