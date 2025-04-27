import { API_ENDPOINTS } from '../common/endpoints';
import api from '../common/universalApi';
import MESSAGES from '@/constants/message';
import { type ReviewListQueryParams, SeatingReview } from '@/types/review';

interface SeatingReviews {
  reviews: SeatingReview[];
  floorName: string;
  sectionName: string;
  seatingName: string | null;
  distanceMessage: string;
  thumbnails: string[];
  reviewCount: number;
}

export const getSeatingReviews = async (seatingId: number) => {
  const { data } = await api.get<SeatingReviews>({
    endpoint: API_ENDPOINTS.REVIEWS_SEATING(seatingId),
    errorMessage: MESSAGES.ERROR.GET_REVIEW_SEATINGS,
  });

  return data.body;
};

export interface AllReviewListRequest {
  seatingId: number;
  params: ReviewListQueryParams;
}

export interface AllReviewListResponse {
  reviewCount: number;
  reviews: {
    content: SeatingReview[];
    sliceNumber: number;
    size: number;
    hasNext: boolean;
    numberOfElements: number;
  };
}

export const getAllReviewList = async ({ seatingId, params }: AllReviewListRequest) => {
  const endpoint = API_ENDPOINTS.REVIEW_LIST_WITH_PARAMS(seatingId, params);
  const { data } = await api.get<AllReviewListResponse>({
    endpoint,
    errorMessage: MESSAGES.ERROR.GET_ALL_REVIEW_LIST,
  });

  return data.body;
};
