'use client';

import styles from './signin.module.scss';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import MainView from '@/components/MainView/MainView';

const SigninPage = () => {
  const router = useRouter();

  return (
    <>
      <MainView />

      <div className={styles.signinLayout}>
        <header className={styles.signinHeader}>
          <Button className={styles.closeButton} onClick={() => router.back()}>
            <Icon icon="LargeClose" />
          </Button>
        </header>
        <Icon icon="MainLogo" />

        <div className={styles.loginContainer}>
          <div className={styles.buttonContainer}>
            <Button className={styles.googleButton}>
              <Icon icon="Google" />
              Google로 로그인하기
            </Button>
            <Button className={styles.kakaoButton}>
              <Icon icon="KakaoTalk" />
              카카오톡 로그인하기
            </Button>
            <Button className={styles.xButton}>
              <Icon icon="X" />
              X로 로그인하기
            </Button>
          </div>
          <div className={styles.problemText}>로그인에 문제가 있나요?</div>
        </div>
      </div>
    </>
  );
};

export default SigninPage;
