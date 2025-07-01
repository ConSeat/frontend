'use client';

import LoadingSpinner from '../LoadingSpinner';
import styles from './MyViewCard.module.scss';
import { useQueryClient } from '@tanstack/react-query';
import { notFound, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import useBookMark from '@/hooks/common/useBookmark';
import { useFetchBookMarkDetail } from '@/hooks/queries/useFetchMember';
import Button from '@/components/Button/Button';
import ReviewCard from '@/components/ReviewCard';
import Splitter from '@/components/Splitter/Splitter';
import { memberKeys } from '@/apis/common/queryKeys';

const MyViewCard = ({ reviewId, closeModal }) => {
  const router = useRouter();
  const { data: review, isLoading } = useFetchBookMarkDetail(reviewId);
  const isBookmarked = !!review?.isBookmarked;
  const queryKey = memberKeys.bookmarkDetail(reviewId);
  const queryClient = useQueryClient();

  const { handleClickBookMark } = useBookMark(isBookmarked, reviewId, queryKey);

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({
        queryKey: memberKeys.all,
      });
    };
  }, []);

  if (isLoading) return <LoadingSpinner />;

  if (!review) {
    notFound();
  }

  return (
    <div className={styles.myViewCard}>
      <div className={styles.myViewCardScroll}>
        <ReviewCard>
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

export default MyViewCard;
