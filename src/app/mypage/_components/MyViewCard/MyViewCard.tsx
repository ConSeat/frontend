'use client';

import LoadingSpinner from '../LoadingSpinner';
import styles from './MyViewCard.module.scss';
import { notFound } from 'next/navigation';
import React from 'react';
import { useFetchBookMarkDetail } from '@/hooks/queries/useFetchMember';
import Button from '@/components/Button/Button';
import ReviewCard from '@/components/ReviewCard';
import Splitter from '@/components/Splitter/Splitter';

const MyViewCard = ({ reviewId, closeModal }) => {
  const { data: review, isLoading } = useFetchBookMarkDetail(reviewId);

  if (isLoading) return <LoadingSpinner />;

  if (!review) {
    notFound();
  }

  return (
    <ReviewCard className={styles.myViewCardContainer}>
      <ReviewCard.Header>
        <ReviewCard.UserInfo
          profileSrc={review.writerSrc}
          userName={review.writerNickname}
          uploadTime={review.createdAt}
        />
        <ReviewCard.Bookmark reviewId={review.reviewId} isSaved={true} />
      </ReviewCard.Header>

      <ReviewCard.ImageList imageSrcArray={review.images} />

      <ReviewCard.ConcertTitle concertName={review.concertName} />

      <ReviewCard.ConcertDescription contents={review.contents} />

      <div className={styles.reviewKeywordList}>
        <ReviewCard.KeywordList keywordArray={review.features} isPrimary={true} />
        <ReviewCard.KeywordList keywordArray={review.obstructions} isPrimary={false} />
      </div>

      <Splitter color="sub-bg-black" height="12px" />

      <Button className={styles.closeButton} onClick={closeModal}>
        닫기
      </Button>
    </ReviewCard>
  );
};

export default MyViewCard;
