import { useMutation } from '@tanstack/react-query';
import { deleteLike, postLike } from '@/apis/review/review.api';

const useMutateLike = (reviewId: number) => {
  const postLikeMutation = useMutation({
    mutationFn: () => postLike(reviewId),
  });

  const deleteLikeMutation = useMutation({
    mutationFn: () => deleteLike(reviewId),
  });

  return { postLikeMutation, deleteLikeMutation };
};

export default useMutateLike;
