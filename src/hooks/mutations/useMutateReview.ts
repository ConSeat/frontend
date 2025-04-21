import { postReview } from './../../apis/review/review.api';
import { useMutation } from '@tanstack/react-query';
import { postReviewImages } from '@/apis/review/review.api';
import type { ImageData, ReviewSubmitRequestBody } from '@/types/review';

const useMutateReview = () => {
  const postReviewMutation = useMutation({
    mutationFn: (data: { concertId: number; seatingId: number; body: ReviewSubmitRequestBody }) =>
      postReview(data.concertId, data.seatingId, data.body),
  });

  const postReviewImagesMutation = useMutation({
    mutationFn: (images: ImageData[]) => postReviewImages(images),
  });

  return { postReviewMutation, postReviewImagesMutation };
};

export default useMutateReview;
