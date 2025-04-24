import { reviewKeys } from '../common/queryKeys';
import { getSeatingReviews } from './seating.api';

export const seatingReviewQueries = {
  seating: (seatingId: number) => ({
    queryKey: reviewKeys.seating(seatingId),
    queryFn: () => getSeatingReviews(seatingId),
  }),
};
