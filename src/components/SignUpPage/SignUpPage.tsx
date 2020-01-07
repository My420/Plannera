import React from 'react';
import SignUpForm from '../SignUpForm';
import styles from './SignUpPage.module.scss';

const SignUpPage: React.FC = () => (
  <section className={styles.page}>
    <div className={styles.wrapper}>
      <h1 className={styles.title}>LOGO</h1>
      <SignUpForm />
    </div>
  </section>
);

export default SignUpPage;
