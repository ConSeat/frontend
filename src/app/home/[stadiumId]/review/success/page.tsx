import styles from './page.module.scss';
import Link from 'next/link';
import React from 'react';
import Button from '@/components/Button/Button';

const SuccessPage = () => {
  return (
    <div className={styles.successContainer}>
      <div className={styles.successWrapper}>
        <img src="/logo/review-complete.gif" alt="gif 예시" />
        <h2 className={styles.successText}>후기 등록 성공!</h2>
        <p className={styles.successSubtext}>등록한 후기는{'\n'}마이페이지에서 확인해주세요</p>
      </div>
      <div className={styles.successBtnContainer}>
        <Link href={`/mypage/review`}>
          <Button title="홈 화면으로 가기" variant="secondary">
            마이페이지 바로가기
          </Button>
        </Link>
        <Link href={`/home`}>
          <Button title="홈 화면으로 가기">홈으로 이동</Button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
