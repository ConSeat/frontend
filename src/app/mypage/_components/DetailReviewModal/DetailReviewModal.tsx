'use client';

import MyReviewCard from '../MyReviewCard/MyReviewCard';
import MyViewCard from '../MyViewCard/MyViewCard';
import styles from './DetailReviewModal.module.scss';
import Modal from '@/components/Modal';

interface DetailReviewModalProps {
  reviewId: number;
  reviewType: string;
  closeModal: () => void;
}

const DetailReviewModal = ({ reviewId, reviewType, closeModal }: DetailReviewModalProps) => {
  return (
    <Modal>
      <Modal.Overlay onClick={closeModal} />
      <Modal.Content className={styles.content}>
        {reviewType === 'review' ? (
          <MyReviewCard reviewId={reviewId} closeModal={closeModal} />
        ) : (
          <MyViewCard reviewId={reviewId} closeModal={closeModal} />
        )}
      </Modal.Content>
    </Modal>
  );
};

export default DetailReviewModal;
