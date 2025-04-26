'use client';

import styles from './MyViewCard.module.scss';
import React from 'react';
import Button from '@/components/Button/Button';
import ReviewCard from '@/components/ReviewCard';
import Splitter from '@/components/Splitter/Splitter';

const MyViewCard = ({ review, closeModal }) => {
  return (
    <ReviewCard className={styles.myViewCardContainer}>
      <ReviewCard.Header>
        <ReviewCard.UserInfo
          profileSrc={review.writerSrc}
          userName={review.writerNickname}
          uploadTime={review.createdAt}
        />
        <ReviewCard.Bookmark isSaved={true} onClick={() => {}} />
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
