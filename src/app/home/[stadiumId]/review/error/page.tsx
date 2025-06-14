'use client';

import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
import React from 'react';
import Button from '@/components/Button/Button';

const ErrorPage = () => {
  const router = useRouter();

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorWrapper}>
        <h2 className={styles.errorText}>앗! 후기 등록을 실패했어요 😭</h2>
        <p className={styles.errorSubtext}>후기 등록을 다시 시도해주세요</p>
      </div>
      <Button title="다시 시도하기" onClick={() => router.replace('/home')}>
        다시 시도하기
      </Button>
    </div>
  );
};

export default ErrorPage;
