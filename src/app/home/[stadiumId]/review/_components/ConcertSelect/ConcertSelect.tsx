'use client';

import ReviewDropdownInput from '../ReviewDropdownInput/ReviewDropdownInput';
import React from 'react';
import { REVIEW } from '@/constants/review';
import { ReviewDispatch } from '@/types/review';

interface ConcertSelectProps {
  data: number;
  dispatch: ReviewDispatch;
}

const concerts = [
  { concertId: 1, name: '2024 NCT CONCERT' },
  { concertId: 2, name: 'NCT WISH 2025 - 서울' },
  { concertId: 3, name: '2025 SVT 9TH FAN MEETING <SEVENTEEN in CARAT LAND>' },
  { concertId: 4, name: '2023 MONSTA X 7TH OFFICIAL FANCLUB MONBEBE FAN－CONCERT <MX FRIENDS>' },
  { concertId: 5, name: '텐(NCT) 2025 - 서울' },
];

const ConcertSelect = ({ data, dispatch }: ConcertSelectProps) => {
  const selectedConcert = concerts.find((concert) => concert.concertId === data) || '';

  const handleConcertSelect = (concertId: number) => {
    dispatch({
      type: REVIEW.ACTIONS.CONCERT_SELECT,
      payload: { concertId },
    });
  };

  return (
    <ReviewDropdownInput
      value={selectedConcert as string}
      onChange={(value) => handleConcertSelect(value.concertId)}
      options={concerts}
      placeholder="콘서트명을 검색해주세요"
    />
  );
};

export default React.memo(ConcertSelect);
