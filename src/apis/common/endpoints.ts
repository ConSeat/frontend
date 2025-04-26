import type { SocialType } from '../auth/auth.api';
import type { ReviewListQueryParams } from '@/types/review';
import { serializeReviewListParams } from '@/utils/queryParams';

export const API_ENDPOINTS = {
  // auth
  SOCIAL_LOGIN: (socialType: SocialType) => `/auth/login/${socialType}`,
  LOGIN: '/auth/login',

  // review
  REVIEWS: '/reviews',
  REVIEW_IMAGES: '/reviews/images',
  REVIEWS_SEATING: (seatingId: number) => `/reviews/seating/${seatingId}`,
  REVIEWS_WITH_PARAMS: (concertId: number, seatingId: number) =>
    `/reviews/concerts/${concertId}/seating/${seatingId}`,
  REVIEW_LIST_WITH_PARAMS: (seatingId: number, params: ReviewListQueryParams) => {
    const searchParams = new URLSearchParams(serializeReviewListParams(params));
    const query = searchParams.toString();
    return `/reviews/seating/${seatingId}/list${query ? `?${query}` : ''}`;
  },

  // stadium
  STADIUMS: '/stadiums',
  STADIUM_CONCERTS: (stadiumId: number, query?: string) =>
    `/stadiums/${stadiumId}/concerts${query ? `?query=${encodeURIComponent(query)}` : ''}`,
  STADIUM_SEATS: (stadiumId: number) => `/stadiums/${stadiumId}`,
  STADIUM_FEATURES: '/stadiums/features',
  STADIUM_OBSTRUCTIONS: '/stadiums/obstructions',
};
