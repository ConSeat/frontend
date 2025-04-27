import { useQuery } from '@tanstack/react-query';
import { reviewQueries } from '@/apis/review/review.query';

export const useFetchMyStadiums = () => {
  return useQuery(reviewQueries.myReviewStadiums);
};

export const useFetchMyReview = (stadiumId: number) => {
  return useQuery(reviewQueries.myReview(stadiumId));
};

export const useFetchMyReviewDetail = (reviewId: number) => {
  return useQuery(reviewQueries.myReviewDetail(reviewId));
};
