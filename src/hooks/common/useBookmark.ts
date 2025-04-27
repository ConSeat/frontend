import useMutateBookmark from '../mutations/useMutateBookmark';
import { useAuth } from './useAuth';
import { useQueryClient } from '@tanstack/react-query';
import { memberKeys, reviewKeys } from '@/apis/common/queryKeys';

const useBookMark = (isSaved: boolean, reviewId: number) => {
  const queryClient = useQueryClient();
  const { checkAndExecute } = useAuth();
  const { postBookmarkMutation, deleteBookmarkMutation } = useMutateBookmark(reviewId);

  const handleClickBookMark = () => {
    if (isSaved) {
      deleteBookmarkMutation.mutate(undefined, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [reviewKeys.all, memberKeys.all] });
        },
      });
    } else {
      const addBookmark = () => {
        postBookmarkMutation.mutate(undefined, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [reviewKeys.all, memberKeys.all] });
          },
        });
      };

      checkAndExecute(addBookmark, '결과 저장을 위해 로그인 / 회원 가입을 진행해주세요');
    }
  };

  return { handleClickBookMark };
};

export default useBookMark;
