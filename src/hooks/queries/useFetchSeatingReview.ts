import { useQuery } from '@tanstack/react-query';
import { seatingReviewQueries } from '@/apis/review/seating.query';

export const useFetchSeating = (seatingId: number) => {
  return useQuery(seatingReviewQueries.seating(seatingId));
};
