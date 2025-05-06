import ResultReviewCard from '../ResultReviewCard/ResultReviewCard';
import { SeatingReview } from '@/types/review';

interface ReviewCardListProps {
  stadiumId: number;
  seatingId: number;
  reviews: SeatingReview[];
  queryKey: readonly (string | number)[];
}

const ReviewCardList = ({ reviews, queryKey }: ReviewCardListProps) => {
  return (
    <>
      {reviews.map((review: SeatingReview) => {
        return <ResultReviewCard key={review.reviewId} review={review} queryKey={queryKey} />;
      })}
    </>
  );
};

export default ReviewCardList;
