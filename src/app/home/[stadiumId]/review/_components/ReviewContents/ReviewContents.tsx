import React from 'react';
import Textarea from '@/components/Textarea/Textarea';
import { REVIEW } from '@/constants/review';
import type { ReviewDispatch } from '@/types/review';

interface ReviewContentsProps {
  data: string;
  dispatch: ReviewDispatch;
}

const ReviewContents = React.memo(({ data, dispatch }: ReviewContentsProps) => {
  const handleReviewContents = (content: string) => {
    dispatch({
      type: REVIEW.ACTIONS.REVIEW_INPUT,
      payload: { content },
    });
  };

  return (
    <Textarea
      value={data}
      onChange={(e) => handleReviewContents(e.target.value)}
      maxLength={300}
      placeholder={REVIEW.MESSAGE.REVIEW_INPUT.PLACEHOLDER}
      rows={5}
    />
  );
});

ReviewContents.displayName = 'ReviewContents';

export default ReviewContents;
