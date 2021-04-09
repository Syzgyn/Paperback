import React from 'react';
import LoadingIndicator from 'Components/Loading/LoadingIndicator';
import LoadingMessage from 'Components/Loading/LoadingMessage';
import styles from './LoadingPage.css';

function LoadingPage() {
  return (
    <div className={styles.page}>
      <img
        className={styles.logoFull}
        src='/storage/logo.png'
      />
      <LoadingMessage />
      <LoadingIndicator />
    </div>
  );
}

export default LoadingPage;
