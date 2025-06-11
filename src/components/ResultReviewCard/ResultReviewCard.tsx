'use client';

import styles from './ResultReviewCard.module.scss';
import { useRouter } from 'next/navigation';
import useBookMark from '@/hooks/common/useBookmark';
import useLike from '@/hooks/common/useLike';
import ReviewCard from '@/components/ReviewCard';
import type { SeatingReview } from '@/types/review';
import { gaEvent } from '@/utils/gtag';

interface ResultReviewCardProps {
  review: SeatingReview;
  queryKey: readonly (string | number)[];
}

const ResultReviewCard = ({ review, queryKey }: ResultReviewCardProps) => {
  const router = useRouter();
  const { handleClickBookMark } = useBookMark(review.isBookmarked, review.reviewId, queryKey);
  const { handleClickLike } = useLike(review.isLiked, review.reviewId, queryKey);

  const handleImageClick = (idx: number) => {
    gaEvent({
      action: '후기 카드 이미지 클릭',
      category: 'interaction',
      label: '후기 썸네일 클릭',
    });

    router.push(`${window.location.href}/${review.reviewId}?pidx=${idx}`, {
      scroll: false,
    });
  };

  return (
    <ReviewCard className={styles.container}>
      <ReviewCard.Header>
        <ReviewCard.UserInfo
          profileSrc={review.writerSrc}
          userName={review.writerNickname}
          uploadTime={review.createdAt}
        />
        <ReviewCard.Bookmark isSaved={review.isBookmarked} onClick={handleClickBookMark} />
      </ReviewCard.Header>

      <ReviewCard.ImageList>
        {review.images.map((src, idx) => (
          <ReviewCard.ImageItem key={src} imageSrc={src} onClick={() => handleImageClick(idx)} />
        ))}
      </ReviewCard.ImageList>

      <ReviewCard.ConcertTitle concertName={review.concertName} />

      <ReviewCard.ConcertDescription contents={review.contents} />

      <div className={styles.reviewKeywordList}>
        <ReviewCard.KeywordList keywordArray={review.features} isPrimary={true} />
        <ReviewCard.KeywordList keywordArray={review.obstructions} isPrimary={false} />
      </div>

      <div className={styles.cardActions}>
        <ReviewCard.LikeButton
          likeNum={review.likesCount}
          isLiked={review.isLiked}
          onClick={handleClickLike}
        />
      </div>
    </ReviewCard>
  );
};

export default ResultReviewCard;
