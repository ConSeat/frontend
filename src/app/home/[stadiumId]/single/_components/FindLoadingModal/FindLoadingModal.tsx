'use client';

import loading from '../../../../../../../public/lottie/loading.json';
import styles from './FindLoadingModal.module.scss';
import dynamic from 'next/dynamic';
import Modal from '@/components/Modal';
import Portal from '@/components/Portal';

const Lottie = dynamic(() => import('react-lottie-player'), {
  ssr: false,
});

const FindLoadingModal = ({ isModalOpen }) => {
  return (
    <Portal isOpen={isModalOpen}>
      <Modal>
        <Modal.Overlay onClick={() => {}} className={styles.overlay} />
        <Modal.Content className={styles.content}>
          <Lottie className={styles.spinner} loop animationData={loading} play></Lottie>
          <h2 className={styles.findLoadingModalText}>시야 후기를 찾고 있어요</h2>
          <p className={styles.findLoadingModalSubtext}>잠시만 기다려주세요...</p>
        </Modal.Content>
      </Modal>
    </Portal>
  );
};

export default FindLoadingModal;
