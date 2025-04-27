import ResultReviewCard from '../ResultReviewCard/ResultReviewCard';
import styles from './ReviewCardList.module.scss';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import { SeatingReview } from '@/types/review';

interface ReviewCardListProps {
  stadiumId: number;
  seatingId: number;
  reviews: SeatingReview[];
}

const ReviewCardList = ({ stadiumId, seatingId, reviews }: ReviewCardListProps) => {
  const router = useRouter();

  return (
    <div className={styles.reviewsContainer}>
      <div className={styles.reviewsHeader}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>상세후기</div>
          {/* TODO: reviewCount로 변경 */}
          <div className={styles.reviewNumber}>{reviews.length}</div>
        </div>
        <Button
          className={styles.moreButton}
          onClick={() => router.push(`/all/${stadiumId}/${seatingId}`)}
        >
          더보기 {'>'}
        </Button>
      </div>
      <div>
        {reviews.map((review: SeatingReview) => {
          return <ResultReviewCard key={review.reviewId} review={review} />;
        })}
      </div>
    </div>
  );
};

export default ReviewCardList;
