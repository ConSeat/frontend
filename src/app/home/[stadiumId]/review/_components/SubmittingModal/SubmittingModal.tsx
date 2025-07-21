'use client';

import styles from './SubmittingModal.module.scss';
import MainBackground from '@/components/Background/MainBackground';
import Portal from '@/components/Portal';

interface SubmittingModalProps {
  isModalOpen: boolean;
}

const SubmittingModal = ({ isModalOpen }: SubmittingModalProps) => {
  return (
    <Portal isOpen={isModalOpen}>
      <div className={styles.submittingModalContainer}>
        <MainBackground />
        <div className={styles.submittingModalWrapper}>
          <img
            src="/logo/review-loading.gif"
            alt="후기 등록중 gif"
            loading="eager"
            className={styles.submittingModalImage}
          />
          <h2 className={styles.submittingModalText}>잠시만 기다려주세요</h2>
          <p className={styles.submittingModalSubtext}>작성해주신 소중한 후기를 등록중이에요!</p>
        </div>
      </div>
    </Portal>
  );
};

export default SubmittingModal;
