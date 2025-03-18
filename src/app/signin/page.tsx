'use client';

import styles from './signin.module.scss';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import { Google, KakaoTalk, LargeC, LargeClose, LargeO, LargeT, MainLogo, X } from '@/assets';

const SigninPage = () => {
  const router = useRouter();

  return (
    <div className={styles.signinLayout}>
      <header className={styles.signinHeader}>
        <Button className={styles.closeButton} onClick={() => router.back()}>
          <LargeClose />
        </Button>
      </header>
      <MainLogo />
      <div className={styles.loginContainer}>
        <div className={styles.buttonContainer}>
          <Button className={styles.googleButton}>
            <Google />
            Google로 로그인하기
          </Button>
          <Button className={styles.kakaoButton}>
            <KakaoTalk />
            카카오톡 로그인하기
          </Button>
          <Button className={styles.xButton}>
            <X /> X로 로그인하기
          </Button>
        </div>
        <div className={styles.problemText}>로그인에 문제가 있나요?</div>
      </div>

      <LargeC className={styles.svgC} width={293} height={472} />
      <LargeO className={styles.svgO} width={201} height={320} />
      <LargeT className={styles.svgT} width={200} height={320} />
    </div>
  );
};

export default SigninPage;
