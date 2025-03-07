'use client';

import ReviewDropdown from '../ReviewDropdown/ReviewDropdown';
import { FLOOR, REVIEW } from '@/constants/review';
import { ReviewDispatch, SeatInfo } from '@/types/review';

type SeatInfoKey = keyof SeatInfo;

interface SeatInfoSelectProps {
  data: SeatInfo;
  dispatch: ReviewDispatch;
}

const SeatInfoSelect = ({ data, dispatch }: SeatInfoSelectProps) => {
  const handleSeatInfoSelect = (value: string, key: SeatInfoKey) => {
    dispatch({
      type: REVIEW.ACTIONS.SEAT_INFO_SELECT,
      payload: { seatInfo: { ...data, [key]: value } },
    });
  };

  return (
    <>
      <ReviewDropdown
        value={data.floor}
        onChange={(value) => {
          handleSeatInfoSelect(value, 'floor');
        }}
        options={['FLOOR', '1층', '2층']}
        placeholder="층을 선택해주세요"
      />
      {data.floor && (
        <ReviewDropdown
          value={data.section}
          onChange={(value) => {
            handleSeatInfoSelect(value, 'section');
          }}
          options={['1구역', '2구역', '3구역', '4구역', '5구역', '6구역']}
          placeholder="구역을 선택해주세요"
        />
      )}
      {data.floor !== FLOOR && data.section && (
        <ReviewDropdown
          value={data.column as string}
          onChange={(value) => {
            handleSeatInfoSelect(value, 'column');
          }}
          options={['1열 ~ 6열', '6열 ~ 11열', '12열 ~ 15열', '16열 ~ 22열']}
          placeholder="열을 선택해주세요"
        />
      )}
    </>
  );
};

export default SeatInfoSelect;
