'use client';

import { NONE_SELECT } from '../../_constants/info';
import { REVIEW } from '../../_constants/review';
import ReviewDropdown from '../ReviewDropdown/ReviewDropdown';
import styles from './SeatInfoSelect.module.scss';
import React, { useState } from 'react';
import { ReviewDispatch } from '@/types/review';

interface SeatInfoSelectProps {
  data: number;
  dispatch: ReviewDispatch;
}

// TODO: FLOOR를 선택하면 seating 배열이 없음. 그땐 sections에 seatingId이 있는지 백엔드와 상의 후 변경 해야함.
const seats = [
  {
    name: 'FLOOR',
    sections: [
      {
        name: 'A구역',
        seating: [
          { seatingId: 1, name: '1열 ~ 5열' },
          { seatingId: 2, name: '6열 ~ 11열' },
        ],
      },
      {
        name: 'B구역',
        seating: [
          { seatingId: 3, name: '1열 ~ 5열' },
          { seatingId: 4, name: '6열 ~ 11열' },
        ],
      },
    ],
  },
  {
    name: '1층',
    sections: [
      {
        name: '1구역',
        seating: [
          { seatingId: 5, name: '1열 ~ 5열' },
          { seatingId: 6, name: '6열 ~ 11열' },
        ],
      },
    ],
  },
  {
    name: '2층',
    sections: [
      {
        name: '24구역',
        seating: [
          { seatingId: 7, name: '1열 ~ 5열' },
          { seatingId: 8, name: '6열 ~ 11열' },
        ],
      },
    ],
  },
];

const SeatInfoSelect = ({ data, dispatch }: SeatInfoSelectProps) => {
  const [seatInfo, setSeatInfo] = useState({
    floor: '',
    section: '',
    seatingId: data,
  });

  const handleSeatInfoSelect = (updates: Partial<typeof seatInfo>) => {
    const newSeatInfo = { ...seatInfo, ...updates };
    setSeatInfo(newSeatInfo);

    if (newSeatInfo.floor && newSeatInfo.section && newSeatInfo.seatingId !== NONE_SELECT) {
      dispatch({
        type: REVIEW.ACTIONS.SEAT_INFO_SELECT,
        payload: { seatingId: newSeatInfo.seatingId },
      });
    }
  };

  const availableSections = seats.find((floor) => floor.name === seatInfo.floor)?.sections || [];
  const availableSeating =
    availableSections.find((section) => section.name === seatInfo.section)?.seating || [];

  return (
    <div className={styles.seatInfoSelectContainer}>
      <ReviewDropdown
        value={seatInfo.floor}
        onChange={(floorName) =>
          handleSeatInfoSelect({ floor: floorName, section: '', seatingId: NONE_SELECT })
        }
        options={seats.map((floor) => floor.name)}
        placeholder="층을 선택해주세요"
      />

      {seatInfo.floor && (
        <ReviewDropdown
          value={seatInfo.section}
          onChange={(sectionName) =>
            handleSeatInfoSelect({ section: sectionName, seatingId: NONE_SELECT })
          }
          options={availableSections.map((section) => section.name)}
          placeholder="구역을 선택해주세요"
        />
      )}

      {seatInfo.section && (
        <ReviewDropdown
          value={availableSeating.find((seat) => seat.seatingId === seatInfo.seatingId)?.name || ''}
          onChange={(seatingName) => {
            const seating = availableSeating.find((seat) => seat.name === seatingName);
            if (seating) {
              handleSeatInfoSelect({ seatingId: seating.seatingId });
            }
          }}
          options={availableSeating.map((seat) => seat.name)}
          placeholder="좌석을 선택해주세요"
        />
      )}
    </div>
  );
};

export default React.memo(SeatInfoSelect);
