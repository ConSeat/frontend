'use client';

import ReviewDropdown from '../ReviewDropdown/ReviewDropdown';
import { useState } from 'react';
import { FLOOR, REVIEW } from '@/constants/review';
import { ReviewDispatch, SeatInfo } from '@/types/review';

type SeatInfoKey = keyof SeatInfo;

interface SeatInfoSelectContentProps {
  data: SeatInfo;
  dispatch: ReviewDispatch;
}

const SeatInfoSelectContent = ({ data, dispatch }: SeatInfoSelectContentProps) => {
  const [selected, setSelected] = useState<SeatInfo>(data);

  const handleSeatInfoSelect = (value: string, key: SeatInfoKey) => {
    setSelected((prev) => ({
      ...prev,
      [key]: value,
    }));

    dispatch({
      type: REVIEW.ACTIONS.SEAT_INFO_SELECT,
      payload: { seatInfo: { ...selected, [key]: value } },
    });
  };

  return (
    <>
      <ReviewDropdown
        value={selected.floor}
        onChange={(value) => {
          handleSeatInfoSelect(value, 'floor');
        }}
        options={['FLOOR', '1층', '2층']}
        placeholder="층을 선택해주세요"
      />
      {selected.floor && (
        <ReviewDropdown
          value={selected.section}
          onChange={(value) => {
            handleSeatInfoSelect(value, 'section');
          }}
          options={['1구열', '2구역', '3구열', '4구역', '5구열', '6구역']}
          placeholder="층을 선택해주세요"
        />
      )}
      {selected.floor !== FLOOR && selected.section && (
        <ReviewDropdown
          value={selected.column as string}
          onChange={(value) => {
            handleSeatInfoSelect(value, 'column');
          }}
          options={['1열 ~ 6열', '6열 ~ 11열', '12열 ~ 15열', '16열 ~ 22열']}
          placeholder="층을 선택해주세요"
        />
      )}
    </>
  );
};

export default SeatInfoSelectContent;
