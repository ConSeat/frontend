import { useQuery } from '@tanstack/react-query';
import { stadiumQueries } from '@/apis/stadium/stadium.query';

export const useFetchStadiumList = () => {
  return useQuery(stadiumQueries.list);
};

export const useFetchStadiumConcerts = (stadiumId: number, query?: string) => {
  return useQuery(stadiumQueries.concerts(stadiumId, query));
};

export const useFetchStadiumSeats = (stadiumId: number) => {
  return useQuery(stadiumQueries.seats(stadiumId));
};

export const useFetchStadiumFeatures = () => {
  return useQuery(stadiumQueries.features);
};

export const useFetchStadiumObstructions = () => {
  return useQuery(stadiumQueries.obstructions);
};
