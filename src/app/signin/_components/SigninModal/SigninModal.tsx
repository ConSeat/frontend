'use client';

import styles from './SigninModal.module.scss';
import Image from 'next/image';
import useRouterModal from '@/hooks/useRouterModal';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import MainView from '@/components/MainView/MainView';
import Modal from '@/components/Modal';
import { PUBLIC_ENV } from '@/config/env';

const SigninModal = () => {
  const { closeModal } = useRouterModal({
    modalPath: `/signin`,
    fallbackPath: `/home`,
  });

  return (
    <Modal>
      <Modal.Content className={styles.signinLayout}>
        <MainView />

        <Modal.Header title="" onClose={() => closeModal()} />

        <Icon icon="MainLogo" />

        <div className={styles.signinContainer}>
          <div className={styles.buttonContainer}>
            <Button
              className={styles.googleButton}
              onClick={() => {
                window.open(`${PUBLIC_ENV.baseUrl}/auth/login/google`, '_self');
              }}
            >
              <Image src="/logo/google.svg" alt="구글 아이콘" width={24} height={24} />
              Google로 로그인하기
            </Button>
            <Button
              className={styles.kakaoButton}
              onClick={() => {
                window.open(`${PUBLIC_ENV.baseUrl}/auth/login/kakao`, '_self');
              }}
            >
              <Image src="/logo/kakaotalk.svg" alt="카카오톡 아이콘" width={28} height={28} />
              카카오톡 로그인하기
            </Button>
            <Button
              className={styles.xButton}
              // TODO: x 로그인 API 연동 후 주석 해제 (서버 구현 안 됨)
              // onClick={() => {
              //   window.open(`${PUBLIC_ENV.baseUrl}/auth/login/twitter`, '_self');
              // }}
            >
              <Image src="/logo/X.svg" alt="x 아이콘" width={20} height={20} />
              X로 로그인하기
            </Button>
          </div>
          <div className={styles.problemText}>로그인에 문제가 있나요?</div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default SigninModal;
