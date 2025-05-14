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

      checkAndExecute(addBookmark, '해당 기능은 로그인 후 이용할 수 있어요');
    }
  };

  return { handleClickBookMark };
};

export default useBookMark;
