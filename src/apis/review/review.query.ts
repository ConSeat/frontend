import { reviewKeys } from '../common/queryKeys';
import { getMyReview, getMyReviewStadiums } from './review.api';

export const reviewQueries = {
  myReview: (stadiumId: number) => ({
    queryKey: reviewKeys.all,
    queryFn: () => getMyReview(stadiumId),
  }),
  myReviewStadiums: {
    queryKey: reviewKeys.stadiums(),
    queryFn: getMyReviewStadiums,
  },
};
