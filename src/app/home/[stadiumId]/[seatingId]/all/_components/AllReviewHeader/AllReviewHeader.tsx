'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Header from '@/components/Header/Header';
import Icon from '@/components/Icon/Icon';

interface AllReviewHeaderProps {
  stadiumId: number;
  seatingId: number;
}

const AllReviewHeader = ({ stadiumId, seatingId }: AllReviewHeaderProps) => {
  const router = useRouter();

  return (
    <Header
      title="후기 전체보기"
      right={
        <Icon
          icon="Close"
          size={24}
          onClick={() => router.replace(`/home/${stadiumId}/single/${seatingId}`)}
        />
      }
      style={{ backgroundColor: '#1B1C1E', backdropFilter: 'none' }}
    />
  );
};

export default AllReviewHeader;
