import { useMutation } from '@tanstack/react-query';
import { deleteBookMark, postBookMark } from '@/apis/review/review.api';

const useMutateBookmark = (reviewId: number) => {
  const postBookmarkMutation = useMutation({
    mutationFn: () => postBookMark(reviewId),
  });

  const deleteBookmarkMutation = useMutation({
    mutationFn: () => deleteBookMark(reviewId),
  });

  return { postBookmarkMutation, deleteBookmarkMutation };
};

export default useMutateBookmark;
