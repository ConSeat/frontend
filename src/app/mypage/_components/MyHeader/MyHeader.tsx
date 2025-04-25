'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import Header from '@/components/Header/Header';
import Icon from '@/components/Icon/Icon';

const MyHeader = () => {
  const router = useRouter();

  return (
    <Header
      left={<Icon icon="LeftArrow" onClick={() => router.back()} />}
      title="마이 페이지"
      right={
        <Link href="/mypage/settings/service">
          <Icon icon="Gear" />
        </Link>
      }
    />
  );
};

export default MyHeader;
