import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLike, postLike } from '@/apis/review/review.api';
import { AllReviewListResponse, SeatingReviews } from '@/apis/review/seating.api';

type reviewDataTypes = InfiniteData<AllReviewListResponse, unknown> | SeatingReviews;

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
        isLiked: !content.isLiked,
        likesCount: !content.isLiked ? content.likesCount + 1 : content.likesCount - 1,
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
    else
      return {
        ...elem,
        isLiked: !elem.isLiked,
        likesCount: !elem.isLiked ? elem.likesCount + 1 : elem.likesCount - 1,
      };
  });

  return {
    ...data,
    reviews: nextReviews,
  };
};

const getNextData = (data: reviewDataTypes, reviewId: number) => {
  let nextData = {};

  if ('pages' in data) {
    nextData = getNextInfiniteData(data, reviewId);
  } else if ('reviews' in data) {
    nextData = getNextSeatingReviews(data, reviewId);
  }

  return nextData;
};

const useMutateLike = (reviewId: number, queryKey: readonly (string | number)[]) => {
  const queryClient = useQueryClient();

  const postLikeMutation = useMutation({
    mutationFn: () => postLike(reviewId),
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

  const deleteLikeMutation = useMutation({
    mutationFn: () => deleteLike(reviewId),
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

  return { postLikeMutation, deleteLikeMutation };
};

export default useMutateLike;
