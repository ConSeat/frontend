'use client';

import styles from './page.module.scss';
import Link from 'next/link';
import MainBackground from '@/components/Background/MainBackground';
import Button from '@/components/Button/Button';

const GlobalError = ({ error }: { error: Error & { digest?: string } }) => {
  console.error(error.message);

  return (
    <>
      <MainBackground />
      <div className={styles.notFoundContainer}>
        <div className={styles.notFoundWrapper}>
          <h2 className={styles.notFoundText}>알 수 없는 오류가 발생했어요</h2>
        </div>
        <Link href="/">
          <Button>홈으로 가기</Button>
        </Link>
      </div>
    </>
  );
};

export default GlobalError;
