'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Header from '@/components/Header/Header';
import Icon from '@/components/Icon/Icon';

const AccountHeader = () => {
  const router = useRouter();

  return (
    <Header
      title="프로필 설정"
      right={<Icon icon="Close" size={24} onClick={() => router.replace('/mypage?tab=view')} />}
    />
  );
};

export default AccountHeader;
