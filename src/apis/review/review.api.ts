import { API_ENDPOINTS } from '../common/endpoints';
import api from '../common/universalApi';
import MESSAGES from '@/constants/message';
import type { ImageData, ReviewSubmitRequestBody } from '@/types/review';
import { MyReviewStadiumsResponse } from '@/types/stadium';

export const postReview = async (
  concertId: number,
  seatingId: number,
  body: ReviewSubmitRequestBody,
) => {
  return await api.secure.post({
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

  const { data } = await api.secure.post<ReviewImagesResponse>({
    endpoint: API_ENDPOINTS.REVIEW_IMAGES,
    errorMessage: MESSAGES.ERROR.POST_REVIEW_IMAGES,
    body: formData,
  });

  return { data: data.body };
};

export const getMyReviewStadiums = async () => {
  const { data } = await api.secure.get<MyReviewStadiumsResponse>({
    endpoint: API_ENDPOINTS.REVIEW_STADIUMS,
    errorMessage: MESSAGES.ERROR.GET_STADIUMS_MY_REVIEW,
  });

  return data.body;
};

export interface Content {
  reviewId: number;
  thumbnailUrl: string;
  floorName: string;
  sectionName: string;
  seatingName: string;
  status: string;
}
export interface Reviews {
  content: Content[];
  sliceNumber: number;
  size: number;
  hasNext: boolean;
  numberOfElements: number;
}

export interface MyReviewResponse {
  reviews: Reviews;
}

export interface MyReviewRequest {
  stadiumId: number;
  lastReviewId?: number | undefined;
}

export const getMyReview = async ({ stadiumId, lastReviewId }: MyReviewRequest) => {
  const { data } = await api.secure.get<MyReviewResponse>({
    endpoint: API_ENDPOINTS.REVIEWS({ stadiumId, lastReviewId }),
    errorMessage: MESSAGES.ERROR.GET_MY_REVIEW,
  });

  return data.body;
};

export interface MyReviewDetailResponse {
  images: string[];
  features: string[];
  obstructions: string[];
  reviewId: number;
  writerNickname: string;
  writerSrc: string;
  concertName: string;
  contents: string;
  createdAt: string;
  status: '심사대기' | '승인' | '반려' | '재심사';
  rejectReason: string | null;
}

export const getMyReviewDetail = async (reviewId: number) => {
  const { data } = await api.secure.get<MyReviewDetailResponse>({
    endpoint: API_ENDPOINTS.REVIEW_MY_DETAIL(reviewId),
    errorMessage: MESSAGES.ERROR.GET_MY_REVIEW_DETAIL,
  });

  return data.body;
};

export interface ReviewImagesResponse {
  images: string[];
}

export const getReviewImages = async (reviewId: number) => {
  const { data } = await api.public.get<ReviewImagesResponse>({
    endpoint: API_ENDPOINTS.REVIEW_IMAGES_BY_ID(reviewId),
    errorMessage: MESSAGES.ERROR.GET_REVIEW_IMAGES,
  });

  return data.body;
};

export const postBookMark = async (reviewId: number) => {
  return await api.secure.post({
    endpoint: API_ENDPOINTS.REVIEW_BOOKMARK(reviewId),
    errorMessage: MESSAGES.ERROR.POST_REVIEWS_BOOKMARK,
  });
};

export const deleteBookMark = async (reviewId: number) => {
  return await api.secure.delete({
    endpoint: API_ENDPOINTS.REVIEW_BOOKMARK(reviewId),
    errorMessage: MESSAGES.ERROR.DELETE_REVIEWS_BOOKMARK,
  });
};

export const postLike = async (reviewId: number) => {
  return await api.secure.post({
    endpoint: API_ENDPOINTS.REVIEW_LIKE(reviewId),
    errorMessage: MESSAGES.ERROR.POST_REVIEWS_LIKE,
  });
};

export const deleteLike = async (reviewId: number) => {
  return await api.secure.delete({
    endpoint: API_ENDPOINTS.REVIEW_LIKE(reviewId),
    errorMessage: MESSAGES.ERROR.DELETE_REVIEWS_LIKE,
  });
};
