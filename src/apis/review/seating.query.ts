import { reviewKeys } from '../common/queryKeys';
import { getAllReviewList, getSeatingReviews } from './seating.api';
import type { ReviewListQueryParams } from '@/types/review';

export const seatingReviewQueries = {
  seating: (seatingId: number) => ({
    queryKey: reviewKeys.seating(seatingId),
    queryFn: () => getSeatingReviews(seatingId),
  }),

  allReviewList: (seatingId: number, params: ReviewListQueryParams) => ({
    queryKey: reviewKeys.allReviewList(seatingId, params),
    queryFn: () => getAllReviewList(seatingId, params),
  }),
};
