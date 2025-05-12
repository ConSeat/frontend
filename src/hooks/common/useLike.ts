import useMutateLike from '../mutations/useMutateLike';
import { useAuth } from './useAuth';

const useLike = (isLiked: boolean, reviewId: number, queryKey: readonly (string | number)[]) => {
  const { checkAndExecute } = useAuth();
  const { postLikeMutation, deleteLikeMutation } = useMutateLike(reviewId, queryKey);

  const handleClickLike = () => {
    if (isLiked) {
      deleteLikeMutation.mutate();
    } else {
      const addBookmark = () => {
        postLikeMutation.mutate();
      };

      checkAndExecute(addBookmark, '해당 기능은 로그인 후 이용할 수 있어요');
    }
  };

  return { handleClickLike };
};

export default useLike;
