import { useMutation } from '@tanstack/react-query';
import { postReviewImages } from '@/apis/review/review.api';
import type { ImageData } from '@/types/review';

const useMutateReview = () => {
  const postReviewImagesMutation = useMutation({
    mutationFn: (images: ImageData[]) => postReviewImages(images),
  });

  return { postReviewImagesMutation };
};

export default useMutateReview;
