'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Header from '@/components/Header/Header';
import Icon from '@/components/Icon/Icon';

const AllReviewHeader = () => {
  const router = useRouter();

  return (
    <Header
      title="후기 전체보기"
      right={<Icon icon="Close" size={24} onClick={() => router.back()} />}
    />
  );
};

export default AllReviewHeader;
