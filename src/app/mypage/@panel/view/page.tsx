'use client';

import ReviewCollection from '../../_components/ReviewCollection';
import { useFetchBookMarkStadiums, useFetchMemberInfo } from '@/hooks/queries/useFetchMember';

const MyBookmark = () => {
  const { data } = useFetchBookMarkStadiums();
  const { data: memberInfo } = useFetchMemberInfo();

  return (
    <ReviewCollection
      stadiums={data!.stadiums}
      viewNumber={memberInfo!.favoriteCount}
      reviewNumber={memberInfo!.myReviewCount}
      tabType="view"
    />
  );
};

export default MyBookmark;
