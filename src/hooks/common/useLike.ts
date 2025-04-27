import useMutateLike from '../mutations/useMutateLike';
import { useAuth } from './useAuth';
import { useQueryClient } from '@tanstack/react-query';
import { reviewKeys } from '@/apis/common/queryKeys';

const useLike = (isLiked: boolean, reviewId: number) => {
  const queryClient = useQueryClient();
  const { checkAndExecute } = useAuth();
  const { postLikeMutation, deleteLikeMutation } = useMutateLike(reviewId);

  const handleClickLike = () => {
    if (isLiked) {
      deleteLikeMutation.mutate(undefined, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: reviewKeys.all });
        },
      });
    } else {
      const addBookmark = () => {
        postLikeMutation.mutate(undefined, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: reviewKeys.all });
          },
        });
      };

      checkAndExecute(addBookmark, '결과 저장을 위해 로그인 / 회원 가입을 진행해주세요');
    }
  };

  return { handleClickLike };
};

export default useLike;
