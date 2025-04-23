'use client';

import ReviewStatus from '../../_components/ReviewStatus';
import styles from './detailReview.module.scss';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal';
import ReviewCard from '@/components/ReviewCard';

interface DetailReviewModalProps {
  reviewId: number;
  reviewStatus?: string;
  closeModal: () => void;
}

const DetailReviewModal = ({ reviewStatus, closeModal }: DetailReviewModalProps) => {
  // reviewId를 활용해 상세 리뷰 정보를 받아옵니다.

  return (
    <Modal>
      <Modal.Overlay onClick={() => {}} />
      <Modal.Content>
        <Modal.Header title="" onClose={closeModal} />
        <div className={styles.reviewContainer}>
          <div className={styles.reviewDetail}>
            <ReviewCard
              images={['/images/kspo-dome.jpg', '/images/kspo-dome.jpg', '/images/kspo-dome.jpg']}
              features={['돌돌출']}
              obstructions={['팬스방해가 있어요', '단차가 심해요']}
              concertName={'2025 SVT 9TH FAN MEETING 〈SEVEN TEEN in CARAT LAND〉'}
              contents={
                '본무대 안쪽에서 하는 무대는 잘 안보임. 근데 본무대랑 돌출 다 잘보여서 좋았음. 펜스 시야방해가 조금 있기는 한데 그래도 저는 괜찮았던 것 같아요. 제트플립 기준 0배로 확대한 사진입니다.'
              }
              writerSrc={'/logo/google.svg'}
              createdAt={'2주전'}
              writerNickname={'호빵맨'}
              likesCount={0}
              isBookmarked={false}
              isLiked={false}
              handleClickMore={() => {}}
              handleClickLike={() => {}}
              handleClickBookmark={() => {}}
            />
            {reviewStatus && (
              <ReviewStatus
                status={reviewStatus}
                description={'후기에 욕설 및 비방 내용이 포함되어있습니다.'}
              />
            )}
            <Button variant="secondary" onClick={closeModal}>
              닫기
            </Button>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default DetailReviewModal;
