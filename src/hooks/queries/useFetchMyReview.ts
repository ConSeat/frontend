import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { reviewKeys } from '@/apis/common/queryKeys';
import { Content, getMyReview } from '@/apis/review/review.api';
import { reviewQueries } from '@/apis/review/review.query';

export const useFetchMyStadiums = () => {
  return useQuery(reviewQueries.myReviewStadiums);
};

export interface UseFetchMyReviewList {
  data: Content[];
  isLoading: boolean;
  status: 'error' | 'success' | 'pending';
  isLast: boolean;
  handlePage: () => void;
}

export const useFetchMyReview = (stadiumId: number): UseFetchMyReviewList => {
  const { data, status, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: reviewKeys.mine(),
      queryFn: ({ pageParam = undefined }: { pageParam: number | undefined }) =>
        getMyReview({ stadiumId, lastReviewId: pageParam }),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) =>
        lastPage.reviews.hasNext ? lastPage.reviews.content.at(-1)?.reviewId : undefined,
      retry: false,
    });

  const reviews = data?.pages.flatMap((page) => page.reviews.content) || [];

  const handlePage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return {
    data: reviews,
    isLoading: isFetching || isFetchingNextPage,
    status,
    isLast: !hasNextPage,
    handlePage,
  };
};

export const useFetchMyReviewDetail = (reviewId: number) => {
  return useQuery(reviewQueries.myReviewDetail(reviewId));
};
