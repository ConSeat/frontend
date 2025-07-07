'use client';

import MyReviewCard from '../MyReviewCard/MyReviewCard';
import MyViewCard from '../MyViewCard/MyViewCard';
import PhotoModal from '../PhotoModal/PhotoModal';
import styles from './DetailReviewModal.module.scss';
import { useState } from 'react';
import useStateModal from '@/hooks/common/useStateModal';
import Modal from '@/components/Modal';
import Portal from '@/components/Portal';

interface DetailReviewModalProps {
  reviewId: number;
  reviewType: string;
  closeReviewModal: () => void;
}

const DetailReviewModal = ({ reviewId, reviewType, closeReviewModal }: DetailReviewModalProps) => {
  const { isModalOpen, openModal, closeModal } = useStateModal();
  const [photoIndex, setPhotoIndex] = useState(0);

  const handleClickImage = (index: number) => {
    setPhotoIndex(index);
    openModal();
  };

  return (
    <>
      <Modal>
        <Modal.Overlay onClick={closeModal} />
        <Modal.Content className={styles.content}>
          {reviewType === 'review' ? (
            <MyReviewCard
              reviewId={reviewId}
              closeModal={closeReviewModal}
              handleClickImage={handleClickImage}
            />
          ) : (
            <MyViewCard
              reviewId={reviewId}
              closeModal={closeReviewModal}
              handleClickImage={handleClickImage}
            />
          )}
        </Modal.Content>
      </Modal>
      <Portal isOpen={isModalOpen}>
        <PhotoModal reviewId={reviewId} initialIdx={photoIndex} closeModal={closeModal} />
      </Portal>
    </>
  );
};

export default DetailReviewModal;
