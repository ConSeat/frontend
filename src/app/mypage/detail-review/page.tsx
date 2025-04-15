'use client';

import ReviewStatus from '../_components/ReviewStatus';
import styles from './detailReview.module.scss';
import { usePathname, useSearchParams } from 'next/navigation';
import useRouterModal from '@/hooks/useRouterModal';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal';
import ReviewCard from '@/components/ReviewCard';
import { VIEW_TAP } from '@/constants/myPage';

const ReviewDetailModal = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { closeModal } = useRouterModal({
    modalPath: pathname,
    fallbackPath: `/mypage?tab=${VIEW_TAP}`,
  });
  const reviewStatus = searchParams.get('status');

  return (
    <Modal>
      <Modal.Overlay onClick={() => {}} />
      <Modal.Content>
        <Modal.Header title="" onClose={closeModal} />
        <div className={styles.reviewContainer}>
          <div className={styles.reviewDetail}>
            <ReviewCard
              imageSrcArray={[
                '/images/kspo-dome.jpg',
                '/images/kspo-dome.jpg',
                '/images/kspo-dome.jpg',
              ]}
              features={['돌돌출']}
              obstructions={['팬스방해가 있어요', '단차가 심해요']}
              concertName={'2025 SVT 9TH FAN MEETING 〈SEVEN TEEN in CARAT LAND〉'}
              reviewDescription={
                '본무대 안쪽에서 하는 무대는 잘 안보임. 근데 본무대랑 돌출 다 잘보여서 좋았음. 펜스 시야방해가 조금 있기는 한데 그래도 저는 괜찮았던 것 같아요. 제트플립 기준 0배로 확대한 사진입니다.'
              }
              profileSrc={'/logo/google.svg'}
              uploadTime={'2주전'}
              userName={'호빵맨'}
              likeNumber={0}
              isSaved={false}
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

export default ReviewDetailModal;
