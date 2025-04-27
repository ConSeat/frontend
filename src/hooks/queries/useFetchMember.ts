import { useQuery } from '@tanstack/react-query';
import { memberQueries } from '@/apis/members/member.query';

export const useFetchMemberInfo = () => {
  return useQuery(memberQueries.info);
};

export const useFetchBookMarkStadiums = () => {
  return useQuery(memberQueries.bookmarkStadiums);
};

export const useFetchBookMarkReviews = (stadiumId: number) => {
  return useQuery(memberQueries.bookmarkReviews(stadiumId));
};

export const useFetchBookMarkDetail = (reviewId: number) => {
  return useQuery(memberQueries.bookmarkDetail(reviewId));
};
