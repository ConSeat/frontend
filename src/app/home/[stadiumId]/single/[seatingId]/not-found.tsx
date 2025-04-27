'use client';

import styles from './page.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import MainBackground from '@/components/Background/MainBackground';
import Button from '@/components/Button/Button';

const ReviewNotFound = () => {
  const pathname = usePathname();
  const router = useRouter();

  const stadiumId = useMemo(() => {
    const parts = pathname.split('/');
    return parts[2] ?? '';
  }, [pathname]);

  return (
    <>
      <MainBackground />
      <div className={styles.notFoundContainer}>
        <div className={styles.notFoundWrapper}>
          <h2 className={styles.notFoundText}>앗! 결과를 찾지 못했어요😢</h2>
          <p className={styles.notFoundSubText}>다시 검색해주세요</p>
        </div>
        <Button onClick={() => router.replace(`/home/${Number(stadiumId)}/single`)}>
          다시 검색하기
        </Button>
      </div>
    </>
  );
};

export default ReviewNotFound;
