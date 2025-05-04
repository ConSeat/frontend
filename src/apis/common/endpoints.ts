import type { SocialType } from '../auth/auth.api';
import type { ReviewListQueryParams } from '@/types/review';
import { serializeReviewListParams } from '@/utils/queryParams';

export const API_ENDPOINTS = {
  // auth
  SOCIAL_LOGIN: (socialType: SocialType) => `/auth/login/${socialType}`,
  LOGIN: '/auth/login',

  //members
  MEMBERS: '/members',
  MEMBERS_BOOKMARK_REVIEW: (stadiumId: number, lastModifiedAt: string) =>
    `/members/bookmarks?stadiumId=${stadiumId}${lastModifiedAt ? `&lastModifiedAt=${lastModifiedAt}` : ''}`,
  MEMBERS_BOOKMARK: '/members/bookmarks/stadiums',
  MEMBERS_BOOKMARK_DETAIL: (reviewId: number) => `/members/bookmarks/${reviewId}`,

  // review
  REVIEWS: ({ stadiumId, lastReviewId }: { stadiumId: number; lastReviewId: number | undefined }) =>
    `/reviews?stadiumId=${stadiumId}${lastReviewId ? `&lastReviewId=${lastReviewId}` : ''}`,
  REVIEW_IMAGES: '/reviews/images',
  REVIEW_STADIUMS: '/reviews/stadiums',
  REVIEW_MY_DETAIL: (reviewId: number) => `/reviews/${reviewId}`,
  REVIEW_IMAGES_BY_ID: (reviewId: number) => `/reviews/${reviewId}/images`,
  REVIEWS_SEATING: (seatingId: number) => `/reviews/seating/${seatingId}`,
  REVIEWS_WITH_PARAMS: (concertId: number, seatingId: number) =>
    `/reviews/concerts/${concertId}/seating/${seatingId}`,
  REVIEW_LIST_WITH_PARAMS: (seatingId: number, params: ReviewListQueryParams) => {
    const searchParams = new URLSearchParams(serializeReviewListParams(params));
    const query = searchParams.toString();
    return `/reviews/seating/${seatingId}/list${query ? `?${query}` : ''}`;
  },
  REVIEW_BOOKMARK: (reviewId: number) => `/reviews/${reviewId}/bookmarks`,
  REVIEW_LIKE: (reviewId: number) => `/reviews/${reviewId}/likes`,

  // stadium
  STADIUMS: '/stadiums',
  STADIUM_CONCERTS: (stadiumId: number, query?: string) =>
    `/stadiums/${stadiumId}/concerts${query ? `?query=${encodeURIComponent(query)}` : ''}`,
  STADIUM_SEATS: (stadiumId: number) => `/stadiums/${stadiumId}`,
  STADIUM_FEATURES: '/stadiums/features',
  STADIUM_OBSTRUCTIONS: '/stadiums/obstructions',
};
