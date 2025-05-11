'use client';

import ReviewCollection from '../../_components/ReviewCollection';
import { useFetchMemberInfo } from '@/hooks/queries/useFetchMember';
import { useFetchMyReview, useFetchMyStadiums } from '@/hooks/queries/useFetchMyReview';

const MyReview = () => {
  const { data } = useFetchMyStadiums();
  const { data: memberInfo } = useFetchMemberInfo();

  return (
    <ReviewCollection
      stadiums={data!.stadiums}
      viewNumber={memberInfo!.favoriteCount}
      reviewNumber={memberInfo!.myReviewCount}
      tabType="review"
      useFetchReview={useFetchMyReview}
    />
  );
};

export default MyReview;
