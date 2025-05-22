'use client';

import Icon from '../Icon/Icon';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { MouseEventHandler } from 'react';
import { VIEW_TAP } from '@/constants/myPage';

const MypageLink = () => {
  const { data: session, status } = useSession();
  const isLogin = status === 'authenticated' && !!session?.user;

  const handleClickLink: MouseEventHandler = () => {
    if (!isLogin) {
      sessionStorage.setItem('returnUrl', window.location.href);
    }
  };

  return (
    <Link href={`/mypage/${VIEW_TAP}`} onClick={handleClickLink}>
      <Icon icon="DefaultProfile" />
    </Link>
  );
};

export default MypageLink;
