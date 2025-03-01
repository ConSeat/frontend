'use client';

import ReviewDropdown from './_components/ReviewDropdown/ReviewDropdown';
import { useState } from 'react';

const ReviewPage = () => {
  const [selected, setSelected] = useState<string>('');

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
    </div>
  );
};

export default ReviewPage;
