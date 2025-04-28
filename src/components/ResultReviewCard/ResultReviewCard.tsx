import styles from './ResultReviewCard.module.scss';
import ReviewCard from '@/components/ReviewCard';
import type { SeatingReview } from '@/types/review';

interface ResultReviewCardProps {
  review: SeatingReview;
}

const ResultReviewCard = ({ review }: ResultReviewCardProps) => {
  return (
    <ReviewCard className={styles.container}>
      <ReviewCard.Header>
        <ReviewCard.UserInfo
          profileSrc={review.writerSrc}
          userName={review.writerNickname}
          uploadTime={review.createdAt}
        />
        <ReviewCard.Bookmark reviewId={review.reviewId} isSaved={review.isBookmarked} />
      </ReviewCard.Header>

      <ReviewCard.ImageList imageSrcArray={review.images} />

      <ReviewCard.ConcertTitle concertName={review.concertName} />

      <ReviewCard.ConcertDescription contents={review.contents} />

      <div className={styles.reviewKeywordList}>
        <ReviewCard.KeywordList keywordArray={review.features} isPrimary={true} />
        <ReviewCard.KeywordList keywordArray={review.obstructions} isPrimary={false} />
      </div>

      <div className={styles.cardActions}>
        <ReviewCard.LikeButton
          reviewId={review.reviewId}
          likeNum={review.likesCount}
          isLiked={review.isLiked}
        />
      </div>
    </ReviewCard>
  );
};

export default ResultReviewCard;
