'use client';

import styles from './signin.module.scss';
import Image from 'next/image';
import useRouterModal from '@/hooks/useRouterModal';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import MainView from '@/components/MainView/MainView';
import Modal from '@/components/Modal';
import Spacing from '@/components/Spacing/Spacing';

const SigninPage = () => {
  const { closeModal } = useRouterModal({
    modalPath: `/signin`,
    fallbackPath: `/home`,
  });

  return (
    <Modal>
      <Modal.Content className={styles.signinLayout}>
        <MainView />

        <Modal.Header title="" onClose={() => closeModal()} />

        <Spacing size={184} />

        <Icon icon="MainLogo" />

        <Spacing size={241} />

        <div className={styles.signinContainer}>
          <div className={styles.buttonContainer}>
            <Button className={styles.googleButton}>
              <Image src="/logo/google.svg" alt="구글 아이콘" width={24} height={24} />
              Google로 로그인하기
            </Button>
            <Button className={styles.kakaoButton}>
              <Image src="/logo/kakaotalk.svg" alt="카카오톡 아이콘" width={28} height={28} />
              카카오톡 로그인하기
            </Button>
            <Button className={styles.xButton}>
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

export default SigninPage;
