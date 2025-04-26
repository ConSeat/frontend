import { reviewKeys } from '../common/queryKeys';
import { getMyReviewStadiums } from './review.api';

export const reviewQueries = {
  myReview: {
    queryKey: reviewKeys.stadiums(),
    queryFn: getMyReviewStadiums,
  },
};
