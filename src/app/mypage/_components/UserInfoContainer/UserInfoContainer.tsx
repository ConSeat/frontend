'use client';

import UserInfo from '../UserInfo/UserInfo';
import { useFetchMemberInfo } from '@/hooks/queries/useFetchMember';

const UserInfoContainer = () => {
  const { data: memberInfo } = useFetchMemberInfo();

  return (
    <UserInfo
      profileImage={memberInfo!.profileImage}
      nickname={memberInfo!.nickname}
      email={memberInfo!.email}
    />
  );
};
export default UserInfoContainer;
