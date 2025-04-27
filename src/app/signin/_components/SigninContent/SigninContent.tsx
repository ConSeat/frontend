'use client';

import styles from './SigninContent.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import Spacing from '@/components/Spacing/Spacing';
import { socialLogin } from '@/apis/auth/auth.api';

const SigninContent = () => {
  const router = useRouter();

  return (
    <div className={styles.signinLayout}>
      <div className={styles.closeButton}>
        <Spacing direction="horizontal" size={36} />
        <Icon icon="Close" size={19} onClick={() => router.back()} />
      </div>

      <Icon icon="MainLogo" />

      <div className={styles.signinContainer}>
        <div className={styles.buttonContainer}>
          <Button
            className={styles.googleButton}
            onClick={() => {
              window.open(socialLogin('google'), '_self');
            }}
          >
            <Image src="/logo/google.svg" alt="구글 아이콘" width={24} height={24} />
            Google로 로그인하기
          </Button>
          <Button
            className={styles.kakaoButton}
            onClick={() => {
              window.open(socialLogin('kakao'), '_self');
            }}
          >
            <Image src="/logo/kakaotalk.svg" alt="카카오톡 아이콘" width={28} height={28} />
            카카오톡 로그인하기
          </Button>
          {/* <Button
            className={styles.xButton}
            onClick={() => {
              window.open(socialLogin('twitter'), '_self');
            }}
          >
            <Image src="/logo/X.svg" alt="x 아이콘" width={20} height={20} />
            X로 로그인하기
          </Button> */}
        </div>
        <div className={styles.problemText}>로그인에 문제가 있나요?</div>
      </div>
    </div>
  );
};

export default SigninContent;
