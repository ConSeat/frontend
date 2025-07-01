'use client';

import LoadingSpinner from '../LoadingSpinner';
import styles from './MyReviewCard.module.scss';
import { notFound, useRouter } from 'next/navigation';
import React from 'react';
import { useFetchMyReviewDetail } from '@/hooks/queries/useFetchMyReview';
import Button from '@/components/Button/Button';
import ReviewCard from '@/components/ReviewCard';
import Splitter from '@/components/Splitter/Splitter';

const MyReviewCard = ({ reviewId, closeModal }) => {
  const router = useRouter();
  const { data: review, isLoading } = useFetchMyReviewDetail(reviewId);

  if (isLoading) return <LoadingSpinner />;

  if (!review) {
    notFound();
  }

  return (
    <div className={styles.myReviewCard}>
      <div className={styles.myReviewCardScroll}>
        <ReviewCard>
          <ReviewCard.Header>
            <ReviewCard.UserInfo
              profileSrc={review.writerSrc}
              userName={review.writerNickname}
              uploadTime={review.createdAt}
            />
          </ReviewCard.Header>

          <ReviewCard.ImageList>
            {review.images.map((src, index) => (
              <ReviewCard.ImageItem key={index + src} imageSrc={src} />
            ))}
          </ReviewCard.ImageList>

          <div className={styles.badgeContainer}>
            <ReviewCard.StadiumBadge stadiumName={review.stadiumName} />

            <ReviewCard.SeatingBadge
              seatingName={
                review.seatingName === 'FLOOR'
                  ? `${review.seatingName} ${review.sectionName}`
                  : `${review.sectionName} ${review.seatingName}`
              }
            />
          </div>

          <ReviewCard.ConcertTitle concertName={review.concertName} />

          <ReviewCard.ConcertDescription contents={review.contents} />

          <div className={styles.reviewKeywordList}>
            <ReviewCard.KeywordList keywordArray={review.features} isPrimary={true} />
            <ReviewCard.KeywordList keywordArray={review.obstructions} isPrimary={false} />
          </div>

          <Splitter color="sub-gray6" />

          <ReviewCard.Screening status={review.status} rejectReason={review.rejectReason} />

          <Splitter color="sub-bg-black" height="12px" />

          <div className={styles.buttonWrapper}>
            <Button
              className={styles.goToReviewButton}
              onClick={() => router.replace(`/home/${review.stadiumId}/single/${review.seatingId}`)}
            >
              후기 보러가기
            </Button>
            <Button className={styles.closeButton} onClick={closeModal}>
              닫기
            </Button>
          </div>
        </ReviewCard>
      </div>
    </div>
  );
};

export default MyReviewCard;
