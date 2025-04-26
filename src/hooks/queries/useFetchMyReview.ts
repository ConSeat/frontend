import { useQuery } from '@tanstack/react-query';
import { reviewQueries } from '@/apis/review/review.query';

export const useFetchMyStadiums = () => {
  return useQuery(reviewQueries.myReview);
};
