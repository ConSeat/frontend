import { REVIEW } from '../../_constants/review';
import React, { useRef } from 'react';
import Textarea from '@/components/Textarea/Textarea';
import type { ReviewDispatch } from '@/types/review';

interface ReviewContentsProps {
  data: string;
  dispatch: ReviewDispatch;
}

const ReviewContents = ({ data, dispatch }: ReviewContentsProps) => {
  const reviewContentsRef = useRef<HTMLDivElement>(null);

  const handleFocus = () => {
    reviewContentsRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const handleReviewContents = (content: string) => {
    dispatch({
      type: REVIEW.ACTIONS.REVIEW_INPUT,
      payload: { content },
    });
  };

  return (
    <div ref={reviewContentsRef} style={{ width: '100%' }}>
      <Textarea
        value={data}
        onChange={(e) => handleReviewContents(e.target.value)}
        maxLength={300}
        placeholder={REVIEW.MESSAGE.REVIEW_INPUT.PLACEHOLDER}
        rows={5}
        onFocus={handleFocus}
      />
    </div>
  );
};

export default React.memo(ReviewContents);
