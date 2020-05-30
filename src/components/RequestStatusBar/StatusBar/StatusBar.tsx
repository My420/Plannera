import React from 'react';
import styles from './StatusBar.module.scss';
import Loader from '../../common/Loader';

export interface StatusBarProps {
  isLoading: boolean;
  error: null | string;
}

const StatusBar: React.FC<StatusBarProps> = ({ isLoading, error }) => (
  <div className={styles.container} data-testid="container">
    {isLoading && <Loader extWrapperClass={styles.loader} />}
    {error && <p className={styles.error}>{error}</p>}
  </div>
);

export default StatusBar;
