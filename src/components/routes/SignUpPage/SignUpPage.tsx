import React from 'react';
import { APP_NAME } from '../../../utils/constant';
import SignUpForm from '../../SignUpForm';
import styles from './SignUpPage.module.scss';
import Logo from '../../Logo';

const SignUpPage: React.FC = () => (
  <section className={styles.page}>
    <div className={styles.wrapper}>
      <h1 className="visually-hidden">{`${APP_NAME} sign up page`}</h1>
      <Logo wrapperClass={styles.logo} />
      <h2 className={styles.appName}>{`${APP_NAME}`}</h2>
      <SignUpForm />
    </div>
  </section>
);

export default SignUpPage;
