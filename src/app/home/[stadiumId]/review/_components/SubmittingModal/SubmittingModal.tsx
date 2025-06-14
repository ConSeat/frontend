'use client';

import styles from './SubmittingModal.module.scss';
import React from 'react';
import MainBackground from '@/components/Background/MainBackground';
import Portal from '@/components/Portal';
import { ReviewLoading } from '@/assets';

interface SubmittingModalProps {
  isModalOpen: boolean;
}

const SubmittingModal = ({ isModalOpen }: SubmittingModalProps) => {
  return (
    <Portal isOpen={isModalOpen}>
      <MainBackground />
      <div className={styles.submittingModalContainer}>
        <div className={styles.submittingModalWrapper}>
          <video src={ReviewLoading} autoPlay loop muted />
          <h2 className={styles.submittingModalText}>잠시만 기다려주세요</h2>
          <p className={styles.submittingModalSubtext}>소중한 후기를 등록중이에요!</p>
        </div>
      </div>
    </Portal>
  );
};

export default SubmittingModal;
