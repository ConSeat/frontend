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

      checkAndExecute(addBookmark, '결과 저장을 위해 로그인 / 회원 가입을 진행해주세요');
    }
  };

  return { handleClickLike };
};

export default useLike;
