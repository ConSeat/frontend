'use client';

import React from 'react';
import Button from '@/components/Button/Button';

const GoToOfficialButton = () => {
  const handleClick = () => {
    window.open(
      'https://x.com/messages/1568567420574662658-1914300317010968576',
      '_blank',
      'noopener,noreferrer',
    );
  };

  return <Button onClick={handleClick}>공식계정 바로가기</Button>;
};

export default GoToOfficialButton;
