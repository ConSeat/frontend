'use client';

import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
import MainBackground from '@/components/Background/MainBackground';
import Button from '@/components/Button/Button';

const NotFound = () => {
  const router = useRouter();

  return (
    <>
      <MainBackground />
      <div className={styles.notFoundContainer}>
        <div className={styles.notFoundWrapper}>
          <h2 className={styles.notFoundText}>오류가 발생했어요</h2>
          <p className={styles.notFoundSubText}>
            주소가 잘못 입력되거나
            <br />
            변경 혹은 삭제되어 페이지를 찾을 수 없어요
          </p>
        </div>
        <Button onClick={() => router.replace('/home')}>홈으로 가기</Button>
      </div>
    </>
  );
};

export default NotFound;
