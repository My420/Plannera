import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { APP_NAME } from '../../../utils/constant';
import SignInForm from '../../SignInForm';
import Logo from '../../Logo';
import styles from './SignInPage.module.scss';

const SignInPage: React.FC<RouteComponentProps> = ({ location }) => {
  const { from } = (location.state as any) || { from: { pathname: '/' } };

  return (
    <section className={styles.page}>
      <div className={styles.wrapper}>
        <h1 className="visually-hidden">{`${APP_NAME} sign in page`}</h1>
        <Logo wrapperClass={styles.logo} />
        <h2 className={styles.appName}>{`${APP_NAME}`}</h2>
        <SignInForm from={from} />
      </div>
    </section>
  );
};

export default SignInPage;
