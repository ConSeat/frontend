'use client';

import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
import React from 'react';
import Button from '@/components/Button/Button';
import { ReviewComplete } from '@/assets';

const SuccessPage = () => {
  const router = useRouter();

  return (
    <div className={styles.successContainer}>
      <div className={styles.successWrapper}>
        <video src={ReviewComplete} autoPlay loop muted />
        <h2 className={styles.successText}>후기 등록 성공!</h2>
        <p className={styles.successSubtext}>
          등록한 후기는 마이페이지에서{'\n'}다시 확인할 수 있어요!
        </p>
      </div>
      <Button title="홈 화면으로 가기" onClick={() => router.replace('/home')}>
        홈으로 이동
      </Button>
    </div>
  );
};

export default SuccessPage;
