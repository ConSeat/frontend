import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { MyBookmarkDetailResponse } from '@/apis/members/member.api';
import { deleteBookMark, postBookMark } from '@/apis/review/review.api';
import { AllReviewListResponse, SeatingReviews } from '@/apis/review/seating.api';

type reviewDataTypes =
  | InfiniteData<AllReviewListResponse, unknown>
  | SeatingReviews
  | MyBookmarkDetailResponse;

const getNextInfiniteData = (
  data: InfiniteData<AllReviewListResponse, unknown>,
  reviewId: number,
) => {
  const { pages } = data;

  const nextPages = pages.map((page) => {
    const nextContent = page.reviews.content.map((content) => {
      if (reviewId !== content.reviewId) return content;

      return {
        ...content,
        isBookmarked: !content.isBookmarked,
      };
    });

    return {
      ...page,
      reviews: {
        ...page.reviews,
        content: nextContent,
      },
    };
  });

  return { ...data, pages: nextPages };
};

const getNextSeatingReviews = (data: SeatingReviews, reviewId: number) => {
  const prevReviews = data.reviews;

  const nextReviews = prevReviews.map((elem) => {
    if (elem.reviewId !== reviewId) return elem;
    else return { ...elem, isBookmarked: !elem.isBookmarked };
  });

  return {
    ...data,
    reviews: nextReviews,
  };
};

const getNextMyBookmarkDetail = (data: MyBookmarkDetailResponse) => {
  return {
    ...data,
    isBookmarked: !data.isBookmarked,
  };
};

const getNextData = (data: reviewDataTypes, reviewId: number) => {
  let nextData = {};

  if ('pages' in data) {
    nextData = getNextInfiniteData(data, reviewId);
  } else if ('reviews' in data) {
    nextData = getNextSeatingReviews(data, reviewId);
  } else {
    nextData = getNextMyBookmarkDetail(data);
  }

  return nextData;
};

const useMutateBookmark = (reviewId: number, queryKey: readonly (string | number)[]) => {
  const queryClient = useQueryClient();

  const postBookmarkMutation = useMutation({
    mutationFn: () => postBookMark(reviewId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<reviewDataTypes>(queryKey);

      queryClient.setQueryData(queryKey, (old: reviewDataTypes) => {
        if (!old) return old;
        const nextData = getNextData(old, reviewId);

        return nextData;
      });

      return { previousData };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
  });

  const deleteBookmarkMutation = useMutation({
    mutationFn: () => deleteBookMark(reviewId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<reviewDataTypes>(queryKey);

      queryClient.setQueryData(queryKey, (old: reviewDataTypes) => {
        if (!old) return old;
        const nextData = getNextData(old, reviewId);

        return nextData;
      });

      return { previousData };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
  });

  return { postBookmarkMutation, deleteBookmarkMutation };
};

export default useMutateBookmark;
