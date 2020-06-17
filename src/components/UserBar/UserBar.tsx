import React, { useCallback } from 'react';
import { IUserInfo } from '../../types/user';
import AvatarButton from '../Buttons/AvatarButton';
import UserBarList from '../UserBarList';
import useToggle from '../hooks/useToggle';
import styles from './UserBar.module.scss';

export interface IUserBarProps {
  data: IUserInfo;
}

const UserBar: React.FC<IUserBarProps> = ({ data }) => {
  const [isBarOpen, toggleBar] = useToggle();

  const onAvatarClick = useCallback(() => toggleBar(), [toggleBar]);

  const firstName = data.firstName || '--';
  const lastName = data.lastName || '--';
  const email = data.email || '--';
  const initial = data.initial || '--';

  return (
    <div className={styles.container}>
      <AvatarButton initial={initial} name="user" onButtonClick={onAvatarClick} />
      {isBarOpen && <UserBarList firstName={firstName} lastName={lastName} email={email} />}
    </div>
  );
};

export default UserBar;
