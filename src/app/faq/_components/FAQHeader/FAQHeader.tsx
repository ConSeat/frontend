'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Header from '@/components/Header/Header';
import Icon from '@/components/Icon/Icon';

const FAQHeader = () => {
  const router = useRouter();

  return (
    <Header
      left={<Icon icon="LeftArrow" onClick={() => router.push('/home')} />}
      title="자주 묻는 질문"
    />
  );
};

export default FAQHeader;
