import { memberKeys } from '../common/queryKeys';
import { getMemberInfo, postMemberInfo } from './member.api';

export const memberQueries = {
  info: {
    queryKey: memberKeys.all,
    queryFn: getMemberInfo,
  },

  update: {
    queryKey: memberKeys.me(),
    queryFn: postMemberInfo,
  },
};
