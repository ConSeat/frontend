'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Header from '@/components/Header/Header';
import Icon from '@/components/Icon/Icon';

const ContactHeader = () => {
  const router = useRouter();

  return (
    <Header
      left={<Icon icon="LeftArrow" onClick={() => router.push('/home/fqa')} />}
      title="문의하기"
      style={{ backgroundColor: 'transparent', backdropFilter: 'none' }}
    />
  );
};

export default ContactHeader;
