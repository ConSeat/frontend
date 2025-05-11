'use client';

import ReviewCollection from '../../_components/ReviewCollection';
import {
  useFetchBookMarkReviews,
  useFetchBookMarkStadiums,
  useFetchMemberInfo,
} from '@/hooks/queries/useFetchMember';

const MyBookmark = () => {
  const { data } = useFetchBookMarkStadiums();
  const { data: memberInfo } = useFetchMemberInfo();

  return (
    <ReviewCollection
      stadiums={data!.stadiums}
      viewNumber={memberInfo!.favoriteCount}
      reviewNumber={memberInfo!.myReviewCount}
      tabType="view"
      useFetchReview={useFetchBookMarkReviews}
    />
  );
};

export default MyBookmark;
