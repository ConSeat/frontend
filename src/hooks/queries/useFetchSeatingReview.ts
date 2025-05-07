import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { reviewKeys } from '@/apis/common/queryKeys';
import { reviewQueries } from '@/apis/review/review.query';
import { getAllReviewList } from '@/apis/review/seating.api';
import { seatingReviewQueries } from '@/apis/review/seating.query';
import type { ReviewListQueryParams, SeatingReview } from '@/types/review';

export const useFetchSeating = (seatingId: number) => {
  return useQuery(seatingReviewQueries.seating(seatingId));
};

interface UseFetchAllReviewList {
  filteredList: SeatingReview[];
  reviewCount: number;
  isLoading: boolean;
  status: 'error' | 'success' | 'pending';
  isLast: boolean;
  handlePage: () => void;
}

export const useFetchAllReviewList = (
  seatingId: number,
  params: ReviewListQueryParams,
): UseFetchAllReviewList => {
  const { data, status, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: reviewKeys.allReviewList(seatingId, params),
      queryFn: ({ pageParam = undefined }: { pageParam: number | undefined }) =>
        getAllReviewList({
          seatingId,
          params: {
            ...params,
            lastReviewId: pageParam,
          },
        }),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) =>
        lastPage.reviews.hasNext ? lastPage.reviews.content.at(-1)?.reviewId : undefined,
    });

  const filteredList = data?.pages.flatMap((page) => page.reviews.content) || [];
  const reviewCount = data?.pages[0]?.reviewCount ?? 0;

  const handlePage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return {
    filteredList,
    reviewCount,
    isLoading: isFetching || isFetchingNextPage,
    status,
    isLast: !hasNextPage,
    handlePage,
  };
};

export const useFetchReviewImages = (reviewId: number) => {
  return useQuery(reviewQueries.reviewImages(reviewId));
};
