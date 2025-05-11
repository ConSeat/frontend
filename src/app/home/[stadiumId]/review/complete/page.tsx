'use client';

import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
import React from 'react';
import Button from '@/components/Button/Button';

const CompletePage = () => {
  const router = useRouter();

  return (
    <div className={styles.completeContainer}>
      <div className={styles.completeWrapper}>
        <h2 className={styles.completeText}>소중한 후기 감사합니다!</h2>
        <button
          className={styles.completeLink}
          type="button"
          onClick={() => router.replace('/mypage/review')}
        >
          내 후기 바로가기 {'>'}
        </button>
      </div>
      <Button title="홈 화면으로 가기" onClick={() => router.replace('/home')}>
        후기 등록 완료
      </Button>
    </div>
  );
};

export default CompletePage;
