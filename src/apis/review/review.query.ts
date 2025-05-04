import { reviewKeys } from '../common/queryKeys';
import {
  deleteBookMark,
  deleteLike,
  getMyReview,
  getMyReviewDetail,
  getMyReviewStadiums,
  getReviewImages,
  postBookMark,
  postLike,
} from './review.api';

export const reviewQueries = {
  myReview: ({ stadiumId, lastReviewId }) => ({
    queryKey: reviewKeys.all,
    queryFn: () => getMyReview({ stadiumId, lastReviewId }),
  }),
  myReviewStadiums: {
    queryKey: reviewKeys.stadiums(),
    queryFn: getMyReviewStadiums,
  },
  myReviewDetail: (reviewId: number) => ({
    queryKey: reviewKeys.detail(reviewId),
    queryFn: () => getMyReviewDetail(reviewId),
  }),
  reviewImages: (reviewId: number) => ({
    queryKey: reviewKeys.images(reviewId),
    queryFn: () => getReviewImages(reviewId),
  }),
  addBookmark: (reviewId: number) => ({
    queryKey: reviewKeys.bookmark(reviewId),
    queryFn: () => postBookMark(reviewId),
  }),
  popBookmark: (reviewId: number) => ({
    queryKey: reviewKeys.bookmark(reviewId),
    queryFn: () => deleteBookMark(reviewId),
  }),
  addLike: (reviewId: number) => ({
    queryKey: reviewKeys.like(reviewId),
    queryFn: () => postLike(reviewId),
  }),
  popLike: (reviewId: number) => ({
    queryKey: reviewKeys.like(reviewId),
    queryFn: () => deleteLike(reviewId),
  }),
};
