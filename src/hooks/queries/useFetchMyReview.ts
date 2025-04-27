import { useQuery } from '@tanstack/react-query';
import { reviewQueries } from '@/apis/review/review.query';

export const useFetchMyStadiums = () => {
  return useQuery(reviewQueries.myReviewStadiums);
};

export const useFetchMyReview = ({
  stadiumId,
  lastReviewId,
}: {
  stadiumId: number;
  lastReviewId?: number;
}) => {
  return useQuery(reviewQueries.myReview({ stadiumId, lastReviewId }));
};

// TODO: 내 시야 후기 무한스크롤로 변경
// interface UseFetchMyReviewList {
//   myReviews: Content[];
//   isLoading: boolean;
//   status: 'error' | 'success' | 'pending';
//   isLast: boolean;
//   handlePage: () => void;
// }

// export const useFetchMyReview = (stadiumId: number): UseFetchMyReviewList => {
//   const { data, status, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
//     useInfiniteQuery({
//       queryKey: reviewKeys.all,
//       queryFn: ({ pageParam = undefined }: { pageParam: number | undefined }) =>
//         getMyReview({ stadiumId, lastReviewId: pageParam }),
//       initialPageParam: undefined,
//       getNextPageParam: (lastPage) =>
//         lastPage.reviews.hasNext ? lastPage.reviews.content.at(-1)?.reviewId : undefined,
//       networkMode: 'always',
//       retry: false,
//     });

//   const myReviews = data?.pages.flatMap((page) => page.reviews.content) || [];

//   const handlePage = () => {
//     if (hasNextPage && !isFetchingNextPage) {
//       fetchNextPage();
//     }
//   };

//   return {
//     myReviews,
//     isLoading: isFetching || isFetchingNextPage,
//     status,
//     isLast: !hasNextPage,
//     handlePage,
//   };
// };

export const useFetchMyReviewDetail = (reviewId: number) => {
  return useQuery(reviewQueries.myReviewDetail(reviewId));
};
