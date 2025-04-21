import { useQuery } from '@tanstack/react-query';
import { stadiumQueries } from '@/apis/stadium/stadium.query';

export const useFetchStadiumList = () => {
  return useQuery(stadiumQueries.list);
};
