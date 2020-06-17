import React from 'react';
import HeaderButton from '../Buttons/HeaderButton';
import UserBarContainer from '../UserBarContainer';
import styles from './UserNavigation.module.scss';

export interface UserNavigationProps {}

const UserNavigation: React.FC<UserNavigationProps> = () => {
  console.log('UserNavigation render');
  return (
    <div className={styles.container}>
      <HeaderButton
        extensionClass={styles.notificationButton}
        name="notification"
        onButtonClick={() => {}}
      >
        notification
      </HeaderButton>
      <UserBarContainer />
    </div>
  );
};

export default UserNavigation;
