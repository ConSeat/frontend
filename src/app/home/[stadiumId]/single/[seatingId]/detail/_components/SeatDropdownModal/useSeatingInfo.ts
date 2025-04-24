import type { ReviewSummary } from '../ReviewDetailContainer/ReviewDetailContainer';
import { useQuery } from '@tanstack/react-query';
import { NONE_SELECT } from '@/app/home/[stadiumId]/review/_constants/info';
import { PUBLIC_ENV } from '@/config/env';

export const useSeatingInfo = (seatingId: number) => {
  return useQuery({
    queryKey: ['seatingInfo', seatingId],
    queryFn: async (): Promise<ReviewSummary> => {
      if (!seatingId) throw new Error('Invalid seatingId');
      const res = await fetch(`${PUBLIC_ENV.baseUrl}/reviews/seating/${seatingId}`);

      const data = await res.json();
      return data.body;
    },
    enabled: seatingId !== NONE_SELECT,
  });
};
