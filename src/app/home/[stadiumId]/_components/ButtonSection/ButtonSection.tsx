'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { useAuth } from '@/hooks/common/useAuth';
import Button from '@/components/Button/Button';
import ButtonContainer from '@/components/ButtonContainer/ButtonContainer';
import type { ViewType } from '@/types/findView';
import { gaEvent } from '@/utils/gtag';

interface ButtonSectionProps {
  stadiumId: string;
  viewType: ViewType | undefined;
}

const ButtonSection = ({ stadiumId, viewType }: ButtonSectionProps) => {
  const router = useRouter();
  const { checkAndExecute } = useAuth();

  const prevHref = '/home';
  const nextHref = viewType ? `/home/${stadiumId}/${viewType}` : '';

  const handleClickPrevButton = () => {
    router.push(prevHref);
  };

  const handleClickNextButton = () => {
    router.push(nextHref);
  };

  const handleClickReview = () => {
    gaEvent({
      action: '후기 작성 시도',
      category: 'interaction',
      label: '후기 작성 화면 진입',
    });
    const popupText = '후기 작성을 위해 로그인 해주세요';
    checkAndExecute(handleClickNextButton, popupText);
  };

  return (
    <ButtonContainer>
      <Button variant="secondary" onClick={handleClickPrevButton}>
        이전
      </Button>
      <Button
        variant={viewType ? 'primary' : 'inactive'}
        disabled={!viewType}
        onClick={viewType === 'review' ? handleClickReview : handleClickNextButton}
      >
        다음
      </Button>
    </ButtonContainer>
  );
};

export default ButtonSection;
