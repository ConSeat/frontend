'use client';

import ReviewDropdownInput from '../ReviewDropdownInput/ReviewDropdownInput';
import { REVIEW } from '@/constants/review';
import { ReviewDispatch } from '@/types/review';

interface ConcertSelectProps {
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

const ConcertSelect = ({ data, dispatch }: ConcertSelectProps) => {
  const handleConcertSelect = (value: string) => {
    dispatch({
      type: REVIEW.ACTIONS.CONCERT_SELECT,
      payload: { concert: value },
    });
  };

  return (
    <ReviewDropdownInput
      value={data}
      onChange={(value) => {
        handleConcertSelect(value);
      }}
      options={options}
      placeholder={REVIEW.MESSAGE.CONCERT_SELECT.PLACEHOLDER}
    />
  );
};

export default ConcertSelect;
