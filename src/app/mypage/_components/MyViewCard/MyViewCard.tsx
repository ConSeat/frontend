'use client';

import LoadingSpinner from '../LoadingSpinner';
import styles from './MyViewCard.module.scss';
import { notFound } from 'next/navigation';
import React from 'react';
import useBookMark from '@/hooks/common/useBookmark';
import { useFetchBookMarkDetail } from '@/hooks/queries/useFetchMember';
import Button from '@/components/Button/Button';
import ReviewCard from '@/components/ReviewCard';
import Splitter from '@/components/Splitter/Splitter';
import { memberKeys } from '@/apis/common/queryKeys';

const MyViewCard = ({ reviewId, closeModal }) => {
  const { data: review, isLoading } = useFetchBookMarkDetail(reviewId);
  const isBookmarked = !!review?.isBookmarked;
  const queryKey = memberKeys.bookmarkDetail(reviewId);

  const { handleClickBookMark } = useBookMark(isBookmarked, reviewId, queryKey);

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
        <ReviewCard.Bookmark isSaved={review.isBookmarked} onClick={handleClickBookMark} />
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

      <Splitter color="sub-bg-black" height="12px" />

      <Button className={styles.closeButton} onClick={closeModal}>
        닫기
      </Button>
    </ReviewCard>
  );
};

export default MyViewCard;
