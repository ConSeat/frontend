import styles from './page.module.scss';
import Link from 'next/link';
import React from 'react';
import Button from '@/components/Button/Button';

const ErrorPage = async ({ params }) => {
  const { stadiumId } = await params;

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorWrapper}>
        <h2 className={styles.errorText}>앗! 후기 등록을 실패했어요 😭</h2>
        <p className={styles.errorSubtext}>후기 등록을 다시 시도해주세요</p>
      </div>
      <Link href={`/home/${stadiumId}/review`}>
        <Button title="다시 시도하기">다시 시도하기</Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
