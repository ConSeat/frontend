'use client';

import ReviewDropdown from './_components/ReviewDropdown/ReviewDropdown';
import ReviewDropdownInput from './_components/ReviewDropdownInput/ReviewDropdownInput';
import { useState } from 'react';
import Button from '@/components/Button/Button';
import ButtonContainer from '@/components/ButtonContainer/ButtonContainer';
import Textarea from '@/components/Textarea/Textarea';

const ReviewPage = () => {
  const [selected, setSelected] = useState<string>('');
  const [selected2, setSelected2] = useState<string>('');
  const [text, setText] = useState<string>('');

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

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={500}
        placeholder="추가적으로 좋았던 점, 아쉬운 점, 관람팁 등을자유롭게 작성해주세요. 구체적으로 작성할 수록 다른 사람들에게 도움이 돼요!"
        rows={5}
      />

      <ButtonContainer>
        <>
          <Button variant="secondary">이전</Button>
          <Button>다음</Button>
        </>
      </ButtonContainer>
    </div>
  );
};

export default ReviewPage;
