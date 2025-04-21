import { API_ENDPOINTS } from '../common/endpoints';
import api from '../common/universalApi';
import MESSAGES from '@/constants/message';
import type { ImageData, ReviewSubmitRequestBody } from '@/types/review';

export const postReview = async (
  concertId: number,
  seatingId: number,
  body: ReviewSubmitRequestBody,
) => {
  return await api.post({
    endpoint: API_ENDPOINTS.REVIEWS_WITH_PARAMS(concertId, seatingId),
    errorMessage: MESSAGES.ERROR.POST_REVIEWS_WITH_PARAMS,
    body,
  });
};

export interface ReviewImagesResponse {
  originalImage: string[];
}

export const postReviewImages = async (images: ImageData[]) => {
  const formData = new FormData();
  images.forEach((image) => {
    formData.append('files', image.file);
  });

  const { data } = await api.post<ReviewImagesResponse>({
    endpoint: API_ENDPOINTS.REVIEW_IMAGES,
    errorMessage: MESSAGES.ERROR.POST_REVIEW_IMAGES,
    body: formData,
  });

  return { data: data.body };
};
