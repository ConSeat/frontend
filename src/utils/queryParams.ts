import type { ListSort } from '@/types/review';

export const serializeReviewListParams = (params?: {
  features?: number[];
  obstructions?: number[];
  lastReviewId?: number;
  sort?: ListSort;
}) => {
  const searchParams = new URLSearchParams();

  if (params?.features?.length) {
    searchParams.set('features', params.features.join(','));
  }

  if (params?.obstructions?.length) {
    searchParams.set('obstructions', params.obstructions.join(','));
  }

  if (params?.lastReviewId !== undefined && params.lastReviewId !== -1) {
    searchParams.set('lastReviewId', String(params.lastReviewId));
  }

  if (params?.sort) {
    searchParams.set('sort', params.sort);
  }

  return searchParams.toString();
};
