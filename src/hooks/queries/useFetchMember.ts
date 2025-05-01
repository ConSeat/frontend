import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { memberKeys } from '@/apis/common/queryKeys';
import { Content, getBookmarkReview } from '@/apis/members/member.api';
import { memberQueries } from '@/apis/members/member.query';

export const useFetchMemberInfo = () => {
  return useQuery(memberQueries.info);
};

export const useFetchBookMarkStadiums = () => {
  return useQuery(memberQueries.bookmarkStadiums);
};

export const useFetchBookMarkDetail = (reviewId: number) => {
  return useQuery(memberQueries.bookmarkDetail(reviewId));
};

export interface UseFetchBookmarkReviewList {
  data: Content[];
  isLoading: boolean;
  status: 'error' | 'success' | 'pending';
  isLast: boolean;
  handlePage: () => void;
}

export const useFetchBookMarkReviews = (stadiumId: number): UseFetchBookmarkReviewList => {
  const { data, status, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: memberKeys.bookmarks(stadiumId),
      queryFn: ({ pageParam = '' }: { pageParam: string }) =>
        getBookmarkReview({ stadiumId, lastModifiedAt: pageParam }),
      initialPageParam: '',
      getNextPageParam: (lastPage) =>
        lastPage.reviews.hasNext ? lastPage.reviews.content.at(-1)?.modifiedAt : undefined,
      retry: false,
    });

  const bookmarkReviews = data?.pages.flatMap((page) => page.reviews.content) || [];

  const handlePage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return {
    data: bookmarkReviews,
    isLoading: isFetching || isFetchingNextPage,
    status,
    isLast: !hasNextPage,
    handlePage,
  };
};
