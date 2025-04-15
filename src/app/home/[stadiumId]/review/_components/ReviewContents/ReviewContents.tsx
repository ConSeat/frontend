import { REVIEW } from '../../_constants/review';
import React from 'react';
import Textarea from '@/components/Textarea/Textarea';
import type { ReviewDispatch } from '@/types/review';

interface ReviewContentsProps {
  data: string;
  dispatch: ReviewDispatch;
}

const ReviewContents = ({ data, dispatch }: ReviewContentsProps) => {
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
};

export default React.memo(ReviewContents);
