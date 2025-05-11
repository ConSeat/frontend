'use client';

import UserInfo from '../UserInfo/UserInfo';
import { notFound } from 'next/navigation';
import { useFetchMemberInfo } from '@/hooks/queries/useFetchMember';

const UserInfoContainer = () => {
  const { data: memberInfo } = useFetchMemberInfo();

  if (!memberInfo) {
    notFound();
  }

  return (
    <UserInfo
      profileImage={memberInfo!.profileImage}
      nickname={memberInfo!.nickname}
      email={memberInfo!.email}
    />
  );
};
export default UserInfoContainer;
