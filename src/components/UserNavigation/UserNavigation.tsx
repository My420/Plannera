import React from 'react';
import HeaderButton from '../Buttons/HeaderButton';
import styles from './UserNavigation.module.scss';

export interface UserNavigationProps {}

const UserNavigation: React.FC<UserNavigationProps> = () => (
  <div>
    <HeaderButton
      extensionClass={styles.notificationButton}
      name="notification"
      onButtonClick={() => {}}
    >
      notification
    </HeaderButton>
    <HeaderButton name="user" onButtonClick={() => {}}>
      user
    </HeaderButton>
  </div>
);

export default UserNavigation;
