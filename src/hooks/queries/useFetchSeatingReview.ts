import { useQuery } from '@tanstack/react-query';
import { seatingReviewQueries } from '@/apis/review/seating.query';
import type { ReviewListQueryParams } from '@/types/review';

export const useFetchSeating = (seatingId: number) => {
  return useQuery(seatingReviewQueries.seating(seatingId));
};

export const useFetchAllReviewList = (seatingId: number, params: ReviewListQueryParams) => {
  return useQuery(seatingReviewQueries.allReviewList(seatingId, params));
};
