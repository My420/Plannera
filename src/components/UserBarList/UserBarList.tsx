import React from 'react';
import styles from './UserBarList.module.scss';
import LogoutButton from '../Buttons/LogoutButton';

export interface IUserBarListProps {
  firstName: string;
  lastName: string;
  email: string;
}

const UserBarList: React.FC<IUserBarListProps> = ({ firstName, lastName, email }) => (
  <div className={styles.container}>
    <h6 className={styles.title}>User Profile</h6>
    <ul className={styles.list}>
      <li className={styles.item}>
        <span className={styles.name}>First name:</span>
        <span className={styles.value}>{firstName}</span>
      </li>
      <li className={styles.item}>
        <span className={styles.name}>Last name:</span>
        <span className={styles.value}>{lastName}</span>
      </li>
      <li className={styles.item}>
        <span className={styles.name}>Email Address:</span>
        <span className={styles.value}>{email}</span>
      </li>
      <li className={styles.item}>
        <LogoutButton />
      </li>
    </ul>
  </div>
);

export default UserBarList;
