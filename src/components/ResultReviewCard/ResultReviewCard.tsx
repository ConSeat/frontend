'use client';

import styles from './ResultReviewCard.module.scss';
import { useRouter } from 'next/navigation';
import useBookMark from '@/hooks/common/useBookmark';
import useLike from '@/hooks/common/useLike';
import ReviewCard from '@/components/ReviewCard';
import type { SeatingReview } from '@/types/review';

interface ResultReviewCardProps {
  review: SeatingReview;
  queryKey: readonly (string | number)[];
}

const ResultReviewCard = ({ review, queryKey }: ResultReviewCardProps) => {
  const router = useRouter();
  const { handleClickBookMark } = useBookMark(review.isBookmarked, review.reviewId, queryKey);
  const { handleClickLike } = useLike(review.isLiked, review.reviewId, queryKey);

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
          <ReviewCard.ImageItem
            key={src}
            imageSrc={src}
            onClick={() => {
              router.push(`${window.location.href}/${review.reviewId}?pidx=${idx}`);
            }}
          />
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
