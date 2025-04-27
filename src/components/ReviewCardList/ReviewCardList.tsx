import ResultReviewCard from '../ResultReviewCard/ResultReviewCard';
import { SeatingReview } from '@/types/review';

interface ReviewCardListProps {
  stadiumId: number;
  seatingId: number;
  reviews: SeatingReview[];
}

const ReviewCardList = ({ reviews }: ReviewCardListProps) => {
  return (
    <>
      {reviews.map((review: SeatingReview) => {
        return <ResultReviewCard key={review.reviewId} review={review} />;
      })}
    </>
  );
};

export default ReviewCardList;
