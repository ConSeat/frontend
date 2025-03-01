'use client';

import ReviewDropdown from './_components/ReviewDropdown/ReviewDropdown';
import ReviewDropdownInput from './_components/ReviewDropdownInput/ReviewDropdownInput';
import { useState } from 'react';

const ReviewPage = () => {
  const [selected, setSelected] = useState<string>('');
  const [selected2, setSelected2] = useState<string>('');

  return (
    <div style={{ width: '100%', height: '50vh', backgroundColor: 'white' }}>
      <ReviewDropdown
        value={selected}
        onChange={(value) => {
          setSelected(value);
        }}
        options={['FLOOR', '1층', '2층']}
        placeholder="층을 선택해주세요"
      />
      <ReviewDropdownInput
        value={selected2}
        onChange={(value) => {
          setSelected2(value);
        }}
        options={[
          '2024 NCT CONCERT',
          'NCT WISH 2025 - 서울',
          '2025 SVT 9TH FAN MEETING <SEVENTEEN in CARAT LAND>',
          '2023 MONSTA X 7TH OFFICIAL FANCLUB MONBEBE FAN－CONCERT <MX FRIENDS>',
          '텐(NCT) 2025 - 서울',
        ]}
        placeholder="층을 선택해주세요"
      />
    </div>
  );
};

export default ReviewPage;
