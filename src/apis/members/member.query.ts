import { memberKeys } from '../common/queryKeys';
import { getBookmarkStadiums, getMemberInfo, postMemberInfo } from './member.api';

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
};
