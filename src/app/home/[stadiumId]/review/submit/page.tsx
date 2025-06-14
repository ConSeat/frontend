'use client';

import styles from './page.module.scss';
// import { useRouter } from 'next/navigation';
import React from 'react';
import { ReviewLoading } from '@/assets';

const SuccessPage = () => {
  // const router = useRouter();

  return (
    <div className={styles.successContainer}>
      <div className={styles.successWrapper}>
        <video src={ReviewLoading} autoPlay loop muted />
        <h2 className={styles.successText}>잠시만 기다려주세요</h2>
        <p className={styles.successSubtext}>소중한 후기를 등록중이에요!</p>
      </div>
    </div>
  );
};

export default SuccessPage;
