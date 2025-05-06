import useMutateBookmark from '../mutations/useMutateBookmark';
import { useAuth } from './useAuth';

const useBookMark = (
  isSaved: boolean,
  reviewId: number,
  queryKey: readonly (string | number)[],
) => {
  const { checkAndExecute } = useAuth();
  const { postBookmarkMutation, deleteBookmarkMutation } = useMutateBookmark(reviewId, queryKey);

  const handleClickBookMark = () => {
    if (isSaved) {
      deleteBookmarkMutation.mutate();
    } else {
      const addBookmark = () => {
        postBookmarkMutation.mutate();
      };

      checkAndExecute(addBookmark, '결과 저장을 위해 로그인 / 회원 가입을 진행해주세요');
    }
  };

  return { handleClickBookMark };
};

export default useBookMark;
