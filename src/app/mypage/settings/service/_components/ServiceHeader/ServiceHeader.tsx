'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Header from '@/components/Header/Header';
import Icon from '@/components/Icon/Icon';

const ServiceHeader = () => {
  const router = useRouter();

  return (
    <Header
      title="앱 설정"
      right={<Icon icon="Close" size={24} onClick={() => router.replace('/mypage')} />}
    />
  );
};

export default ServiceHeader;
