'use client';

import LoadingSpinner from '../LoadingSpinner';
import styles from './MyReviewCard.module.scss';
import { notFound } from 'next/navigation';
import React from 'react';
import { useFetchMyReviewDetail } from '@/hooks/queries/useFetchMyReview';
import Button from '@/components/Button/Button';
import ReviewCard from '@/components/ReviewCard';
import Splitter from '@/components/Splitter/Splitter';

const MyReviewCard = ({ reviewId, closeModal }) => {
  const { data: review, isLoading } = useFetchMyReviewDetail(reviewId);

  if (isLoading) return <LoadingSpinner />;

  if (!review) {
    notFound();
  }

  return (
    <ReviewCard className={styles.myReviewCardContainer}>
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

      <ReviewCard.ConcertTitle concertName={review.concertName} />

      <ReviewCard.ConcertDescription contents={review.contents} />

      <div className={styles.reviewKeywordList}>
        <ReviewCard.KeywordList keywordArray={review.features} isPrimary={true} />
        <ReviewCard.KeywordList keywordArray={review.obstructions} isPrimary={false} />
      </div>

      <Splitter color="sub-gray6" />

      <ReviewCard.Screening status={review.status} rejectReason={review.rejectReason} />

      <Splitter color="sub-bg-black" height="12px" />

      <Button className={styles.closeButton} onClick={closeModal}>
        닫기
      </Button>
    </ReviewCard>
  );
};

export default MyReviewCard;
