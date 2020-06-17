import React from 'react';
import AppNavigation from '../AppNavigation';
import styles from './AppHeader.module.scss';
import UserNavigation from '../UserNavigation';

export interface AppHeaderProps {}

const AppHeader: React.FC<AppHeaderProps> = () => (
  <header className={styles.header}>
    <AppNavigation />
    <h3 className={styles.logo}>Logo</h3>
    <UserNavigation />
  </header>
);

export default AppHeader;
