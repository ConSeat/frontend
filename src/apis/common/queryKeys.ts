import type { ReviewListQueryParams } from '@/types/review';
import { serializeReviewListParams } from '@/utils/queryParams';

export const memberKeys = {
  all: ['members'] as const,
  me: () => [...memberKeys.all, 'me'] as const,
  bookmarks: (stadiumId: number) => [...memberKeys.all, 'bookmarks', stadiumId] as const,
  bookmarksStadiums: () => [...memberKeys.all, 'stadiums'] as const,
  bookmarkDetail: (reviewId: number) => [...memberKeys.all, 'review', reviewId] as const,
};

export const reviewKeys = {
  all: ['reviews'] as const,
  mine: () => [...reviewKeys.all, 'mine'] as const,
  stadiums: () => [...reviewKeys.all, 'stadiums'] as const,
  detail: (reviewId: number) => [...reviewKeys.all, reviewId] as const,
  images: (reviewId: number) => [...reviewKeys.all, reviewId, 'images'] as const,
  concertSeating: (concertId: number, seatingId: number) =>
    [...reviewKeys.all, 'concert', concertId, 'seating', seatingId] as const,
  seating: (seatingId: number) => [...reviewKeys.all, 'seating', seatingId] as const,
  allReviewList: (seatingId: number, params: ReviewListQueryParams) => {
    const serializedParams = serializeReviewListParams(params);
    return [...reviewKeys.all, 'seating', seatingId, serializedParams] as const;
  },
  bookmark: (reviewId: number) => [...reviewKeys.all, 'bookmark', reviewId] as const,
  like: (reviewId: number) => [...reviewKeys.all, 'like', reviewId] as const,
};

export const stadiumKeys = {
  all: ['stadiums'] as const,
  concerts: (stadiumId: number, query?: string) =>
    [...stadiumKeys.all, stadiumId, 'concerts', query ?? ''] as const,
  seats: (stadiumId: number) => [...stadiumKeys.all, stadiumId] as const,
  features: () => [...stadiumKeys.all, 'features'] as const,
  obstructions: () => [...stadiumKeys.all, 'obstructions'] as const,
  sections: (stadiumId: number) => [...stadiumKeys.all, stadiumId, 'sections'] as const,
  sectionSeating: (sectionId: number) =>
    [...stadiumKeys.all, 'sections', sectionId, 'seating'] as const,
};
