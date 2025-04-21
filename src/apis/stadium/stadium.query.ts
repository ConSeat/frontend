import { stadiumKeys } from '../common/queryKeys';
import { getStadiumList } from './stadium.api';

export const stadiumQueries = {
  list: {
    queryKey: stadiumKeys.all,
    queryFn: getStadiumList,
  },
};
