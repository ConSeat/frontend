'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Button from '@/components/Button/Button';
import ButtonContainer from '@/components/ButtonContainer/ButtonContainer';
import type { ViewType } from '@/types/findView';

interface ButtonSectionProps {
  stadiumId: string;
  viewType: ViewType | undefined;
}

const ButtonSection = ({ stadiumId, viewType }: ButtonSectionProps) => {
  const router = useRouter();

  const handleClickPrevButton = () => {
    router.push('/home');
  };

  const handleClickNextButton = () => {
    router.push(`/home/${stadiumId}/${viewType}`);
  };

  return (
    <ButtonContainer>
      <Button variant="secondary" onClick={handleClickPrevButton}>
        이전
      </Button>
      <Button
        variant={viewType ? 'primary' : 'inactive'}
        disabled={!viewType}
        onClick={handleClickNextButton}
      >
        다음
      </Button>
    </ButtonContainer>
  );
};

export default ButtonSection;
