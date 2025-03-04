'use client';

import ReviewDropdownInput from '../ReviewDropdownInput/ReviewDropdownInput';
import { useState } from 'react';
import { REVIEW } from '@/constants/review';
import { ReviewDispatch } from '@/types/review';

interface ConcertSelectContentProps {
  data: string;
  dispatch: ReviewDispatch;
}

const options = [
  '2024 NCT CONCERT',
  'NCT WISH 2025 - 서울',
  '2025 SVT 9TH FAN MEETING <SEVENTEEN in CARAT LAND>',
  '2023 MONSTA X 7TH OFFICIAL FANCLUB MONBEBE FAN－CONCERT <MX FRIENDS>',
  '텐(NCT) 2025 - 서울',
];

const ConcertSelectContent = ({ data, dispatch }: ConcertSelectContentProps) => {
  const [selected, setSelected] = useState<string>(data);

  const handleConcertSelect = (value: string) => {
    setSelected(value);
    dispatch({
      type: REVIEW.ACTIONS.CONCERT_SELECT,
      payload: { concert: selected },
    });
  };

  return (
    <ReviewDropdownInput
      value={selected}
      onChange={(value) => {
        handleConcertSelect(value);
      }}
      options={options}
      placeholder={REVIEW.MESSAGE.CONCERT_SELECT.PLACEHOLDER}
    />
  );
};

export default ConcertSelectContent;
