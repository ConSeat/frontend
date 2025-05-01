'use client';

import ReviewCollection from '../ReviewCollection';
import UserInfo from '../UserInfo/UserInfo';
import { notFound, useSearchParams } from 'next/navigation';
import { useFetchBookMarkStadiums, useFetchMemberInfo } from '@/hooks/queries/useFetchMember';
import { useFetchMyStadiums } from '@/hooks/queries/useFetchMyReview';
import { MY_PAGE_QUERY } from '@/constants/myPage';

const UserInfoContainer = () => {
  const { data: memberInfo } = useFetchMemberInfo();
  const { data: myReviewStadiums } = useFetchMyStadiums();
  const { data: bookmarkStadiums } = useFetchBookMarkStadiums();
  const searchParams = useSearchParams();
  const tapType = searchParams.get(MY_PAGE_QUERY);

  if (!memberInfo || !bookmarkStadiums || !myReviewStadiums) {
    notFound();
  }

  const { stadiums } = tapType === 'view' ? bookmarkStadiums : myReviewStadiums;

  return (
    <>
      <UserInfo
        profileImage={memberInfo.profileImage}
        nickname={memberInfo.nickname}
        email={memberInfo.email}
      />
      <ReviewCollection
        viewNumber={memberInfo.favoriteCount}
        reviewNumber={memberInfo.myReviewCount}
        stadiums={stadiums}
      />
    </>
  );
};
export default UserInfoContainer;
