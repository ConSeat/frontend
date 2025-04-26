'use client';

import MyReviewCard from '../MyReviewCard/MyReviewCard';
import styles from './DetailReviewModal.module.scss';
import Modal from '@/components/Modal';

interface DetailReviewModalProps {
  reviewId: number;
  reviewStatus?: string;
  closeModal: () => void;
}

const review = {
  images: ['https://conseat.s3.ap-northeast-2.amazonaws.com/stadium/image/1.webp'],
  features: ['돌출', '돌돌출'],
  obstructions: ['펜스 방해가 있어요'],
  reviewId: 1,
  writerNickname: 'test_user1',
  writerSrc: 'https://conseat.s3.ap-northeast-2.amazonaws.com/stadium/image/1.webp',
  concertName: 'TOMORROW X TOGETHER WORLD TOUR 〈ACT : SWEET MIRAGE〉 IN SEOUL',
  contents: '테스트',
  createdAt: '9시간 전',
  status: '승인',
  rejectReason: '이유',
  isBookmarked: true,
};

const DetailReviewModal = ({ closeModal }: DetailReviewModalProps) => {
  // reviewId를 활용해 상세 리뷰 정보를 받아옵니다.

  return (
    <Modal>
      <Modal.Overlay onClick={closeModal} />
      <Modal.Content className={styles.content}>
        <MyReviewCard review={review} closeModal={closeModal} />
      </Modal.Content>
    </Modal>
  );
};

export default DetailReviewModal;
