import { reviewKeys } from '../common/queryKeys';
import { getMyReview, getMyReviewDetail, getMyReviewStadiums } from './review.api';

export const reviewQueries = {
  myReview: ({ stadiumId, lastReviewId }) => ({
    queryKey: reviewKeys.all,
    queryFn: () => getMyReview({ stadiumId, lastReviewId }),
  }),
  myReviewStadiums: {
    queryKey: reviewKeys.stadiums(),
    queryFn: getMyReviewStadiums,
  },
  myReviewDetail: (reviewId: number) => ({
    queryKey: reviewKeys.detail(reviewId),
    queryFn: () => getMyReviewDetail(reviewId),
  }),
};
