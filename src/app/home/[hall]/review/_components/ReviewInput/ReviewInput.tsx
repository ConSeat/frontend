import Textarea from '@/components/Textarea/Textarea';
import { REVIEW } from '@/constants/review';
import type { ReviewDispatch } from '@/types/review';

interface ReviewInputProps {
  data: string;
  dispatch: ReviewDispatch;
}

const ReviewInput = ({ data, dispatch }: ReviewInputProps) => {
  const handleReviewInput = (value: string) => {
    dispatch({
      type: REVIEW.ACTIONS.REVIEW_INPUT,
      payload: { review: value },
    });
  };

  return (
    <Textarea
      value={data}
      onChange={(e) => handleReviewInput(e.target.value)}
      maxLength={300}
      placeholder={REVIEW.MESSAGE.REVIEW_INPUT.PLACEHOLDER}
      rows={5}
    />
  );
};

export default ReviewInput;
