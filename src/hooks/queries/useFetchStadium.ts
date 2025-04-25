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

export const useFetchStadiumSections = (stadiumId: number) => {
  return useQuery(stadiumQueries.sections(stadiumId));
};

export const useFetchStadiumSectionSeating = (seatingId: number, enabled?: boolean) => {
  const { queryKey, queryFn } = stadiumQueries.sectionSeating(seatingId);

  return useQuery({
    queryKey,
    queryFn,
    enabled,
  });
};
