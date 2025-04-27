import { memberKeys } from '../common/queryKeys';
import {
  getBookmarkDetail,
  getBookmarkReview,
  getBookmarkStadiums,
  getMemberInfo,
  postMemberInfo,
} from './member.api';

export const memberQueries = {
  info: {
    queryKey: memberKeys.all,
    queryFn: getMemberInfo,
  },

  update: {
    queryKey: memberKeys.me(),
    queryFn: postMemberInfo,
  },

  bookmarkStadiums: {
    queryKey: memberKeys.bookmarksStadiums(),
    queryFn: getBookmarkStadiums,
  },

  bookmarkReviews: (stadiumId: number) => ({
    queryKey: memberKeys.bookmarks(stadiumId),
    queryFn: () => getBookmarkReview(stadiumId),
  }),

  bookmarkDetail: (reviewId: number) => ({
    queryKey: memberKeys.bookmarkDetail(reviewId),
    queryFn: () => getBookmarkDetail(reviewId),
  }),
};
