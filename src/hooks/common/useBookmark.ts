import useMutateBookmark from '../mutations/useMutateBookmark';
import { useAuth } from './useAuth';
import { gaEvent } from '@/utils/gtag';

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
        gaEvent({
          action: '북마크 추가 버튼 클릭',
          category: 'interaction',
          label: '시야 후기 북마크',
        });
      };

      checkAndExecute(addBookmark, '해당 기능은 로그인 후 이용할 수 있어요');
    }
  };

  return { handleClickBookMark };
};

export default useBookMark;
